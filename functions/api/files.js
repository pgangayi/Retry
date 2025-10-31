// Cloudflare Pages Function for File Upload/Download API using Cloudflare R2
// Handles file operations using Cloudflare R2 storage

export async function onRequest(context) {
  const { request, env } = context;
  const method = request.method;
  const url = new URL(request.url);

  try {
    // Validate JWT
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For now, we'll use a simple user ID extraction from JWT
    const token = authHeader.substring(7);
      // Verify and extract user from token
      const { AuthUtils } = await import('./_auth.js');
      const auth = new AuthUtils(env);
      const user = await auth.getUserFromToken(request);
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      const userId = user.id;

    if (method === 'POST') {
      // File upload to R2
      const formData = await request.formData();
      const file = formData.get('file');
      const farmId = formData.get('farm_id');
      const category = formData.get('category') || 'general';

      if (!file || !farmId) {
        return new Response(JSON.stringify({ error: 'File and farm_id required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to farm
      const accessQuery = `SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?`;
      const { results: farmAccess } = await env.DB.prepare(accessQuery)
        .bind(farmId, userId)
        .all();

      if (!farmAccess || farmAccess.length === 0) {
        return new Response(JSON.stringify({ error: 'Access denied' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substr(2, 9);
      const fileExtension = file.name.split('.').pop();
      const filename = `${farmId}/${category}/${timestamp}_${randomId}.${fileExtension}`;

      // Upload to R2
      await env.R2_BUCKET.put(filename, file.stream(), {
        httpMetadata: {
          contentType: file.type,
          contentDisposition: `attachment; filename="${file.name}"`
        }
      });

      // Store file metadata in database
      const insertQuery = `
        INSERT INTO files (farm_id, filename, original_name, file_size, mime_type, category, uploaded_by, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `;

      const result = await env.DB.prepare(insertQuery)
        .bind(farmId, filename, file.name, file.size, file.type, category, userId)
        .run();

      if (!result.success) {
        // If DB insert fails, try to delete from R2
        try {
          await env.R2_BUCKET.delete(filename);
        } catch (e) {
          console.error('Failed to cleanup R2 after DB error:', e);
        }
        return new Response(JSON.stringify({ error: 'Failed to save file metadata' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const fileId = result.meta.last_row_id;

      return new Response(JSON.stringify({
        id: fileId,
        filename,
        original_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        category,
        url: `${env.CF_PAGES_URL || 'https://your-domain.pages.dev'}/api/files/${filename}`
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (method === 'GET') {
      // List files or download specific file
      const pathParts = url.pathname.split('/').filter(Boolean);
      const filename = pathParts.length > 2 ? pathParts.slice(2).join('/') : null;

      if (filename) {
        // Download specific file
        const object = await env.R2_BUCKET.get(filename);
        if (!object) {
          return new Response(JSON.stringify({ error: 'File not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Verify user has access to the file's farm (filename starts with farmId)
        const farmId = filename.split('/')[0];
        const accessQuery = `SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?`;
        const { results: farmAccess } = await env.DB.prepare(accessQuery)
          .bind(farmId, userId)
          .all();

        if (!farmAccess || farmAccess.length === 0) {
          return new Response(JSON.stringify({ error: 'Access denied' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        return new Response(object.body, {
          headers: {
            'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
            'Content-Disposition': object.httpMetadata?.contentDisposition || `attachment; filename="${filename.split('/').pop()}"`
          }
        });
      } else {
        // List files for user's farms
        const farmId = url.searchParams.get('farm_id');
        let query, params;

        if (farmId) {
          // Verify access
          const accessQuery = `SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?`;
          const { results: access } = await env.DB.prepare(accessQuery).bind(farmId, userId).all();
          if (!access || access.length === 0) {
            return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
          }

          query = `SELECT id, filename, original_name, file_size, mime_type, category, created_at FROM files WHERE farm_id = ? ORDER BY created_at DESC`;
          params = [farmId];
        } else {
          // All farms for user
          query = `
            SELECT f.id, f.filename, f.original_name, f.file_size, f.mime_type, f.category, f.created_at, fm.name as farm_name
            FROM files f
            JOIN farms fm ON f.farm_id = fm.id
            JOIN farm_members fmem ON fm.id = fmem.farm_id
            WHERE fmem.user_id = ?
            ORDER BY f.created_at DESC
          `;
          params = [userId];
        }

        const { results: files } = await env.DB.prepare(query).bind(...params).all();

        // Add download URLs
        const filesWithUrls = files.map(file => ({
          ...file,
          url: `${env.CF_PAGES_URL || 'https://your-domain.pages.dev'}/api/files/${file.filename}`
        }));

        return new Response(JSON.stringify(filesWithUrls), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

    } else if (method === 'DELETE') {
      // Delete file
      const pathParts = url.pathname.split('/').filter(Boolean);
      const filename = pathParts.length > 2 ? pathParts.slice(2).join('/') : null;

      if (!filename) {
        return new Response(JSON.stringify({ error: 'Filename required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to the file's farm
      const farmId = filename.split('/')[0];
      const accessQuery = `SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?`;
      const { results: farmAccess } = await env.DB.prepare(accessQuery)
        .bind(farmId, userId)
        .all();

      if (!farmAccess || farmAccess.length === 0) {
        return new Response(JSON.stringify({ error: 'Access denied' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Delete from R2
      await env.R2_BUCKET.delete(filename);

      // Delete from database
      const deleteQuery = `DELETE FROM files WHERE filename = ?`;
      await env.DB.prepare(deleteQuery).bind(filename).run();

      return new Response(JSON.stringify({ message: 'File deleted successfully' }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('File API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
// Cloudflare Pages Function for Finance Reports API using D1
// Generates various financial reports using Cloudflare D1 database

export async function onRequest(context) {
  const { request, env, params } = context;
  const { type } = params;
  const url = new URL(request.url);

  try {
    // Validate JWT (using Supabase for auth, D1 for data)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify and extract user from token
    const { AuthUtils } = await import('../../_auth.js');
    const auth = new AuthUtils(env);
    const user = await auth.getUserFromToken(request);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const userId = user.id;

    if (type === 'summary') {
      const farmId = url.searchParams.get('farm_id');
      if (!farmId) {
        return new Response(JSON.stringify({ error: 'farm_id query parameter required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to farm
      const accessQuery = `
        SELECT id FROM farm_members
        WHERE farm_id = ? AND user_id = ?
      `;
      const { results: farmAccess } = await env.DB.prepare(accessQuery)
        .bind(farmId, userId)
        .all();

      if (!farmAccess || farmAccess.length === 0) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const startDate = url.searchParams.get('start_date') || '2024-01-01';
      const endDate = url.searchParams.get('end_date') || new Date().toISOString().split('T')[0];

      // Get finance entries for the period using D1
      const entriesQuery = `
        SELECT id, type, amount, description, date, category
        FROM finance_entries
        WHERE farm_id = ? AND date >= ? AND date <= ?
        ORDER BY date DESC
      `;

      const { results: entries } = await env.DB.prepare(entriesQuery)
        .bind(farmId, startDate, endDate)
        .all();

      if (!entries) {
        return new Response(JSON.stringify({ error: 'Database error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Calculate totals
      const totals = entries.reduce((acc, entry) => {
        if (entry.type === 'income') {
          acc.total_income += entry.amount;
        } else if (entry.type === 'expense') {
          acc.total_expenses += entry.amount;
        }
        return acc;
      }, { total_income: 0, total_expenses: 0 });

      // Group by category
      const categories = entries.reduce((acc, entry) => {
        const key = `${entry.category}-${entry.type}`;
        if (!acc[key]) {
          acc[key] = {
            category: entry.category,
            type: entry.type,
            total_amount: 0,
            transaction_count: 0
          };
        }
        acc[key].total_amount += entry.amount;
        acc[key].transaction_count += 1;
        return acc;
      }, {});

      const summary = {
        period: { start_date: startDate, end_date: endDate },
        totals,
        categories: Object.values(categories),
        entries
      };

      return new Response(JSON.stringify(summary), {
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (type === 'income') {
      // Generate income report
      const farmId = url.searchParams.get('farm_id');
      const startDate = url.searchParams.get('start_date') || '2024-01-01';
      const endDate = url.searchParams.get('end_date') || new Date().toISOString().split('T')[0];

      let query, params;
      if (farmId) {
        // Verify access
        const accessQuery = `SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?`;
        const { results: access } = await env.DB.prepare(accessQuery).bind(farmId, userId).all();
        if (!access || access.length === 0) {
          return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
        }

        query = `
          SELECT id, amount, description, date, category
          FROM finance_entries
          WHERE farm_id = ? AND type = 'income' AND date >= ? AND date <= ?
          ORDER BY date DESC
        `;
        params = [farmId, startDate, endDate];
      } else {
        // All farms for user
        query = `
          SELECT fe.id, fe.amount, fe.description, fe.date, fe.category, f.name as farm_name
          FROM finance_entries fe
          JOIN farms f ON fe.farm_id = f.id
          JOIN farm_members fm ON f.id = fm.farm_id
          WHERE fm.user_id = ? AND fe.type = 'income' AND fe.date >= ? AND fe.date <= ?
          ORDER BY fe.date DESC
        `;
        params = [userId, startDate, endDate];
      }

      const { results: incomeEntries } = await env.DB.prepare(query).bind(...params).all();
      const totalIncome = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);

      return new Response(JSON.stringify({
        type: 'income',
        period: { start_date: startDate, end_date: endDate },
        total_income: totalIncome,
        entries: incomeEntries
      }), { headers: { 'Content-Type': 'application/json' } });

    } else if (type === 'expenses') {
      // Generate expenses report
      const farmId = url.searchParams.get('farm_id');
      const startDate = url.searchParams.get('start_date') || '2024-01-01';
      const endDate = url.searchParams.get('end_date') || new Date().toISOString().split('T')[0];

      let query, params;
      if (farmId) {
        // Verify access
        const accessQuery = `SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?`;
        const { results: access } = await env.DB.prepare(accessQuery).bind(farmId, userId).all();
        if (!access || access.length === 0) {
          return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
        }

        query = `
          SELECT id, amount, description, date, category
          FROM finance_entries
          WHERE farm_id = ? AND type = 'expense' AND date >= ? AND date <= ?
          ORDER BY date DESC
        `;
        params = [farmId, startDate, endDate];
      } else {
        // All farms for user
        query = `
          SELECT fe.id, fe.amount, fe.description, fe.date, fe.category, f.name as farm_name
          FROM finance_entries fe
          JOIN farms f ON fe.farm_id = f.id
          JOIN farm_members fm ON f.id = fm.farm_id
          WHERE fm.user_id = ? AND fe.type = 'expense' AND fe.date >= ? AND fe.date <= ?
          ORDER BY fe.date DESC
        `;
        params = [userId, startDate, endDate];
      }

      const { results: expenseEntries } = await env.DB.prepare(query).bind(...params).all();
      const totalExpenses = expenseEntries.reduce((sum, entry) => sum + entry.amount, 0);

      return new Response(JSON.stringify({
        type: 'expenses',
        period: { start_date: startDate, end_date: endDate },
        total_expenses: totalExpenses,
        entries: expenseEntries
      }), { headers: { 'Content-Type': 'application/json' } });

    } else if (type === 'profit') {
      // Generate profit/loss report
      const farmId = url.searchParams.get('farm_id');
      const startDate = url.searchParams.get('start_date') || '2024-01-01';
      const endDate = url.searchParams.get('end_date') || new Date().toISOString().split('T')[0];

      let incomeQuery, expenseQuery, params;
      if (farmId) {
        // Verify access
        const accessQuery = `SELECT id FROM farm_members WHERE farm_id = ? AND user_id = ?`;
        const { results: access } = await env.DB.prepare(accessQuery).bind(farmId, userId).all();
        if (!access || access.length === 0) {
          return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
        }

        incomeQuery = `SELECT SUM(amount) as total FROM finance_entries WHERE farm_id = ? AND type = 'income' AND date >= ? AND date <= ?`;
        expenseQuery = `SELECT SUM(amount) as total FROM finance_entries WHERE farm_id = ? AND type = 'expense' AND date >= ? AND date <= ?`;
        params = [farmId, startDate, endDate];
      } else {
        // All farms for user
        incomeQuery = `
          SELECT SUM(fe.amount) as total FROM finance_entries fe
          JOIN farms f ON fe.farm_id = f.id
          JOIN farm_members fm ON f.id = fm.farm_id
          WHERE fm.user_id = ? AND fe.type = 'income' AND fe.date >= ? AND fe.date <= ?
        `;
        expenseQuery = `
          SELECT SUM(fe.amount) as total FROM finance_entries fe
          JOIN farms f ON fe.farm_id = f.id
          JOIN farm_members fm ON f.id = fm.farm_id
          WHERE fm.user_id = ? AND fe.type = 'expense' AND fe.date >= ? AND fe.date <= ?
        `;
        params = [userId, startDate, endDate];
      }

      const { results: incomeResult } = await env.DB.prepare(incomeQuery).bind(...params).all();
      const { results: expenseResult } = await env.DB.prepare(expenseQuery).bind(...params).all();

      const totalIncome = incomeResult[0]?.total || 0;
      const totalExpenses = expenseResult[0]?.total || 0;
      const netProfit = totalIncome - totalExpenses;

      return new Response(JSON.stringify({
        type: 'profit',
        period: { start_date: startDate, end_date: endDate },
        total_income: totalIncome,
        total_expenses: totalExpenses,
        net_profit: netProfit
      }), { headers: { 'Content-Type': 'application/json' } });

    } else {
      return new Response(JSON.stringify({ error: 'Report type not supported' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Finance reports API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
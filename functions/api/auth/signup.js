import { createClient } from '@supabase/supabase-js';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: 'Email, password, and name required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Mock user creation response
    const mockUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      created_at: new Date().toISOString()
    };

    return new Response(JSON.stringify({
      user: mockUser,
      message: 'User created successfully (mock response for testing)'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
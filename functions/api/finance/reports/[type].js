import { createClient } from '@supabase/supabase-js';

export async function onRequest(context) {
  const { request, env, params } = context;
  const { type } = params;
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

    const token = authHeader.substring(7);
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use service role client for database operations
    const dbClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

    if (type === 'summary') {
      const farmId = url.searchParams.get('farm_id');
      if (!farmId) {
        return new Response(JSON.stringify({ error: 'farm_id query parameter required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Verify user has access to farm
      const { data: farmAccess, error: accessError } = await dbClient
        .from('farm_members')
        .select('id')
        .eq('farm_id', farmId)
        .eq('user_id', user.id)
        .single();

      if (accessError || !farmAccess) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const startDate = url.searchParams.get('start_date') || '2024-01-01';
      const endDate = url.searchParams.get('end_date') || new Date().toISOString().split('T')[0];

      // Get finance entries for the period
      const { data: entries, error: entriesError } = await dbClient
        .from('finance_entries')
        .select('*')
        .eq('farm_id', farmId)
        .gte('entry_date', startDate)
        .lte('entry_date', endDate);

      if (entriesError) {
        console.error('Database error:', entriesError);
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

    } else {
      // Mock finance report for other types
      const mockReport = {
        type,
        period: '2024-10',
        totalIncome: type === 'income' ? 5000.00 : 0,
        totalExpenses: type === 'expenses' ? 2500.00 : 0,
        netProfit: type === 'profit' ? 2500.00 : 0,
        entries: [
          {
            id: 'entry-1',
            amount: 1500.00,
            description: 'Mock entry',
            date: '2024-10-15T00:00:00Z'
          }
        ]
      };

      return new Response(JSON.stringify(mockReport), {
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
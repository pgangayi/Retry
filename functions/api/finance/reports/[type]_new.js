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
    // TODO: Implement JWT verification for Cloudflare auth
    // For now, assume authenticated user
    const user = { id: 'temp-user' };

    // Mock finance report based on type
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

  } catch (error) {
    console.error('Finance reports API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
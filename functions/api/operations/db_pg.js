const { Client } = require('pg');

function createDbFromConnectionString(connectionString) {
  const client = new Client({ connectionString });

  return {
    connect: async () => client.connect(),
    end: async () => client.end(),
    begin: async () => { await client.query('BEGIN'); },
    commit: async () => { await client.query('COMMIT'); },
    rollback: async () => { await client.query('ROLLBACK'); },
    query: async (text, params) => client.query(text, params)
  };
}

module.exports = { createDbFromConnectionString };

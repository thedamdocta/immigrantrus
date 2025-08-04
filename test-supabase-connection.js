const { Client } = require('pg');

async function testSupabaseConnection() {
  const connectionString = 'postgresql://postgres:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvY3dobnJuZGNseHh0Y2tlampzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzgzNDcxNiwiZXhwIjoyMDY5NDEwNzE2fQ.BP5VLRn3HnUSYUQE4IgrlsFyxjf-zpnQ5ycxmrZGLCs@db.bocwhnrndclxxtckejjs.supabase.co:5432/postgres';
  
  const client = new Client({
    connectionString,
    ssl: true
  });

  try {
    console.log('🔍 Testing Supabase connection...');
    await client.connect();
    console.log('✅ Connected to Supabase successfully!');
    
    const result = await client.query('SELECT version()');
    console.log('📊 Database version:', result.rows[0].version);
    
    // Test if we can create a simple table
    await client.query(`
      CREATE TABLE IF NOT EXISTS connection_test (
        id SERIAL PRIMARY KEY,
        test_time TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Table creation test passed!');
    
    // Clean up test table
    await client.query('DROP TABLE IF EXISTS connection_test');
    console.log('🧹 Cleaned up test table');
    
    await client.end();
    console.log('🎉 Supabase connection test PASSED - ready for TwentyCRM!');
    
  } catch (error) {
    console.error('❌ Supabase connection test FAILED:');
    console.error('Error:', error.message);
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    await client.end().catch(() => {});
    process.exit(1);
  }
}

testSupabaseConnection();

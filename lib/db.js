import { neon } from '@neondatabase/serverless';

// Tüm sorgular bu nesneyle yazılır: sql`SELECT ... WHERE id = ${id}`
// ${...} içindeki değerler metne eklenmez, ayrı parametre olarak gönderilir (SQL injection koruması).
export const sql = neon(process.env.DATABASE_URL);

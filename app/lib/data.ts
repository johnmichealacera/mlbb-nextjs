import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchHeroes() {
  noStore();
  try {
    const data = await sql<any>`
      SELECT
      img_url,
      name
      FROM heroes
      ORDER BY name ASC
    `;

    const heroes = data.rows;
    return heroes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all heroes.');
  }
}
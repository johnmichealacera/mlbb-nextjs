import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 32;
export async function fetchHeroes(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {
    const data = await sql<any>`
      SELECT
      id,
      img_url,
      name
      FROM heroes
      WHERE
        heroes.name ILIKE ${`%${query}%`} OR
        heroes.role ILIKE ${`%${query}%`} OR
        heroes.release_year::text ILIKE ${`%${query}%`}
      ORDER BY name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const heroes = data.rows;
    return heroes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all heroes.');
  }
}

export async function fetchHeroesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM heroes
    WHERE
      heroes.name ILIKE ${`%${query}%`} OR
      heroes.role ILIKE ${`%${query}%`} OR
      heroes.release_year::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total page of heroes.');
  }
}
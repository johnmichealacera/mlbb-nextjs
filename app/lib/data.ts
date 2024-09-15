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
      name,
      role,
      offense,
      defense
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

export async function fetchAllHeroes() {
  noStore();
  
  try {
    const data = await sql<any>`
      SELECT
      id,
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

export function fetchCounterHeroes(heroes: any) {
  console.log('heroes', heroes);
  
  const counterHeroes = heroes
    ?.flatMap((hero: any) => hero_counters[hero])
    .filter((value: any, index: any, self: any) => self.indexOf(value) === index);

  return counterHeroes;
}


const hero_counters: any = {
  "atlas": ["Valir", "Karrie", "Diggie", "Kaja", "Akai"],
  "moskov": ["Chou", "Saber", "Natalia", "Badang", "Ling"],
  "leomord": ["Jawhead", "Chou", "Alpha", "Minsitthar", "Melissa"],
  "kadita": ["Helcurt", "Natalia", "Minsitthar", "Baxia", "Kaja"],
  "nana": ["Silvanna", "Chou", "Lancelot", "Hayabusa", "Sun"],
  "valir": ["Lancelot", "Kaja", "Akai", "Franco", "Hayabusa"],
  "baxia": ["Gusion", "Grock", "Lesley", "Harley", "Kagura"],
  "minotaur": ["Freya", "Moskov", "Aurora", "Nana", "Alpha"],
  "irithel": ["Natalia", "Freya", "Helcurt", "Kagura", "Hayabusa"],
  "lylia": ["Guinevere", "X.Borg", "Dyrroth", "Franco", "Kaja"],
  "odette": ["Guinevere", "Chou", "Kagura", "Fanny", "Franco"],
  "hanzo": ["Ling", "Natalia", "Fanny", "Aldous", "Helcurt"],
  "faramis": ["X.borg", "Lylia", "Gusion", "Wanwan", "Pharsa"],
  "badang": ["Chou", "Benedetta", "Aldous", "Edith", "Argus"],
  "karrie": ["Hayabusa", "Karina", "Chou", "Lolita", "Natalia"],
  "kimmy": ["Chou", "Aldous", "Hayabusa", "Lancelot", "Lolita"],
  "thamuz": ["X.borg", "Aldous", "Valir", "Baxia", "Cici"],
  "martis": ["Phoveus", "Kaja", "Franco", "Minsitthar", "Baxia"],
  "hilda": ["Karrie", "Dyrroth", "Valir", "Thamuz", "Baxia"],
  "aurora": ["Guinevere", "Natalia", "Hayabusa", "Chou", "Kagura"],
  "natalia": ["Saber", "Jawhead", "Hayabusa", "Khufra", "Rafaela"],
  "chang'e": ["Saber", "Chou", "Lolita", "Jawhead", "Baxia"],
  "chou": ["Silvanna", "Martis", "Phoveus", "Minsitthar", "Dyrroth"],
  "selena": ["Wanwan", "Saber", "Benedetta", "Diggie", "Valir"],
  "jawhead": ["Kagura", "Sun", "Fanny", "Martis", "Valir"],
  "khufra": ["Baxia", "Minsitthar", "Wanwan", "Valir", "Diggie"],
  "roger": ["Alucard", "Aurora", "Jawhead", "Martis", "Silvanna"],
  "lancelot": ["Fanny", "Grock", "Saber", "Argus", "Yin"],
  "kagura": ["Gusion", "Zilong", "Alucard", "Akai", "Hayabusa"],
  "tigreal": ["Nana", "Martis", "Eudora", "Valir", "Baxia"],
  "bruno": ["Moskov", "Alpha", "Freya", "Karrie", "Karina"],
  "mathilda": ["Baxia", "Franco", "Wanwan", "Vale", "Badang"],
  "kaja": ["Ling", "Hayabusa", "Chou", "Franco", "Khufra"],
  "guinevere": ["Grock", "Esmeralda", "Wanwan", "X.borg", "Badang"],
  "rafaela": ["Natalia", "Saber", "Selena", "Hayabusa", "Aldous"],
  "hanabi": ["Franco", "Saber", "Chou", "Karina", "Natalia"],
  "miya": ["Baxia", "Karina", "Zilong", "Chou", "Natalia"],
  "johnson": ["Karrie", "Lesley", "Lancelot", "Baxia", "Hayabusa"],
  "gatotkaca": ["Karrie", "Lunox", "Gusion", "Gord", "Valir"],
  "ixia": ["Natalia", "Karina", "Selena", "Franco", "Chou"],
  "cici": ["Chou", "Jawhead", "Thamuz", "Khufra", "Jawhead"],
  "julian": ["Selena", "Hayabusa", "Lunox", "Wanwan", "Badang"],
  "melissa": ["Valir", "Lancelot", "Karina", "Hayabusa", "Natalia"],
  "xavier": ["Natalia", "Chou", "Hayabusa", "Selena", "Khufra"],
  "edith": ["Benedetta", "Argus", "Dyrroth", "Lancelot", "Wanwan"],
  "yin": ["Fanny", "Harley", "Lancelot", "Hayabusa", "Ling"],
  "valentina": ["Karina", "Selena", "Hayabusa", "Chou", "Natalia"],
  "aamon": ["Valir", "Selena", "Diggie", "Jawhead", "Khufra"],
  "floryn": ["Baxia", "Valir", "Silvanna", "Gusion", "Thamuz"],
  "natan": ["Saber", "Chou", "Lancelot", "Hayabusa", "Helcurt"],
  "aulus": ["Saber", "Chou", "Lancelot", "Kaja", "Karina"],
  "granger": ["Karina", "Saber", "Lancelot", "Jawhead", "Hayabusa"],
  "benedetta": ["Jawhead", "Chou", "Minsitthar", "Kaja", "Akai"],
  "brody": ["Chou", "Saber", "Lancelot", "Helcurt", "Kagura"],
  "paquito": ["Valir", "Selena", "Saber", "Kaja", "Lunox"],
  "alice": ["Valir", "Saber", "Karina", "Gusion", "Harley"],
  "esmeralda": ["Karrie", "X.borg", "Badang", "Minsitthar", "Thamuz"],
  "wanwan": ["Selena", "Saber", "Lancelot", "Karina", "Hayabusa"],
  "diggie": ["Kimmy", "Franco", "Lancelot", "Khufra", "Harley"],
  "novaria": ["Chou", "Selena", "Benedetta", "Hayabusa", "Ling"],
  "arlott": ["Wanwan", "Silvanna", "Esmeralda", "Aulus", "Sun"],
  "chip": ["Hayabusa", "Kagura", "Selena", "Chou", "Natalia"],
  "yisunshin": ["Chou", "Helcurt", "Ling", "Lancelot", "Karina"],
  "eudora": ["Grock", "Helcurt", "Chou", "Fanny", "Natalia"],
  "sun": ["Chou", "Fanny", "Gusion", "Esmeralda", "Hayabusa"],
  "popol": ["Hayabusa", "Natalia", "Chou", "Benedetta", "Selena"],
  "lapulapu": ["Badang", "Franco", "Wanwan", "Khufra", "Thamuz"],
  "franco": ["Baxia", "Badang", "Uranus", "Kaja", "Hylos"],
  "pharsa": ["Gusion", "Ling", "Fanny", "Natalia", "Hayabusa"],
  "barats": ["Gusion", "Lancelot", "Hayabusa", "Selena", "Karina"],
  "alpha": ["Grock", "Jawhead", "Franco", "Dyrroth", "Khufra"],
  "dyrroth": ["Khufra", "Akai", "Badang", "Silvanna", "Kaja"],
  "masha": ["Chou", "Khufra", "Badang", "Franco", "Kaja"],
  "minsitthar": ["Baxia", "Franco", "Wanwan", "Valir", "Chang'e"],
  "gord": ["Chou", "Jawhead", "Benedetta", "Selena", "Hayabusa"],
  "terizla": ["Minsitthar", "Chou", "Valir", "Akai", "Thamuz"],
  "vexana": ["Chou", "Jawhead", "Selena", "Fanny", "Hayabusa"],
  "hylos": ["Thamuz", "Badang", "Minsitthar", "Silvanna", "Baxia"],
  "silvanna": ["X.borg", "Baxia", "Thamuz", "Chou", "Jawhead"],
  "layla": ["Chou", "Hayabusa", "Natalia", "Saber", "Jawhead"],
  "lesley": ["Saber", "Hayabusa", "Karina", "Chou", "Franco"],
  "zhask": ["Chou", "Jawhead", "Selena", "Fanny", "Hayabusa"],
  "helcurt": ["Saber", "Chou", "Khufra", "Jawhead", "Benedetta"],
  "phoveus": ["Valir", "Baxia", "Franco", "Selena", "Harith"],
  "ling": ["Khufra", "Franco", "Saber", "Jawhead", "Baxia"],
  "claude": ["Saber", "Karina", "Chou", "Helcurt", "Franco"],
  "hayabusa": ["Saber", "Khufra", "Jawhead", "Benedetta", "Franco"],
  "beatrix": ["Hayabusa", "Chou", "Karina", "Natalia", "Saber"],
  "gusion": ["Khufra", "Saber", "Selena", "Jawhead", "Franco"],
  "gloo": ["Thamuz", "Badang", "X.borg", "Esmeralda", "Silvanna"],
  "yve": ["Khufra", "Chou", "Franco", "Hayabusa", "Ling"],
  "zilong": ["Chou", "Khufra", "Thamuz", "Aldous", "Valir"],
  "estes": ["Saber", "Chou", "Lancelot", "Karina", "Baxia"],
  "harley": ["Khufra", "Ling", "Chou", "Valir", "Kaja"],
  "aldous": ["Chou", "Khufra", "Thamuz", "Franco", "Gusion"],
  "luoyi": ["Ling", "Selena", "Gusion", "Jawhead", "Franco"],
  "angela": ["Chou", "Khufra", "Saber", "Natalia", "Helcurt"],
  "alucard": ["Chou", "Khufra", "Aldous", "Valir", "X.borg"],
  "uranus": ["Karrie", "Dyrroth", "Lunox", "Badang", "Baxia"],
  "saber": ["Akai", "Khufra", "Fanny", "Jawhead", "Franco"],
  "yu zhong": ["Minsitthar", "X.borg", "Thamuz", "Baxia", "Khufra"],
  "cyclops": ["Khufra", "Hayabusa", "Saber", "Franco", "Jawhead"],
  "ruby": ["Chou", "Jawhead", "Valir", "Minsitthar", "Lunox"],
  "fanny": ["Saber", "Khufra", "Franco", "Jawhead", "Ling"],
  "karina": ["Saber", "Jawhead", "Chou", "Khufra", "Selena"],
  "cecilion": ["Khufra", "Chou", "Hayabusa", "Selena", "Gusion"],
  "bane": ["Khufra", "Selena", "Gusion", "Ling", "Hayabusa"],
  "balmond": ["Esmeralda", "X.borg", "Silvanna", "Thamuz", "Badang"],
  "freya": ["Khufra", "Gusion", "Selena", "Valir", "Chou"],
  "lolita": ["Kimmy", "Gusion", "Selena", "Khufra", "Chou"],
  "belerick": ["Gusion", "Selena", "Jawhead", "Badang", "Kimmy"],
  "carmilla": ["Khufra", "Jawhead", "Chou", "Selena", "Hayabusa"],
  "lunox": ["Khufra", "Hayabusa", "Gusion", "Selena", "Chou"],
  "harith": ["Chou", "Khufra", "Franco", "Selena", "Hayabusa"],
  "x.borg": ["Thamuz", "Esmeralda", "Uranus", "Baxia", "Silvanna"],
  "akai": ["Kimmy", "Khufra", "Ling", "Lancelot", "Hayabusa"],
  "grock": ["Khufra", "Baxia", "Valir", "Chou", "Selena"],
  "khaleed": ["Kimmy", "Esmeralda", "Jawhead", "Thamuz", "Baxia"],
  "argus": ["Chou", "Khufra", "Valir", "Badang", "Karina"],
  "clint": ["Chou", "Hayabusa", "Helcurt", "Karina", "Saber"],
  "vale": ["Natalia", "Chou", "Hayabusa", "Ling", "Saber"]
}

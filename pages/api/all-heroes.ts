import { fetchAllHeroes } from '@/app/lib/data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const heroes = await fetchAllHeroes();
    res.status(200).json(heroes);
  } catch (error) {
    console.error('Failed to fetch heroes:', error);
    res.status(500).json({ message: 'Failed to fetch heroes' });
  }
}

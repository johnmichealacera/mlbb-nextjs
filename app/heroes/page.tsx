import Image from 'next/image';
import { fetchHeroes, fetchHeroesPages } from '../lib/data';
import Pagination from '../ui/pagination';

export default async function Page({ searchParams }: { searchParams: { query: string, page: number } }) {
  const query = searchParams.query ?? '';
  const page = searchParams.page ?? 1;
  const totalPages = await fetchHeroesPages(query);
  const heroes = await fetchHeroes(query, page);
  
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-8">
        {heroes.map((hero) => (
              <div key={hero.id} className="rounded-lg overflow-hidden">
              <a href="#" className="block relative">
                <Image
                  alt={hero?.name}
                  src={hero.img_url ? hero?.img_url : 'https://via.placeholder.com/500x300'}
                  className="rounded-lg"
                  height={400}
                  width={300}
                />
                <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity opacity-0 hover:opacity-100">
                  <p className="text-white font-semibold">{hero?.name}</p>
                </div>
              </a>
            </div>
            ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
    </div>
  );
}

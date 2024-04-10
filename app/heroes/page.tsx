import Image from 'next/image';
import { fetchHeroes } from '../lib/data';

export default async function Page() {
  const heroes = await fetchHeroes();
  console.log('heroes', heroes);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-8">
      {heroes.map((hero) => (
            <div key={hero.img_url} className="rounded-lg overflow-hidden">
            <a href="#" className="block relative">
              <Image
                alt={hero?.name}
                src={hero.img_url ? hero?.img_url : 'https://via.placeholder.com/500x300'}
                objectFit="cover"
                className="rounded-lg"
                height={400}
                width={300}
              />
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity opacity-0 hover:opacity-100">
                <p className="text-white font-semibold">View Details</p>
              </div>
            </a>
          </div>
          ))}
    </div>
  );
}

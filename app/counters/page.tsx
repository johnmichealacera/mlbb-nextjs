'use client'

import { useState, useEffect } from "react";
import { fetchAllHeroes, fetchCounterHeroes } from "../lib/data";

export default function Page() {
  const [allHeroes, setAllHeroes] = useState([]);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [counterHeroes, setCounterHeroes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/all-heroes');
      const jsonData = await response.json();
      
      setAllHeroes(jsonData);
    }
    fetchData();
  }, []);

  const handleHeroSelect = (event: any) => {
    const selectedHero = event.target.value.toLowerCase();
    console.log('I was clicked');
    // Check if selectedHero is not already in selectedHeroes
    if (!selectedHeroes.includes(selectedHero)) {
      setSelectedHeroes([...selectedHeroes, selectedHero]);
    }
  };

  useEffect(() => {
      const counterHeroesResult = fetchCounterHeroes(selectedHeroes);
      setCounterHeroes(counterHeroesResult);
    // }
    
  }, [selectedHeroes]);
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Hero Counter page</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-lg">
        {/* Select dropdowns */}
        {['Exp', 'Jungle', 'Mid', 'Tank', 'Gold'].map((role, index) => (
          <div key={index} className="flex flex-col">
            <label htmlFor={role.toLowerCase()} className="mb-1">{role}</label>
            <select
              id={role.toLowerCase()}
              name={role.toLowerCase()}
              onChange={handleHeroSelect}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-none placeholder-gray-500"
              required
            >
              <option value="">Select hero...</option>
              {allHeroes.map((hero, index) => (
                <option key={index} value={hero.name}>{hero.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold mb-2">Hero Counter Suggestion:</p>
        <ul className="list-disc list-inside">
          {counterHeroes.map((hero, index) => (
            <li key={index}>{hero}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
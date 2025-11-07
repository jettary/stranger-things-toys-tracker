'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Toy {
  id: number;
  name: string;
  series: string;
  rarity: string;
  imageUrl: string;
}

export default function Home() {
  const [toys, setToys] = useState<Toy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchToys = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/toys');
        setToys(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching toys:', err);
        setError('Failed to load toys. Please try again later.');
        setLoading(false);
      }
    };

    fetchToys();
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">Stranger Things Toys Collection</h2>
      
      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading toys...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!loading && !error && toys.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No toys found in your collection.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toys.map((toy) => (
          <div key={toy.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              {toy.imageUrl ? (
                <img 
                  src={toy.imageUrl} 
                  alt={toy.name} 
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{toy.name}</h3>
              <p className="text-gray-600 mb-1">Series: {toy.series}</p>
              <p className="text-gray-600">
                Rarity: 
                <span className={
                  toy.rarity === 'Common' ? 'text-green-600' : 
                  toy.rarity === 'Uncommon' ? 'text-blue-600' : 
                  toy.rarity === 'Rare' ? 'text-purple-600' : 
                  'text-yellow-600'
                }> {toy.rarity}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
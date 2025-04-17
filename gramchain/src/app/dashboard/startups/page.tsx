'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Startup {
  id: string;
  name: string;
  description: string;
  industry: string;
  stage: string;
  fundingNeeded: string;
  teamSize: string;
  createdAt: string;
}

export default function StartupsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // TODO: Fetch startups from your backend
    // This is a placeholder for demonstration
    const fetchStartups = async () => {
      try {
        // Replace with actual API call
        const mockStartups: Startup[] = [
          {
            id: '1',
            name: 'TechInnovate',
            description: 'AI-powered business analytics platform',
            industry: 'Technology',
            stage: 'Seed',
            fundingNeeded: '$500,000',
            teamSize: '5-10',
            createdAt: '2024-03-15',
          },
          // Add more mock data as needed
        ];
        setStartups(mockStartups);
      } catch (error) {
        console.error('Error fetching startups:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Startups</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search startups..."
            className="px-4 py-2 border rounded-lg"
          />
          <select className="px-4 py-2 border rounded-lg">
            <option value="">All Industries</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <div key={startup.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{startup.name}</h2>
            <p className="text-gray-600 mb-4">{startup.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Industry:</span>
                <span className="font-medium">{startup.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Stage:</span>
                <span className="font-medium">{startup.stage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Funding Needed:</span>
                <span className="font-medium">{startup.fundingNeeded}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Team Size:</span>
                <span className="font-medium">{startup.teamSize}</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/dashboard/startups/${startup.id}`)}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 
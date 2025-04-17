'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: 'investor' | 'entrepreneur' | 'mixed';
  createdAt: string;
}

export default function CommunitiesPage() {
  const { user, loading, userData } = useAuth();
  const router = useRouter();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    } else if (user && !userData?.onboardingCompleted) {
      router.push('/onboarding');
    }
  }, [user, loading, router, userData]);

  useEffect(() => {
    // TODO: Fetch communities from your backend
    // This is a placeholder for demonstration
    const fetchCommunities = async () => {
      try {
        // Replace with actual API call
        const mockCommunities: Community[] = [
          {
            id: '1',
            name: 'Tech Investors Network',
            description: 'A community for tech investors to share insights and opportunities',
            memberCount: 150,
            type: 'investor',
            createdAt: '2024-03-15',
          },
          {
            id: '2',
            name: 'Startup Founders Hub',
            description: 'Connect with fellow entrepreneurs and share experiences',
            memberCount: 200,
            type: 'entrepreneur',
            createdAt: '2024-03-14',
          },
          {
            id: '3',
            name: 'Innovation Exchange',
            description: 'A mixed community for investors and entrepreneurs to collaborate',
            memberCount: 300,
            type: 'mixed',
            createdAt: '2024-03-13',
          },
        ];
        setCommunities(mockCommunities);
      } catch (error) {
        console.error('Error fetching communities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !userData) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Communities</h1>
        {userData.role === 'investor' && (
          <button
            onClick={() => router.push('/dashboard/create-community')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Community
          </button>
        )}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search communities..."
          className="px-4 py-2 border rounded-lg flex-1"
        />
        <select className="px-4 py-2 border rounded-lg">
          <option value="">All Types</option>
          <option value="investor">Investor Communities</option>
          <option value="entrepreneur">Entrepreneur Communities</option>
          <option value="mixed">Mixed Communities</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <div key={community.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{community.name}</h2>
            <p className="text-gray-600 mb-4">{community.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium capitalize">{community.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Members:</span>
                <span className="font-medium">{community.memberCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Created:</span>
                <span className="font-medium">{community.createdAt}</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/dashboard/communities/${community.id}`)}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Join Community
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 
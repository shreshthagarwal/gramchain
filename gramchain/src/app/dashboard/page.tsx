'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading, userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    } else if (user && !userData?.onboardingCompleted) {
      router.push('/onboarding');
    }
  }, [user, loading, router, userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !userData) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {user.displayName || 'User'}!</h1>
      
      {userData.role === 'investor' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Available Startups</h2>
            <p className="text-gray-600 mb-4">Browse and discover promising startups to invest in.</p>
            <button
              onClick={() => router.push('/dashboard/startups')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Startups
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">My Communities</h2>
            <p className="text-gray-600 mb-4">Connect with other investors and share insights.</p>
            <button
              onClick={() => router.push('/dashboard/my-communities')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Communities
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create Community</h2>
            <p className="text-gray-600 mb-4">Start a new community for investors.</p>
            <button
              onClick={() => router.push('/dashboard/create-community')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Community
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">My Startups</h2>
            <p className="text-gray-600 mb-4">Manage your startup listings and track investor interest.</p>
            <button
              onClick={() => router.push('/dashboard/my-startups')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View My Startups
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create Startup</h2>
            <p className="text-gray-600 mb-4">List your startup to attract investors.</p>
            <button
              onClick={() => router.push('/dashboard/create-startup')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Startup
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Communities</h2>
            <p className="text-gray-600 mb-4">Join investor communities to network and learn.</p>
            <button
              onClick={() => router.push('/dashboard/communities')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Communities
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/lib/auth';
import ClientOnly from '@/components/ClientOnly';

export default function Onboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = async (role: 'investor' | 'entrepreneur') => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await updateUserProfile({
        role,
        onboardingCompleted: false // Set to false until they complete the role-specific form
      });

      if (error) {
        setError(error);
        return;
      }

      // Redirect to role-specific onboarding page
      router.push(`/onboarding/${role}`);
    } catch (err) {
      setError('Failed to update role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Choose Your Role</h2>
            <p className="mt-2 text-sm text-gray-600">
              Select how you want to use GramChain
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <button
              onClick={() => handleRoleSelect('investor')}
              disabled={loading}
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">Investor</span>
              <span className="mt-1 block text-sm text-gray-500">
                I want to invest in promising startups
              </span>
            </button>

            <button
              onClick={() => handleRoleSelect('entrepreneur')}
              disabled={loading}
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">Entrepreneur</span>
              <span className="mt-1 block text-sm text-gray-500">
                I want to raise funding for my startup
              </span>
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
} 
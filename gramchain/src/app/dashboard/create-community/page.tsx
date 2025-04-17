'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CommunityForm {
  name: string;
  description: string;
  type: 'investor' | 'entrepreneur' | 'mixed';
  rules: string;
  isPrivate: boolean;
}

export default function CreateCommunityPage() {
  const { user, loading, userData } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CommunityForm>({
    name: '',
    description: '',
    type: 'investor',
    rules: '',
    isPrivate: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    } else if (user && !userData?.onboardingCompleted) {
      router.push('/onboarding');
    } else if (userData && userData.role !== 'investor') {
      router.push('/dashboard/communities');
    }
  }, [user, loading, router, userData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Implement actual API call to create community
      console.log('Creating community:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      router.push('/dashboard/communities');
    } catch (error) {
      console.error('Error creating community:', error);
      setError('Failed to create community. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !userData || userData.role !== 'investor') {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Create Community</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Community Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Community Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="investor">Investor Community</option>
            <option value="entrepreneur">Entrepreneur Community</option>
            <option value="mixed">Mixed Community</option>
          </select>
        </div>

        <div>
          <label htmlFor="rules" className="block text-sm font-medium text-gray-700">
            Community Rules
          </label>
          <textarea
            id="rules"
            name="rules"
            value={formData.rules}
            onChange={handleInputChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPrivate"
            name="isPrivate"
            checked={formData.isPrivate}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-700">
            Private Community (Requires approval to join)
          </label>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Community'}
        </button>
      </form>
    </div>
  );
} 
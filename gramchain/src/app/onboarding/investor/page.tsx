'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/lib/auth';
import ClientOnly from '@/components/ClientOnly';

export default function InvestorOnboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    investmentRange: '',
    preferredIndustries: [] as string[],
    investmentExperience: '',
    linkedInProfile: '',
    investmentHistory: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await updateUserProfile({
        role: 'investor',
        onboardingCompleted: true,
        investorProfile: formData
      });

      if (error) {
        setError(error);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('Failed to save investor profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Complete Your Investor Profile</h2>
            <p className="mt-2 text-sm text-gray-600">
              Tell us more about your investment preferences and experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label htmlFor="investmentRange" className="block text-sm font-medium text-gray-700">
                Investment Range
              </label>
              <select
                id="investmentRange"
                name="investmentRange"
                value={formData.investmentRange}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select an option</option>
                <option value="0-50k">$0 - $50,000</option>
                <option value="50k-200k">$50,000 - $200,000</option>
                <option value="200k-500k">$200,000 - $500,000</option>
                <option value="500k+">$500,000+</option>
              </select>
            </div>

            <div>
              <label htmlFor="investmentExperience" className="block text-sm font-medium text-gray-700">
                Investment Experience
              </label>
              <textarea
                id="investmentExperience"
                name="investmentExperience"
                rows={3}
                value={formData.investmentExperience}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Tell us about your investment experience..."
                required
              />
            </div>

            <div>
              <label htmlFor="linkedInProfile" className="block text-sm font-medium text-gray-700">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                id="linkedInProfile"
                name="linkedInProfile"
                value={formData.linkedInProfile}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="https://linkedin.com/in/your-profile"
                required
              />
            </div>

            <div>
              <label htmlFor="investmentHistory" className="block text-sm font-medium text-gray-700">
                Investment History
              </label>
              <textarea
                id="investmentHistory"
                name="investmentHistory"
                rows={4}
                value={formData.investmentHistory}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Describe your past investments and their outcomes..."
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ClientOnly>
  );
} 
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PreferencesSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    theme: 'light',
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // TODO: Implement preferences update logic
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/onboarding/connect');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred while updating your preferences');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 text-gray-900">Preferences</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Customize your experience with GramChain.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
          <div className="space-y-4">
            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id="email-notifications"
                  name="email-notifications"
                  type="checkbox"
                  checked={formData.notifications.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        email: e.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="email-notifications" className="font-medium text-gray-900">
                  Email notifications
                </label>
                <p className="text-gray-500">Receive updates about your account via email.</p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id="push-notifications"
                  name="push-notifications"
                  type="checkbox"
                  checked={formData.notifications.push}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        push: e.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="push-notifications" className="font-medium text-gray-900">
                  Push notifications
                </label>
                <p className="text-gray-500">Receive push notifications in your browser.</p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id="marketing-notifications"
                  name="marketing-notifications"
                  type="checkbox"
                  checked={formData.notifications.marketing}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        marketing: e.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="marketing-notifications" className="font-medium text-gray-900">
                  Marketing communications
                </label>
                <p className="text-gray-500">Receive updates about new features and promotions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Appearance</h3>
          <div>
            <label htmlFor="theme" className="block text-sm font-medium leading-6 text-gray-900">
              Theme
            </label>
            <select
              id="theme"
              name="theme"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Regional</h3>
          <div>
            <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
              Language
            </label>
            <select
              id="language"
              name="language"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium leading-6 text-gray-900">
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
} 
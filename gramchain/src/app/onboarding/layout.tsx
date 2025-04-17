'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const steps = [
  { name: 'Welcome', path: '/onboarding' },
  { name: 'Profile Setup', path: '/onboarding/profile' },
  { name: 'Preferences', path: '/onboarding/preferences' },
  { name: 'Connect Accounts', path: '/onboarding/connect' },
];

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepIndex = steps.findIndex((step) => step.path === pathname);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Progress bar */}
          <nav aria-label="Progress" className="py-8">
            <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
              {steps.map((step, index) => (
                <li key={step.name} className="md:flex-1">
                  <div
                    className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                      index <= currentStep
                        ? 'border-indigo-600'
                        : 'border-gray-200'
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        index <= currentStep ? 'text-indigo-600' : 'text-gray-500'
                      }`}
                    >
                      Step {index + 1}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        index <= currentStep ? 'text-indigo-600' : 'text-gray-500'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* Main content */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 
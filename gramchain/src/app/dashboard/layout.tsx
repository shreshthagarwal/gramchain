'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { logOut } from '@/lib/firebase';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const investorLinks = [
    { href: '/dashboard/startups', label: 'Available Startups' },
    { href: '/dashboard/my-startups', label: 'My Startups' },
    { href: '/dashboard/communities', label: 'Available Communities' },
    { href: '/dashboard/my-communities', label: 'My Communities' },
    { href: '/dashboard/create-community', label: 'Create Community' },
    { href: '/dashboard/profile', label: 'Profile' },
  ];

  const entrepreneurLinks = [
    { href: '/dashboard/create-startup', label: 'Create Startup' },
    { href: '/dashboard/my-startups', label: 'My Startups' },
    { href: '/dashboard/communities', label: 'Available Communities' },
    { href: '/dashboard/profile', label: 'Profile' },
  ];

  const links = user.role === 'investor' ? investorLinks : entrepreneurLinks;

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/auth/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } bg-white shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">GramChain</h2>
          <p className="text-sm text-gray-600 capitalize">{user.role}</p>
        </div>
        <nav className="mt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-4 p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
} 
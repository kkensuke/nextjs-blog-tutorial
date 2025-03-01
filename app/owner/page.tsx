"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card/card';
import { useRouter } from 'next/navigation';
import { 
  BarChart3,
  FileText,
  Settings,
  Users,
  Tag,
  LogOut,
  X,
  Plus
} from 'lucide-react';
import PostEditor from './posts/editor';
import Loading from '@/components/common/Loading';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { API } from '@/config/constants';

export default function OwnerDashboard() {
  const router = useRouter();
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalTags: 0,
    totalViews: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(API.BLOG.STATS);
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setError('Failed to load dashboard statistics');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('An error occurred while fetching statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(API.AUTH.LOGOUT, {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshStats = () => {
    fetchStats();
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto mt-16 max-w-screen-xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Owner Dashboard</h1>
            <p className="mt-2 text-slate-600">Manage your website settings and content</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
            >
              <LogOut size={16} />
              Logout
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative rounded-lg border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Website Statistics</h2>
            <button 
              onClick={refreshStats}
              className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${isLoading ? 'animate-spin' : ''}`}
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
              <p>{error}</p>
              <button 
                onClick={fetchStats}
                className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {isLoading ? (
            <Loading 
              fullWidth 
              text="Loading dashboard statistics..." 
              variant="primary"
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-full bg-blue-100 p-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Posts</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.totalPosts}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-full bg-green-100 p-3">
                    <Tag className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Tags</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.totalTags}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-full bg-purple-100 p-3">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Views</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.totalViews}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-full bg-orange-100 p-3">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Users</p>
                    <h3 className="text-2xl font-bold text-slate-800">{stats.totalUsers}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        
        <div className="mx-auto mt-16 mb-4 max-w-screen-md">
          <button 
            onClick={() => setShowPostEditor(!showPostEditor)}
            className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-200"
          >
            {showPostEditor ? <><X    size={16} /> Close Post Editor</> 
                            : <><Plus size={16} /> Create New Post</>}
          </button>
        </div>

        {/* Post Editor */}
        {showPostEditor && (
          <div className="mx-auto mb-24 max-w-screen-md">
            <ErrorBoundary>
              <PostEditor />
            </ErrorBoundary>
          </div>
        )}
        
      </div>
    </ErrorBoundary>
  );
}
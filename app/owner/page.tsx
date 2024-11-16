"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { 
  BarChart3,
  FileText,
  Settings,
  Users,
  Tag,
  ShieldCheck,
  LogOut,
  Plus
} from 'lucide-react';
import PostEditor from './PostEditor';

export default function OwnerDashboard() {
  const router = useRouter();
  const [showPostEditor, setShowPostEditor] = useState(false);
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
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
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

  return (
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
      
      <div className="mx-auto mt-16 mb-4 max-w-screen-md">
        <button 
          onClick={() => setShowPostEditor(!showPostEditor)}
          className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-200"
        >
          {/* <Plus size={16} /> */}
          {showPostEditor ? 'Close Editor' : 'New Post'}
        </button>
      </div>

      {/* Post Editor */}
      {showPostEditor && (
        <div className="mx-auto mb-24 max-w-screen-md">
          <PostEditor />
        </div>
      )}
      
    </div>
  );
}

import React from 'react';
import { LayoutDashboard, MessageSquareText, Map, Sparkles, Mic2, Users, Settings } from 'lucide-react';

export const COLORS = {
  primary: '#8b5cf6', // Violet 500
  secondary: '#ec4899', // Pink 500
  accent: '#f59e0b', // Amber 500
  background: '#f8fafc',
};

export const NAV_LINKS = [
  { name: 'Home', path: '#home' },
  { name: 'Features', path: '#features' },
  { name: 'How It Works', path: '#how-it-works' },
  { name: 'Community', path: '#community' },
  { name: 'Pricing', path: '#pricing' },
];

export const DASHBOARD_NAV = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'AI Coach', path: '/dashboard/coach', icon: <MessageSquareText className="w-5 h-5" /> },
  { name: 'Career Plan', path: '/dashboard/plan', icon: <Map className="w-5 h-5" /> },
  { name: 'Artifacts', path: '/dashboard/artifacts', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Interview Lab', path: '/dashboard/interview', icon: <Mic2 className="w-5 h-5" /> },
  { name: 'Community', path: '/dashboard/community', icon: <Users className="w-5 h-5" /> },
  { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
];

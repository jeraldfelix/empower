
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User as UserIcon } from 'lucide-react';
import { DASHBOARD_NAV } from '../constants';
import { useApp } from '../App';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:block
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <Link to="/" className="p-6 border-b border-slate-100 flex items-center gap-3 group hover:bg-slate-50 transition-colors">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">E</div>
            <span className="font-serif text-xl font-bold text-slate-800">EmpowerHer</span>
          </Link>

          <nav className="flex-1 p-4 space-y-2">
            {DASHBOARD_NAV.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-violet-50 text-violet-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 border border-pink-200">
                {user?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{user?.careerStage}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button 
            className="p-2 -ml-2 text-slate-600 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <h1 className="text-xl font-semibold text-slate-800 lg:block hidden">
            {DASHBOARD_NAV.find(n => n.path === location.pathname)?.name || 'Dashboard'}
          </h1>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

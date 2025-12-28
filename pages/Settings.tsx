
import React from 'react';
import { useApp } from '../App';
import { User, Bell, Shield, Key, HelpCircle, LogOut } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500">Manage your profile and account preferences.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-violet-100 flex items-center justify-center text-3xl font-bold text-violet-700 border-4 border-white shadow-lg">
            {user?.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{user?.name}</h3>
            <p className="text-slate-500 mb-4">{user?.industry} • {user?.careerStage}</p>
            <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors">Change Photo</button>
          </div>
        </div>

        <div className="p-4">
          {[
            { icon: <User className="w-5 h-5" />, title: 'Personal Information', desc: 'Update your career stage, industry, and goals.' },
            { icon: <Bell className="w-5 h-5" />, title: 'Notifications', desc: 'Manage alerts for coach tasks and community messages.' },
            { icon: <Shield className="w-5 h-5" />, title: 'Privacy & Safety', desc: 'Control who can see your community activity.' },
            { icon: <Key className="w-5 h-5" />, title: 'Account Security', desc: 'Change your password and manage active sessions.' },
            { icon: <HelpCircle className="w-5 h-5" />, title: 'Support & Feedback', desc: 'Get help or share your thoughts with us.' },
          ].map((item, i) => (
            <button key={i} className="flex items-center gap-4 w-full p-4 hover:bg-slate-50 transition-colors rounded-2xl group text-left">
              <div className="p-3 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
              <div className="text-slate-300 group-hover:text-slate-400 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-4 w-full p-4 text-red-500 hover:bg-red-50 transition-colors rounded-2xl font-bold">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </div>
      
      <div className="flex justify-center">
        <p className="text-xs text-slate-400 font-medium italic">Version 1.0.4 MVP • Proudly EmpowerHer Coach</p>
      </div>
    </div>
  );
};

export default Settings;

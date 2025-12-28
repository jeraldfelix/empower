
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { Sparkles, ArrowUpRight, Clock, CheckCircle2, RefreshCw, Lightbulb, TrendingUp, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getQuickTip } from '../services/gemini';

const data = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 68 },
  { name: 'Wed', score: 72 },
  { name: 'Thu', score: 70 },
  { name: 'Fri', score: 85 },
  { name: 'Sat', score: 88 },
  { name: 'Sun', score: 92 },
];

const DashboardHome: React.FC = () => {
  const { user } = useApp();
  const [tip, setTip] = useState("Focus on quantifying your impact today. Use numbers to tell your story.");
  const [isRefreshingTip, setIsRefreshingTip] = useState(false);

  const refreshTip = async () => {
    setIsRefreshingTip(true);
    try {
      const newTip = await getQuickTip(user?.careerStage || "professional woman");
      setTip(newTip || tip);
    } catch (error) {
      console.error("Failed to fetch quick tip", error);
    } finally {
      setIsRefreshingTip(false);
    }
  };

  useEffect(() => {
    refreshTip();
  }, [user]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user?.name}! ✨</h2>
          <p className="text-slate-600 max-w-md">You're on track with your Week 2 goals. Your "Interview Readiness" score has increased by 12% this week.</p>
          <div className="mt-6 flex gap-3">
            <button className="bg-violet-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-violet-700 transition-all flex items-center gap-2 shadow-lg shadow-violet-100">
              Continue Roadmap <ArrowUpRight className="w-4 h-4" />
            </button>
            <button className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-all">
              View Analytics
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-soft-gradient -z-0 rounded-l-[100px] hidden md:block" />
        <div className="relative z-10 bg-white p-5 rounded-2xl border border-slate-100 shadow-xl w-full md:w-72">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <Lightbulb className="w-4 h-4 text-amber-500" />
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Coach Tip</p>
             </div>
             <button 
               onClick={refreshTip}
               disabled={isRefreshingTip}
               className="p-1 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-violet-600 transition-colors"
             >
               <RefreshCw className={`w-3 h-3 ${isRefreshingTip ? 'animate-spin' : ''}`} />
             </button>
           </div>
           <p className={`text-sm text-slate-700 italic leading-relaxed transition-opacity duration-300 ${isRefreshingTip ? 'opacity-50' : 'opacity-100'}`}>
             "{tip}"
           </p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Readiness Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-violet-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Growth Velocity</h3>
            </div>
            <select className="bg-slate-50 border-none text-sm font-bold rounded-xl px-4 py-2 text-slate-600">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 0 }} 
                  activeDot={{ r: 8, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Personalized Insights */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-lg relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 rounded-full -mr-16 -mt-16 blur-2xl transition-all group-hover:scale-110" />
            <Sparkles className="w-8 h-8 text-violet-400 mb-4" />
            <h4 className="text-xl font-bold mb-2">Resume Scan</h4>
            <p className="text-slate-400 text-sm mb-6">Upload your resume to get instant AI feedback on gender-coded language and impact.</p>
            <div className="flex items-center gap-2 text-violet-400 font-bold text-sm">
              Launch Scanner <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-pink-50 rounded-xl">
                 <Zap className="w-5 h-5 text-pink-600" />
               </div>
               <h4 className="text-lg font-bold text-slate-800">Priority Tasks</h4>
            </div>
            <div className="space-y-5">
              {[
                { title: 'Update LinkedIn Headline', status: 'pending', color: 'bg-violet-500' },
                { title: 'Mock Interview: Culture Fit', status: 'pending', color: 'bg-amber-500' },
                { title: 'Draft Value Proposition', status: 'done', color: 'bg-green-500' },
              ].map((task, i) => (
                <div key={i} className="flex items-start gap-4 group cursor-pointer">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${task.status === 'done' ? 'bg-slate-200' : task.color}`} />
                  <div className="flex-1">
                    <p className={`font-bold text-sm leading-tight ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{task.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{task.status}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border border-slate-100 rounded-2xl text-slate-600 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
              Go to Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

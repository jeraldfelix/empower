
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { generateCareerPlan } from '../services/gemini';
import { RoadmapStep } from '../types';
import { CheckCircle2, Circle, Trophy, Calendar, Sparkles } from 'lucide-react';

const CareerPlan: React.FC = () => {
  const { user } = useApp();
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const plan = await generateCareerPlan(user);
        setSteps(plan);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Building your custom career path...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Your 4-Week Roadmap</h2>
        <p className="text-slate-600">Tailored for your transition to {user?.industry} as a {user?.careerStage}.</p>
      </div>

      <div className="relative space-y-8">
        {/* Timeline line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100 hidden md:block" />

        {steps.map((step, idx) => (
          <div key={idx} className="relative md:pl-16 group">
            {/* Timeline Dot */}
            <div className={`
              absolute left-0 top-1 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 hidden md:flex
              ${idx === 0 ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400'}
            `}>
              {idx === 0 ? <Sparkles className="w-5 h-5" /> : idx + 1}
            </div>

            <div className={`p-8 rounded-[32px] border transition-all ${
              idx === 0 
                ? 'bg-white border-violet-200 shadow-xl shadow-violet-50' 
                : 'bg-slate-50 border-slate-200 opacity-70 grayscale-[0.5]'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">Week {step.week}</span>
                    {idx === 0 && <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded text-[10px] font-bold uppercase">Active</span>}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> 5-7 hrs total
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4" /> 50 Points
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {step.tasks.map((task, tIdx) => (
                  <label key={tIdx} className="flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-white transition-all cursor-pointer group/task">
                    <input type="checkbox" className="hidden" />
                    <div className="w-6 h-6 rounded-lg border-2 border-slate-200 flex items-center justify-center text-white group-hover/task:border-violet-400 transition-colors">
                      <CheckCircle2 className="w-4 h-4 scale-0 group-hover/task:scale-100 transition-transform" />
                    </div>
                    <span className="text-slate-700 font-medium">{task}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h4 className="text-2xl font-bold mb-2">Feeling overwhelmed?</h4>
          <p className="text-slate-400 max-w-md">Our coach is here to help you break down any task or adjust the timeline to fit your life.</p>
        </div>
        <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all whitespace-nowrap">
          Adjust My Roadmap
        </button>
      </div>
    </div>
  );
};

export default CareerPlan;

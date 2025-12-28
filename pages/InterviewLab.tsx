
import React, { useState } from 'react';
import { Mic2, Video, Square, Sparkles, Play, Award, BrainCircuit } from 'lucide-react';

const InterviewLab: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<null | any>(null);

  const startPractice = () => {
    setIsRecording(true);
    // Logic for Live API connection would go here
  };

  const stopPractice = () => {
    setIsRecording(false);
    setIsAnalyzing(true);
    // Simulate processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setFeedback({
        score: 82,
        strengths: ["Clear vocal delivery", "Confident body language", "Strong STAR method usage"],
        improvements: ["Reduce filler words (um, like)", "Speak slower when discussing complex tech topics"],
        keyInsight: "You successfully highlighted your transferable leadership skills from your career break."
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Interview Lab</h2>
          <p className="text-slate-500">Practice behavioral and technical questions in a safe environment.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold">Settings</button>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold">Session History</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Interface */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-[40px] aspect-video relative overflow-hidden flex items-center justify-center group shadow-2xl">
            {/* Visualizer Placeholder */}
            {isRecording ? (
              <div className="flex items-center gap-1">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1.5 h-12 bg-violet-400 rounded-full animate-pulse" 
                    style={{animationDelay: `${i * 0.1}s`}}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-white/50">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm font-medium">Ready when you are</p>
              </div>
            )}

            {/* Controls Overlay */}
            <div className="absolute bottom-8 inset-x-0 flex justify-center gap-4 px-8 opacity-0 group-hover:opacity-100 transition-opacity">
              {!isRecording ? (
                <button 
                  onClick={startPractice}
                  className="bg-violet-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-violet-700 shadow-xl"
                >
                  <Play className="w-5 h-5" /> Start Practice
                </button>
              ) : (
                <button 
                  onClick={stopPractice}
                  className="bg-red-500 text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-red-600 shadow-xl"
                >
                  <Square className="w-5 h-5 fill-current" /> Stop & Analyze
                </button>
              )}
            </div>
            
            {isRecording && (
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/50">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live Practicing</span>
              </div>
            )}
          </div>

          {/* Current Question Display */}
          <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-200 flex items-start gap-4">
            <div className="bg-violet-100 p-3 rounded-2xl">
              <BrainCircuit className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-1">Current Question</p>
              <h4 className="text-lg font-bold text-slate-900 italic">"Tell me about a time you had to manage a conflict within your team. How did you handle it?"</h4>
            </div>
          </div>
        </div>

        {/* Feedback / Info Side */}
        <div className="space-y-6">
          {isAnalyzing ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin"></div>
              <h4 className="text-lg font-bold text-slate-900">Coach is Analyzing...</h4>
              <p className="text-sm text-slate-500">Processing tone, keywords, and non-verbal cues.</p>
            </div>
          ) : feedback ? (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm animate-in zoom-in duration-300">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-slate-900">AI Feedback</h4>
                <div className="bg-violet-50 text-violet-700 px-3 py-1 rounded-lg text-xl font-black">{feedback.score}</div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-3">Top Strengths</p>
                  <div className="space-y-2">
                    {feedback.strengths.map((s: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <Award className="w-4 h-4 text-green-500" /> {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-3">Key Insight</p>
                  <p className="text-sm text-slate-600 italic leading-relaxed">"{feedback.keyInsight}"</p>
                </div>
              </div>
              <button className="w-full mt-8 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                View Full Detailed Report
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h4 className="text-lg font-bold text-slate-900">Mock Interview Setup</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Role Category</label>
                  <select className="w-full bg-slate-50 border-none rounded-xl text-sm font-semibold p-3">
                    <option>Product Management</option>
                    <option>Software Engineering</option>
                    <option>Marketing & Sales</option>
                    <option>Executive Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Difficulty</label>
                  <div className="flex gap-2">
                    {['Beginner', 'Standard', 'Stress'].map(d => (
                      <button key={d} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${d === 'Standard' ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-white border-slate-200 text-slate-500'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl flex gap-3 items-start">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">Your coach will simulate a friendly yet professional interviewer from a Fortune 500 company.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewLab;

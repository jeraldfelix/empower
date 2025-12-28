
import React, { useState } from 'react';
import { FileText, Linkedin, Briefcase, Wand2, Copy, Download, Trash2, Sparkles } from 'lucide-react';
import { generateArtifactContent } from '../services/gemini';

const ArtifactBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'linkedin' | 'portfolio'>('resume');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    try {
      const content = await generateArtifactContent(activeTab, input);
      setResult(content || '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Artifact Builder</h2>
          <p className="text-slate-500">AI-optimized content for your professional presence.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'resume', icon: <FileText className="w-4 h-4" />, label: 'Resume' },
            { id: 'linkedin', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
            { id: 'portfolio', icon: <Briefcase className="w-4 h-4" />, label: 'Portfolio' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Input Information</label>
            <p className="text-xs text-slate-400 mb-4">Paste your current bullet points, job description, or a list of your recent achievements.</p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Example: Transitioning from teacher to UX designer. Completed Google UX certification. 10 years experience in communication and empathy...`}
              className="w-full h-64 p-4 rounded-2xl bg-slate-50 border-slate-200 focus:ring-violet-500 focus:border-violet-500 text-slate-700 text-sm"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !input.trim()}
            className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold hover:bg-violet-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
            Enhance with AI
          </button>
        </div>

        {/* Result Panel */}
        <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 relative overflow-hidden flex flex-col">
          {result ? (
            <>
              <div className="p-6 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0">
                <span className="text-sm font-bold text-slate-800">Generated {activeTab} Content</span>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Copy className="w-4 h-4" /></button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Download className="w-4 h-4" /></button>
                  <button onClick={() => setResult('')} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex-1 p-8 prose prose-slate max-w-none text-slate-700 overflow-y-auto">
                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {result}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-6">
                <Sparkles className="w-12 h-12 text-slate-100" />
              </div>
              <h4 className="text-lg font-bold text-slate-300 mb-2">Magic Happens Here</h4>
              <p className="text-sm max-w-xs">Your AI-optimized professional content will appear here after you click "Enhance with AI".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactBuilder;

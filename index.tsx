
import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquareText, Map, Sparkles, Mic2, Users, Settings as SettingsIcon,
  ArrowRight, CheckCircle2, Heart, Zap, Target, Rocket, ArrowUpRight, 
  Layout, BookOpen, Coffee, Menu, X, Bell, User as UserIcon, Send, Smile, 
  Info, BrainCircuit, Circle, Trophy, Calendar, FileText, Linkedin, Briefcase, 
  Wand2, Copy, Download, Trash2, Play, Square, Award, Search, Filter, MessageSquare, 
  Share2, Plus, TrendingUp, Lightbulb, RefreshCw, LogOut
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- TYPES ---
interface UserProfile {
  name: string;
  careerStage: 'early' | 'mid' | 'returner' | 'switcher';
  industry: string;
  goals: string[];
  bio: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

interface RoadmapStep {
  week: number;
  title: string;
  tasks: string[];
  completed: boolean;
}

// --- CONSTANTS ---
const NAV_LINKS = [
  { name: 'Home', path: '#home' },
  { name: 'Features', path: '#features' },
  { name: 'How It Works', path: '#how-it-works' },
  { name: 'Community', path: '#community' },
  { name: 'Pricing', path: '#pricing' },
];

const DASHBOARD_NAV = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'AI Coach', path: '/dashboard/coach', icon: <MessageSquareText className="w-5 h-5" /> },
  { name: 'Career Plan', path: '/dashboard/plan', icon: <Map className="w-5 h-5" /> },
  { name: 'Artifacts', path: '/dashboard/artifacts', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Interview Lab', path: '/dashboard/interview', icon: <Mic2 className="w-5 h-5" /> },
  { name: 'Community', path: '/dashboard/community', icon: <Users className="w-5 h-5" /> },
  { name: 'Settings', path: '/dashboard/settings', icon: <SettingsIcon className="w-5 h-5" /> },
];

// --- GEMINI SERVICES ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chatWithCoach = async (message: string, profile: UserProfile | null, deepThink: boolean = false) => {
  const config: any = {
    systemInstruction: "You are EmpowerHer Coach, a supportive, empathetic, and professional female career mentor. Your goal is to provide actionable career advice, boost confidence, and help women navigate professional challenges. Focus on the user's specific stage (e.g., returner, switcher).",
    temperature: deepThink ? 1.0 : 0.7,
  };
  if (deepThink) {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `User Profile: ${JSON.stringify(profile)}. User Message: ${message}`,
    config: config,
  });
  return response.text;
};

const getQuickTip = async (context: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: `Give a quick, empowering 1-sentence career tip about: ${context}`,
    config: { systemInstruction: "You are a concise career mentor for women." }
  });
  return response.text;
};

const generateCareerPlan = async (profile: UserProfile | null) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Create a 4-week career roadmap for this user: ${JSON.stringify(profile)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            week: { type: Type.NUMBER },
            title: { type: Type.STRING },
            tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["week", "title", "tasks"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

const generateArtifactContent = async (type: string, input: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Write a professional ${type} based on: ${input}. Optimize for impact and female leadership.`,
  });
  return response.text;
};

// --- CONTEXT ---
interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);
const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// --- COMPONENTS ---

// Layout
const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <Link to="/" className="p-6 border-b border-slate-100 flex items-center gap-3 group hover:bg-slate-50">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110">E</div>
            <span className="font-serif text-xl font-bold text-slate-800">EmpowerHer</span>
          </Link>
          <nav className="flex-1 p-4 space-y-2">
            {DASHBOARD_NAV.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                {item.icon} <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 border border-pink-200">{user?.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{user?.careerStage}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button className="p-2 -ml-2 text-slate-600 lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
          <h1 className="text-xl font-semibold text-slate-800 lg:block hidden">{DASHBOARD_NAV.find(n => n.path === location.pathname)?.name || 'Dashboard'}</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg relative"><Bell className="w-5 h-5" /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span></button>
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg"><UserIcon className="w-5 h-5" /></button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8"><div className="max-w-6xl mx-auto"><Outlet /></div></main>
      </div>
    </div>
  );
};

// Dashboard Home
const DashboardHome = () => {
  const { user } = useApp();
  const [tip, setTip] = useState("Focus on quantifying your impact today.");
  const [isRefreshingTip, setIsRefreshingTip] = useState(false);
  const data = [{ name: 'Mon', score: 65 }, { name: 'Tue', score: 68 }, { name: 'Wed', score: 72 }, { name: 'Thu', score: 70 }, { name: 'Fri', score: 85 }, { name: 'Sat', score: 88 }, { name: 'Sun', score: 92 }];

  const refreshTip = async () => {
    setIsRefreshingTip(true);
    try {
      const newTip = await getQuickTip(user?.careerStage || "professional woman");
      setTip(newTip || tip);
    } catch (err) { console.error(err); } finally { setIsRefreshingTip(false); }
  };

  useEffect(() => { refreshTip(); }, [user]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user?.name}! ✨</h2>
          <p className="text-slate-600 max-w-md">You're on track with your Week 2 goals. Your "Interview Readiness" has increased.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/dashboard/plan" className="bg-violet-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-violet-700 shadow-lg shadow-violet-100 flex items-center gap-2">Continue Roadmap <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </div>
        <div className="relative z-10 bg-white p-5 rounded-2xl border border-slate-100 shadow-xl w-full md:w-72">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2"><Lightbulb className="w-4 h-4 text-amber-500" /><p className="text-xs font-bold text-slate-400 uppercase">Coach Tip</p></div>
             <button onClick={refreshTip} disabled={isRefreshingTip} className="p-1 hover:bg-slate-50 rounded-lg text-slate-400"><RefreshCw className={`w-3 h-3 ${isRefreshingTip ? 'animate-spin' : ''}`} /></button>
           </div>
           <p className={`text-sm text-slate-700 italic leading-relaxed ${isRefreshingTip ? 'opacity-50' : ''}`}>"{tip}"</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8"><h3 className="text-lg font-bold text-slate-800">Growth Velocity</h3></div>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} /><Tooltip /><Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 6, fill: '#8b5cf6' }} /></LineChart></ResponsiveContainer></div>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-lg relative overflow-hidden group cursor-pointer">
            <Sparkles className="w-8 h-8 text-violet-400 mb-4" /><h4 className="text-xl font-bold mb-2">Resume Scan</h4><p className="text-slate-400 text-sm mb-6">Upload your resume to get instant AI feedback.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Landing Page
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    ['home', 'features', 'how-it-works', 'community', 'pricing'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: any, path: string) => {
    e.preventDefault();
    const id = path.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-[100] border-b border-slate-100 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={(e) => handleNavClick(e, '#home')}>
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
            <span className="font-serif text-2xl font-bold text-slate-900">EmpowerHer</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.path} onClick={(e) => handleNavClick(e, link.path)} className={`text-sm font-semibold ${activeSection === link.path.replace('#', '') ? 'text-violet-600' : 'text-slate-500'}`}>{link.name}</a>
            ))}
            <Link to="/dashboard" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-violet-600">Launch App</Link>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[90] pt-24 px-8">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.path} onClick={(e) => handleNavClick(e, link.path)} className="block text-4xl font-bold mb-6">{link.name}</a>
          ))}
          <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block bg-violet-600 text-white py-5 rounded-3xl font-bold text-center">Get Started</Link>
        </div>
      )}

      <section id="home" className="pt-32 pb-32 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-xs font-bold mb-6"><Sparkles className="w-3.5 h-3.5" />AI-Powered Career Mentorship for Women</div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">Navigate Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">Confidence.</span></h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">The only career platform built specifically for the unique professional journeys of women.</p>
            <div className="flex gap-4"><Link to="/dashboard" className="bg-violet-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg">Start Free Trial</Link></div>
          </div>
          <div className="relative"><div className="bg-white p-4 rounded-[40px] shadow-2xl"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=600" className="rounded-[32px] w-full" /></div></div>
        </div>
      </section>

      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4" onClick={(e) => handleNavClick(e, '#home')}>
            <div className="flex items-center gap-3 cursor-pointer"><div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold">E</div><span className="font-serif text-2xl font-bold text-slate-900">EmpowerHer</span></div>
            <p className="text-sm text-slate-400 font-medium">Built with love for women, by women.</p>
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">© 2025 EmpowerHer Coach</div>
        </div>
      </footer>
    </div>
  );
};

// Pages
const AICoach = () => {
  const { user } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'model', content: `Hello ${user?.name}! I'm your Coach. How can I help you today?`, timestamp: new Date() }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const currInput = input;
    setInput('');
    setIsLoading(true);
    try {
      const res = await chatWithCoach(currInput, user, isDeepThinking);
      setMessages(prev => [...prev, { role: 'model', content: res || "Connection error.", timestamp: new Date() }]);
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-3xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div><div><h3 className="font-bold text-slate-900">EmpowerHer Coach</h3><div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="text-xs text-slate-500">Online</span></div></div></div>
        <button onClick={() => setIsDeepThinking(!isDeepThinking)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isDeepThinking ? 'bg-violet-100 text-violet-700' : 'bg-slate-50 text-slate-400'}`}><BrainCircuit className="w-4 h-4" />Deep Thinking</button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">{messages.map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] rounded-2xl p-4 text-sm ${m.role === 'user' ? 'bg-violet-600 text-white' : 'bg-slate-50 text-slate-800 border border-slate-100'}`}>{m.content}</div></div>))}<div ref={endRef} /></div>
      <div className="p-4 border-t border-slate-100"><div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl"><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Talk to your coach..." className="flex-1 bg-transparent border-none p-2 text-sm resize-none" rows={1} /><button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-2 bg-violet-600 text-white rounded-xl disabled:bg-slate-200"><Send className="w-5 h-5" /></button></div></div>
    </div>
  );
};

const CareerPlan = () => {
  const { user } = useApp();
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateCareerPlan(user).then(p => { setSteps(p); setLoading(false); }).catch(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="text-center py-24"><RefreshCw className="w-12 h-12 animate-spin mx-auto text-violet-600 mb-4" /><p>Building roadmap...</p></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center"><h2 className="text-3xl font-bold text-slate-900 mb-2">Your 4-Week Roadmap</h2><p className="text-slate-600">Tailored for {user?.name}</p></div>
      <div className="space-y-8">{steps.map((s, i) => (
        <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm"><div className="mb-6"><span className="text-xs font-bold text-violet-600 uppercase">Week {s.week}</span><h3 className="text-xl font-bold">{s.title}</h3></div><div className="space-y-3">{s.tasks.map((t, ti) => (<div key={ti} className="flex items-center gap-3 text-slate-700"><CheckCircle2 className="w-4 h-4 text-slate-200" />{t}</div>))}</div></div>
      ))}</div>
    </div>
  );
};

const ArtifactBuilder = () => {
  const [tab, setTab] = useState('resume');
  const [input, setInput] = useState('');
  const [res, setRes] = useState('');
  const [loading, setLoading] = useState(false);
  const handleGen = async () => { setLoading(true); try { const c = await generateArtifactContent(tab, input); setRes(c || ''); } finally { setLoading(false); } };
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Artifact Builder</h2><div className="flex bg-slate-100 p-1 rounded-xl">
        {['resume', 'linkedin', 'portfolio'].map(t => (<button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-bold ${tab === t ? 'bg-white text-violet-600 shadow' : 'text-slate-500'}`}>{t}</button>))}
      </div></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6"><textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Input your experience..." className="w-full h-64 p-4 bg-slate-50 rounded-2xl border-none" /><button onClick={handleGen} disabled={loading} className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold disabled:opacity-50">{loading ? 'Working...' : 'Enhance with AI'}</button></div>
        <div className="bg-slate-50 rounded-3xl p-6 border border-dashed border-slate-300 min-h-[300px] whitespace-pre-wrap text-sm">{res || 'Magic happens here...'}</div>
      </div>
    </div>
  );
};

// Placeholder components for the rest
const InterviewLab = () => <div className="p-12 text-center bg-white rounded-3xl border border-slate-200"><Mic2 className="w-16 h-16 mx-auto mb-4 text-slate-200" /><h2 className="text-2xl font-bold">Interview Lab Coming Soon</h2></div>;
const Community = () => <div className="p-12 text-center bg-white rounded-3xl border border-slate-200"><Users className="w-16 h-16 mx-auto mb-4 text-slate-200" /><h2 className="text-2xl font-bold">Community Coming Soon</h2></div>;
const Settings = () => <div className="p-12 text-center bg-white rounded-3xl border border-slate-200"><SettingsIcon className="w-16 h-16 mx-auto mb-4 text-slate-200" /><h2 className="text-2xl font-bold">Settings</h2></div>;

// --- APP ---
const App = () => {
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Sarah Chen', careerStage: 'returner', industry: 'Technology', goals: ['Pivot to PM'], bio: 'Returning to workforce.'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/" />}>
            <Route index element={<DashboardHome />} />
            <Route path="coach" element={<AICoach />} />
            <Route path="plan" element={<CareerPlan />} />
            <Route path="artifacts" element={<ArtifactBuilder />} />
            <Route path="interview" element={<InterviewLab />} />
            <Route path="community" element={<Community />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);

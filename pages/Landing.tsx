
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  Zap, 
  Star, 
  Users, 
  Target, 
  Rocket,
  ArrowUpRight,
  Quote,
  Layout,
  BookOpen,
  Coffee,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { NAV_LINKS } from '../constants';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle intersection observer to highlight active nav link
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'features', 'how-it-works', 'community', 'pricing'];
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const id = path.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-[100] border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={(e) => handleNavClick(e as any, '#home')}>
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-100 group-hover:scale-105 transition-transform">E</div>
            <span className="font-serif text-2xl font-bold text-slate-900 tracking-tight">EmpowerHer</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.path} 
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-sm font-semibold transition-all duration-300 relative py-1 ${
                  activeSection === link.path.replace('#', '') 
                    ? 'text-violet-600' 
                    : 'text-slate-500 hover:text-violet-600'
                }`}
              >
                {link.name}
                {activeSection === link.path.replace('#', '') && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 rounded-full animate-in fade-in zoom-in duration-300" />
                )}
              </a>
            ))}
            <Link to="/dashboard" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-violet-600 hover:shadow-xl hover:shadow-violet-200 transition-all transform hover:-translate-y-0.5">
              Launch App
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-white z-[90] md:hidden transition-all duration-500 ease-in-out transform
        ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col h-full pt-24 px-8 pb-12">
          <div className="space-y-6 flex-1">
            {NAV_LINKS.map((link, idx) => (
              <a 
                key={link.name} 
                href={link.path} 
                onClick={(e) => handleNavClick(e, link.path)}
                className={`block text-4xl font-bold transition-all duration-300 ${
                  activeSection === link.path.replace('#', '') ? 'text-violet-600' : 'text-slate-900 hover:text-violet-600'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-8 border-t border-slate-100">
            <Link 
              to="/dashboard" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full bg-violet-600 text-white py-5 rounded-3xl font-bold text-xl shadow-2xl shadow-violet-200"
            >
              Get Started Free <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-32 overflow-hidden min-h-screen flex items-center">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-soft-gradient rounded-bl-[100px]" />
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-xs font-bold mb-6 border border-violet-100">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Career Mentorship for Women
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">
              Navigate Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">Unstoppable Confidence.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              The only career platform built specifically for the unique professional journeys of women. Get an AI mentor who understands your voice, your goals, and your potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard" className="flex items-center justify-center gap-2 bg-violet-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 transform hover:-translate-y-1">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#how-it-works" 
                onClick={(e) => handleNavClick(e, '#how-it-works')}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-violet-600 transition-all"
              >
                How it Works
              </a>
            </div>
          </div>
          <div className="relative animate-in zoom-in duration-700">
            <div className="bg-white p-4 rounded-[40px] shadow-2xl relative z-10 border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Professional Woman" 
                className="rounded-[32px] w-full h-auto shadow-inner"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-[240px]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-pink-100 rounded-lg">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  </div>
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Coach Sarah</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">"You have incredible leadership potential. Let's showcase it."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl -ml-32 -mt-32" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Tools Designed for Your Success</h2>
            <p className="text-lg text-slate-600 font-medium">EmpowerHer isn't just a chatbot. It's an ecosystem of support tailored to every career pivot.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 hover:border-violet-200 transition-all hover:shadow-2xl group">
              <div className="mb-6 p-4 bg-violet-50 rounded-2xl inline-block group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Smart Roadmaps</h3>
              <p className="text-slate-600 leading-relaxed">Personalized step-by-step career plans that adapt to your pace. Whether returning from a break or aiming for the C-suite.</p>
            </div>
            
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 hover:border-pink-200 transition-all hover:shadow-2xl group">
              <div className="mb-6 p-4 bg-pink-50 rounded-2xl inline-block group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Deep Thinking AI</h3>
              <p className="text-slate-600 leading-relaxed">Our mentor uses advanced reasoning to help you solve complex office politics, salary negotiations, and leadership dilemmas.</p>
            </div>
            
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 hover:border-amber-200 transition-all hover:shadow-2xl group">
              <div className="mb-6 p-4 bg-amber-50 rounded-2xl inline-block group-hover:scale-110 transition-transform">
                <Rocket className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Artifact Lab</h3>
              <p className="text-slate-600 leading-relaxed">Instantly transform your rough bullet points into high-impact Resumes and LinkedIn profiles that get you noticed by top recruiters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">Four steps to your dream role.</h2>
              <div className="space-y-10">
                {[
                  { icon: <Layout />, title: "1. Career Audit", desc: "Share your history and goals. We use AI to identify your unique strengths and gaps." },
                  { icon: <BookOpen />, title: "2. Personal Roadmap", desc: "Receive a tailored 4-week plan with actionable tasks, from networking to skill-up targets." },
                  { icon: <Coffee />, title: "3. AI Mentorship", desc: "Talk to your coach anytime. Get scripts for hard conversations and instant feedback on your work." },
                  { icon: <Target />, title: "4. Launch & Lead", desc: "Polish your artifacts and ace your interviews with our real-time practice lab." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-slate-900 text-white rounded-[20px] flex items-center justify-center font-bold group-hover:bg-violet-600 transition-colors shadow-lg">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-slate-600 font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 bg-soft-gradient p-12 rounded-[60px] border border-violet-100 relative group">
              <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-white relative overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 shadow-lg shadow-violet-100 flex items-center justify-center">
                     <Sparkles className="w-6 h-6 text-white" />
                   </div>
                   <div>
                     <div className="h-4 w-32 bg-slate-100 rounded mb-1" />
                     <div className="h-3 w-20 bg-slate-50 rounded" />
                   </div>
                </div>
                <div className="space-y-4">
                  <div className="h-3 w-full bg-slate-50 rounded" />
                  <div className="h-3 w-11/12 bg-slate-50 rounded" />
                  <div className="h-3 w-4/6 bg-slate-50 rounded" />
                </div>
                <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center">
                  <div className="h-10 w-32 bg-violet-600 rounded-full shadow-lg shadow-violet-100" />
                  <div className="h-10 w-10 bg-violet-50 rounded-xl flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-violet-600" />
                  </div>
                </div>
              </div>
              <p className="mt-8 text-center text-slate-500 font-bold tracking-tight uppercase text-xs">Proprietary AI Architecture</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] -mr-48 -mb-48" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md hover:bg-white/20 transition-all cursor-default">
                    <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em] block mb-3">Popular Discussion</span>
                    <p className="text-sm font-semibold leading-relaxed">"Negotiating salary while returning after maternity leave..."</p>
                  </div>
                  <div className="bg-violet-600 p-6 rounded-3xl shadow-2xl transform translate-x-4">
                    <p className="text-sm font-black uppercase tracking-widest mb-1">Safe Space Verified</p>
                    <p className="text-xs text-white/80">Zero-tolerance for bias or harassment.</p>
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default">
                     <p className="text-sm font-medium leading-relaxed">"Just landed a Senior Role at 45! Sisters, it's possible!"</p>
                     <div className="mt-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-slate-900 shadow-xl" />
                        <span className="text-xs font-bold tracking-tight">Sarah T.</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <span className="text-violet-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">The Sisterhood</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">A community where you're never alone.</h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
                Connect with thousands of women sharing advice, job leads, and encouragement. Our community is built on psychological safety and mutual empowerment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-center hover:bg-slate-100 transition-all shadow-xl transform hover:-translate-y-0.5">
                  Join Community
                </Link>
                <button className="px-8 py-4 border border-white/20 rounded-full font-bold text-center hover:bg-white/5 transition-all">
                  Browse Circles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Invest in Your Future</h2>
            <p className="text-slate-600 text-lg font-medium">Start for free, upgrade when you're ready to fly.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white border border-slate-200 p-12 rounded-[48px] hover:shadow-2xl transition-all flex flex-col group">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-violet-600 transition-colors">Seedling</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">/forever</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "10 AI Coach messages / month",
                  "Basic Career Roadmap",
                  "Public Community Access",
                  "Basic Resume Analysis"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
                    <div className="bg-slate-100 rounded-full p-1"><CheckCircle2 className="w-4 h-4 text-slate-400" /></div> {item}
                  </li>
                ))}
              </ul>
              <Link to="/dashboard" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all text-center shadow-lg">
                Get Started Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-gradient-to-br from-violet-600 to-pink-600 p-12 rounded-[48px] shadow-[0_32px_64px_-12px_rgba(139,92,246,0.25)] relative overflow-hidden flex flex-col text-white transform md:-translate-y-8">
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">Most Popular</div>
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Rising Star</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">$19</span>
                  <span className="text-white/70 font-bold text-sm tracking-widest uppercase">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Unlimited AI Coaching",
                  "Deep Thinking Strategy Mode",
                  "Advanced Artifact Builder",
                  "Unlimited Mock Interviews",
                  "Priority Community Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                    <div className="bg-white/20 rounded-full p-1"><CheckCircle2 className="w-4 h-4 text-white" /></div> {item}
                  </li>
                ))}
              </ul>
              <Link to="/dashboard" className="w-full py-4 bg-white text-violet-700 rounded-2xl font-bold hover:shadow-2xl transition-all text-center">
                Go Pro Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-soft-gradient relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/20 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">Your next chapter starts here.</h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join 10,000+ women who are taking control of their career narrative. No more second-guessing.
          </p>
          <Link to="/dashboard" className="inline-block bg-violet-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-violet-700 transition-all shadow-2xl shadow-violet-200 transform hover:scale-105 active:scale-95">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div 
              className="flex items-center gap-3 group cursor-pointer" 
              onClick={(e) => handleNavClick(e as any, '#home')}
            >
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-violet-100 group-hover:scale-110 transition-transform">E</div>
              <span className="font-serif text-2xl font-bold text-slate-900">EmpowerHer</span>
            </div>
            <p className="text-sm text-slate-400 font-medium">Built with love for women, by women.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-bold text-xs uppercase tracking-widest text-slate-500">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.path} onClick={(e) => handleNavClick(e, link.path)} className={`transition-colors duration-300 ${activeSection === link.path.replace('#', '') ? 'text-violet-600' : 'hover:text-violet-600'}`}>
                {link.name}
              </a>
            ))}
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            © 2025 EmpowerHer Coach
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

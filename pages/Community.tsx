
import React from 'react';
import { MessageSquare, Heart, Share2, Plus, Filter, Search } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sisterhood Community</h2>
          <p className="text-slate-500">A safe space for support, advice, and networking.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-100">
          <Plus className="w-5 h-5" /> Start a Discussion
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Topics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4">Trending Topics</h4>
            <div className="space-y-2">
              {[
                { label: '#CareerReturners', count: '1.2k' },
                { label: '#TechTransitions', count: '850' },
                { label: '#SalaryNegotiation', count: '2.1k' },
                { label: '#WorkLifeHarmony', count: '3.4k' },
                { label: '#LeadershipPath', count: '620' },
              ].map((topic, i) => (
                <button key={i} className="flex items-center justify-between w-full p-2 hover:bg-slate-50 rounded-xl group transition-all">
                  <span className="text-sm font-medium text-slate-600 group-hover:text-violet-600">{topic.label}</span>
                  <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-400 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">{topic.count}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-soft-gradient p-6 rounded-3xl border border-pink-100 shadow-sm">
            <h4 className="font-bold text-pink-700 mb-2">Mentor Spotlight</h4>
            <p className="text-xs text-pink-600/80 mb-4">Meet Maya, an Engineering Director who returned to work after 5 years.</p>
            <button className="w-full bg-white text-pink-700 py-2.5 rounded-xl text-xs font-bold hover:shadow-md transition-all">Connect with Maya</button>
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search/Filter */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 flex items-center px-4">
              <Search className="w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search for advice, mentors, or discussions..." className="w-full border-none focus:ring-0 bg-transparent py-3 text-sm" />
            </div>
            <button className="bg-white border border-slate-200 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Posts */}
          {[
            {
              author: "Elena Rodriguez",
              role: "Senior Product Designer",
              avatar: "E",
              content: "I finally did it! After 6 months of career coaching and practicing here, I just signed an offer for my first Lead role. To all the switchers out there: your past experience IS valuable. Don't let anyone tell you otherwise! 💖",
              tags: ["SuccessStory", "DesignLeaders"],
              likes: 124,
              comments: 18
            },
            {
              author: "Priya Sharma",
              role: "Return-to-Work Mom",
              avatar: "P",
              content: "Question for the community: How do you handle the 'gap' question in interviews without sounding defensive? I spent 4 years raising my daughter and I'm nervous about how it's perceived in Tech.",
              tags: ["InterviewHelp", "CareerGap"],
              likes: 42,
              comments: 35
            }
          ].map((post, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm hover:border-violet-200 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-none">{post.author}</h4>
                  <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-wider">{post.role}</p>
                </div>
                <div className="ml-auto text-xs text-slate-400">2h ago</div>
              </div>
              
              <p className="text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">{post.content}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold">#{tag}</span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-violet-600 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-xs font-bold">{post.comments}</span>
                  </button>
                </div>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;


import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Smile, Info, BrainCircuit } from 'lucide-react';
import { chatWithCoach } from '../services/gemini';
import { useApp } from '../App';
import { ChatMessage } from '../types';

const AICoach: React.FC = () => {
  const { user } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: `Hello ${user?.name}! I'm your EmpowerHer Coach. How are you feeling about your career journey today? Remember, no challenge is too small for us to tackle together.`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    const currentThinkingState = isDeepThinking;
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithCoach(currentInput, user, currentThinkingState);
      setMessages(prev => [...prev, {
        role: 'model',
        content: response || "I'm sorry, I'm having a little trouble connecting right now. Can we try again?",
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Coach Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-100">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">EmpowerHer Coach</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-slate-500 font-medium">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDeepThinking(!isDeepThinking)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              isDeepThinking 
                ? 'bg-violet-100 text-violet-700 border border-violet-200 shadow-sm' 
                : 'bg-slate-50 text-slate-400 hover:text-slate-600 border border-transparent'
            }`}
          >
            <BrainCircuit className={`w-4 h-4 ${isDeepThinking ? 'animate-pulse' : ''}`} />
            Deep Thinking
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] rounded-[24px] p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-violet-600 text-white rounded-tr-none shadow-md' 
                : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 border border-slate-100 rounded-[24px] rounded-tl-none p-4 flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce delay-150"></span>
              <span className="text-[10px] font-bold text-violet-500 ml-2 italic">
                {isDeepThinking ? "Thinking deeply..." : "Typing..."}
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Smile className="w-6 h-6" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder={isDeepThinking ? "Ask a complex career question..." : "Talk to your coach..."}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 text-slate-900 placeholder-slate-400 text-sm max-h-32"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-xl transition-all ${
              input.trim() && !isLoading ? 'bg-violet-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
          EmpowerHer Coach is an AI. Use Deep Thinking for complex strategy and planning.
        </p>
      </div>
    </div>
  );
};

export default AICoach;

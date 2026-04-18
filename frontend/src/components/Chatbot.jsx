import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle, User, Bot, Sparkles, Phone, MapPin } from 'lucide-react';
import SafeImage from './SafeImage';

const Chatbot = ({ isOpen, onClose, navigateTo }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Namaste! 🙏 Welcome to BK Science Academy. I am your AI assistant. How can I help you excel in your exams today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickReplies = [
    { label: 'JEE Courses', icon: '🚀' },
    { label: 'NEET Batches', icon: '🩺' },
    { label: 'Admission Process', icon: '📝' },
    { label: 'Center Location', icon: '📍' }
  ];

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const newUserMsg = { id: Date.now(), type: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Bot Response
    setTimeout(() => {
      let botResponse = "";
      const lowerText = text.toLowerCase();

      if (lowerText.includes('jee')) {
        botResponse = "We offer specialized JEE Main & Advanced courses. Our 'Nurture' batch for 11th and 'Enthuse' for 12th are currently open for admission!";
      } else if (lowerText.includes('neet')) {
        botResponse = "Our NEET preparation program is led by top medical faculty. We focus on in-depth biology and consistent testing patterns.";
      } else if (lowerText.includes('location') || lowerText.includes('where')) {
        botResponse = "We are located at 2nd Floor, Gajanan Plaza, Ashok Stambh, Nashik. Would you like to view our centers page?";
      } else if (lowerText.includes('admission') || lowerText.includes('enroll')) {
        botResponse = "Admissions for the 2026-27 session are open. You can start by filling our online registration form.";
      } else {
        botResponse = "I'm here to assist with courses, admissions, and center details. You can also call our helpdesk at +91 88883 01363.";
      }

      const newBotMsg = { id: Date.now() + 1, type: 'bot', text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[100] w-[350px] md:w-[400px] h-[500px] md:h-[600px] bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="bg-brand-dark p-6 text-white relative">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border border-white/10">
              <SafeImage src="/assets/ScholarBot.png" alt="BK ScholarBot" className="w-full h-full object-contain scale-110" fallbackText="AI" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-brand-dark rounded-full"></div>
          </div>
          <div>
            <h3 className="font-black text-lg leading-tight tracking-tight">BK ScholarBot</h3>
            <p className="text-[10px] font-black text-brand-red uppercase tracking-widest flex items-center gap-1.5 mt-1">
              <Sparkles size={10} className="animate-pulse" /> Official Academy AI
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl overflow-hidden shadow-md flex-shrink-0 flex items-center justify-center ${msg.type === 'user' ? 'bg-brand-red text-white' : 'bg-white border border-gray-100'}`}>
                {msg.type === 'user' ? <User size={20} /> : <SafeImage src="/assets/ScholarBot.png" className="w-full h-full object-contain" fallbackText="AI" />}
              </div>
              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-sm font-bold leading-relaxed shadow-sm ${
                  msg.type === 'user' 
                  ? 'bg-brand-red text-white rounded-tr-none' 
                  : 'bg-white text-brand-dark border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[9px] font-bold text-gray-400 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="px-6 py-3 bg-white border-t border-gray-50 flex gap-2 overflow-x-auto no-scrollbar">
        {quickReplies.map((reply, i) => (
          <button 
            key={i}
            onClick={() => handleSend(reply.label)}
            className="flex-shrink-0 px-4 py-2 bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-brand-red/30 rounded-full text-xs font-bold text-slate-600 hover:text-brand-red transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>{reply.icon}</span> {reply.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-6 bg-white pt-2">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative group"
        >
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-6 pr-14 py-4 text-sm font-bold text-brand-dark placeholder:text-slate-400 focus:bg-white focus:border-brand-red outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-brand-red text-white rounded-xl flex items-center justify-center hover:bg-brand-dark transition-colors disabled:opacity-30"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="mt-4 flex flex-col items-center gap-1 opacity-70 border-t border-slate-50 pt-4">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
            BK Science Official Support
          </p>
          <p className="text-[10px] font-bold text-brand-dark flex items-center gap-1.5">
            <span className="w-1 h-1 bg-brand-red rounded-full"></span>
            ScholarBot can make mistakes. Check important info.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default Chatbot;
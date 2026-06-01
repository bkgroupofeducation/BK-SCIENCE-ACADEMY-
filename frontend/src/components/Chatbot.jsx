import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, User, Bot, Sparkles, Phone, MapPin, Ticket, AlertCircle, CheckCircle } from 'lucide-react';
import SafeImage from './SafeImage';
import { apiFetch } from '../api';

const Chatbot = ({ isOpen, onClose, navigateTo }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Namaste! 🙏 Welcome to BK Science Academy. I am your AI assistant. How can I help you excel in your exams today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketData, setTicketData] = useState({ name: '', phone: '', issue: '' });
  const [ticketStatus, setTicketStatus] = useState('idle');
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
    <div className="fixed bottom-8 right-6 z-[100] w-[320px] md:w-[360px] h-[380px] md:h-[420px] bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-dark via-slate-900 to-brand-dark p-3 md:p-4 text-white relative border-b border-white/5">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors backdrop-blur-md border border-white/5">
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shadow-2xl overflow-hidden border border-white/20 backdrop-blur-md">
              <SafeImage src="/assets/GirlBot.png" alt="BK AI" className="w-full h-full object-cover" fallbackText="AI" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-brand-dark rounded-full"></div>
          </div>
          <div>
            <h3 className="font-black text-base md:text-lg leading-tight tracking-tight text-white/95">BK AI Assistant</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[9px] font-black text-brand-red uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={8} className="animate-pulse" /> Official Assistant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Form Modal (Nested in Chat) */}
      <AnimatePresence>
        {showTicketForm && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 z-50 bg-white flex flex-col p-3 md:p-4"
          >
            <div className="flex justify-between items-center mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-red text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-red/20"><Ticket size={20} /></div>
                <h4 className="text-xl font-black text-brand-dark uppercase tracking-tighter">Support Ticket</h4>
              </div>
              <button onClick={() => setShowTicketForm(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><X size={20} /></button>
            </div>

            {ticketStatus === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-24 h-24 bg-green-50 text-green-500 rounded-[32px] flex items-center justify-center shadow-xl shadow-green-500/10 rotate-12"><CheckCircle size={48} /></motion.div>
                <div>
                  <h5 className="text-2xl font-black text-brand-dark uppercase tracking-tight mb-2">Ticket Received!</h5>
                  <p className="text-sm text-slate-500 font-bold px-4">Our support team will call you within 30 minutes to assist you.</p>
                </div>
                <button onClick={() => { setShowTicketForm(false); setTicketStatus('idle'); }} className="px-10 py-4 bg-brand-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-brand-red transition-all">Close Support</button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-3 text-sm font-bold outline-none focus:bg-white focus:border-brand-red transition-all" placeholder="Enter Full Name" value={ticketData.name} onChange={e => setTicketData({...ticketData, name: e.target.value})} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input 
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-3 text-sm font-bold outline-none focus:bg-white focus:border-brand-red transition-all" 
                        placeholder="10-digit mobile" 
                        type="tel"
                        maxLength={10}
                        value={ticketData.phone} 
                        onChange={e => setTicketData({...ticketData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})} 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Describe Issue</label>
                    <div className="relative">
                      <AlertCircle className="absolute left-4 top-4 text-slate-300" size={16} />
                      <textarea rows={3} className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-3 text-sm font-bold outline-none focus:bg-white focus:border-brand-red transition-all" placeholder="Tell us how we can help..." value={ticketData.issue} onChange={e => setTicketData({...ticketData, issue: e.target.value})} />
                    </div>
                  </div>
                </div>

                <button 
                  disabled={ticketStatus === 'loading'}
                  onClick={async () => {
                    if(!ticketData.name || !ticketData.phone) return alert('Name and Phone are required');
                    setTicketStatus('loading');
                    try {
                      await apiFetch('/api/support/ticket', { method: 'POST', body: JSON.stringify(ticketData) });
                      const waText = `*BK Science Academy - Student Support Request*\n\n` +
                                     `*Student Name:* ${ticketData.name}\n` +
                                     `*Student Issue:* ${ticketData.issue}\n\n` +
                                     `_Please assist me regarding this issue._`;
                      window.open(`https://wa.me/918080195558?text=${encodeURIComponent(waText)}`, '_blank');
                      setTicketStatus('success');
                      setTicketData({ name: '', phone: '', issue: '' });
                    } catch (e) { setTicketStatus('idle'); alert('Failed to raise ticket'); }
                  }}
                  className="w-full bg-brand-red text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-brand-red/20 flex items-center justify-center gap-3 hover:bg-brand-dark hover:scale-[1.02] transition-all disabled:opacity-50 mt-auto"
                >
                  {ticketStatus === 'loading' ? 'Processing...' : <><Ticket size={18} /> Raise Support Ticket</>}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl overflow-hidden shadow-md flex-shrink-0 flex items-center justify-center ${msg.type === 'user' ? 'bg-brand-red text-white' : 'bg-white border border-gray-100'}`}>
                {msg.type === 'user' ? <User size={20} /> : <SafeImage src="/assets/GirlBot.png" className="w-full h-full object-cover" fallbackText="AI" />}
              </div>
              <div className="space-y-1">
                <div className={`p-3 rounded-2xl text-xs font-bold leading-relaxed shadow-sm ${
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
        {/* Standalone Ticket Button */}
        <div className="flex justify-start px-2">
          <button 
            onClick={() => setShowTicketForm(true)}
            className="px-5 py-2.5 bg-brand-red text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-brand-dark transition-all flex items-center gap-2 shadow-lg shadow-brand-red/20"
          >
            <Ticket size={14} /> Raise Ticket
          </button>
        </div>

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
      <div className="px-4 py-2 bg-white border-t border-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
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
      <div className="p-3 bg-white pt-1">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative group"
        >
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-5 pr-12 py-2 text-xs font-bold text-brand-dark placeholder:text-slate-400 focus:bg-white focus:border-brand-red outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-red text-white rounded-xl flex items-center justify-center hover:bg-brand-dark transition-colors disabled:opacity-30"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="mt-2 flex flex-col items-center gap-1 opacity-70 border-t border-slate-50 pt-2">
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

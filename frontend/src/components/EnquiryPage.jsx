import React, { useState } from 'react';
import { MessageSquare, Phone, User, BookOpen, Send, Sparkles, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { apiFetch } from '../api';

const EnquiryPage = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', course: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mobile') {
            setFormData(prev => ({ ...prev, [name]: value.replace(/[^0-9]/g, '').slice(0, 10) }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.mobile.length !== 10) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        setIsSubmitting(true);
        try {
            await apiFetch('/api/enquiry/submit', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            setIsSuccess(true);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6 animate-fade-scale">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl font-black text-brand-dark mb-4 uppercase tracking-tighter">
                        Enquiry <span className="text-brand-red">Received</span>
                    </h2>
                    <p className="text-gray-500 font-bold mb-8">
                        Thank you for your interest! Our academic expert will call you back within 24 hours.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full bg-brand-dark text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-xl"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left: Info */}
                <div className="animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 text-brand-red rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <MessageSquare size={14} /> Instant Academic Support
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-brand-dark uppercase tracking-tighter leading-[0.9] mb-8">
                        Have a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-600">Question?</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium mb-12 leading-relaxed max-w-sm">
                        Drop your details and our senior counselor will guide you through courses, fee structure, and scholarship opportunities.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-brand-gray rounded-3xl border border-gray-100/50">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <Clock size={20} className="text-brand-red" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Response Time</p>
                                <p className="text-sm font-black text-brand-dark">Within 24 Hours</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-brand-gray rounded-3xl border border-gray-100/50">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <Sparkles size={20} className="text-brand-yellow" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Support</p>
                                <p className="text-sm font-black text-brand-dark">1-on-1 Personalized Session</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="animate-fade-scale stagger-2">
                    <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
                            {/* Name */}
                            <div className="flex flex-col gap-1.5 group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-red transition-colors" htmlFor="enq-name">
                                    Student Name
                                </label>
                                <div className="relative">
                                    <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                                    <input
                                        id="enq-name" type="text" name="name" value={formData.name}
                                        onChange={handleChange} placeholder="Rahul Sharma"
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl pl-14 pr-6 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Mobile */}
                            <div className="flex flex-col gap-1.5 group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-red transition-colors" htmlFor="enq-mobile">
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                                    <input
                                        id="enq-mobile" type="tel" name="mobile" value={formData.mobile}
                                        onChange={handleChange} placeholder="+91 00000 00000" maxLength={10}
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl pl-14 pr-6 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Course */}
                            <div className="flex flex-col gap-1.5 group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-red transition-colors" htmlFor="enq-course">
                                    Course Interest
                                </label>
                                <div className="relative">
                                    <BookOpen size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                                    <select
                                        id="enq-course" name="course" value={formData.course} onChange={handleChange}
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl pl-14 pr-6 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled>Select Course</option>
                                        <option value="JEE">JEE (Main + Advanced)</option>
                                        <option value="NEET">NEET (UG)</option>
                                        <option value="Foundation">Foundation (6–10th)</option>
                                        <option value="Olympiads">Olympiads</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-1.5 group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-red transition-colors" htmlFor="enq-message">
                                    Any Message? (Optional)
                                </label>
                                <textarea
                                    id="enq-message" name="message" value={formData.message} onChange={handleChange} rows="3"
                                    placeholder="I want to know about fee structure…"
                                    className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all outline-none resize-none"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600">
                                    <AlertCircle size={16} className="shrink-0" />
                                    <p className="text-xs font-bold">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit" disabled={isSubmitting}
                                className="w-full h-16 bg-brand-dark text-white rounded-3xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-red hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-2xl shadow-brand-dark/20 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <><span>Request Callback</span><Send size={18} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiryPage;

import React, { useState } from 'react';
import { apiFetch } from '../api';

const GrievancePage = () => {
  const [formType, setFormType] = useState('feedback'); // 'feedback' or 'grievance'
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fields, setFields] = useState({ fullName: '', phone: '', studentId: '', category: 'Academic Quality', message: '' });

  const handleFieldChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      await apiFetch('/api/grievance/submit', {
        method: 'POST',
        body: JSON.stringify({ ...fields, formType }),
      });
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-yellow/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="text-[10px] font-black text-brand-red uppercase tracking-[0.3em]">Direct Communication</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Feedback & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500 italic">Grievance</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Your voice matters. Whether it's a suggestion for improvement or a formal concern, we are here to listen and evolve.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 -mt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                <button 
                  onClick={() => { setFormType('feedback'); setFields(f => ({ ...f, category: 'Academic Quality' })); }}
                  className={`flex-1 py-8 text-sm font-black uppercase tracking-widest transition-all ${formType === 'feedback' ? 'text-brand-red bg-gray-50/50' : 'text-gray-400 hover:text-brand-dark'}`}
                >
                  General Feedback
                </button>
                <div className="w-[1px] bg-gray-100"></div>
                <button 
                  onClick={() => { setFormType('grievance'); setFields(f => ({ ...f, category: 'Academic Conflict' })); }}
                  className={`flex-1 py-8 text-sm font-black uppercase tracking-widest transition-all ${formType === 'grievance' ? 'text-brand-red bg-gray-50/50' : 'text-gray-400 hover:text-brand-dark'}`}
                >
                  Grievance Redressal
                </button>
              </div>

              <div className="p-8 md:p-12">
                {submitted ? (
                  <div className="text-center py-20 animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-lg shadow-green-100">
                      ✓
                    </div>
                    <h2 className="text-3xl font-black text-brand-dark mb-4">Submission Successful</h2>
                    <p className="text-gray-500 font-medium">Thank you for sharing your thoughts. Our team will review your message shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          required 
                          type="text"
                          name="fullName"
                          value={fields.fullName}
                          onChange={handleFieldChange}
                          placeholder="Ex: Arnav Sharma" 
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-brand-dark focus:bg-white focus:border-brand-red outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                        <input 
                          required 
                          type="tel"
                          name="phone"
                          value={fields.phone}
                          onChange={handleFieldChange}
                          placeholder="10-digit mobile number" 
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-brand-dark focus:bg-white focus:border-brand-red outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Student ID (Optional)</label>
                        <input 
                          type="text"
                          name="studentId"
                          value={fields.studentId}
                          onChange={handleFieldChange}
                          placeholder="BK-XXXXX" 
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-brand-dark focus:bg-white focus:border-brand-red outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{formType === 'feedback' ? 'Department' : 'Grievance Type'}</label>
                        <select
                          name="category"
                          value={fields.category}
                          onChange={handleFieldChange}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-brand-dark focus:bg-white focus:border-brand-red outline-none transition-all appearance-none">
                          {formType === 'feedback' ? (
                            <>
                              <option value="Academic Quality">Academic Quality</option>
                              <option value="Administrative Support">Administrative Support</option>
                              <option value="Infrastructure">Infrastructure</option>
                              <option value="Digital Experience">Digital Experience</option>
                              <option value="Other">Other</option>
                            </>
                          ) : (
                            <>
                              <option value="Academic Conflict">Academic Conflict</option>
                              <option value="Discrimination / Conduct">Discrimination / Conduct</option>
                              <option value="Fee Related Issue">Fee Related Issue</option>
                              <option value="Resource Access">Resource Access</option>
                              <option value="Technical Grievance">Technical Grievance</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                      <textarea 
                        required 
                        rows="5"
                        name="message"
                        value={fields.message}
                        onChange={handleFieldChange}
                        placeholder={formType === 'feedback' ? "Tell us what you liked or how we can improve..." : "Describe your grievance in detail so we can assist you better..."}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-3xl font-bold text-brand-dark focus:bg-white focus:border-brand-red outline-none transition-all resize-none"
                      ></textarea>
                    </div>

                    {errorMsg && (
                      <p className="text-sm font-bold text-brand-red">{errorMsg}</p>
                    )}

                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full py-6 bg-brand-dark text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-brand-dark/20 hover:bg-brand-red hover:shadow-brand-red/30 transition-all duration-500 transform active:scale-95 disabled:opacity-60"
                    >
                      {submitting ? 'Processing...' : `Process ${formType === 'feedback' ? 'Feedback' : 'Grievance'}`}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Assistance Contact */}
            <div className="mt-16 bg-gray-50 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-black text-brand-dark mb-2 tracking-tight">Need Urgent Assistance?</h3>
                <p className="text-gray-500 font-medium">Reach out to our student helpline directly for immediate support.</p>
              </div>
              <a 
                href="tel:+918888301363" 
                className="px-8 py-4 bg-white border-2 border-gray-100 rounded-2xl text-brand-red font-black text-sm uppercase tracking-widest hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm"
              >
                +91 88883 01363
              </a>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}} />
    </div>
  );
};

export default GrievancePage;

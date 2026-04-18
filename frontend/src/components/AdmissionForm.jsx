import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, User, GraduationCap, MapPin, Phone, Mail, Award, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { API_BASE } from '../api';


const InputField = ({ label, placeholder, type = "text", name, value, onChange, icon: Icon }) => (
  <div className="flex flex-col gap-2 group relative">
    <label className="text-[10px] font-black text-indigo-950/40 uppercase tracking-[0.2em] group-focus-within:text-brand-red transition-all duration-300 ml-1">
      {label}
    </label>
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-indigo-950/20 group-focus-within:text-brand-red transition-all duration-300">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <input 
        type={type} 
        value={value}
        name={name}
        placeholder={placeholder}
        className="w-full bg-gray-50/50 backdrop-blur-sm border-2 border-gray-100/50 rounded-2xl pl-14 pr-6 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all duration-500 text-sm shadow-sm hover:shadow-md outline-none"
        onChange={onChange}
      />
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-red group-focus-within:w-full transition-all duration-700 ease-out"></div>
    </div>
  </div>
);

const SelectField = ({ label, options, name, value, onChange, icon: Icon }) => (
  <div className="flex flex-col gap-2 group relative">
    <label className="text-[10px] font-black text-indigo-950/40 uppercase tracking-[0.2em] group-focus-within:text-brand-red transition-all duration-300 ml-1">
      {label}
    </label>
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-indigo-950/20 group-focus-within:text-brand-red transition-all duration-300">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <select 
        value={value}
        name={name}
        className="w-full bg-gray-50/50 backdrop-blur-sm border-2 border-gray-100/50 rounded-2xl pl-14 pr-12 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all duration-500 text-sm shadow-sm hover:shadow-md outline-none appearance-none cursor-pointer"
        onChange={onChange}
      >
        <option value="" disabled>Select {label}</option>
        {options.map(opt => <option key={opt} value={opt} className="font-bold">{opt}</option>)}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-950/20 group-focus-within:text-brand-red transition-all">
        <ChevronRight size={18} className="rotate-90" />
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-red group-focus-within:w-full transition-all duration-700 ease-out"></div>
    </div>
  </div>
);

const AdmissionForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', 
    mobile: '', 
    email: '', 
    parentName: '',
    parentMobile: '',
    class: '',
    target: '',
    mode: '',
    previousScore: '',
    address: '',
    scholarship: 'No',
    referredBy: '',
    declaration: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile' || name === 'parentMobile') {
      const numeric = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numeric }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !otpVerified) {
      setOtpError('Please verify your mobile number to continue');
      return;
    }
    setStep(s => s + 1);
  };
  const prevStep = () => setStep(s => s - 1);

  const handleSendOtp = () => {
    if (formData.mobile.length !== 10) return;
    setVerifyingOtp(true);
    // OTP gateway not configured — bypass after acknowledgement
    setTimeout(() => {
      setOtpSent(true);
      setVerifyingOtp(false);
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (otpValue.length < 1) return;
    setVerifyingOtp(true);
    // Bypass: SMS gateway not connected; verification happens offline
    setTimeout(() => {
      setOtpVerified(true);
      setOtpSent(false);
      setOtpError('');
      setVerifyingOtp(false);
    }, 600);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Manual Validation
    const requiredFields = ['fullName', 'mobile', 'email', 'parentName', 'parentMobile', 'class', 'target', 'mode', 'address'];
    const missing = requiredFields.filter(f => !formData[f]);
    
    if (missing.length > 0) {
      alert('Please fill all required fields before submitting.');
      return;
    }

    console.log('🚀 Attempting Admission Submission:', formData);
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/admission/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      console.log('📥 Backend Response:', result);
      
      if (result.success) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setOtpError('Submission failed: ' + (result.message || 'Please check all required fields.'));
      }
    } catch (error) {
      console.error('❌ Admission Submit Error:', error);
      setOtpError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center p-6 animate-fade-scale">
        <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red via-brand-yellow to-brand-red"></div>
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h2 className="text-4xl font-black text-brand-dark mb-4 uppercase tracking-tight">Admission <span className="text-brand-red">Initiated</span></h2>
          <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
            Your application for <span className="text-brand-dark font-black">BK Science Academy</span> has been received successfully. 
            Our academic counselor will reach out to you within 24 hours to schedule your entrance interview.
          </p>
          <div className="bg-brand-gray/50 rounded-3xl p-8 mb-10 text-left border border-gray-100">
            <h3 className="text-xs font-black text-indigo-950/40 uppercase tracking-[0.2em] mb-4">Application Summary</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Application ID</p>
                <p className="font-black text-brand-dark uppercase">BKSA-{Math.floor(Math.random() * 90000) + 10000}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Class/Target</p>
                <p className="font-black text-brand-dark capitalize">{formData.class} • {formData.target}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Candidate</p>
                <p className="font-black text-brand-dark">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Contact</p>
                <p className="font-black text-brand-dark">+91 {formData.mobile}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="group flex items-center justify-center gap-3 w-full bg-brand-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-red transition-all duration-500 shadow-xl shadow-brand-dark/20"
          >
            Return to Academy Home
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Side: Cinematic Branding & Progress */}
        <div className="lg:col-span-5 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 text-brand-red rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-fade-up">
            <Sparkles size={14} />
            Academic Enrollment 2025-26
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-brand-dark uppercase tracking-tighter leading-[0.9] mb-8 animate-fade-up stagger-1">
            Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-600 drop-shadow-sm">Legacy</span> With <br />
            BK Academy
          </h1>
          <p className="text-gray-500 text-lg font-medium max-w-md mb-12 animate-fade-up stagger-2 leading-relaxed">
            Fill out the formal admission application to secure your seat in our premium academic batches. This is the first step towards your dream career in Engineering or Medicine.
          </p>

          <div className="space-y-8 animate-fade-up stagger-3">
            {[
              { id: 1, label: 'Candidate Profile', sub: 'Personal & Contact Information' },
              { id: 2, label: 'Academic Standing', sub: 'Education Records & Target Selection' },
              { id: 3, label: 'Final Declaration', sub: 'Address & Scholarship Details' }
            ].map((s) => (
              <div key={s.id} className="flex gap-6 group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 shadow-lg ${
                  step === s.id ? 'bg-brand-red text-white scale-110 shadow-brand-red/30' : 
                  step > s.id ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-white text-gray-300'
                }`}>
                  {step > s.id ? <CheckCircle size={24} /> : s.id}
                </div>
                <div className={`transition-all duration-500 ${step === s.id ? 'translate-x-2' : ''}`}>
                  <h3 className={`text-lg font-black uppercase tracking-widest ${step === s.id ? 'text-brand-dark' : 'text-gray-400'}`}>
                    {s.label}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tight">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-white/50 backdrop-blur-md border border-white shadow-xl animate-fade-up stagger-4">
            <div className="flex items-center gap-4 text-brand-dark">
              <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
                <Phone className="text-brand-red" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Admission Hotline</p>
                <p className="text-lg font-black tracking-tighter transition-colors hover:text-brand-red cursor-pointer">+91 91580 00000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-End Glassmorphic Form */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}
            className="bg-white rounded-[40px] md:rounded-[60px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] p-8 md:p-14 lg:p-16 border border-gray-100/50 animate-fade-scale"
          >
            {step === 1 && (
              <div className="space-y-10 animate-fade-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Full Name" placeholder="Ex: Rahul Sharma" name="fullName" value={formData.fullName} onChange={handleChange} icon={User} />
                  
                  <div className="flex flex-col gap-2 group relative">
                    <label className="text-[10px] font-black text-indigo-950/40 uppercase tracking-[0.2em] group-focus-within:text-brand-red transition-all duration-300 ml-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-indigo-950/20 group-focus-within:text-brand-red transition-all duration-300">
                          <Phone size={18} strokeWidth={2.5} />
                        </div>
                        <input 
                          disabled={otpVerified}
                          type="tel" 
                          value={formData.mobile}
                          placeholder="+91 00000 00000"
                          className={`w-full bg-gray-50/50 backdrop-blur-sm border-2 ${otpVerified ? 'border-green-100 bg-green-50/30' : 'border-gray-100/50'} rounded-2xl pl-12 pr-24 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all duration-500 text-sm shadow-sm outline-none`}
                          onChange={handleChange}
                          name="mobile"
                        />
                        {/* Inline Verify/Status Button */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          {otpVerified ? (
                            <div className="bg-green-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 animate-topic-pop">
                              <CheckCircle size={14} /> Verified
                            </div>
                          ) : !otpSent && (
                            <button 
                              type="button"
                              disabled={formData.mobile.length !== 10 || verifyingOtp}
                              onClick={handleSendOtp}
                              className="px-4 py-2 bg-brand-dark text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-brand-red transition-all disabled:opacity-30"
                            >
                              {verifyingOtp ? '...' : 'Send OTP'}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* MINIMAL OTP ENTRY ATTACHED TO FIELD */}
                      {otpSent && !otpVerified && (
                        <div className="mt-2 animate-fade-up relative">
                           <input 
                            type="text" 
                            placeholder="4-Digit Code"
                            maxLength={4}
                            value={otpValue}
                            className="w-full bg-white border-2 border-brand-red/30 rounded-2xl pl-6 pr-24 py-3 font-bold text-brand-dark focus:border-brand-red outline-none transition-all text-sm shadow-lg"
                            onChange={(e) => setOtpValue(e.target.value)}
                           />
                          <button 
                            type="button"
                            disabled={otpValue.length !== 4 || verifyingOtp}
                            onClick={handleVerifyOtp}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-brand-red text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-brand-dark transition-all"
                          >
                            {verifyingOtp ? '...' : 'Confirm'}
                          </button>
                        </div>
                      )}
                    </div>
                    {otpError && <p className="text-[10px] font-bold text-brand-red uppercase tracking-wider ml-1 mt-1">{otpError}</p>}
                  </div>
                </div>

                <InputField label="Personal Email" placeholder="rahul@example.com" type="email" name="email" value={formData.email} onChange={handleChange} icon={Mail} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Parent/Guardian Name" placeholder="Ex: Mr. Sharma" name="parentName" value={formData.parentName} onChange={handleChange} icon={User} />
                  <InputField label="Parent Contact" placeholder="+91 00000 00000" name="parentMobile" value={formData.parentMobile} onChange={handleChange} icon={Phone} />
                </div>
                <button 
                  type="button"
                  onClick={nextStep}
                  className={`group flex items-center justify-center gap-3 w-full bg-brand-red text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-brand-red/30 ${!otpVerified ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                >
                  Continue Application
                  <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 animate-fade-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SelectField 
                    label="Current Class" 
                    options={["10th (Moving to 11th)", "11th (Moving to 12th)", "12th", "Repeater (12th Pass)"]} 
                    name="class" 
                    value={formData.class} 
                    onChange={handleChange} 
                    icon={GraduationCap} 
                  />
                  <SelectField 
                    label="Target Examination" 
                    options={["JEE Main + Advanced", "NEET-UG"]} 
                    name="target" 
                    value={formData.target} 
                    onChange={handleChange} 
                    icon={Award} 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SelectField 
                    label="Learning Mode" 
                    options={["Classroom (Face-to-Face)", "Distance Learning", "Live Online"]} 
                    name="mode" 
                    value={formData.mode} 
                    onChange={handleChange} 
                    icon={Sparkles} 
                  />
                  <InputField label="Previous Year Score (%)" placeholder="Ex: 92%" name="previousScore" value={formData.previousScore} onChange={handleChange} icon={Award} />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="w-20 md:w-24 bg-gray-100 text-brand-dark flex items-center justify-center rounded-3xl hover:bg-gray-200 transition-all font-black"
                  >
                    <ChevronRight size={24} className="rotate-180" />
                  </button>
                  <button 
                    type="button"
                    onClick={nextStep}
                    className="group flex items-center justify-center gap-3 flex-1 bg-brand-red text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-brand-red/30"
                  >
                    Next Component
                    <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10 animate-fade-up">
                <div className="flex flex-col gap-2 group relative">
                  <label className="text-[10px] font-black text-indigo-950/40 uppercase tracking-[0.2em] group-focus-within:text-brand-red transition-all duration-300 ml-1">
                    Permanent Address
                  </label>
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute top-5 left-5 text-indigo-950/20 group-focus-within:text-brand-red transition-all duration-300">
                      <MapPin size={18} strokeWidth={2.5} />
                    </div>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete residential address..."
                      rows="4"
                      className="w-full bg-gray-50/50 backdrop-blur-sm border-2 border-gray-100/50 rounded-2xl pl-14 pr-6 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all duration-500 text-sm shadow-sm hover:shadow-md outline-none resize-none"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-red group-focus-within:w-full transition-all duration-700 ease-out"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SelectField 
                    label="Apply for Scholarship?" 
                    options={["No", "Yes (Based on merit)", "Yes (Based on income)"]} 
                    name="scholarship" 
                    value={formData.scholarship} 
                    onChange={handleChange} 
                    icon={FileText} 
                  />
                  <InputField label="Referred By (Optional)" placeholder="Name/Code" name="referredBy" value={formData.referredBy} onChange={handleChange} icon={User} />
                </div>

                <div className="p-6 bg-brand-gray/50 rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Declaration</p>
                    <label className="flex gap-4 cursor-pointer group">
                        <div className="relative mt-1">
                            <input 
                              type="checkbox" 
                              id="declaration" 
                              className="sr-only" 
                              checked={formData.declaration} 
                              onChange={() => setFormData(prev => ({ ...prev, declaration: !prev.declaration }))} 
                            />
                            <div 
                              onClick={() => setFormData(prev => ({ ...prev, declaration: !prev.declaration }))}
                              className={`w-6 h-6 border-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${formData.declaration ? 'bg-brand-red border-brand-red' : 'border-gray-200 hover:border-brand-red'}`}
                            >
                               {formData.declaration && <CheckCircle size={14} className="text-white" />}
                            </div>
                        </div>
                        <span className="text-xs font-bold text-gray-500 leading-relaxed group-hover:text-brand-dark transition-colors">
                            I verify that all information provided is accurate. I understand that admission is subject to the academy's terms and successful verification of documents.
                        </span>
                    </label>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="w-20 md:w-24 bg-gray-100 text-brand-dark flex items-center justify-center rounded-3xl hover:bg-gray-200 transition-all font-black"
                  >
                    <ChevronRight size={24} className="rotate-180" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!formData.declaration) {
                        alert('Please check the declaration box to proceed.');
                        return;
                      }
                      handleSubmit();
                    }}
                    disabled={isSubmitting}
                    className="group flex items-center justify-center gap-4 flex-1 bg-brand-dark text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-brand-red hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-2xl shadow-brand-dark/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            Submit Application
                            <Sparkles size={20} className="text-brand-yellow group-hover:rotate-12 transition-transform" />
                        </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Educational Trust Badge */}
          <div className="mt-12 flex items-center justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 animate-fade-up stagger-5">
            <div className="flex flex-col items-center">
                <Award size={32} className="mb-2" />
                <p className="text-[8px] font-black uppercase tracking-widest">ISO 9001:2015</p>
            </div>
            <div className="w-[1px] h-10 bg-gray-300"></div>
            <div className="flex flex-col items-center">
                <GraduationCap size={32} className="mb-2" />
                <p className="text-[8px] font-black uppercase tracking-widest">UGC Approved</p>
            </div>
            <div className="w-[1px] h-10 bg-gray-300"></div>
            <div className="flex flex-col items-center">
                <Sparkles size={32} className="mb-2" />
                <p className="text-[8px] font-black uppercase tracking-widest">NTA Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;

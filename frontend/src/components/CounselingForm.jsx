import React, { useState, useRef } from 'react';
import { 
  User, 
  BookOpen, 
  Target, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  School,
  ClipboardCheck,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Award,
  Users,
  MessageCircle,
  Clock,
  Sparkles,
  Zap,
  Mail,
  Download,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { RefreshCw } from 'lucide-react';

const StepIndicator = ({ step, setStep }) => {
  return (
    <div className="flex items-center justify-between max-w-sm mx-auto mb-6 relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className="relative z-10 flex flex-col items-center gap-2">
          <button 
            type="button"
            onClick={() => setStep(num)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
              step >= num ? 'bg-brand-red text-white scale-110 shadow-xl shadow-red-100' : 'bg-slate-200 text-slate-500'
            }`}>
              {step > num ? <CheckCircle2 size={16} /> : <span className="font-bold text-xs">{num}</span>}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

const FormInput = ({ label, icon: Icon, focusedField, setFocusedField, ...props }) => (
  <div className="relative group">
    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 transition-colors group-focus-within:text-brand-red">
      {label}
    </label>
    <div className={`relative transition-all duration-300 rounded-xl border-2 ${
      focusedField === props.name ? 'border-brand-red bg-white shadow-xl shadow-red-100/50' : 'border-gray-300 bg-white hover:border-gray-400'
    }`}>
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red">
        <Icon size={14} />
      </div>
      <input 
        {...props}
        onFocus={() => setFocusedField(props.name)}
        onBlur={() => setFocusedField(null)}
        className="w-full pl-10 pr-3 py-3 rounded-xl bg-transparent outline-none text-slate-900 placeholder:text-gray-400 font-bold text-sm"
      />
    </div>
  </div>
);

const CounselingForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const pdfRef = useRef(null);
  
  const [formData, setFormData] = useState({
    email: '',
    studentName: '',
    parentName: '',
    mobile: '',
    whatsapp: '',
    gender: '',
    schoolName: '',
    currentClass: '',
    medium: '',
    stream: '',
    careerInterest: '',
    guidanceType: [],
    preferredLanguage: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: new Date().getHours() < 10 ? '10:00' : `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
    declaration: false,
    presence: 'Offline (In-Class)'
  });

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // 10-digit numeric constraint for whatsapp and mobile
    if (name === 'whatsapp' || name === 'mobile') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
      return;
    }

    if (type === 'checkbox' && name === 'guidanceType') {
      const updatedGuidance = checked 
        ? [...formData.guidanceType, value]
        : formData.guidanceType.filter(item => item !== value);
      setFormData({ ...formData, guidanceType: updatedGuidance });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, totalSteps));
  };
  
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Manual Validation for all steps
    if (!formData.studentName || !formData.email || !formData.whatsapp) {
      alert("Please fill in Step 1: Name, Email, and WhatsApp are required.");
      setStep(1);
      return;
    }
    if (formData.whatsapp.length < 10) {
      alert("WhatsApp number must be 10 digits.");
      setStep(1);
      return;
    }
    if (!formData.schoolName || !formData.currentClass || !formData.stream) {
      alert("Please fill in Step 2: School, Class, and Stream are required.");
      setStep(2);
      return;
    }
    if (!formData.careerInterest) {
      alert("Please fill in Step 3: Primary Interest is required.");
      setStep(3);
      return;
    }
    if (!formData.declaration) {
      alert("Please check the 'I confirm data accuracy' box in Step 4.");
      return;
    }

    setFocusedField('submitting'); // Show loading state
    try {
      console.log('🚀 Submitting counseling form...', formData);
      const res = await fetch('/api/counseling/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log('📡 Server response:', data);
      if (data.success) {
        setSubmittedData(data.data);
        setIsSubmitted(true);
      } else {
        alert(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Connection error. Please check your internet and try again.');
    } finally {
      setFocusedField(null);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2rem] shadow-2xl p-8 text-center border border-green-50 max-w-sm mx-auto"
      >
        <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-12 shadow-inner">
          <CheckCircle2 size={28} strokeWidth={2.5} />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tight uppercase">Registered!</h2>
        <p className="text-slate-500 text-xs mb-6 leading-relaxed px-4">
          Success! Your <span className="font-bold text-brand-red">Counseling Session</span> has been booked. Our team will contact you shortly.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => { setIsSubmitted(false); setStep(1); if(onClose) onClose(); }}
            className="w-full py-3.5 bg-brand-red text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg active:scale-95"
          >
            Close Window
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden max-w-xl mx-auto"
    >
      <div className="bg-brand-dark p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-brand-yellow" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow">Session 2026</span>
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight leading-none">Free Counseling</h2>
            <p className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em] mt-1">For 10th, 11th & 12th Students</p>
          </div>
          {onClose && (
            <button 
              onClick={onClose} 
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-brand-red rounded-full transition-all group border border-white/10 shadow-lg"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Cancel</span>
              <X size={14} className="group-hover:rotate-90 transition-transform" />
            </button>
          )}
        </div>
      </div>

      <div className="p-8">
        <StepIndicator step={step} setStep={setStep} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <FormInput label="Email Address *" name="email" type="email" icon={Mail} placeholder="your@email.com" value={formData.email} onChange={handleInputChange} focusedField={focusedField} setFocusedField={setFocusedField} />
                <FormInput label="Student Name *" name="studentName" type="text" icon={User} placeholder="Full Name" value={formData.studentName} onChange={handleInputChange} focusedField={focusedField} setFocusedField={setFocusedField} />
                <FormInput label="WhatsApp No. *" name="whatsapp" type="tel" icon={MessageCircle} placeholder="WhatsApp No." value={formData.whatsapp} onChange={handleInputChange} focusedField={focusedField} setFocusedField={setFocusedField} maxLength="10" inputMode="numeric" />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <FormInput label="School / College Name *" name="schoolName" type="text" icon={School} placeholder="Institution Name" value={formData.schoolName} onChange={handleInputChange} focusedField={focusedField} setFocusedField={setFocusedField} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Class *</label>
                    <select name="currentClass" value={formData.currentClass} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-brand-red outline-none font-bold text-sm">
                      <option value="">Select Class</option>
                      <option>10th (X)</option>
                      <option>11th (XI)</option>
                      <option>12th (XII)</option>
                      <option>12th Pass (Repeater)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Stream *</label>
                    <select name="stream" value={formData.stream} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-brand-red outline-none font-bold text-sm">
                      <option value="">Select Stream</option>
                      <option>Science</option>
                      <option>Commerce</option>
                      <option>Arts</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Primary Interest *</label>
                  <select name="careerInterest" value={formData.careerInterest} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-brand-red outline-none font-bold text-sm">
                    <option value="">Select Path</option>
                    <option>JEE / Engineering</option>
                    <option>NEET / Medical</option>
                    <option>NDA / Defense</option>
                    <option>UPSC / MPSC</option>
                  </select>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Guidance Req.</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Scholarships', 'Exams', 'Planning', 'Selection'].map(opt => (
                      <label key={opt} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${formData.guidanceType.includes(opt) ? 'bg-brand-red text-white border-brand-red' : 'bg-white border-slate-100 text-slate-500'}`}>
                        <input type="checkbox" name="guidanceType" value={opt} className="hidden" onChange={handleInputChange} checked={formData.guidanceType.includes(opt)} />
                        <span className="text-[10px] font-black uppercase">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Counseling Mode *</label>
                  <div className="flex gap-4">
                    {['Online', 'Offline (In-Class)'].map(mode => (
                      <label key={mode} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${formData.presence === mode ? 'bg-brand-red text-white border-brand-red shadow-lg' : 'bg-white border-slate-100 text-slate-500 hover:border-brand-red/30'}`}>
                        <input type="radio" name="presence" value={mode} className="hidden" onChange={handleInputChange} checked={formData.presence === mode} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormInput 
                    label="Pref. Date" 
                    name="appointmentDate" 
                    type="date" 
                    icon={Calendar} 
                    value={formData.appointmentDate} 
                    onChange={handleInputChange} 
                    focusedField={focusedField} 
                    setFocusedField={setFocusedField}
                    min={new Date().toISOString().split('T')[0]}
                    max="2026-12-31"
                  />
                  <FormInput 
                    label="Pref. Time (10 AM - 6 PM)" 
                    name="appointmentTime" 
                    type="time" 
                    icon={Clock} 
                    value={formData.appointmentTime} 
                    onChange={handleInputChange} 
                    focusedField={focusedField} 
                    setFocusedField={setFocusedField} 
                    min="10:00"
                    max="18:00"
                  />
                </div>
                <div className="p-4 bg-brand-yellow/10 rounded-2xl border border-brand-yellow/20">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="declaration" className="mt-1" checked={formData.declaration} onChange={handleInputChange} />
                    <span className="text-[10px] font-bold text-slate-600 leading-tight uppercase">I confirm data accuracy.</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="flex-1 py-3 px-4 rounded-xl font-black text-slate-400 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                <ChevronLeft size={14} /> Back
              </button>
            )}
            {step < totalSteps ? (
              <button type="button" onClick={nextStep} className="flex-[2] py-3 px-5 bg-brand-red text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-red-100 flex items-center justify-center gap-2 active:scale-95">
                Next Step <ChevronRight size={14} />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={focusedField === 'submitting'}
                className={`flex-[2] py-3 px-5 ${focusedField === 'submitting' ? 'bg-slate-400' : 'bg-brand-red'} text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-red-100 flex items-center justify-center gap-3 active:scale-95`}
              >
                {focusedField === 'submitting' ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <ClipboardCheck size={18} /> Register
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

    </motion.div>
  );
};

export default CounselingForm;

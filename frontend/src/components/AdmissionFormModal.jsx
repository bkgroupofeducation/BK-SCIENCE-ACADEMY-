import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronRight, ChevronLeft, Upload, 
  CheckCircle, ShieldCheck, CreditCard, 
  User, MapPin, GraduationCap, FileText,
  Camera, PenTool, Sparkles, Phone, Mail, Award,
  Calendar, Download, BookOpen
} from 'lucide-react';
import { apiFetch, API_BASE } from '../api';
import SafeImage from './SafeImage';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/* ─── Premium Academy UI Components ─── */

const AcademyInput = ({ label, icon: Icon, ...props }) => (
  <div className="flex flex-col gap-2 group relative">
    <label className="text-[10px] font-black text-indigo-950/80 uppercase tracking-[0.2em] group-focus-within:text-brand-red transition-all duration-300 ml-1">
      {label}
    </label>
    <div className="relative overflow-hidden rounded-2xl shadow-sm">
      {Icon && (
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-indigo-950/20 group-focus-within:text-brand-red transition-all duration-300">
          <Icon size={18} strokeWidth={2.5} />
        </div>
      )}
      <input 
        {...props}
        className={`w-full bg-white border-2 border-gray-300 rounded-2xl ${Icon ? 'pl-14' : 'px-6'} pr-6 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all duration-500 text-sm outline-none placeholder:text-gray-400`}
      />
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-red group-focus-within:w-full transition-all duration-700 ease-out"></div>
    </div>
  </div>
);

const AcademySelect = ({ label, options, icon: Icon, ...props }) => (
  <div className="flex flex-col gap-2 group relative">
    <label className="text-[10px] font-black text-indigo-950/80 uppercase tracking-[0.2em] group-focus-within:text-brand-red transition-all duration-300 ml-1">
      {label}
    </label>
    <div className="relative overflow-hidden rounded-2xl shadow-sm">
      {Icon && (
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-indigo-950/20 group-focus-within:text-brand-red transition-all duration-300">
          <Icon size={18} strokeWidth={2.5} />
        </div>
      )}
      <select 
        {...props}
        className={`w-full bg-white border-2 border-gray-300 rounded-2xl ${Icon ? 'pl-14' : 'px-6'} pr-12 py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white transition-all duration-500 text-sm outline-none appearance-none cursor-pointer`}
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

const AcademyButton = ({ children, variant = 'primary', ...props }) => {
  const base = "flex items-center justify-center gap-3 py-2 px-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-500 text-xs md:text-sm shadow-xl";
  const variants = {
    primary: "bg-brand-red text-white shadow-brand-red/20 hover:bg-brand-dark hover:scale-[1.02] active:scale-95",
    secondary: "bg-brand-dark text-white shadow-brand-dark/20 hover:bg-brand-red hover:scale-[1.02] active:scale-95",
    outline: "border-2 border-gray-100 text-brand-dark bg-white hover:border-brand-red hover:text-brand-red"
  };
  
  return (
    <button 
      {...props} 
      className={`${base} ${variants[variant]} ${props.className || ''} disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:scale-100 disabled:hover:bg-brand-red`}
    >
      {children}
    </button>
  );
};

/* ─── Main Component ─── */


const AdmissionFormModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [formNumber, setFormNumber] = useState(null);
  const pdfRef = useRef(null);

  const initialData = {
    schoolName: '', salutation: '', firstName: '', middleName: '', surname: '',
    firstNameLocal: '', middleNameLocal: '', surnameLocal: '',
    fatherName: '', motherName: '', dob: '', age: '', gender: '',
    mobileSelf: '', mobileParents: '', email: '', motherTongue: '',
    isIndianNational: 'Yes', isMaharashtraDomiciled: 'Yes', otherDomicile: '',
    canReadWriteSpeakMarathi: 'Yes', maritalStatus: 'Unmarried',
    isDisabled: 'No', disabilityType: '',
    category: 'General', otherCategory: '', isNonCreamyLayer: 'No',
    fatherOccupation: '', motherOccupation: '', fatherEducation: '', motherEducation: '',
    edu10th: { board: '', year: '', marks: '', cgpa: '' },
    edu12th: { board: '', year: '', marks: '', cgpa: '' },
    eduDegree: { board: '', year: '', marks: '', cgpa: '' },
    eduPG: { board: '', year: '', marks: '', cgpa: '' },
    examCategory: '',
    courses: [],
    currentAddress: { door: '', street: '', city: '', taluka: '', district: '', state: 'Maharashtra', pincode: '' },
    permanentAddress: { door: '', street: '', city: '', taluka: '', district: '', state: 'Maharashtra', pincode: '' },
    isAddressSame: false,
    date: new Date().toISOString().split('T')[0],
    place: '',
    isDeclared: false,
    photo: null, signature: null, photoPreview: null, signaturePreview: null
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    const saved = localStorage.getItem('bksa_admission_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed, photo: null, signature: null, photoPreview: null, signaturePreview: null }));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const { photo, signature, photoPreview, signaturePreview, ...toSave } = formData;
    localStorage.setItem('bksa_admission_draft', JSON.stringify(toSave));
  }, [formData]);

  const handleInputChange = (e, field, subField = null) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;

    // Strict 10-digit phone validation
    const fieldName = name || field;
    const sub = subField || '';
    if (['mobileSelf', 'mobileParents', 'phone'].includes(fieldName)) {
      val = val.replace(/\D/g, '').slice(0, 10);
    }
    if (sub.toLowerCase().includes('year') || fieldName.toLowerCase().includes('year')) {
      val = val.replace(/\D/g, '').slice(0, 4);
    }
    if (sub.toLowerCase().includes('pincode') || fieldName.toLowerCase().includes('pincode')) {
      val = val.replace(/\D/g, '').slice(0, 6);
    }
    if (sub.toLowerCase().includes('marks') || fieldName.toLowerCase().includes('marks')) {
      let digits = val.replace(/\D/g, '');
      if (digits.length > 0) {
        if (parseInt(digits) > 100) digits = '100';
        val = digits + '%';
      } else {
        val = '';
      }
    }

    if (fieldName === 'dob' && val) {
      const birthDate = new Date(val);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({ ...prev, dob: val, age: age > 0 ? age.toString() : '' }));
    } else if (subField) {
      setFormData(prev => ({ ...prev, [field]: { ...prev[field], [subField]: val } }));
    } else {
      setFormData(prev => ({ ...prev, [fieldName]: val }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file && file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, [type]: file, [`${type}Preview`]: reader.result }));
      reader.readAsDataURL(file);
    } else if (file) alert('File must be < 1MB');
  };

  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
      setFormData(prev => ({ ...prev, age }));
    }
  }, [formData.dob]);

  const toggleCourse = (course) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.includes(course) ? prev.courses.filter(c => c !== course) : [...prev.courses, course]
    }));
  };

  const handlePayment = async () => {
    // Basic required field validation
    const required = ['firstName', 'surname'];
    const missing = required.filter(f => !formData[f]);
    if (missing.length > 0) {
      alert(`Please fill the following required fields: ${missing.join(', ')}`);
      return;
    }

    setLoading(true);
    console.log("🚀 Starting payment flow...", formData);
    try {
      const finalData = new FormData();
      Object.keys(formData).forEach(key => {
        if (['photo', 'signature'].includes(key)) { if (formData[key]) finalData.append(key, formData[key]); }
        else if (typeof formData[key] === 'object') finalData.append(key, JSON.stringify(formData[key]));
        else finalData.append(key, formData[key]);
      });

      const submitRes = await apiFetch('/api/admission/submit', { method: 'POST', body: finalData });
      if (!submitRes.success) throw new Error(submitRes.message);
      
      // Capture the official form number from backend
      if (submitRes.data && submitRes.data.formNumber) {
        setFormNumber(submitRes.data.formNumber);
      }

      // Razorpay has been removed. Proceeding with direct submission.
      setPaymentId('DIRECT_SUBMISSION');
      setSuccess(true);
      generatePDF();
      localStorage.removeItem('bksa_admission_draft');
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  const generatePDF = async () => {
    if (!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save(`BK_Admission_${formData.firstName}.pdf`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="relative bg-white rounded-[40px] w-full max-w-6xl max-h-[90vh] shadow-[0_50px_100px_-20px_rgba(30,27,75,0.25)] overflow-hidden flex flex-col border border-white/20"
      >
        {/* Glassmorphic Header */}
        {/* Institutional Letterhead Header */}
        <div className="bg-[#fcfcfc] border-b-[6px] border-double border-[#800000] p-6 md:p-8 relative shrink-0">
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 hover:bg-brand-red hover:text-white transition-all z-50 rounded-full group shadow-sm border border-gray-200"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Cancel</span>
            <X size={16} className="group-hover:rotate-90 transition-transform" />
          </button>

          <div className="grid grid-cols-3 items-start gap-4 mt-6">
            {/* Left: English Headings */}
            <div className="text-left">
              <h2 className="text-[9px] sm:text-xs md:text-xl font-black text-black uppercase tracking-wide whitespace-nowrap" style={{ fontFamily: "'Times New Roman', serif" }}>
                <span className="text-brand-red">BK</span> EDUCATIONAL & WELFARE SOCIETY
              </h2>
              <h4 className="text-[7px] sm:text-[8px] md:text-xs font-bold text-black uppercase tracking-[0.1em] md:tracking-[0.2em] opacity-80 mt-0.5 md:mt-1" style={{ fontFamily: "'Times New Roman', serif" }}>
                <span className="text-brand-red">BK</span> GROUP OF EDUCATION
              </h4>
              <p className="text-[7px] sm:text-[8px] md:text-xs font-black text-brand-red mt-1 md:mt-2 tracking-tighter md:tracking-widest uppercase flex items-center gap-1 md:gap-2">
                <Phone size={8} className="md:w-2.5 md:h-2.5" /> +91 80801 95558
              </p>
            </div>

            {/* Center: BK Logo & Taglines */}
            <div className="flex flex-col items-center gap-0.5 md:gap-1 relative px-1 md:px-4">
               <div className="relative z-10 text-center space-y-0">
                  <p className="text-[5px] sm:text-[6px] md:text-[9px] font-black text-gray-700 tracking-tighter md:tracking-wider whitespace-nowrap">॥ न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ॥</p>
                  <p className="text-[6px] sm:text-[7px] md:text-[10px] text-[#800000] font-black uppercase tracking-widest">We shape careers...</p>
               </div>
               
               <div className="relative z-10 flex items-center justify-center mt-0.5">
                  <SafeImage src="/assets/bk.png" className="h-8 sm:h-10 md:h-16 w-auto object-contain drop-shadow-md" fallbackText="BK" />
               </div>
            </div>

            {/* Right: Address - Same font as institutional heading */}
            <div className="text-left flex justify-start">
              <p className="text-[7px] sm:text-[8px] md:text-[12px] font-black text-black leading-tight md:leading-relaxed max-w-[80px] sm:max-w-[120px] md:max-w-[200px] text-left uppercase tracking-tighter md:tracking-wider" style={{ fontFamily: "'Times New Roman', serif" }}>
                <span className="text-brand-red font-black">Address:</span> 2nd Floor, Gajanan Plaza, Gharpure Ghat Road, Ashok Stambh, Nashik, Maharashtra
              </p>
            </div>
          </div>
        </div>

        {/* Steps Indicator - Numbered Sequence */}
        <div className="px-8 md:px-14 pt-4 pb-2 flex gap-4 shrink-0">
          {[
            { id: 1, label: 'Personal' },
            { id: 2, label: 'Category' },
            { id: 3, label: 'Academic' },
            { id: 4, label: 'Uploads' }
          ].map((s) => (
            <button 
              key={s.id} 
              onClick={() => setStep(s.id)}
              className="flex-1 flex flex-col gap-2 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-black transition-all duration-300 ${step >= s.id ? 'bg-[#800000] text-white shadow-md scale-110' : 'bg-gray-100 text-gray-400'}`}>
                  {s.id}
                </span>
                <span className={`hidden md:block text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${step === s.id ? 'text-[#800000]' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden w-full relative">
                <motion.div 
                  initial={false}
                  animate={{ width: step >= s.id ? '100%' : '0%' }}
                  className={`h-full ${step === s.id ? 'bg-[#800000]' : 'bg-brand-red opacity-30'}`}
                />
              </div>
            </button>
          ))}
        </div>


        {/* Scrollable Content */}
          <div className="p-4 md:p-6 overflow-y-auto max-h-[70vh] custom-scrollbar relative">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="relative mb-10">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl relative z-10">
                    <CheckCircle size={48} />
                  </div>
                  <img src="/assets/bk.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 opacity-5 grayscale" alt="BK Logo" />
                </div>
                <h3 className="text-4xl font-black text-brand-dark uppercase tracking-tighter mb-4">Application Successful!</h3>
                <p className="text-gray-500 font-bold mb-12">An email has been sent to your address with your reference ID.</p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <AcademyButton onClick={generatePDF}><Download size={18} /> Download Form</AcademyButton>
                  <AcademyButton variant="outline" onClick={() => {
                    localStorage.removeItem('bksa_admission_draft');
                    setFormData(initialData);
                    setStep(1);
                    setSuccess(false);
                  }}>
                    <Sparkles size={18} /> Fill Another Form
                  </AcademyButton>
                  <AcademyButton variant="outline" onClick={onClose}>Done</AcademyButton>
                </div>
              </motion.div>
            ) : (
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <AcademyInput label="School/College Name" name="schoolName" value={formData.schoolName} onChange={handleInputChange} icon={GraduationCap} />
                       <AcademySelect label="Salutation" options={['Mr.', 'Ms.', 'Mrs.']} name="salutation" value={formData.salutation} onChange={handleInputChange} icon={User} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <AcademyInput label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                       <AcademyInput label="Middle Name" name="middleName" value={formData.middleName} onChange={handleInputChange} />
                       <AcademyInput label="Surname" name="surname" value={formData.surname} onChange={handleInputChange} />
                    </div>
                    {/* Student Info: DOB, Gender, Age */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                      <AcademyInput label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleInputChange} icon={Calendar} max={new Date().toISOString().split('T')[0]} min="1900-01-01" />
                      <div className="grid grid-cols-2 gap-6">
                        <AcademySelect label="Gender" options={['Male', 'Female', 'Transgender', 'Other']} name="gender" value={formData.gender} onChange={handleInputChange} icon={User} />
                        <AcademyInput label="Age" value={formData.age} readOnly icon={Sparkles} />
                      </div>
                    </div>

                    {/* Contact Info: Email, Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-gray-100">
                      <AcademyInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleInputChange} icon={Mail} />
                      <AcademyInput label="Mobile (Self)" name="mobileSelf" value={formData.mobileSelf} onChange={handleInputChange} icon={Phone} placeholder="10 Digits" />
                      <AcademyInput 
                        label="Mobile (Parent)" 
                        name="mobileParents" 
                        value={formData.mobileParents} 
                        onChange={(e) => {
                          if (e.target.value === formData.mobileSelf && e.target.value.length === 10) {
                            alert("Parent's mobile number cannot be the same as your own.");
                            return;
                          }
                          handleInputChange(e);
                        }} 
                        icon={Phone} 
                        placeholder="10 Digits" 
                      />
                    </div>

                    {/* Family Details: Names, Occupations & Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                      <AcademyInput label="Father's Full Name" name="fatherName" value={formData.fatherName} onChange={handleInputChange} icon={User} />
                      <AcademyInput label="Mother's Full Name" name="motherName" value={formData.motherName} onChange={handleInputChange} icon={User} />
                      
                      <AcademySelect 
                        label="Father's Occupation" 
                        options={['Farmer', 'Business', 'Service', 'Private Job', 'Government Job', 'Other']} 
                        name="fatherOccupation" 
                        value={formData.fatherOccupation} 
                        onChange={handleInputChange} 
                        icon={Award} 
                      />
                      <AcademySelect 
                        label="Mother's Occupation" 
                        options={['Housewife', 'Business', 'Service', 'Private Job', 'Government Job', 'Farmer', 'Other']} 
                        name="motherOccupation" 
                        value={formData.motherOccupation} 
                        onChange={handleInputChange} 
                        icon={Award} 
                      />

                      <AcademySelect 
                        label="Father's Education" 
                        options={['Primary Education', 'Secondary Education', 'SSC', 'HSC', 'Graduation', 'Post Graduation', 'Illiterate']} 
                        name="fatherEducation" 
                        value={formData.fatherEducation} 
                        onChange={handleInputChange} 
                      />
                      <AcademySelect 
                        label="Mother's Education" 
                        options={['Primary Education', 'Secondary Education', 'SSC', 'HSC', 'Graduation', 'Post Graduation', 'Illiterate']} 
                        name="motherEducation" 
                        value={formData.motherEducation} 
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>
               )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                       <AcademySelect label="Nationality" options={['Indian', 'Others']} name="isIndianNational" value={formData.isIndianNational} onChange={handleInputChange} icon={ShieldCheck} />
                       <AcademySelect label="Domicile" options={['Maharashtra', 'Other']} name="isMaharashtraDomiciled" value={formData.isMaharashtraDomiciled} onChange={handleInputChange} icon={MapPin} />
                       <AcademySelect label="Know Marathi?" options={['Yes', 'No']} name="canReadWriteSpeakMarathi" value={formData.canReadWriteSpeakMarathi} onChange={handleInputChange} />
                       <AcademySelect label="Caste Category" options={['General', 'OBC', 'SC', 'ST', 'EWS', 'Other']} name="category" value={formData.category} onChange={handleInputChange} icon={Award} />
                    </div>

                    {(formData.isMaharashtraDomiciled === 'Other' || formData.category === 'Other') && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.isMaharashtraDomiciled === 'Other' && (
                          <AcademyInput label="Specify State" name="otherDomicile" value={formData.otherDomicile} onChange={handleInputChange} placeholder="Type your state..." />
                        )}
                        {formData.category === 'Other' && (
                          <AcademyInput label="Specify Caste" name="otherCategory" value={formData.otherCategory} onChange={handleInputChange} placeholder="Type your caste category..." />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-12">
                    <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-brand-dark text-white text-[10px] uppercase font-black tracking-widest">
                          <tr><th className="p-5">Level</th><th className="p-5">Board</th><th className="p-5">Year</th><th className="p-5">MARKS %</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {['edu10th', 'edu12th'].map(lvl => (
                            <tr key={lvl}>
                              <td className="p-5 font-black text-xs uppercase text-gray-500">{lvl.replace('edu', '')}</td>
                              <td className="p-3"><input className="w-full p-3 bg-white rounded-xl outline-none focus:bg-white border border-gray-300 focus:border-brand-red text-sm font-bold shadow-sm" placeholder="Ex: CBSE / State Board" value={formData[lvl].board} onChange={e => handleInputChange(e, lvl, 'board')} /></td>
                              <td className="p-3"><input type="text" maxLength={4} className="w-full p-3 bg-white rounded-xl outline-none focus:bg-white border border-gray-300 focus:border-brand-red text-sm font-bold shadow-sm" placeholder="Year" value={formData[lvl].year} onChange={e => handleInputChange(e, lvl, 'year')} /></td>
                              <td className="p-3"><input type="text" maxLength={5} className="w-full p-3 bg-white rounded-xl outline-none focus:bg-white border border-gray-300 focus:border-brand-red text-sm font-bold shadow-sm" placeholder="Marks %" value={formData[lvl].marks} onChange={e => handleInputChange(e, lvl, 'marks')} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AcademySelect label="Target Exam" options={['JEE Main + Adv', 'NEET-UG', 'MHT-CET', 'Boards']} name="examCategory" value={formData.examCategory} onChange={handleInputChange} icon={Award} />
                      <AcademySelect 
                        label="Select Course / Program" 
                        options={['2-Year Program', '1-Year Program', 'Crash Course', 'Integrated', 'Repeater', 'Foundation']} 
                        name="courses" 
                        value={formData.courses[0] || ''} 
                        onChange={(e) => setFormData(prev => ({ ...prev, courses: [e.target.value] }))} 
                        icon={BookOpen} 
                      />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="p-6 bg-white rounded-[40px] border border-gray-100 shadow-sm">
                      <div className="space-y-6">
                         <div className="flex justify-between items-center">
                           <h4 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2"><MapPin size={14} /> Permanent Address</h4>
                         </div>
                         <AcademyInput label="Door/Street" value={formData.permanentAddress.door} onChange={e => handleInputChange(e, 'permanentAddress', 'door')} />
                         <div className="grid grid-cols-2 gap-4">
                           <AcademyInput label="City" value={formData.permanentAddress.city} onChange={e => handleInputChange(e, 'permanentAddress', 'city')} />
                           <AcademyInput label="Pincode" maxLength={6} value={formData.permanentAddress.pincode} onChange={e => handleInputChange(e, 'permanentAddress', 'pincode')} />
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-brand-gray/50 rounded-[40px] border border-gray-100">
                       {[
                         { id: 'photo', label: 'Photograph', icon: Camera },
                         { id: 'signature', label: 'Signature', icon: PenTool }
                       ].map(f => (
                         <div key={f.id} className="space-y-4">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">{f.label}</label>
                           <div className="relative h-48 rounded-[32px] border-2 border-dashed border-gray-200 bg-white overflow-hidden group hover:border-brand-red transition-all cursor-pointer">
                              {formData[`${f.id}Preview`] ? (
                                <img src={formData[`${f.id}Preview`]} className="w-full h-full object-cover" />
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-3 group-hover:text-brand-red">
                                  <f.icon size={32} />
                                                                     <span className="text-[10px] font-bold uppercase tracking-widest">Upload File</span>
                                   <span className="text-[8px] font-medium opacity-50 uppercase tracking-tighter mt-1">Max Size: 1MB</span>
                                </div>
                              )}
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileChange(e, f.id)} />
                           </div>
                         </div>
                       ))}
                    </div>


                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4 border-t border-gray-100">
                  <div className="flex gap-4 order-2 md:order-1">
                    {step > 1 && (
                      <AcademyButton variant="outline" onClick={() => setStep(s => s - 1)}>
                        <ChevronLeft size={18} /> Back
                      </AcademyButton>
                    )}

                  </div>
                  
                  <div className="order-1 md:order-2 w-full md:w-auto">
                    {step < 4 ? (
                      <AcademyButton className="w-full" onClick={() => setStep(s => s + 1)}>
                        Continue <ChevronRight size={18} />
                      </AcademyButton>
                    ) : (
                      <AcademyButton className="w-full" onClick={handlePayment}>
                        {loading ? (
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <><CreditCard size={18} /> Submit Application</>
                        )}
                      </AcademyButton>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Professional PDF Template (Hidden) */}
        <div style={{ position: 'absolute', left: '-9999px', top: '0', opacity: 0 }}>
          <div ref={pdfRef} style={{ padding: '40px', width: '210mm', backgroundColor: '#ffffff', color: '#1e1b4b', fontFamily: 'serif' }}>
            {/* PDF Institutional Letterhead */}
            <div style={{ borderBottom: '6px double #800000', paddingBottom: '30px', marginBottom: '40px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: '10px' }}>
                {/* PDF Left: English */}
                <div style={{ flex: '1', textAlign: 'left' }}>
                  <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#000', margin: '0', textTransform: 'uppercase', letterSpacing: '0.02em', fontFamily: 'serif', whiteSpace: 'nowrap' }}><span style={{ color: '#c00000' }}>BK</span> EDUCATIONAL & WELFARE SOCIETY</h2>
                  <h4 style={{ fontSize: '9px', fontWeight: '700', color: '#000', margin: '3px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: '0.8', fontFamily: 'serif', whiteSpace: 'nowrap' }}><span style={{ color: '#c00000' }}>BK</span> GROUP OF EDUCATION</h4>
                  <p style={{ fontSize: '10px', fontWeight: '900', color: '#c00000', margin: '5px 0 0 0', letterSpacing: '0.05em' }}>+91 80801 95558</p>
                </div>

                {/* PDF Center: Logo & Taglines */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <p style={{ fontSize: '8px', fontWeight: '900', color: '#333', margin: '0', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>॥ न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ॥</p>
                  <p style={{ fontSize: '10px', color: '#800000', margin: '0', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>We shape careers...</p>
                  <img src="/assets/bk.png" style={{ height: '35px', width: 'auto', objectFit: 'contain', marginTop: '2px' }} />
                </div>

                {/* PDF Right: Address */}
                <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
                  <p style={{ fontSize: '8px', fontWeight: '900', color: '#000', margin: '0', lineHeight: '1.2', textTransform: 'uppercase', textAlign: 'left', maxWidth: '180px', fontFamily: 'serif' }}>
                    <span style={{ color: '#c00000', fontWeight: '900' }}>Address:</span> 2nd Floor, Gajanan Plaza, Gharpure Ghat Road, Ashok Stambh, Nashik, Maharashtra
                  </p>
                </div>
              </div>
            </div>
            {/* PDF New Identifiers Row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Registration No:</span>
                  <span style={{ color: '#dc2626', fontWeight: '900', fontSize: '16px' }}>BK-2026-{formNumber || '1'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Form No:</span>
                  <span style={{ color: '#fb923c', fontWeight: '900', fontSize: '16px' }}>{formNumber || '1'}</span>
                </div>
              </div>
              
              <div style={{ width: '90px', height: '110px', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '4px', overflow: 'hidden' }}>
                {formData.photoPreview ? (
                  <img src={formData.photoPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', padding: '10px', lineHeight: '1.5' }}>Affix<br/>Passport<br/>Photo</span>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', fontSize: '12px', marginBottom: '25px' }}>
              <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Candidate Name</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{formData.salutation} {formData.firstName} {formData.middleName} {formData.surname}</p></div>
              <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Name in Marathi</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{formData.firstNameLocal} {formData.middleNameLocal} {formData.surnameLocal}</p></div>
              <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Date of Birth</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{formData.dob} (Age: {formData.age})</p></div>
              <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Gender</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{formData.gender}</p></div>
              <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Father's Name</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{formData.fatherName}</p></div>
              <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Email ID</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{formData.email}</p></div>
              <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Contact Numbers</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{formData.mobileSelf} / {formData.mobileParents}</p></div>
              <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Category</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{formData.category}</p></div>
            </div>

            <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid #f3f4f6' }}>
               <h3 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>Academic Record & Selection</h3>
               <table style={{ width: '100%', textAlign: 'left', fontSize: '10px' }}>
                 <thead><tr><th style={{ paddingBottom: '8px' }}>Level</th><th style={{ paddingBottom: '8px' }}>Board</th><th style={{ paddingBottom: '8px' }}>Year</th><th style={{ paddingBottom: '8px' }}>Marks%</th></tr></thead>
                 <tbody style={{ fontWeight: '700' }}>
                    <tr><td style={{ padding: '4px 0' }}>10th Grade</td><td>{formData.edu10th.board}</td><td>{formData.edu10th.year}</td><td>{formData.edu10th.marks}</td></tr>
                    <tr><td style={{ padding: '4px 0' }}>12th Grade</td><td>{formData.edu12th.board}</td><td>{formData.edu12th.year}</td><td>{formData.edu12th.marks}</td></tr>
                 </tbody>
               </table>
               <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '40px' }}>
                 <div><label style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', opacity: '0.4' }}>Target Exam</label><p style={{ fontWeight: '900', fontSize: '14px' }}>{formData.examCategory}</p></div>
                 <div><label style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', opacity: '0.4' }}>Courses</label><p style={{ fontWeight: '900', fontSize: '14px', textTransform: 'uppercase' }}>{formData.courses.join(', ')}</p></div>
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', fontSize: '10px', marginBottom: '30px' }}>
               <div><h4 style={{ fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>Current Address</h4><p style={{ lineHeight: '1.625', opacity: '0.7' }}>{formData.currentAddress.door}, {formData.currentAddress.street}, {formData.currentAddress.city}, {formData.currentAddress.pincode}</p></div>
               <div><h4 style={{ fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>Permanent Address</h4><p style={{ lineHeight: '1.625', opacity: '0.7' }}>{formData.permanentAddress.door}, {formData.permanentAddress.street}, {formData.permanentAddress.city}, {formData.permanentAddress.pincode}</p></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
               <div style={{ fontSize: '8px', fontWeight: '700', opacity: '0.4' }}>
                  <p>APPLICATION DATE: {formData.date}</p>
                  <p>PAYMENT ID: {paymentId || 'BK-PROVISIONAL'}</p>
               </div>
               <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '160px', height: '64px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '8px' }}>
                    {formData.signaturePreview && <img src={formData.signaturePreview} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                  </div>
                  <p style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase' }}>Candidate Signature</p>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdmissionFormModal;

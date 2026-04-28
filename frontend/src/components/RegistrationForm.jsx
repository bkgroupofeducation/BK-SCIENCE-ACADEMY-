import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { apiFetch } from '../api';


const InputField = ({ label, placeholder, type = "text", name, value, onChange }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-xs font-black text-indigo-950/60 uppercase tracking-widest group-focus-within:text-brand-red transition-colors">{label}</label>
    <input 
      type={type} 
      value={value}
      placeholder={placeholder}
      className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white outline-none transition-all duration-500 text-sm shadow-sm hover:shadow-md"
      onChange={(e) => onChange(name, e.target.value)}
    />
  </div>
);

const SelectField = ({ label, options, name, value, onChange }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-xs font-black text-indigo-950/60 uppercase tracking-widest group-focus-within:text-brand-red transition-colors">{label}</label>
    <div className="relative">
      <select 
        value={value}
        className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 font-bold text-brand-dark focus:border-brand-red focus:bg-white outline-none transition-all duration-500 appearance-none shadow-sm hover:shadow-md cursor-pointer text-sm"
        onChange={(e) => onChange(name, e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-focus-within:text-brand-red transition-all">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', gender: '', dob: '',
    stream: '', class: '', board: '', medium: '', mode: '', session: '',
    program: '', coupon: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (name, value) => {
    if (name === 'mobile') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreed) {
      setMessage({ type: 'error', text: 'Please accept the declaration checkbox' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await apiFetch('/api/registration/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSubmittedData(result.data);
      setMessage({ type: 'success', text: `Registration Successful! Your ID: ${result.data.studentId}` });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (submittedData) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden animate-fade-scale">
        <div className="absolute top-0 left-0 w-full h-[50vh] md:h-[60vh] bg-indigo-950 -z-10 rounded-b-[60px] md:rounded-b-[100px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.2),transparent_70%)]"></div>
        </div>
        <div className="container mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20 md:pb-24">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[40px] md:rounded-[50px] shadow-[0_50px_100px_-20px_rgba(30,27,75,0.2)] p-8 md:p-12 border border-gray-100 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-brand-dark mb-4">Registration Successful!</h2>
              <p className="text-gray-500 mb-8">Thank you for registering with BK Science Academy</p>
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Student ID</p>
                    <p className="text-lg font-black text-brand-red">{submittedData.studentId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Program</p>
                    <p className="text-sm font-bold text-brand-dark">{submittedData.program}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Name</p>
                    <p className="text-sm font-bold text-brand-dark">{submittedData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Mobile</p>
                    <p className="text-sm font-bold text-brand-dark">{submittedData.mobile}</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 mb-6">
                <p className="text-sm text-yellow-700 font-bold">Next Steps:</p>
                <ul className="text-xs text-yellow-600 mt-2 space-y-1 text-left">
                  <li>• Our team will contact you within 24 hours</li>
                  <li>• Pay registration fee of ₹199 to confirm your seat</li>
                  <li>• Bring original documents for verification at center</li>
                </ul>
              </div>
              <button 
                onClick={() => window.location.href = '/pay-fee'}
                className="w-full bg-brand-red text-white py-4 rounded-2xl font-black text-lg uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-red/20"
              >
                Pay Registration Fee
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden animate-fade-scale">
      <div className="absolute top-0 left-0 w-full h-[50vh] md:h-[60vh] bg-indigo-950 -z-10 rounded-b-[60px] md:rounded-b-[100px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.2),transparent_70%)]"></div>
        <div className="absolute top-20 right-0 text-[10rem] md:text-[20rem] font-black text-white/5 pointer-events-none select-none -skew-x-12 uppercase">FORM</div>
      </div>

      <div className="container mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-up stagger-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4">
              Registration
              <span className="text-brand-red block drop-shadow-2xl">Form</span>
            </h1>
            <p className="text-white/60 font-black tracking-[0.3em] uppercase text-sm md:text-base">Join the Elite League of Scholars</p>
          </div>

          {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : message.type === 'info' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              <p className="font-bold text-sm">{message.text}</p>
            </div>
          )}

          <div className="bg-white rounded-[40px] md:rounded-[50px] lg:rounded-[60px] shadow-[0_50px_100px_-20px_rgba(30,27,75,0.2)] p-6 md:p-10 lg:p-16 border border-gray-100 animate-fade-up stagger-2">
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="w-11 h-11 md:w-12 md:h-12 bg-indigo-50 text-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl">01</div>
              <h2 className="text-lg md:text-2xl font-black uppercase tracking-widest text-brand-dark">Personal Profile</h2>
              <div className="h-[2px] flex-1 bg-gray-50"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
              <InputField label="Student Name" placeholder="Enter Full Name" name="name" value={formData.name} onChange={handleChange} />
              
              <InputField label="Mobile Number" placeholder="+91 00000 00000" name="mobile" value={formData.mobile} onChange={handleChange} />

              <InputField label="Email Address" placeholder="alex@gmail.com" type="email" name="email" value={formData.email} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <SelectField label="Gender" options={["Male", "Female", "Other"]} name="gender" value={formData.gender} onChange={handleChange} />
                <InputField label="Date of Birth" placeholder="DD/MM/YYYY" type="date" name="dob" value={formData.dob} onChange={handleChange} />
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="w-11 h-11 md:w-12 md:h-12 bg-red-50 text-brand-red rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl">02</div>
              <h2 className="text-lg md:text-2xl font-black uppercase tracking-widest text-brand-dark">Academic Details</h2>
              <div className="h-[2px] flex-1 bg-gray-50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
              <SelectField label="Stream" options={["Science (PCM)", "Science (PCB)", "Commerce", "Arts"]} name="stream" value={formData.stream} onChange={handleChange} />
              <SelectField label="Class" options={["6th", "7th", "8th", "9th", "10th", "11th", "12th", "12th Pass"]} name="class" value={formData.class} onChange={handleChange} />
              <SelectField label="Board" options={["CBSE", "ICSE", "State Board", "IB"]} name="board" value={formData.board} onChange={handleChange} />
              <SelectField label="Medium" options={["English", "Hindi", "Marathi"]} name="medium" value={formData.medium} onChange={handleChange} />
              <SelectField label="Mode" options={["Classroom", "Online Live", "Distance Learning"]} name="mode" value={formData.mode} onChange={handleChange} />
              <SelectField label="Session" options={["2025-26", "2026-27"]} name="session" value={formData.session} onChange={handleChange} />
            </div>

            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="w-11 h-11 md:w-12 md:h-12 bg-yellow-50 text-brand-yellow rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl">03</div>
              <h2 className="text-lg md:text-2xl font-black uppercase tracking-widest text-brand-dark">Program &amp; Location</h2>
              <div className="h-[2px] flex-1 bg-gray-50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              <SelectField label="Program" options={["JEE Main + Advanced", "NEET (UG)", "Foundation (Pre-Nurture)", "Olympiads Preparation"]} name="program" value={formData.program} onChange={handleChange} />
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-indigo-950/60 uppercase tracking-widest">Center</label>
                <div className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 font-bold text-brand-dark text-sm shadow-sm">
                  BK Science Academy, Nashik
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-indigo-950/60 uppercase tracking-widest">Location</label>
                <div className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 font-bold text-brand-dark text-sm shadow-sm">
                  Nashik, Maharashtra
                </div>
              </div>
            </div>

            <div className="bg-indigo-950 p-6 md:p-10 rounded-3xl md:rounded-[40px] text-white relative overflow-hidden mb-10 md:mb-12">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full"></div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex-1 w-full">
                  <div className="flex justify-between mb-4 border-b border-white/10 pb-4">
                    <span className="font-bold opacity-60">Registration Fee</span>
                    <span className="font-black text-lg">₹ 199.00</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <input type="text" placeholder="Coupon Code" className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-bold focus:bg-white focus:text-indigo-950 outline-none transition-all flex-1" />
                    <button className="bg-brand-red text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition">Apply</button>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-xs font-black opacity-60 uppercase tracking-[0.3em] mb-2">Total Payable Amount</p>
                  <p className="text-4xl md:text-5xl font-black text-brand-yellow">₹ 199.00</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <label className="flex items-center gap-3 md:gap-4 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 md:w-6 md:h-6 rounded-lg border-2 border-gray-200 checked:bg-brand-red transition-all" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className="text-sm font-bold text-gray-500 group-hover:text-brand-dark transition-colors">
                  I declare that the details provided are correct to the best of my knowledge.
                </span>
              </label>
              <button 
                className="w-full bg-brand-red text-white py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-xl md:text-2xl uppercase tracking-[0.2em] md:tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-brand-red/20 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Proceed to Pay'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, Trophy, GraduationCap, Calendar, Search,
  PieChart, Loader2, Download, AlertCircle, ShieldCheck,
  QrCode, Fingerprint, Zap, ChevronDown
} from 'lucide-react';
import { API_BASE } from '../api';

const ResultDashboard = () => {
  const [studentId, setStudentId] = useState('BK-171-101');
  const [semester, setSemester] = useState('Summer 2023');
  const [track, setTrack] = useState('Live Results');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const [currentResults, setCurrentResults] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    name: 'N/A', dept: 'N/A', batch: 'N/A', studentId: 'N/A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neutral'
  });
  const [performance, setPerformance] = useState({ sgpa: 0, rank: 'N/A' });

  // Initial Fetch
  useEffect(() => {
    const defaultId = 'BK-171-101';
    setStudentId(defaultId);
    handleFetchResults(defaultId);
  }, []);

  const handleFetchResults = async (targetId = studentId) => {
    if (!targetId.trim()) {
      setFeedback({ type: 'error', message: 'Please enter a valid Registration UID.' });
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    // --- MOCK FALLBACK (INSTANT) ---
    const mockData = {
      'BK-171-101': {
        student: { name: 'Nasimul Nayon Ontar', dept: 'Computer Science Dept', batch: 'Batch 04', studentId: 'BK-171-101', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ontar' },
        report: { results: [{ code: 'AC-101', title: 'Advanced Physics', credit: 3, grade: 'A+', point: 4.0 }, { code: 'AC-102', title: 'Modern Biology', credit: 3, grade: 'A', point: 3.75 }, { code: 'AC-103', title: 'Applied Maths', credit: 3, grade: 'A+', point: 4.0 }], sgpa: 3.88, rank: 'Top 10%' }
      },
      'BK-171-103': {
        student: { name: 'Amit Raj', dept: 'JEE Advanced', batch: '2026-27', studentId: 'BK-171-103', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit' },
        report: { results: [{ code: 'JEE-P1', title: 'Thermodynamics', credit: 4, grade: 'O', point: 4.0 }, { code: 'JEE-C1', title: 'Bio-Molecules', credit: 3, grade: 'A+', point: 4.0 }], sgpa: 4.0, rank: 'Top 1%' }
      }
    };

    if (mockData[targetId]) {
      setTimeout(() => {
        const found = mockData[targetId];
        setStudentInfo(found.student);
        setCurrentResults(found.report.results);
        setPerformance({ sgpa: found.report.sgpa, rank: found.report.rank });
        setShowResults(true);
        setFeedback({ type: 'success', message: 'Verified: Academic Record Fetched' });
        setIsLoading(false);
      }, 800);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/results/${targetId}?track=${encodeURIComponent(track)}&semester=${encodeURIComponent(semester)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Verification Failed');
      }

      setStudentInfo(data.student);
      setCurrentResults(data.report.results || []);
      setPerformance({
        sgpa: data.report.sgpa || 0,
        rank: data.report.rank || 'N/A'
      });
      
      setShowResults(true);
      setFeedback({ type: 'success', message: `${track} Data Synced with Central Database.` });
    } catch (err) {
      console.error('Fetch error:', err);
      setFeedback({ type: 'error', message: 'Network Error: Check if backend is running' });
      setShowResults(false);
      setStudentInfo({ name: 'NOT FOUND', dept: 'N/A', batch: 'N/A', studentId: targetId });
    } finally {
      setIsLoading(false);
    }
  };

  // NOTE: DB write (PUT) is admin-only. Removed from public UI.

  const handleDownload = () => {
    setIsDownloading(true);
    setFeedback({ type: 'success', message: 'Authenticating Digital Certificate...' });
    setTimeout(() => {
       setIsDownloading(false);
       window.print();
    }, 1500);
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div className="min-h-screen bg-surface-1 font-sans text-slate-700 pt-28 pb-16 relative overflow-hidden">

      {/* White-theme hero strip */}
      <div className="no-print bg-white border-b border-gray-100 shadow-sm" />
      
      {/* Track Selector (no-print) */}
      <div className="relative z-10 pt-2 md:pt-8 no-print">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white border border-gray-100 p-1 md:p-2 rounded-[18px] md:rounded-[24px] flex flex-nowrap gap-1.5 md:gap-2 w-full lg:w-fit overflow-x-auto scrollbar-hide shadow-lg">
            {['Live Results', 'JEE', 'NEET', 'MHT-CET', 'Olympiads'].map((item) => (
              <button 
                key={item}
                onClick={() => setTrack(item)}
                className={`px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${track === item ? 'bg-brand-red text-white shadow-xl shadow-brand-red/20 scale-105' : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50'}`}
              >
                {item === 'Live Results' && <Zap size={14} className="inline mr-2" />}
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <header className="relative z-20 pt-10 pb-8 no-print bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/8 text-brand-red rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              <Zap size={12} /> Live Verification Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tighter leading-none">
              Academic <span className="text-brand-red">Performance</span>
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Verified student record lookup — BK Science Academy</p>
          </div>
          <div className={`hidden sm:flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${isLoading ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'}`}>
            <ShieldCheck size={20} className={isLoading ? 'text-amber-500' : 'text-green-600'} />
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 leading-none mb-0.5">System Status</p>
              <p className="text-sm font-black text-brand-dark">{isLoading ? 'Querying…' : 'Database Online'}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ID SEARCH */}
      <div className="container mx-auto px-6 -mt-10 relative z-40 no-print">
        <div className="bg-white p-6 md:p-8 rounded-[35px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-white">
           <div className="flex flex-col lg:flex-row gap-6 items-end">
              <div className="flex-[1.5] w-full space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Digital Identification UID</label>
                <div className="relative">
                  <Fingerprint size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input value={studentId} onChange={(e) => setStudentId(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-[22px] pl-12 pr-4 py-4.5 text-sm font-extrabold text-brand-dark focus:border-brand-red outline-none transition-all" placeholder="Enter BK-ID..." />
                </div>
              </div>
              <div className="flex-1 w-full space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Academic Term</label>
                <div className="relative group">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <select value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full appearance-none bg-slate-50 border-2 border-slate-100 rounded-[22px] pl-12 pr-10 py-4.5 text-sm font-extrabold text-brand-dark cursor-pointer">
                    <option>Summer 2023</option>
                    <option>Spring 2023</option>
                    <option>Fall 2022</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                </div>
              </div>
              <button onClick={handleFetchResults} disabled={isLoading} className="w-full lg:w-auto min-w-[220px] bg-brand-red text-white font-black uppercase tracking-[0.2em] py-5 rounded-[22px] shadow-2xl shadow-brand-red/20 text-[11px] hover:bg-brand-dark transition-all flex items-center justify-center gap-3">
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                <span>Fetch Reports</span>
              </button>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-10 relative z-10">
        {isLoading ? (
          <div className="space-y-8 animate-pulse no-print"><div className="h-96 w-full bg-slate-100 rounded-[40px]"></div></div>
        ) : showResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            <div className="lg:col-span-3 printable-area animate-fade-up">
              <div className="hidden print:block absolute inset-2 border-2 border-slate-200 pointer-events-none rounded-lg opacity-40"></div>
              
              {/* PRINT HEADER */}
              <div className="hidden print:flex flex-col items-center text-center mb-8 pb-8 border-b-2 border-slate-100">
                 <div className="bg-brand-dark px-10 py-2.5 rounded-lg text-white font-black text-2xl mb-4 italic tracking-widest uppercase">BK Science Academy</div>
                 <h1 className="text-3xl font-black uppercase tracking-tight text-brand-dark">{track} EVALUATION DOCUMENT</h1>
                 <p className="text-[10px] font-bold text-slate-400 mt-2 italic tracking-widest tracking-tighter">Connected to MongoDB Database Instance</p>
                 <div className="mt-8 flex justify-center gap-10 text-[11px] font-extrabold text-slate-700">
                    <p>Session: {semester}</p>
                    <p className="uppercase">Student: {studentInfo.name}</p>
                    <p>ID: {studentId}</p>
                 </div>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md print:border-none print:shadow-none">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-surface-1 print:hidden">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <ShieldCheck size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-base font-black uppercase tracking-tight text-brand-dark">Grade Achievement Sheet</h2>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Verified Record</p>
                    </div>
                  </div>
                  <button onClick={handleDownload} disabled={isDownloading} className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-[10px] font-black hover:bg-brand-red transition-all no-print">
                    {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
                    <span className="uppercase tracking-widest">{isDownloading ? 'Preparing…' : 'Export Certificate'}</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white border-b border-slate-100">
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 print-col-code">Reference</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 print-col-title">Subject / Module</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center print-col-credit">Weight</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center print-col-grade">Valuation</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center print-col-point">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {currentResults.length > 0 ? currentResults.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/60 transition-all">
                          <td className="px-8 py-6 font-black text-brand-dark text-sm">{row.code}</td>
                          <td className="px-8 py-6 font-extrabold text-slate-600 text-sm leading-tight group-hover:text-brand-red">{row.title}</td>
                          <td className="px-8 py-6 text-center"><span className="bg-slate-50 text-slate-400 font-black px-3 py-1.5 rounded-xl text-[10px] border border-slate-100">{row.credit}</span></td>
                          <td className="px-8 py-6 text-center">
                            <span className={`px-5 py-2 rounded-2xl font-black text-[10px] border shadow-xl inline-block print:border-slate-200 print:shadow-none ${row.grade === 'A+' || row.grade === 'O' ? 'bg-brand-red text-white border-brand-red shadow-brand-red/20' : 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20'}`}>{row.grade}</span>
                          </td>
                          <td className="px-8 py-6 font-black text-brand-dark text-sm text-center">{row.point.toFixed(2)}</td>
                        </tr>
                      ) ) : (
                        <tr><td colSpan="5" className="p-12 text-center text-slate-300 font-black uppercase tracking-[0.5em] text-xs">No records for this track/term</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 bg-surface-1 border-t border-gray-50 flex flex-col md:flex-row gap-6 print:bg-white print:border-t-2 print:border-gray-100">
                  <div className="flex-1 p-4 bg-white rounded-2xl border border-gray-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Track Credits</p>
                    <p className="text-2xl font-black text-brand-dark">09 <span className="text-xs font-bold text-gray-300">REQ</span></p>
                  </div>
                  <div className="flex-1 p-4 bg-white rounded-2xl border border-gray-100">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Board Standing</p>
                    <p className="text-2xl font-black text-brand-yellow">{performance.rank}</p>
                  </div>
                  <div className="flex-1 p-4 bg-white rounded-2xl border border-brand-red/10">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Total GPA</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-black text-brand-red tracking-tighter">{performance.sgpa.toFixed(2)}</p>
                      <p className="text-[9px] font-black text-gray-300 uppercase">Score</p>
                    </div>
                  </div>
                </div>

                <div className="hidden print:flex justify-between items-end mt-12 bg-white pb-8 border-t border-slate-50 pt-10">
                   <div className="space-y-4">
                     <div className="flex items-center gap-3 text-emerald-600">
                       <ShieldCheck size={28} />
                       <span className="text-[12px] font-black uppercase tracking-widest">Digital Board Verified</span>
                     </div>
                     <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">Registrar of Examination</p>
                   </div>
                   <div className="flex flex-col items-center gap-3 pr-8">
                     <div className="w-24 h-24 bg-slate-50 border border-slate-100 flex items-center justify-center p-3 rounded-2xl shadow-sm"><QrCode size={80} className="text-slate-200" /></div>
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center italic">Verify: BK-ID-{studentId}</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 no-print">
              {/* READ-ONLY IDENTITY CARD */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-20 h-24 rounded-2xl bg-gray-50 overflow-hidden border-2 border-gray-100">
                    <img src={studentInfo.avatar} alt="Student" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-brand-yellow rounded-xl flex items-center justify-center text-brand-dark shadow-md">
                    <GraduationCap size={16} />
                  </div>
                </div>
                <h3 className="text-lg font-black text-brand-dark uppercase tracking-tight">{studentInfo.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">{studentInfo.dept}</p>
                <div className="mt-4 flex justify-between items-center w-full bg-brand-red/5 border border-brand-red/10 px-4 py-2.5 rounded-xl">
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Student ID</span>
                  <span className="text-sm font-black text-brand-red">{studentInfo.studentId || 'N/A'}</span>
                </div>
              </div>

              {/* PERFORMANCE RING */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 text-brand-red mb-5">
                  <PieChart size={18} /><h3 className="text-[11px] font-black uppercase tracking-widest">Board Standing</h3>
                </div>
                <div className="relative flex items-center justify-center w-36 h-36 mx-auto mb-5">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                    <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="377" strokeDashoffset={377 * (1 - 0.9)} className="text-green-500 transition-all duration-1000" strokeLinecap="round" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-brand-dark tracking-tighter">90%</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase">Verified</span>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-surface-1 border border-gray-100 p-3 rounded-xl">
                  <span className="text-[9px] font-black uppercase text-gray-400">Percentile</span>
                  <span className="text-base font-black text-brand-dark">{performance.rank}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-20 text-center shadow-2xl border border-dashed border-slate-200 no-print">
             <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-8"><Fingerprint size={40} className="text-slate-200" /></div>
             <p className="text-slate-400 text-sm font-black uppercase tracking-widest leading-loose">Student Record Identification Required.</p>
          </div>
        )}
      </div>

      {feedback && (
        <div className="fixed bottom-10 right-10 z-[100] animate-fade-in no-print">
          <div className={`flex items-center gap-4 px-6 py-4 rounded-3xl shadow-2xl backdrop-blur-2xl border ${feedback.type === 'success' ? 'bg-emerald-600/90 border-emerald-400 text-white' : 'bg-red-600/90 border-red-500 text-white'}`}>
            {feedback.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            <span className="font-black text-xs uppercase tracking-tight">{feedback.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDashboard;

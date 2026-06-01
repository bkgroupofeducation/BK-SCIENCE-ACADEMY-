import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, MessageSquare, LayoutDashboard, Search, Download,
  LogOut, ShieldCheck, Shield, TrendingUp, ArrowRight, Filter,
  Calendar, GraduationCap, AlertCircle, RefreshCw, X, ChevronLeft, ChevronRight,
  FileText, CreditCard, HelpCircle, UserPlus, ClipboardList, Upload, Eye, Trash2, Edit3, Save, ExternalLink, Award, Plus, Ticket, Bell, Phone, Trophy, Play, Menu
} from 'lucide-react';
import { apiFetch, API_BASE } from '../api';

/* ─── Session helpers ─────────────────────────────────── */
const TOKEN_KEY  = 'bk_admin_token';
const EXPIRY_KEY = 'bk_admin_expiry';

const saveSession  = (token, expiresIn, admin) => {
  sessionStorage.setItem(TOKEN_KEY,  token);
  sessionStorage.setItem(EXPIRY_KEY, String(Date.now() + expiresIn));
  sessionStorage.setItem('bk_admin_user', JSON.stringify(admin));
};
const clearSession = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXPIRY_KEY);
  sessionStorage.removeItem('bk_admin_user');
};
const getSessionUser = () => {
  try {
    const user = sessionStorage.getItem('bk_admin_user');
    if (!user || user === 'undefined') return {};
    return JSON.parse(user) || {};
  } catch (err) {
    return {};
  }
};

const isSessionValid = () => {
  const token  = sessionStorage.getItem(TOKEN_KEY);
  const expiry = Number(sessionStorage.getItem(EXPIRY_KEY));
  return token && expiry && Date.now() < expiry;
};

/* ─── Stat Card ───────────────────────────────────────── */
const StatCard = ({ icon: Icon, value, label, color, badge, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-all ${onClick ? 'cursor-pointer hover:border-brand-red active:scale-95' : ''}`}
  >
    <div className="flex justify-between items-start">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center`}>
        <Icon size={22} />
      </div>
      {badge && (
        <span className="bg-green-50 text-green-600 font-black text-[10px] px-2.5 py-1 rounded-full">{badge}</span>
      )}
    </div>
    <div>
      <h3 className="text-4xl font-black text-brand-dark tracking-tighter leading-none">{value ?? '0'}</h3>
      <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">{label}</p>
    </div>
  </div>
);

/* ─── Main AdminPanel ─────────────────────────────────── */
const AdminPanel = ({ navigateTo }) => {
  const [activeTab,    setActiveTab]    = useState('overview');
  const [data,         setData]         = useState({ stats: null, items: [], total: 0 });
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');
  const [isAuth,       setIsAuth]       = useState(() => isSessionValid());
  const [currentUser,  setCurrentUser]  = useState(() => getSessionUser());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [username,     setUsername]     = useState('');
  const [password,     setPassword]     = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError,    setAuthError]    = useState('');
  
  const [search,       setSearch]       = useState('');
  const [page,         setPage]         = useState(1);
  const [editingItem,  setEditingItem]  = useState(null);
  const [editFormTab,  setEditFormTab]  = useState('primary');
  const [showPdfUpload, setShowPdfUpload] = useState(false);
  const [newTicket, setNewTicket] = useState(null);
  const [selectedPdfItem, setSelectedPdfItem] = useState(null);
  const pdfTemplateRef = useRef(null);

  const getEditFormTabs = (item) => {
    if (!item) return [];
    const keys = Object.keys(item).filter(k => !['_id', '__v', 'createdAt', 'updatedAt', 'password'].includes(k));
    
    const tabsConfig = [
      { id: 'primary', label: 'Primary Info', keys: [] },
      { id: 'academic', label: 'Academic Details', keys: [] },
      { id: 'payment', label: 'Admissions & Fee', keys: [] },
      { id: 'status', label: 'Status & Notes', keys: [] },
      { id: 'others', label: 'Other Fields', keys: [] }
    ];

    keys.forEach(key => {
      const lower = key.toLowerCase();
      if (
        lower.includes('name') || 
        lower.includes('email') || 
        lower.includes('phone') || 
        lower.includes('gender') || 
        lower.includes('category') || 
        lower.includes('dob') || 
        lower.includes('address') || 
        lower.includes('city') || 
        lower.includes('state') || 
        lower.includes('pincode') || 
        lower.includes('parent') || 
        lower.includes('guardian')
      ) {
        tabsConfig[0].keys.push(key);
      } else if (
        lower.includes('course') || 
        lower.includes('class') || 
        lower.includes('std') || 
        lower.includes('school') || 
        lower.includes('college') || 
        lower.includes('marks') || 
        lower.includes('stream') || 
        lower.includes('year') || 
        lower.includes('exam') || 
        lower.includes('attempt')
      ) {
        tabsConfig[1].keys.push(key);
      } else if (
        lower.includes('pay') || 
        lower.includes('fee') || 
        lower.includes('discount') || 
        lower.includes('amount') || 
        lower.includes('receipt') || 
        lower.includes('transaction') || 
        lower.includes('registration') || 
        lower.includes('roll') || 
        lower.includes('date') || 
        lower.includes('scholarship')
      ) {
        tabsConfig[2].keys.push(key);
      } else if (
        lower === 'status' || 
        lower.includes('note') || 
        lower.includes('remark') || 
        lower.includes('comment') || 
        lower.includes('resolve') || 
        lower.includes('feedback') || 
        lower.includes('assigned')
      ) {
        tabsConfig[3].keys.push(key);
      } else {
        tabsConfig[4].keys.push(key);
      }
    });

    return tabsConfig.filter(t => t.keys.length > 0);
  };

  useEffect(() => {
    if (editingItem) {
      const availableTabs = getEditFormTabs(editingItem);
      if (availableTabs.length > 0) {
        setEditFormTab(availableTabs[0].id);
      }
    }
  }, [editingItem]);

  /* ── Popups Management State ── */
  const [popupTitle, setPopupTitle] = useState('');
  const [popupLink, setPopupLink] = useState('');
  const [popupFile, setPopupFile] = useState(null);
  const [popupLoading, setPopupLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadPopup = async (e) => {
    e.preventDefault();
    if (!popupFile) return alert('Please choose an image file first!');
    
    try {
      setPopupLoading(true);
      const formData = new FormData();
      formData.append('image', popupFile);
      formData.append('title', popupTitle);
      formData.append('link', popupLink);

      const res = await apiFetch('/api/popups/upload', {
        method: 'POST',
        body: formData
      });

      if (res.success) {
        setPopupTitle('');
        setPopupLink('');
        setPopupFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchData();
      }
    } catch (err) {
      alert(err.message || 'Failed to upload popup');
    } finally {
      setPopupLoading(false);
    }
  };

  const handleTogglePopup = async (id) => {
    try {
      const res = await apiFetch(`/api/popups/${id}/toggle`, {
        method: 'PUT'
      });
      if (res.success) {
        fetchData();
      }
    } catch (err) {
      alert(err.message || 'Failed to toggle status');
    }
  };

  const handleDeletePopup = async (id) => {
    if (!window.confirm('Are you sure you want to delete this popup?')) return;
    try {
      const res = await apiFetch(`/api/popups/${id}`, {
        method: 'DELETE'
      });
      if (res.success) {
        fetchData();
      }
    } catch (err) {
      alert(err.message || 'Failed to delete popup');
    }
  };
  
  /* ── Modules Config ── */
  const modules = [
    { id: 'overview',       icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'admissions',     icon: GraduationCap,   label: 'Admissions' },
    { id: 'enquiries',      icon: ClipboardList,   label: 'Enquiries' },
    { id: 'scholarships',   icon: Award,           label: 'Scholarships' },
    { id: 'counseling',     icon: MessageSquare,   label: 'Counseling' },
    { id: 'results',        icon: Award,           label: 'Results' },
    { id: 'grievances',     icon: HelpCircle,      label: 'Grievances' },
    { id: 'tickets',        icon: Ticket,          label: 'Support Tickets' },
    { id: 'toppers',        icon: Play,            label: 'Student Care' },
    { id: 'pdfs',           icon: FileText,        label: 'Notes' },
    { id: 'popups',         icon: Upload,          label: 'Popup Manager' },
    { id: 'scholarship-types', icon: Edit3,           label: 'Scholarship Settings' },
    { id: 'scholarship-stats', icon: TrendingUp,     label: 'Scholarship Stats' },
    { id: 'admins',         icon: Shield,          label: 'Admin Staff', superOnly: true },
    { id: 'logs',           icon: ShieldCheck,     label: 'Audit Logs', superOnly: true },
  ];

  /* ── Fetch Data ── */
  const fetchData = useCallback(async () => {
    if (!isAuth) return;
    setLoading(true);
    setError('');
    try {
      const endpoint = activeTab === 'overview' 
        ? '/api/admin/stats' 
        : activeTab === 'scholarship-types'
          ? '/api/scholarship/types'
          : activeTab === 'scholarship-stats'
            ? '/api/scholarship/config'
            : `/api/admin/${activeTab}?search=${search}&page=${page}`;
      
      const result = await apiFetch(endpoint);
      if (result.success) {
        if (activeTab === 'overview') setData({ stats: result.data, data: [], total: 0 });
        else {
          const dataArray = activeTab === 'scholarship-stats' ? [result.data] : result.data;
          setData({ stats: null, data: dataArray, total: result.total || 0 });
        }
      }
    } catch (err) {
      if (err.message?.includes('401') || err.message?.includes('403')) {
        handleLogout();
      } else {
        setError(err.message || 'Failed to load data.');
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab, search, page, isAuth]);

  useEffect(() => {
    setData({ stats: null, data: [], total: 0 });
    setPage(1);
    setSearch('');
  }, [activeTab]);

  useEffect(() => {
    fetchData();
    if (isAuth) {
      const interval = setInterval(async () => {
        try {
          const res = await apiFetch('/api/admin/tickets?status=New&limit=1');
          if (res.success && res.data.length > 0) {
            setNewTicket(res.data[0]);
          }
        } catch (e) {}
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [fetchData, isAuth]);

  /* ── Handlers ── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError('');
    try {
      const result = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      saveSession(result.token, result.expiresIn, result.admin);
      setCurrentUser(result.admin);
      setIsAuth(true);
    } catch (err) {
      setAuthError(err.message || 'Access denied');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    setIsAuth(false);
    setData({ stats: null, items: [], total: 0 });
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await apiFetch(`/api/admin/${activeTab}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record permanently?')) return;
    try {
      const endpoint = activeTab === 'scholarship-types'
        ? `/api/scholarship/types/${id}`
        : `/api/admin/${activeTab}/${id}`;
      await apiFetch(endpoint, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = `/api/admin/${activeTab}/${editingItem._id}`;
      if (activeTab === 'scholarship-types') {
        endpoint = `/api/scholarship/types/${editingItem._id}`;
      } else if (activeTab === 'scholarship-stats') {
        endpoint = '/api/scholarship/config';
      }
      
      await apiFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(editingItem),
      });
      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateType = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd.entries());
    try {
      setLoading(true);
      if (body.benefits && typeof body.benefits === 'string') {
        body.benefits = body.benefits.split(',').map(s => s.trim()).filter(Boolean);
      }
      await apiFetch('/api/scholarship/types/manage', {
        method: 'POST',
        body: JSON.stringify({
          ...body,
          benefits: typeof body.benefits === 'string' ? body.benefits.split(',').map(s => s.trim()).filter(Boolean) : [],
          tagColor: body.tagColor || 'bg-brand-yellow text-brand-dark',
          gradient: body.gradient || 'from-brand-red via-red-700 to-red-900',
          isActive: true
        }),
      });
      setShowPdfUpload(false); 
      fetchData();
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  const handleCreateTopper = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      setLoading(true);
      await apiFetch('/api/toppers/upload', {
        method: 'POST',
        body: fd,
      });
      setShowPdfUpload(false);
      fetchData();
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };
  const downloadFormPDF = async (item) => {
    setSelectedPdfItem(item);
    // Give time for template to render
    setTimeout(async () => {
      if (!pdfTemplateRef.current) return;
      try {
        const html2canvas = (await import('html2canvas')).default;
        const { jsPDF } = await import('jspdf');
        
        const canvas = await html2canvas(pdfTemplateRef.current, { scale: 2, useCORS: true });
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
        
        const fileName = activeTab === 'counseling' 
          ? `BK_Counseling_${item.studentName}_${item.formNumber || 'Ref'}.pdf`
          : `BK_Admission_${item.firstName || item.fullName}_${item.formNumber}.pdf`;
          
        pdf.save(fileName);
      } catch (err) {
        console.error("PDF Gen failed:", err);
        alert("Failed to generate PDF. Please try again.");
      } finally {
        setSelectedPdfItem(null);
      }
    }, 500);
  };
  
  const handleDownloadExcel = () => {
    if (!data.data || data.data.length === 0) {
      alert("No data available to download");
      return;
    }
    
    // Create CSV content
    const headers = ["Student Name", "Email", "WhatsApp", "Gender", "Class", "Stream", "School", "Career Interest", "Mode", "Date", "Time", "Status", "Applied On"];
    const rows = data.data.map(item => [
      item.studentName || item.fullName || "",
      item.email || "",
      item.whatsapp || item.mobile || "",
      item.gender || "",
      item.currentClass || "",
      item.stream || "",
      item.schoolName || "",
      item.careerInterest || "",
      item.presence || "",
      item.appointmentDate || "",
      item.appointmentTime || "",
      item.status || "Pending",
      new Date(item.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `BK_Counseling_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ── UI Components ── */
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-surface-1 flex items-center justify-center p-6 pt-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-md w-full bg-white rounded-3xl p-10 relative z-10 shadow-xl border border-gray-100 animate-fade-scale">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-brand-red/8 border border-brand-red/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <ShieldCheck size={28} className="text-brand-red" />
            </div>
            <h1 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">
              Super <span className="text-brand-red">Admin</span>
            </h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2">BK Science Academy · Core Control</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3.5 bg-surface-1 border-2 border-gray-100 rounded-xl focus:border-brand-red outline-none font-bold text-sm" placeholder="Admin ID" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Passkey</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3.5 bg-surface-1 border-2 border-gray-100 rounded-xl focus:border-brand-red outline-none font-bold text-sm" placeholder="••••••••" />
            </div>
            {authError && <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl">{authError}</p>}
            <button disabled={loginLoading} className="w-full py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-brand-dark transition-all disabled:opacity-50">
              {loginLoading ? 'Authenticating...' : 'Enter Console'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-1 flex flex-col md:flex-row overflow-hidden font-sans pt-16 md:pt-28">
      
      {/* MOBILE HEADER (only visible on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-[100] px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-2 -ml-1 text-brand-dark bg-gray-50 rounded-full hover:bg-gray-100 transition-all"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 ml-1">
            <img src="/assets/bk.png" alt="BK" className="h-6 w-auto" />
            <h2 className="text-brand-dark font-black text-xs uppercase tracking-tighter">
              <span className="text-brand-red">ADMIN</span>
            </h2>
          </div>
        </div>
        <button 
          onClick={() => navigateTo('admission')} 
          className="bg-[#2D68FF] text-white px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-200 border-2 border-white/20 transition-all active:scale-95"
        >
          Enroll Now
        </button>
      </div>

      {/* SIDEBAR - MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[110] md:hidden"
          >
            <motion.aside 
              initial={{ translateX: '-100%' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
              className="w-72 h-full bg-white flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-brand-dark font-black text-lg uppercase tracking-tighter">BK <span className="text-brand-red">Admin</span></h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
                {modules.map(mod => (
                  (!mod.superOnly || currentUser?.role === 'super-admin') && (
                    <button
                      key={mod.id}
                      onClick={() => { setActiveTab(mod.id); setPage(1); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                        activeTab === mod.id ? 'bg-brand-red/8 text-brand-red border border-brand-red/15' : 'text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <mod.icon size={18} /> {mod.label}
                    </button>
                  )
                ))}
              </nav>
              <div className="p-6 border-t border-gray-100">
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gray-50 font-black text-[10px] uppercase tracking-widest text-brand-red transition-all">
                  <LogOut size={14} /> End Session
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR - DESKTOP */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col shrink-0 z-20 shadow-sm overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-brand-dark font-black text-lg uppercase tracking-tighter">BK <span className="text-brand-red">Super Admin</span></h2>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest capitalize">{currentUser?.username || 'Admin'} • {currentUser?.role || 'Guest'}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {modules.map(mod => (
            (!mod.superOnly || currentUser?.role === 'super-admin') && (
              <button
                key={mod.id}
                onClick={() => { setActiveTab(mod.id); setPage(1); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === mod.id ? 'bg-brand-red/8 text-brand-red border border-brand-red/15 shadow-sm' : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                <mod.icon size={16} /> {mod.label}
              </button>
            )
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-red transition-all">
            <LogOut size={14} /> End Session
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto min-w-0 bg-surface-1">
        <header className="bg-white/80 backdrop-blur-md px-6 md:px-10 py-4 md:py-6 flex flex-col sm:flex-row items-center justify-between sticky top-0 z-30 border-b border-gray-100 gap-4">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <h1 className="text-xl md:text-2xl font-black text-brand-dark uppercase tracking-tighter leading-none capitalize">{activeTab}</h1>
            <p className="text-gray-400 font-bold text-[9px] uppercase tracking-widest mt-1.5">{new Date().toDateString()}</p>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center w-full sm:w-auto">
            {activeTab !== 'overview' && (
              <div className="relative flex-1 sm:flex-none min-w-[200px]">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm font-bold focus:border-brand-red outline-none transition-all w-full md:w-64"
                />
              </div>
            )}
            <button onClick={fetchData} className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-white text-gray-500">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            {activeTab === 'counseling' && (
              <button onClick={handleDownloadExcel} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-100">
                <Download size={14} /> Download Excel
              </button>
            )}
            {activeTab === 'scholarship-types' && (
              <button onClick={() => setShowPdfUpload('scholarship')} className="flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-red transition-all">
                <Award size={14} /> New Scholarship
              </button>
            )}
            {activeTab === 'toppers' && (
              <button onClick={() => setShowPdfUpload('topper')} className="flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark transition-all">
                <Trophy size={14} /> Add Topper
              </button>
            )}
            {activeTab === 'pdfs' && (
              <div className="flex gap-2">
                <button onClick={() => setShowPdfUpload('video-asset')} className="flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark transition-all">
                  <Play size={14} /> Add Video
                </button>
                <button onClick={() => setShowPdfUpload('pdf-asset')} className="flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-red transition-all">
                  <FileText size={14} /> Upload PDF/Photo
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="p-4 md:p-10">
          {error && <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl font-bold text-sm border border-red-100">{error}</div>}

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && data.stats && (
            <div className="space-y-6 md:space-y-10 animate-fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:grid-cols-4 md:gap-6">
                <StatCard 
                  icon={Users} 
                  value={data.stats.totalRegistrations} 
                  label="Total Registrations" 
                  color="bg-brand-red/8 text-brand-red" 
                  badge="+5%" 
                  onClick={() => { setActiveTab('enquiries'); setPage(1); setSearch(''); }}
                />
                <StatCard 
                  icon={MessageSquare} 
                  value={data.stats.totalLeads} 
                  label="Counseling Leads" 
                  color="bg-blue-50 text-blue-600" 
                  badge="New" 
                  onClick={() => { setActiveTab('counseling'); setPage(1); setSearch(''); }}
                />
                <StatCard 
                  icon={GraduationCap} 
                  value={data.stats.totalAdmissions} 
                  label="Total Admissions" 
                  color="bg-amber-50 text-amber-600" 
                  badge="+8%" 
                  onClick={() => { setActiveTab('admissions'); setPage(1); setSearch(''); }}
                />
                <StatCard 
                  icon={CreditCard} 
                  value={data.stats.pendingPayments} 
                  label="Pending Payments" 
                  color="bg-indigo-50 text-indigo-600" 
                  onClick={() => { setActiveTab('payments'); setPage(1); setSearch(''); }}
                />
                <StatCard 
                  icon={HelpCircle} 
                  value={data.stats.openGrievances} 
                  label="Open Grievances" 
                  color="bg-rose-50 text-rose-600" 
                  onClick={() => { setActiveTab('grievances'); setPage(1); setSearch(''); }}
                />
                <StatCard 
                  icon={Ticket} 
                  value={data.stats.openTickets} 
                  label="Support Tickets" 
                  color="bg-purple-50 text-purple-600" 
                  onClick={() => { setActiveTab('tickets'); setPage(1); setSearch(''); }}
                />
              </div>

              <div>
                <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-6">Security Audit Trail</h3>
                <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 overflow-x-auto shadow-sm">
                  <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-gray-50/50">
                      <tr>
                        {['Admin', 'Action', 'Module', 'Time'].map(h => <th key={h} className="px-6 py-4 text-[9px] font-black uppercase text-gray-400 tracking-widest">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {(data.stats?.recentLogs || []).map((log, i) => (
                        <tr key={i} className="hover:bg-gray-50/30 transition-all text-xs font-bold">
                          <td className="px-6 py-4 text-brand-red">{log.adminUsername}</td>
                          <td className="px-6 py-4 uppercase tracking-tighter">{log.action}</td>
                          <td className="px-6 py-4 text-gray-500">{log.resource}</td>
                          <td className="px-6 py-4 text-gray-400">{new Date(log.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── DATA TABLES ── */}
          {activeTab !== 'overview' && activeTab !== 'popups' && (
            <div className="space-y-6 animate-fade-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">
                    {activeTab === 'toppers' ? 'Video Stories' : activeTab.replace('-', ' ')}
                  </h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Manage your academy resources</p>
                </div>
                {activeTab === 'scholarship-types' && (
                  <button 
                    onClick={() => setShowPdfUpload('scholarship')}
                    className="flex items-center gap-2 bg-brand-red text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-brand-dark transition-all shadow-lg shadow-brand-red/20"
                  >
                    <Plus size={14} />
                    Add Scholarship
                  </button>
                )}
                {activeTab === 'pdfs' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowPdfUpload('video-asset')}
                      className="flex items-center gap-2 bg-brand-red text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-brand-dark transition-all shadow-lg shadow-brand-red/20"
                    >
                      <Play size={14} />
                      Video
                    </button>
                    <button 
                      onClick={() => setShowPdfUpload('pdf-asset')}
                      className="flex items-center gap-2 bg-brand-dark text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-brand-red transition-all shadow-lg shadow-brand-dark/20"
                    >
                      <Plus size={14} />
                      Docs
                    </button>
                  </div>
                )}
                {activeTab === 'toppers' && (
                  <button 
                    onClick={() => setShowPdfUpload('topper')}
                    className="flex items-center gap-2 bg-brand-red text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-brand-dark transition-all shadow-lg shadow-brand-red/20"
                  >
                    <Plus size={14} />
                    Add Story
                  </button>
                )}
              </div>

              {/* DESKTOP TABLE VIEW */}
              <div className="hidden md:block bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-5 text-[9px] font-black uppercase text-gray-400 tracking-widest">Record Details</th>
                      <th className="px-6 py-5 text-[9px] font-black uppercase text-gray-400 tracking-widest">Status / Metadata</th>
                      <th className="px-6 py-5 text-[9px] font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {(data.data || []).map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/40 transition-all group">
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                            {(item.photo || item.image || item.videoUrl) && (
                              <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50 flex items-center justify-center relative">
                                {item.photo || item.image ? (
                                  <img 
                                    src={(item.photo || item.image).startsWith('/uploads') ? `${API_BASE}${item.photo || item.image}` : (item.photo || item.image)} 
                                    alt="" 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : item.videoUrl ? (
                                  <div className="w-full h-full relative">
                                    <img 
                                      src={`https://img.youtube.com/vi/${item.videoUrl.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)?.[2]}/default.jpg`} 
                                      alt="" 
                                      className="w-full h-full object-cover opacity-80"
                                      onError={(e) => { e.target.src = '/assets/Screenshot 2026-05-06 165913.png'; }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                      <Play size={12} fill="white" className="text-white" />
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            )}
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-brand-dark uppercase tracking-tight text-sm">
                                  {item.studentName || item.fullName || (item.firstName ? `${item.firstName} ${item.surname}` : item.name || item.studentId || item.title || item.username)}
                                </span>
                                {activeTab === 'admissions' && (
                                  <span className="bg-[#1a1a1a] text-orange-400 font-mono text-[9px] px-2 py-0.5 rounded border border-white/5 shadow-sm">
                                    BK-2026-{item.formNumber || 'XXXX'}
                                  </span>
                                )}
                              </div>
                              
                              {activeTab === 'counseling' && (
                                <div className="flex flex-col gap-1 mt-2">
                                  <div className="flex items-center gap-3">
                                    <span className="text-brand-red text-[10px] font-black uppercase tracking-widest bg-brand-red/5 px-2 py-0.5 rounded border border-brand-red/10">
                                      {item.stream} • {item.presence}
                                    </span>
                                    <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                      📅 {item.appointmentDate} • 🕒 {item.appointmentTime}
                                    </span>
                                  </div>
                                  {item.guidanceType && item.guidanceType.length > 0 && (
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Guidance: {item.guidanceType.join(', ')}</p>
                                  )}
                                </div>
                              )}

                              {activeTab === 'toppers' && (
                                <div className="flex flex-col gap-1 mt-2">
                                  <div className="flex items-center gap-3">
                                    <span className="text-brand-red text-[10px] font-black uppercase tracking-widest bg-brand-red/5 px-2 py-0.5 rounded border border-brand-red/10">
                                      {item.rank} • {item.score}
                                    </span>
                                    {item.videoUrl && (
                                      <a 
                                        href={item.videoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded border border-red-100 hover:bg-red-100 transition-all shadow-sm"
                                      >
                                        <Play size={8} fill="currentColor" className="text-red-600" />
                                        <span className="text-[8px] font-black text-red-600 uppercase tracking-widest">Video Linked</span>
                                      </a>
                                    )}
                                  </div>
                                  {item.quote && (
                                    <p className="text-[9px] text-gray-400 font-bold line-clamp-1">"{item.quote}"</p>
                                  )}
                                </div>
                              )}

                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                                {item.email && <span className="text-brand-red text-[10px] font-black uppercase tracking-widest">{item.email}</span>}
                                {item.mobileSelf && <span className="text-gray-500 text-[10px] font-bold">📞 {item.mobileSelf}</span>}
                                {item.mobile && <span className="text-gray-500 text-[10px] font-bold">📞 {item.mobile}</span>}
                                {item.phone && <span className="text-gray-500 text-[10px] font-bold">📞 {item.phone}</span>}
                                {item.examCategory && <span className="text-brand-red text-[10px] font-black uppercase tracking-widest bg-brand-red/5 px-2 py-0.5 rounded">🎯 {item.examCategory}</span>}
                                {item.careerInterest && <span className="text-brand-red text-[10px] font-black uppercase tracking-widest bg-brand-red/5 px-2 py-0.5 rounded">🚀 {item.careerInterest}</span>}
                                {item.currentClass && <span className="text-indigo-600 text-[10px] font-black uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">🏫 {item.currentClass}</span>}
                                {item.course && <span className="text-indigo-600 text-[10px] font-black uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">📚 {item.course}</span>}
                                {item.schoolName && <span className="text-gray-400 text-[10px] font-bold">🏫 {item.schoolName}</span>}
                                <span className="text-gray-300 text-[10px] font-bold">📅 {new Date(item.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              ['Approved', 'Verified', 'Resolved', 'Closed', 'Onboarded'].includes(item.status) ? 'bg-green-50 text-green-600' :
                              ['Rejected', 'Inactive'].includes(item.status) ? 'bg-red-50 text-red-600' : 'bg-brand-red/5 text-brand-red'
                            }`}>
                              {item.status || item.role || 'Active'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            {(activeTab === 'admissions' || activeTab === 'counseling') && (
                              <button onClick={() => downloadFormPDF(item)} className="p-2 text-brand-red hover:bg-brand-red/5 rounded-lg transition-all" title="Download Official Receipt">
                                <FileText size={16} />
                              </button>
                            )}
                            {activeTab === 'pdfs' && (
                              <a href={`${API_BASE}${item.fileUrl}`} target="_blank" className="p-2 text-gray-400 hover:text-brand-red hover:bg-brand-red/5 rounded-lg transition-all">
                                <ExternalLink size={16} />
                              </a>
                            )}
                            <button onClick={() => setEditingItem(item)} className="p-2 text-gray-400 hover:text-brand-dark hover:bg-gray-100 rounded-lg transition-all">
                              <Edit3 size={16} />
                            </button>
                            {currentUser?.role === 'super-admin' && (
                              <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARD VIEW */}
              <div className="md:hidden space-y-4">
                {(data.data || []).map((item) => (
                  <div key={item._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-4">
                        {(item.photo || item.image || item.videoUrl) && (
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50 flex items-center justify-center relative">
                            {item.photo || item.image ? (
                              <img 
                                src={(item.photo || item.image).startsWith('/uploads') ? `${API_BASE}${item.photo || item.image}` : (item.photo || item.image)} 
                                alt="" 
                                className="w-full h-full object-cover" 
                              />
                            ) : item.videoUrl ? (
                              <div className="w-full h-full relative bg-black/5 flex items-center justify-center">
                                <Play size={20} className="text-brand-red" />
                              </div>
                            ) : null}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <h4 className="font-black text-brand-dark uppercase tracking-tight text-sm leading-tight">
                            {item.studentName || item.fullName || (item.firstName ? `${item.firstName} ${item.surname}` : item.name || item.title || item.username)}
                          </h4>
                          <span className="text-[10px] text-gray-400 font-bold mt-1.5 uppercase tracking-widest">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        ['Approved', 'Verified', 'Resolved', 'Closed'].includes(item.status) ? 'bg-green-50 text-green-600' : 'bg-brand-red/5 text-brand-red'
                      }`}>
                        {item.status || 'Active'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {item.whatsapp && <div className="text-[10px] text-green-600 font-bold uppercase tracking-tight">💬 {item.whatsapp}</div>}
                      {item.mobile && <div className="text-[10px] text-gray-500 font-bold">📞 {item.mobile}</div>}
                      {item.currentClass && <div className="text-[10px] text-indigo-600 font-black uppercase tracking-tight">🏫 {item.currentClass}</div>}
                      {item.stream && <div className="text-[10px] text-brand-red font-black uppercase tracking-tight">📚 {item.stream}</div>}
                      {item.careerInterest && <div className="text-[10px] text-brand-red font-black uppercase tracking-tight col-span-2">🚀 {item.careerInterest}</div>}
                      {activeTab === 'counseling' && (
                        <div className="text-[10px] text-blue-600 font-black uppercase tracking-tight col-span-2 bg-blue-50 p-2 rounded-lg border border-blue-100">
                          📅 {item.appointmentDate} • 🕒 {item.appointmentTime} ({item.presence})
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50">
                      {(activeTab === 'admissions' || activeTab === 'counseling') && (
                        <button onClick={() => downloadFormPDF(item)} className="p-3 text-brand-red bg-brand-red/5 rounded-xl transition-all active:scale-95">
                          <FileText size={18} />
                        </button>
                      )}
                      <button onClick={() => setEditingItem(item)} className="p-3 text-gray-500 bg-gray-50 rounded-xl transition-all active:scale-95">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-3 text-red-500 bg-red-50 rounded-xl transition-all active:scale-95">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-20 md:pb-0">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {data.data?.length || 0} of {data.total || 0} records</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} className="p-4 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-brand-dark shadow-sm">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={() => setPage(p => p + 1)} className="p-4 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-brand-dark shadow-sm">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── POPUP MANAGER TAB ── */}
          {activeTab === 'popups' && (
            <div className="space-y-8 md:space-y-10 animate-fade-up">
              <div>
                <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">
                  Popup Promotion Manager
                </h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Configure custom promotional banners and counseling popups globally
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Form Panel */}
                <div className="lg:col-span-1 bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 h-fit">
                  <div>
                    <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest">
                      Upload New Popup
                    </h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                      Banners will display in a carousel if multiple are active
                    </p>
                  </div>

                  <form onSubmit={handleUploadPopup} className="space-y-5">
                    {/* Image Upload Box */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Select Popup Image *
                      </label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                          popupFile 
                            ? 'border-green-400 bg-green-50/20 text-green-600' 
                            : 'border-gray-200 hover:border-brand-red/40 hover:bg-gray-50 text-gray-400'
                        }`}
                      >
                        <Upload size={24} className={popupFile ? "text-green-500 animate-bounce" : "text-gray-400"} />
                        <span className="text-xs font-black uppercase tracking-wider text-center">
                          {popupFile ? popupFile.name : "Choose or drag banner photo"}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 tracking-wider">
                          Support JPG, PNG up to 10MB
                        </span>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={(e) => setPopupFile(e.target.files[0])}
                          className="hidden" 
                          accept="image/*"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Promotion Title (Optional)
                      </label>
                      <input 
                        type="text"
                        value={popupTitle}
                        onChange={(e) => setPopupTitle(e.target.value)}
                        placeholder="e.g. Free Career Counseling 2026"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-xs focus:border-brand-red focus:bg-white transition-all"
                      />
                    </div>

                    {/* Link */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        Redirect Link (Optional)
                      </label>
                      <input 
                        type="url"
                        value={popupLink}
                        onChange={(e) => setPopupLink(e.target.value)}
                        placeholder="e.g. https://google.com/special-page"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-xs focus:border-brand-red focus:bg-white transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={popupLoading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-red hover:bg-brand-dark text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-brand-red/15 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {popupLoading ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          Uploading Banner...
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          Publish Popup Banner
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Popups Management List */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest">
                      Active Popup Carousel
                    </h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                      Toggle active status or remove banners. If multiple are active, they display sequentially inside the popup container.
                    </p>
                  </div>

                  {loading && (data.data || []).length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
                      <RefreshCw size={36} className="text-brand-red animate-spin mb-4" />
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Fetching popups data...</p>
                    </div>
                  ) : (data.data || []).length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-16 md:p-24 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 mb-6">
                        <Upload size={24} />
                      </div>
                      <h4 className="text-base font-black text-brand-dark uppercase tracking-widest mb-2">No popups configured</h4>
                      <p className="text-gray-400 font-bold text-xs max-w-sm mb-8 leading-relaxed">
                        There are currently no custom popup banners uploaded. Upload a banner image to enable promotional counseling popups on the public website.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {(data.data || []).map((popup) => {
                        const imgUrl = (popup.image && popup.image.startsWith('/uploads')) 
                          ? `${API_BASE}${popup.image}` 
                          : (popup.image || '');
                        return (
                          <div 
                            key={popup._id} 
                            className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-all duration-300"
                          >
                            {/* Card Image */}
                            <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center border-b border-gray-50">
                              <img 
                                src={imgUrl} 
                                alt={popup.title} 
                                className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3 flex gap-2">
                                <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm ${
                                  popup.isActive 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-400 text-white'
                                }`}>
                                  {popup.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                            </div>

                            {/* Card Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                              <div className="space-y-2">
                                <h4 className="font-black text-brand-dark uppercase tracking-tight text-sm leading-tight line-clamp-1">
                                  {popup.title}
                                </h4>
                                {popup.link ? (
                                  <a 
                                    href={popup.link} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-[10px] font-black uppercase tracking-widest"
                                  >
                                    <ExternalLink size={10} /> Link Configured
                                  </a>
                                ) : (
                                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                    Counseling Modal Trigger
                                  </span>
                                )}
                              </div>

                              {/* Card Actions */}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <button
                                  onClick={() => handleTogglePopup(popup._id)}
                                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                    popup.isActive 
                                      ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-100' 
                                      : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-100'
                                  }`}
                                >
                                  {popup.isActive ? 'Disable' : 'Enable'}
                                </button>
                                <button
                                  onClick={() => handleDeletePopup(popup._id)}
                                  className="p-2 text-gray-400 hover:text-brand-red hover:bg-brand-red/5 rounded-xl transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── EDIT MODAL ── */}
      {editingItem && (
        <div className="fixed inset-0 z-[6000] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-brand-dark/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 animate-fade-scale">
            <div className="px-6 md:px-10 py-6 md:py-8 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-black text-brand-dark uppercase tracking-tighter">Edit Record</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Resource: {activeTab}</p>
              </div>
              <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-brand-red">
                <X size={20} />
              </button>
            </div>
            
            {/* Tab Headers inside Edit Modal */}
            <div className="px-6 md:px-10 py-4 bg-gray-50/50 border-b border-gray-100 flex flex-wrap gap-2 select-none">
              {getEditFormTabs(editingItem).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEditFormTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest border transition-all active:scale-95 ${
                    editFormTab === tab.id
                      ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/15'
                      : 'bg-white text-gray-400 border-gray-150 hover:bg-gray-50 hover:text-brand-dark'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveEdit} className="flex flex-col max-h-[75vh]">
              {/* Form Scrollable Fields Container */}
              <div className="p-6 md:p-10 overflow-y-auto scrollbar-hide flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {(() => {
                    const availableTabs = getEditFormTabs(editingItem);
                    const currentTabConfig = availableTabs.find(t => t.id === editFormTab) || availableTabs[0];
                    if (!currentTabConfig) return null;

                    return currentTabConfig.keys.map(key => {
                      const isScholarship = activeTab === 'scholarship-types';
                      const label = isScholarship ? key.charAt(0).toUpperCase() + key.slice(1) : key;
                      return (
                        <div key={key} className={`space-y-1.5 animate-fade-in flex flex-col justify-start ${key === 'description' ? 'md:col-span-2' : ''}`}>
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
                          {key === 'status' ? (
                            <select 
                              value={editingItem[key]}
                              onChange={e => setEditingItem({...editingItem, [key]: e.target.value})}
                              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm focus:border-brand-red"
                            >
                              <option>New</option><option>In Progress</option><option>Contacted</option><option>Scheduled</option><option>Approved</option><option>Verified</option><option>Resolved</option><option>Closed</option><option>Rejected</option>
                            </select>
                          ) : key === 'description' ? (
                            <textarea 
                              value={editingItem[key] || ''} 
                              onChange={e => setEditingItem({...editingItem, [key]: e.target.value})}
                              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm focus:border-brand-red"
                              rows="3"
                            />
                          ) : (
                            <input 
                              type="text" 
                              value={key === 'benefits' && Array.isArray(editingItem[key]) ? editingItem[key].join(', ') : (editingItem[key] || '')} 
                              onChange={e => {
                                let val = e.target.value;
                                if (key === 'benefits') val = val.split(',').map(s => s.trim());
                                setEditingItem({...editingItem, [key]: val});
                              }}
                              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm focus:border-brand-red"
                            />
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Form Action Footer */}
              <div className="p-6 md:px-10 md:py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                <button 
                  type="button" 
                  onClick={() => setEditingItem(null)} 
                  className="px-6 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 hover:text-brand-dark transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-4 bg-brand-dark text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-red transition-all shadow-xl shadow-brand-dark/10 animate-pulse-slow"
                >
                  Update Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── VIDEO ASSET MODAL ── */}
      {showPdfUpload === 'video-asset' && (
        <div className="fixed inset-0 z-[6000] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-brand-dark/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-fade-scale">
            <div className="p-6 md:p-10 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-red/5 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6"><Play size={24} /></div>
              <h3 className="text-xl md:text-2xl font-black text-brand-dark uppercase tracking-tighter mb-2">Add Video Story</h3>
              <p className="text-gray-400 text-[10px] md:text-xs font-bold mb-6 md:mb-8">YouTube Links for Walkthroughs</p>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                try {
                  setLoading(true);
                  await apiFetch('/api/admin/pdfs/upload', { method: 'POST', body: fd });
                  setShowPdfUpload(false);
                  fetchData();
                } catch (err) { alert(err.message); }
                finally { setLoading(false); }
              }} className="space-y-4">
                <input required name="title" className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl outline-none font-bold text-sm" placeholder="Video Title" />
                <select name="category" className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl outline-none font-bold text-sm">
                  <option>Walkthrough</option><option>Announcement</option><option>Other</option>
                </select>
                <input required name="videoUrl" className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl outline-none font-bold text-sm focus:border-brand-red" placeholder="Paste YouTube Link..." />
                <button type="submit" disabled={loading} className="w-full py-3.5 md:py-4 bg-brand-red text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-brand-dark transition-all">{loading ? 'Processing...' : 'Save Video Asset'}</button>
                <button type="button" onClick={() => setShowPdfUpload(false)} className="w-full py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── PDF/PHOTO ASSET MODAL ── */}
      {showPdfUpload === 'pdf-asset' && (
        <div className="fixed inset-0 z-[6000] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-brand-dark/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-fade-scale">
            <div className="p-6 md:p-10 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-dark/5 text-brand-dark rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6"><FileText size={24} /></div>
              <h3 className="text-xl md:text-2xl font-black text-brand-dark uppercase tracking-tighter mb-2">Upload Documents</h3>
              <p className="text-gray-400 text-[10px] md:text-xs font-bold mb-6 md:mb-8">PDF Notes or Photos</p>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                try {
                  setLoading(true);
                  await apiFetch('/api/admin/pdfs/upload', { method: 'POST', body: fd });
                  setShowPdfUpload(false);
                  fetchData();
                } catch (err) { alert(err.message); }
                finally { setLoading(false); }
              }} className="space-y-4">
                <input required name="title" className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl outline-none font-bold text-sm" placeholder="Document Title" />
                <select name="category" className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl md:rounded-2xl outline-none font-bold text-sm">
                  <option>Brochure</option><option>Syllabus</option><option>Fee Structure</option><option>Result</option><option>Other</option>
                </select>
                <div className="text-left px-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Select File</label>
                  <input required type="file" name="pdf" accept=".pdf,image/*" className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none font-bold text-xs" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3.5 md:py-4 bg-brand-dark text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-brand-red transition-all">{loading ? 'Uploading...' : 'Upload & Sync'}</button>
                <button type="button" onClick={() => setShowPdfUpload(false)} className="w-full py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showPdfUpload === 'scholarship' && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-brand-dark/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-fade-scale">
            <div className="p-10">
              <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter mb-2">Create Scholarship</h3>
              <p className="text-gray-400 text-xs font-bold mb-8">This will appear on the public scholarship page.</p>
              <form onSubmit={handleCreateType} className="space-y-4">
                <input required name="title" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" placeholder="Title (e.g. Board Toppers)" />
                <input name="subtitle" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" placeholder="Subtitle" />
                <textarea name="description" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" placeholder="Description" rows="3" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="discount" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" placeholder="Discount (e.g. 50%)" />
                  <input name="eligibility" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" placeholder="Eligibility" />
                </div>
                <input name="benefits" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" placeholder="Benefits (comma separated)" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="tag" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" placeholder="Tag (e.g. Most Popular)" />
                  <input name="tagColor" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" placeholder="Tag Color (e.g. bg-blue-600)" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-brand-red text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-dark transition-all">{loading ? 'Creating...' : 'Publish Scholarship'}</button>
                <button type="button" onClick={() => setShowPdfUpload(false)} className="w-full py-3 text-gray-400 font-bold text-[10px] uppercase tracking-widest">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showPdfUpload === 'topper' && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-brand-dark/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-fade-scale">
            <div className="p-10">
              <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter mb-2">Add New Video Story</h3>
              <p className="text-gray-400 text-xs font-bold mb-8">Paste a YouTube Short link here to display it in the Hero section of the website.</p>
              <form onSubmit={handleCreateTopper} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Student Name</label>
                  <input required name="name" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm focus:border-brand-red" placeholder="e.g. Rohan Dusane" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Success Quote</label>
                  <textarea name="quote" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm focus:border-brand-red" placeholder="e.g. BK Science gave me the perfect strategy..." rows="3" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">YouTube Shorts Link</label>
                  <input required name="videoUrl" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm focus:border-brand-red" placeholder="https://www.youtube.com/shorts/..." />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Student Photo (Optional)</label>
                  <input type="file" name="image" accept="image/*" className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-xs" />
                </div>

                {/* Hidden Defaults */}
                <input type="hidden" name="rank" value="Topper" />
                <input type="hidden" name="score" value="100%" />
                <input type="hidden" name="exam" value="Success Story" />
                <input type="hidden" name="category" value="Star Performer" />
                <input type="hidden" name="year" value={new Date().getFullYear()} />

                <button type="submit" disabled={loading} className="w-full py-4 mt-4 bg-brand-red text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-dark transition-all shadow-xl shadow-brand-red/20">
                  {loading ? 'Saving...' : 'Publish Video Story'}
                </button>
                <button type="button" onClick={() => setShowPdfUpload(false)} className="w-full py-3 text-gray-400 font-bold text-[10px] uppercase tracking-widest">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── NEW TICKET ALERT POPUP ── */}
      <AnimatePresence>
        {newTicket && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 md:bottom-10 right-4 left-4 md:left-auto md:right-10 z-[7000] w-auto md:w-96 bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(192,0,0,0.2)] border-2 border-brand-red p-6 md:p-8 flex flex-col gap-4 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <button onClick={() => setNewTicket(null)} className="p-2 text-gray-400 hover:text-brand-red transition-all"><X size={20} /></button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-red text-white rounded-xl flex items-center justify-center animate-bounce shadow-lg shadow-brand-red/20">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="font-black text-brand-dark uppercase tracking-tighter text-sm md:text-base">New Support Ticket!</h4>
                <p className="text-[9px] font-black text-brand-red uppercase tracking-widest">Urgent Assistance Required</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-brand-dark">Student: <span className="text-brand-red uppercase">{newTicket.name}</span></p>
              <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 font-medium">"{newTicket.issue}"</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => { setActiveTab('tickets'); setNewTicket(null); setPage(1); }}
                className="flex-1 py-3.5 bg-brand-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-red transition-all active:scale-95"
              >
                View Ticket
              </button>
              <a href={`tel:${newTicket.phone}`} className="px-5 py-3.5 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 active:scale-95">
                <Phone size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden PDF Templates */}
      {selectedPdfItem && (
        <div style={{ position: 'absolute', left: '-9999px', top: '0', opacity: 0 }}>
          <div ref={pdfTemplateRef} style={{ padding: '40px', width: '210mm', backgroundColor: '#ffffff', color: '#1e1b4b', fontFamily: 'serif' }}>
            {activeTab === 'counseling' ? (
              /* Counseling Receipt Template */
              <>
                <div style={{ borderBottom: '6px double #800000', paddingBottom: '30px', marginBottom: '40px', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    {/* Left: English Headings */}
                    <div style={{ flex: '1', textAlign: 'left' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#000', margin: '0', textTransform: 'uppercase', fontFamily: 'serif', whiteSpace: 'nowrap' }}><span style={{ color: '#c00000' }}>BK</span> GROUP OF EDUCATION</h2>
                      <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#000', margin: '5px 0 0 0', textTransform: 'uppercase', opacity: '0.8', fontFamily: 'serif', whiteSpace: 'nowrap' }}>Counseling & Guidance Center</h4>
                    </div>

                    {/* Center: Logo & Taglines */}
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <p style={{ fontSize: '8px', fontWeight: '900', color: '#333', margin: '0', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>॥ न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ॥</p>
                      <p style={{ fontSize: '10px', color: '#800000', margin: '0', fontWeight: '900', textTransform: 'uppercase' }}>We shape careers...</p>
                      <img src="/assets/bk.png" style={{ height: '35px', width: 'auto', marginTop: '2px' }} />
                    </div>

                    <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
                      <p style={{ fontSize: '10px', fontWeight: '700', color: '#000', margin: '0', lineHeight: '1.2', textTransform: 'uppercase', textAlign: 'left', maxWidth: '220px' }}>Address: 2nd Floor, Gajanan Plaza, Gharpure Ghat Road, Ashok Stambh, Nashik, Maharashtra</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Registration No:</span>
                      <span style={{ color: '#c00000', fontWeight: '900', fontSize: '16px' }}>BK-CSL-{selectedPdfItem.formNumber || '1001'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Form No:</span>
                      <span style={{ color: '#fb923c', fontWeight: '900', fontSize: '16px' }}>{selectedPdfItem.formNumber || '1001'}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                     <h1 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', color: '#800000', margin: 0 }}>Counseling Receipt</h1>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', fontSize: '12px', marginBottom: '30px' }}>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Student Name</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '8px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.studentName}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Email ID</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '8px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.email}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>WhatsApp No.</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '8px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.whatsapp}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Current Class</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '8px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.currentClass}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>School / College</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '8px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.schoolName}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Career Interest</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '8px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.careerInterest}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Appointment</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '8px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.appointmentDate} at {selectedPdfItem.appointmentTime}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Counseling Mode</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '8px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.presence}</p></div>
                </div>

                <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '16px', marginBottom: '40px', border: '1px solid #f3f4f6' }}>
                   <h3 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>Guidance Required</h3>
                   <p style={{ fontWeight: '800', fontSize: '14px', color: '#1e1b4b' }}>{selectedPdfItem.guidanceType?.join(', ') || 'General Guidance'}</p>
                </div>

                <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '9px', color: '#64748b', fontWeight: '700' }}>
                    <p>GENERATED ON: {new Date().toLocaleString()}</p>
                    <p>OFFICIAL RECEIPT - BK SCIENCE ACADEMY</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '120px', height: '40px', borderBottom: '1px solid #000', marginBottom: '5px' }}></div>
                    <p style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase' }}>Center Head Signature</p>
                  </div>
                </div>
              </>
            ) : (
              /* Admission Form Template */
              <>
                <div style={{ borderBottom: '6px double #800000', paddingBottom: '30px', marginBottom: '30px', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    {/* Left: English Headings */}
                    <div style={{ flex: '1', textAlign: 'left' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#800000', margin: '0', textTransform: 'uppercase', fontFamily: 'serif', whiteSpace: 'nowrap' }}>
                        <span style={{ color: '#dc2626' }}>BK</span> EDUCATIONAL & WELFARE SOCIETY
                      </h2>
                      <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#800000', margin: '5px 0 0 0', textTransform: 'uppercase', fontFamily: 'serif', whiteSpace: 'nowrap' }}>BK GROUP OF EDUCATION</h4>
                    </div>

                    {/* Center: Logo & Taglines */}
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <p style={{ fontSize: '8px', fontWeight: '900', color: '#333', margin: '0', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>॥ न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ॥</p>
                      <p style={{ fontSize: '10px', color: '#dc2626', margin: '0', fontWeight: '900', textTransform: 'uppercase' }}>We shape careers...</p>
                      <img src="/assets/bk.png" style={{ height: '35px', width: 'auto', marginTop: '2px' }} />
                    </div>

                    <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
                      <p style={{ fontSize: '10px', fontWeight: '700', color: '#000', margin: '0', lineHeight: '1.2', textTransform: 'uppercase', textAlign: 'left', maxWidth: '220px' }}>Address: 2nd Floor, Gajanan Plaza, Gharpure Ghat Road, Ashok Stambh, Nashik, Maharashtra</p>
                    </div>
                  </div>
                </div>

                {/* Identifiers and Photo Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Registration No:</span>
                      <span style={{ color: '#dc2626', fontWeight: '900', fontSize: '16px' }}>BK-2026-{selectedPdfItem.formNumber || '1'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Form No:</span>
                      <span style={{ color: '#fb923c', fontWeight: '900', fontSize: '16px' }}>{selectedPdfItem.formNumber || '1'}</span>
                    </div>
                  </div>
                  
                  <div style={{ width: '90px', height: '110px', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '4px', overflow: 'hidden' }}>
                    {selectedPdfItem.photo ? (
                      <img 
                        src={selectedPdfItem.photo.startsWith('blob:') || selectedPdfItem.photo.startsWith('data:') 
                          ? selectedPdfItem.photo 
                          : `${API_BASE}/${selectedPdfItem.photo.replace(/\\/g, '/')}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', padding: '10px', lineHeight: '1.5' }}>Affix<br/>Passport<br/>Photo</span>
                    )}
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', fontSize: '12px', marginBottom: '30px' }}>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Candidate Name</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.salutation} {selectedPdfItem.firstName} {selectedPdfItem.middleName} {selectedPdfItem.surname}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Name in Marathi</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.firstNameLocal} {selectedPdfItem.middleNameLocal} {selectedPdfItem.surnameLocal}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Date of Birth</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.dob} (Age: {selectedPdfItem.age})</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Gender</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.gender}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Father's Name</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.fatherName}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Email ID</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.email}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Contact Numbers</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.mobileSelf} / {selectedPdfItem.mobileParent}</p></div>
                  <div><label style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', color: '#64748b' }}>Category</label><p style={{ fontWeight: '800', borderBottom: '1px solid #e2e8f0', padding: '6px 0', fontSize: '15px', color: '#0f172a' }}>{selectedPdfItem.category}</p></div>
                </div>

                {/* Academic Record Section */}
                <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid #f3f4f6' }}>
                   <h3 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>Academic Record & Selection</h3>
                   <table style={{ width: '100%', textAlign: 'left', fontSize: '10px' }}>
                      <thead><tr><th style={{ paddingBottom: '8px' }}>Level</th><th style={{ paddingBottom: '8px' }}>Board</th><th style={{ paddingBottom: '8px' }}>Year</th><th style={{ paddingBottom: '8px' }}>Marks%</th></tr></thead>
                      <tbody style={{ fontWeight: '700' }}>
                         <tr><td style={{ padding: '4px 0' }}>10th Grade</td><td>{selectedPdfItem.edu10th?.board}</td><td>{selectedPdfItem.edu10th?.year}</td><td>{selectedPdfItem.edu10th?.marks}</td></tr>
                         <tr><td style={{ padding: '4px 0' }}>12th Grade</td><td>{selectedPdfItem.edu12th?.board}</td><td>{selectedPdfItem.edu12th?.year}</td><td>{selectedPdfItem.edu12th?.marks}</td></tr>
                      </tbody>
                   </table>
                   <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '40px' }}>
                      <div><label style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', opacity: '0.4' }}>Target Exam</label><p style={{ fontWeight: '900', fontSize: '14px' }}>{selectedPdfItem.examCategory}</p></div>
                      <div><label style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', opacity: '0.4' }}>Courses</label><p style={{ fontWeight: '900', fontSize: '14px', textTransform: 'uppercase' }}>{selectedPdfItem.courses?.join(', ')}</p></div>
                   </div>
                </div>

                {/* Address Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', fontSize: '12px', marginBottom: '30px' }}>
                   <div><h4 style={{ fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px', color: '#64748b', fontSize: '9px' }}>Current Address</h4><p style={{ lineHeight: '1.6', color: '#0f172a', fontWeight: '700' }}>{selectedPdfItem.currentAddress?.door}, {selectedPdfItem.currentAddress?.street}, {selectedPdfItem.currentAddress?.city}, {selectedPdfItem.currentAddress?.pincode}</p></div>
                   <div><h4 style={{ fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px', color: '#64748b', fontSize: '9px' }}>Permanent Address</h4><p style={{ lineHeight: '1.6', color: '#0f172a', fontWeight: '700' }}>{selectedPdfItem.permanentAddress?.door}, {selectedPdfItem.permanentAddress?.street}, {selectedPdfItem.permanentAddress?.city}, {selectedPdfItem.permanentAddress?.pincode}</p></div>
                </div>

                {/* Footer / Signatures */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                   <div style={{ fontSize: '8px', fontWeight: '700', opacity: '0.4' }}>
                      <p>APPLICATION DATE: {new Date(selectedPdfItem.createdAt).toLocaleDateString()}</p>
                      <p>STATUS: {selectedPdfItem.status?.toUpperCase() || 'VERIFIED'}</p>
                   </div>
                   <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '160px', height: '64px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '8px' }}>
                        {selectedPdfItem.signature && (
                          <img 
                            src={selectedPdfItem.signature.startsWith('blob:') || selectedPdfItem.signature.startsWith('data:') 
                              ? selectedPdfItem.signature 
                              : `${API_BASE}/${selectedPdfItem.signature.replace(/\\/g, '/')}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                          />
                        )}
                      </div>
                      <p style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase' }}>Candidate Signature</p>
                   </div>
                   <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '120px', height: '60px', borderBottom: '1px dashed #000', marginBottom: '8px' }}></div>
                      <p style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase' }}>Principal/Director Seal</p>
                   </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

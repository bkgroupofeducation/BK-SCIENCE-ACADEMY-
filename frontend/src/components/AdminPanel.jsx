import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Users, MessageSquare, LayoutDashboard, Search, Download,
  LogOut, ShieldCheck, TrendingUp, ArrowRight, Filter,
  Calendar, GraduationCap, AlertCircle, RefreshCw, X, ChevronLeft, ChevronRight,
  FileText, CreditCard, HelpCircle, UserPlus, ClipboardList, Upload, Eye, Trash2, Edit3, Save, ExternalLink, Award
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
const StatCard = ({ icon: Icon, value, label, color, badge }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-all">
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
  
  const [username,     setUsername]     = useState('');
  const [password,     setPassword]     = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError,    setAuthError]    = useState('');
  
  const [search,       setSearch]       = useState('');
  const [page,         setPage]         = useState(1);
  const [editingItem,  setEditingItem]  = useState(null);
  const [showPdfUpload, setShowPdfUpload] = useState(false);

  /* ── Modules Config ── */
  const modules = [
    { id: 'overview',       icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'registrations',  icon: Users,           label: 'Registrations' },
    { id: 'admissions',     icon: GraduationCap,   label: 'Admissions' },
    { id: 'enquiries',      icon: ClipboardList,   label: 'Enquiries' },
    { id: 'counseling',     icon: MessageSquare,   label: 'Counseling' },
    { id: 'results',        icon: Award,           label: 'Results' },
    { id: 'payments',       icon: CreditCard,      label: 'Payments' },
    { id: 'grievances',     icon: HelpCircle,      label: 'Grievances' },
    { id: 'associates',     icon: UserPlus,        label: 'Associates' },
    { id: 'pdfs',           icon: FileText,        label: 'PDF Manager' },
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
        : `/api/admin/${activeTab}?search=${search}&page=${page}`;
      
      const result = await apiFetch(endpoint);
      if (result.success) {
        if (activeTab === 'overview') setData({ stats: result.data, items: [], total: 0 });
        else setData({ stats: null, items: result.data, total: result.total });
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
    fetchData();
  }, [fetchData]);

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
      await apiFetch(`/api/admin/${activeTab}/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch(`/api/admin/${activeTab}/${editingItem._id}`, {
        method: 'PUT',
        body: JSON.stringify(editingItem),
      });
      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
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
    <div className="min-h-screen bg-surface-1 flex overflow-hidden font-sans pt-24 md:pt-28">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 z-20 shadow-sm overflow-y-auto">
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
        <header className="bg-white/80 backdrop-blur-md px-10 py-6 flex items-center justify-between sticky top-0 z-30 border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-black text-brand-dark uppercase tracking-tighter leading-none capitalize">{activeTab}</h1>
            <p className="text-gray-400 font-bold text-[9px] uppercase tracking-widest mt-1.5">{new Date().toDateString()}</p>
          </div>

          <div className="flex gap-3 items-center">
            {activeTab !== 'overview' && (
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search records..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm font-bold focus:border-brand-red outline-none transition-all w-64"
                />
              </div>
            )}
            <button onClick={fetchData} className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-white text-gray-500">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            {activeTab === 'pdfs' && (
              <button onClick={() => setShowPdfUpload(true)} className="flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-red transition-all">
                <Upload size={14} /> Upload PDF
              </button>
            )}
          </div>
        </header>

        <div className="p-10">
          {error && <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl font-bold text-sm border border-red-100">{error}</div>}

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && data.stats && (
            <div className="space-y-10 animate-fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} value={data.stats.totalRegistrations} label="Total Registrations" color="bg-brand-red/8 text-brand-red" badge="+5%" />
                <StatCard icon={GraduationCap} value={data.stats.totalAdmissions} label="Total Admissions" color="bg-amber-50 text-amber-600" badge="+8%" />
                <StatCard icon={CreditCard} value={data.stats.pendingPayments} label="Pending Payments" color="bg-indigo-50 text-indigo-600" />
                <StatCard icon={HelpCircle} value={data.stats.openGrievances} label="Open Grievances" color="bg-rose-50 text-rose-600" />
              </div>

              <div>
                <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-6">Security Audit Trail</h3>
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
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
          {activeTab !== 'overview' && (
            <div className="space-y-6 animate-fade-up">
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-5 text-[9px] font-black uppercase text-gray-400 tracking-widest">Record Details</th>
                      <th className="px-6 py-5 text-[9px] font-black uppercase text-gray-400 tracking-widest">Status / Metadata</th>
                      <th className="px-6 py-5 text-[9px] font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {(data.items || []).map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/40 transition-all group">
                        <td className="px-6 py-6">
                          <div className="flex flex-col">
                            <span className="font-black text-brand-dark uppercase tracking-tight text-sm">
                              {item.name || item.fullName || item.studentId || item.title || item.username}
                            </span>
                            <span className="text-gray-400 text-[10px] font-bold mt-1">
                              {item.email || item.mobile || item.category || item.role} • {new Date(item.createdAt).toLocaleDateString()}
                            </span>
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

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {data.items?.length || 0} of {data.total || 0} records</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-brand-dark shadow-sm">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setPage(p => p + 1)} className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-brand-dark shadow-sm">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── EDIT MODAL ── */}
      {editingItem && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-brand-dark/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 animate-fade-scale">
            <div className="px-10 py-8 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter">Edit Record</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Resource: {activeTab} • {editingItem._id}</p>
              </div>
              <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-brand-red">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
              {Object.keys(editingItem).map(key => {
                if (['_id', '__v', 'createdAt', 'updatedAt', 'password'].includes(key)) return null;
                return (
                  <div key={key} className="space-y-1.5">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">{key}</label>
                    {key === 'status' ? (
                      <select 
                        value={editingItem[key]}
                        onChange={e => setEditingItem({...editingItem, [key]: e.target.value})}
                        className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm focus:border-brand-red"
                      >
                        {['overview', 'logs', 'admins'].includes(activeTab) ? null : (
                          <>
                            <option>New</option>
                            <option>In Progress</option>
                            <option>Contacted</option>
                            <option>Scheduled</option>
                            <option>Approved</option>
                            <option>Verified</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                            <option>Rejected</option>
                          </>
                        )}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        value={editingItem[key] || ''} 
                        onChange={e => setEditingItem({...editingItem, [key]: e.target.value})}
                        className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm focus:border-brand-red"
                      />
                    )}
                  </div>
                );
              })}
              <button type="submit" className="w-full py-5 bg-brand-dark text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-red transition-all shadow-xl shadow-brand-dark/10">
                Update Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── PDF UPLOAD MODAL ── */}
      {showPdfUpload && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-brand-dark/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-fade-scale">
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-brand-red/5 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload size={28} />
              </div>
              <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter mb-2">Upload Asset</h3>
              <p className="text-gray-400 text-xs font-bold mb-8">PDF Documents only (Max 10MB)</p>
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                try {
                  setLoading(true);
                  await apiFetch('/api/admin/pdfs/upload', {
                    method: 'POST',
                    body: fd, // apiFetch will handle FormData
                  });
                  setShowPdfUpload(false);
                  fetchData();
                } catch (err) { alert(err.message); }
                finally { setLoading(false); }
              }} className="space-y-4">
                <input required name="title" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" placeholder="PDF Title" />
                <select name="category" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm">
                  <option>Brochure</option>
                  <option>Syllabus</option>
                  <option>Fee Structure</option>
                  <option>Result</option>
                </select>
                <input required type="file" name="pdf" accept=".pdf" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none font-bold text-sm" />
                <button type="submit" disabled={loading} className="w-full py-4 bg-brand-red text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-dark transition-all">
                  {loading ? 'Processing...' : 'Upload & Sync'}
                </button>
                <button type="button" onClick={() => setShowPdfUpload(false)} className="w-full py-3 text-gray-400 font-bold text-[10px] uppercase tracking-widest">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

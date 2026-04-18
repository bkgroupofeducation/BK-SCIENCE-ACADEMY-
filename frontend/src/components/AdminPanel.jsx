import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Users, MessageSquare, LayoutDashboard, Search, Download,
  LogOut, ShieldCheck, TrendingUp, ArrowRight, Filter,
  Calendar, GraduationCap, AlertCircle, RefreshCw, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { apiFetch, API_BASE } from '../api';

/* ─── Session helpers ─────────────────────────────────── */
const TOKEN_KEY  = 'bk_admin_token';
const EXPIRY_KEY = 'bk_admin_expiry';

const saveSession  = (token, expiresIn) => {
  sessionStorage.setItem(TOKEN_KEY,  token);
  sessionStorage.setItem(EXPIRY_KEY, String(Date.now() + expiresIn));
};
const clearSession = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXPIRY_KEY);
};
const isSessionValid = () => {
  const token  = sessionStorage.getItem(TOKEN_KEY);
  const expiry = Number(sessionStorage.getItem(EXPIRY_KEY));
  return token && expiry && Date.now() < expiry;
};

/* ─── CSV export helper ───────────────────────────────── */
const exportCSV = (rows, filename) => {
  if (!rows?.length) return;
  const keys = Object.keys(rows[0]).filter(k => k !== '__v');
  const csv  = [keys.join(','), ...rows.map(r => keys.map(k => JSON.stringify(r[k] ?? '')).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

/* ─── Stat Card ───────────────────────────────────────── */
const StatCard = ({ icon: Icon, value, label, color, badge }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center`}>
        <Icon size={22} />
      </div>
      {badge && (
        <span className="bg-green-50 text-green-600 font-black text-[10px] px-2.5 py-1 rounded-full">{badge}</span>
      )}
    </div>
    <div>
      <h3 className="text-4xl font-black text-brand-dark tracking-tighter leading-none">{value ?? '—'}</h3>
      <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">{label}</p>
    </div>
  </div>
);

/* ─── Empty State ─────────────────────────────────────── */
const EmptyState = ({ search }) => (
  <div className="text-center py-20">
    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <Users size={28} className="text-gray-300" />
    </div>
    <p className="text-brand-dark font-black uppercase tracking-widest text-sm">
      {search ? 'No matching records' : 'No records yet'}
    </p>
    <p className="text-gray-400 font-bold text-xs mt-1">
      {search ? `No results for "${search}"` : 'Data will appear here once students submit forms.'}
    </p>
  </div>
);

/* ─── Main AdminPanel ─────────────────────────────────── */
const AdminPanel = ({ navigateTo }) => {
  const [activeTab,    setActiveTab]    = useState('overview');
  const [data,         setData]         = useState({ stats: null, registrations: [], leads: [], admissions: [] });
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');
  const [isAuth,       setIsAuth]       = useState(isSessionValid);
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError,    setAuthError]    = useState('');
  const [username,     setUsername]     = useState('');
  const [password,     setPassword]     = useState('');
  const [search,       setSearch]       = useState('');
  const [searchInput,  setSearchInput]  = useState('');
  const searchTimer = useRef(null);

  /* Debounce search */
  const handleSearchInput = (v) => {
    setSearchInput(v);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setSearch(v), 400);
  };

  /* Login */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError('');
    try {
      const result = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      saveSession(result.token, result.expiresIn);
      setIsAuth(true);
    } catch (err) {
      setAuthError(err.message || 'Access denied');
    } finally {
      setLoginLoading(false);
    }
  };

  /* Logout */
  const handleLogout = () => {
    clearSession();
    setIsAuth(false);
    setData({ stats: null, registrations: [], leads: [], admissions: [] });
  };

  /* Fetch data */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const endpoint =
        activeTab === 'overview'       ? '/api/admin/stats'         :
        activeTab === 'registrations'  ? `/api/admin/registrations${search ? `?search=${encodeURIComponent(search)}` : ''}` :
        activeTab === 'admissions'     ? `/api/admin/admissions${search ? `?search=${encodeURIComponent(search)}` : ''}` :
                                         `/api/admin/leads${search ? `?search=${encodeURIComponent(search)}` : ''}`;

      const result = await apiFetch(endpoint);
      if (result.success) {
        if (activeTab === 'overview')      setData(p => ({ ...p, stats: result.data }));
        else if (activeTab === 'registrations') setData(p => ({ ...p, registrations: result.data }));
        else if (activeTab === 'admissions')    setData(p => ({ ...p, admissions: result.data }));
        else                                    setData(p => ({ ...p, leads: result.data }));
      }
    } catch (err) {
      if (err.message?.includes('401') || err.message?.includes('403')) {
        clearSession(); setIsAuth(false);
      } else {
        setError(err.message || 'Failed to load data.');
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab, search]);

  useEffect(() => {
    if (isAuth) fetchData();
  }, [isAuth, fetchData]);

  /* Export active tab */
  const handleExport = () => {
    const map = {
      registrations: { rows: data.registrations, file: 'bk-registrations.csv' },
      admissions:    { rows: data.admissions,    file: 'bk-admissions.csv'    },
      leads:         { rows: data.leads,         file: 'bk-leads.csv'         },
    };
    const target = map[activeTab];
    if (target?.rows?.length) exportCSV(target.rows, target.file);
  };

  /* ── LOGIN SCREEN — white theme ── */
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-surface-1 flex items-center justify-center p-6 relative overflow-hidden">
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
              Admin <span className="text-brand-red">Portal</span>
            </h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2">BK Science Academy · Management Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest" htmlFor="admin-username">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3.5 bg-surface-1 border-2 border-gray-100 rounded-xl focus:border-brand-red focus:bg-white outline-none font-bold text-sm transition-all"
                placeholder="Username"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest" htmlFor="admin-password">
                Passkey
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-surface-1 border-2 border-gray-100 rounded-xl focus:border-brand-red focus:bg-white outline-none font-bold text-sm transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="shrink-0" />
                <p className="text-xs font-bold">{authError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-brand-red/20"
            >
              {loginLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Access Dashboard'}
            </button>
          </form>

          <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-8">
            Authorized personnel only. All access is logged.
          </p>
        </div>
      </div>
    );
  }

  /* ── TABLE ROWS ── */
  const activeRows = activeTab === 'registrations' ? data.registrations :
                     activeTab === 'admissions'    ? data.admissions    : data.leads;

  /* ── DASHBOARD ── */
  return (
    <div className="min-h-screen bg-surface-1 flex overflow-hidden font-sans">

      {/* SIDEBAR — white with red accent */}
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col shrink-0 z-20 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-brand-dark font-black text-lg uppercase tracking-tighter">
            BK <span className="text-brand-red">Admin</span>
          </h2>
          <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.25em] mt-0.5">Management Portal v2.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
          {[
            { id: 'overview',       icon: LayoutDashboard, label: 'Overview'      },
            { id: 'admissions',     icon: GraduationCap,   label: 'Admissions'    },
            { id: 'registrations',  icon: Users,           label: 'Registrations' },
            { id: 'leads',          icon: MessageSquare,   label: 'Inquiries'     },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSearch(''); setSearchInput(''); }}
              aria-current={activeTab === id ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === id
                  ? 'bg-brand-red/8 text-brand-red border border-brand-red/15'
                  : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50 border border-transparent'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-gray-500 border border-gray-100 hover:bg-brand-red/5 hover:text-brand-red hover:border-brand-red/20 transition-all"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto min-w-0">

        {/* Header */}
        <header className="bg-white px-10 py-6 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-brand-dark uppercase tracking-tighter leading-none capitalize">
              {activeTab} <span className="text-brand-red">Console</span>
            </h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1.5 flex items-center gap-2">
              <Calendar size={11} />
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex gap-3 items-center">
            {/* Search — only for data tabs */}
            {activeTab !== 'overview' && (
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  aria-label="Search records"
                  value={searchInput}
                  onChange={e => handleSearchInput(e.target.value)}
                  placeholder="Search records…"
                  className="bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 font-bold text-sm focus:border-brand-red outline-none transition-colors w-56"
                />
                {searchInput && (
                  <button onClick={() => { setSearchInput(''); setSearch(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                )}
              </div>
            )}

            <button
              onClick={fetchData}
              aria-label="Refresh data"
              className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>

            {activeTab !== 'overview' && (
              <button
                onClick={handleExport}
                aria-label="Export CSV"
                disabled={!activeRows?.length}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-brand-red hover:text-white hover:border-brand-red transition-all text-gray-500 disabled:opacity-40"
              >
                <Download size={16} />
              </button>
            )}
          </div>
        </header>

        <div className="p-10">

          {/* Error banner */}
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-6 py-4 text-red-600">
              <AlertCircle size={18} className="shrink-0" />
              <p className="font-bold text-sm">{error}</p>
              <button onClick={fetchData} className="ml-auto text-xs underline font-black">Retry</button>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && !data.stats && !activeRows?.length && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-pulse">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white h-36 rounded-3xl border border-gray-100" />
              ))}
            </div>
          )}

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && data.stats && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard icon={Users}         value={data.stats.totalRegistrations} label="Total Registrations"   color="bg-brand-red/8 text-brand-red"    badge="+12%" />
                <StatCard icon={GraduationCap}  value={data.stats.totalAdmissions}    label="Total Admissions"      color="bg-amber-50 text-amber-500"         badge="+8%"  />
                <StatCard icon={MessageSquare}  value={data.stats.totalLeads}          label="Counseling Inquiries"  color="bg-indigo-50 text-indigo-500"       badge="+5%"  />
                <div className="bg-white p-8 rounded-3xl border border-brand-red/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-brand-red/8 border border-brand-red/15 rounded-2xl flex items-center justify-center text-brand-red">
                      <TrendingUp size={22} />
                    </div>
                    <span className="bg-green-50 text-green-600 font-black text-[10px] px-2.5 py-1 rounded-full">Live</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-4xl font-black text-brand-dark tracking-tighter leading-none">94%</h3>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Conversion Rate</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-lg font-black text-brand-dark uppercase tracking-tighter mb-5">
                  Recent <span className="text-brand-red">Activity</span>
                </h2>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  {data.stats.recent?.length === 0 ? (
                    <EmptyState />
                  ) : (
                    <table className="w-full text-left" role="table">
                      <thead className="border-b border-gray-50">
                        <tr>
                          {['Type', 'Name', 'Date', 'Status'].map(h => (
                            <th key={h} className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {data.stats.recent.map((item, i) => {
                          const type  = item.studentId ? 'Registration' : item.parentName ? 'Admission' : 'Inquiry';
                          const colors = { Registration: 'bg-indigo-50 text-indigo-600', Admission: 'bg-amber-50 text-amber-600', Inquiry: 'bg-brand-red/5 text-brand-red' };
                          return (
                            <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                              <td className="px-6 py-4">
                                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${colors[type]}`}>{type}</span>
                              </td>
                              <td className="px-6 py-4 font-black text-brand-dark text-sm capitalize">{item.name || item.fullName}</td>
                              <td className="px-6 py-4 text-gray-400 text-xs font-bold">{new Date(item.createdAt).toLocaleDateString('en-IN')}</td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 text-green-600 font-black text-[9px] uppercase tracking-widest">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> New
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── DATA TABS ── */}
          {activeTab !== 'overview' && (
            <div className="animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  {loading ? 'Loading…' : `${activeRows?.length ?? 0} record${activeRows?.length !== 1 ? 's' : ''} found`}
                </p>
                {search && (
                  <span className="text-[10px] font-black text-brand-red uppercase tracking-widest bg-brand-red/5 px-3 py-1 rounded-full">
                    Filtered: "{search}"
                  </span>
                )}
              </div>

              {!loading && (!activeRows || activeRows.length === 0) ? (
                <EmptyState search={search} />
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {activeRows.map((item, i) => (
                    <article
                      key={i}
                      className="bg-white rounded-2xl border border-gray-100 hover:border-brand-red/20 hover:shadow-sm transition-all p-6 flex items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-5 min-w-0">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-black text-brand-dark text-sm shrink-0">
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-black text-brand-dark uppercase tracking-tight text-sm truncate">
                            {item.name || item.fullName}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">
                            {item.email} {item.mobile ? `• +91 ${item.mobile}` : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Program / Target</p>
                          <p className="text-xs font-black text-brand-dark uppercase">
                            {item.program || item.targetExam || item.target || item.course || '—'}
                          </p>
                        </div>
                        <div className="text-right hidden md:block">
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Date</p>
                          <p className="text-xs font-bold text-gray-600">{new Date(item.createdAt).toLocaleDateString('en-IN')}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

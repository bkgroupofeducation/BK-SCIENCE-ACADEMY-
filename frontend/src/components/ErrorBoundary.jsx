import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white">
          <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto border border-red-500/30">
              <AlertTriangle size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                Something went wrong
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                An unexpected interface error occurred. You can reload the panel or return to the main site.
              </p>
              {this.state.error && (
                <div className="p-3 bg-slate-900/80 rounded-xl text-left font-mono text-[10px] text-red-300 overflow-auto max-h-32 border border-slate-700/50">
                  {this.state.error.message || String(this.state.error)}
                </div>
              )}
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 bg-brand-red hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <RefreshCw size={14} /> Reload Page
              </button>
              <a
                href="/"
                className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 transition-all active:scale-95"
              >
                <Home size={14} /> Back to Site
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import React from 'react';
import { useNexus } from '../context/NexusContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useNexus();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-100 shadow-emerald-500/10'
                : isInfo
                ? 'bg-slate-900/95 border-indigo-500/40 text-indigo-100 shadow-indigo-500/10'
                : 'bg-slate-900/95 border-rose-500/40 text-rose-100 shadow-rose-500/10'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {isInfo && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
              {!isSuccess && !isInfo && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              <span className="text-xs font-medium leading-relaxed">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

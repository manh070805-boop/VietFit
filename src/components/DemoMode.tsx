import { useState } from 'react';
import { useStore } from '../store/useStore';
import { cn } from './MainLayout';

const DemoMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resetDemo, loadDemoWeek, demoWeek } = useStore();

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-[100] p-2 bg-inverse-surface text-inverse-on-surface rounded-full shadow-lg opacity-40 hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <span className="material-symbols-outlined text-[20px]">settings</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-[24px] w-full max-w-sm overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom-8">
            <div className="p-4 bg-inverse-surface text-inverse-on-surface flex justify-between items-center">
              <h3 className="font-bold text-[16px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">fast_forward</span> Developer Demo Controls
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-inverse-on-surface/70 hover:text-white flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <p className="text-[13px] font-bold text-secondary mb-3">Simulate Week:</p>
                <div className="flex gap-2">
                  {[1, 2, 3].map(w => (
                    <button
                      key={w}
                      onClick={() => {
                        loadDemoWeek(w);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex-1 py-2.5 rounded-[12px] text-[14px] font-bold transition-colors",
                        demoWeek === w ? "bg-primary text-on-primary" : "bg-surface-variant text-secondary hover:bg-surface-container-highest"
                      )}
                    >
                      Week {w}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-secondary/70 mt-3 font-medium">Week 3 is the primary demo scenario with adherence issues.</p>
              </div>

              <hr className="border-outline-variant/30" />

              <button
                onClick={() => {
                  resetDemo();
                  setIsOpen(false);
                  window.location.href = '/';
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-error/10 text-error rounded-[14px] font-bold hover:bg-error/20 transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                RESET DEMO DATA
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoMode;

import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '../components/MainLayout';

const DailyCheckIn = () => {
  const navigate = useNavigate();
  const { currentWorkout, checkInWorkoutTime } = useStore();
  
  const [energy, setEnergy] = useState('Normal');
  const [time, setTime] = useState(currentWorkout?.expectedDuration || 60);
  const [condition, setCondition] = useState('Good');
  
  const [isAdapting, setIsAdapting] = useState(false);

  const handleStart = () => {
    setIsAdapting(true);
    setTimeout(() => {
      checkInWorkoutTime(time);
      setIsAdapting(false);
      navigate('/workout');
    }, 1000);
  };

  if (isAdapting) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center p-6 text-center space-y-6 bg-surface">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          <div className="bg-surface-container-lowest p-5 rounded-full shadow-[0_8px_32px_rgba(16,185,129,0.3)] relative z-10">
            <span className="material-symbols-outlined text-[48px] text-primary animate-bounce" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-on-surface">Đang tối ưu bài tập...</h2>
          <p className="text-[14px] text-secondary">VietFit AI đang điều chỉnh kế hoạch dựa trên thời gian {time} phút của bạn.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative w-full pt-4 pb-28 bg-surface min-h-screen">
      
      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md pt-safe mb-4">
        <div className="px-5 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h1 className="text-[18px] font-bold text-on-surface tracking-tight leading-tight absolute left-1/2 -translate-x-1/2">Daily Check-in</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="flex flex-col w-full px-5 gap-6">
        
        {/* Energy */}
        <section className="bg-surface-container-lowest rounded-[24px] p-5 shadow-sm border border-outline-variant/30 flex flex-col gap-4">
          <label className="text-[15px] font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
            Mức năng lượng
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Low', 'Normal', 'High'].map(val => (
              <button 
                key={val} onClick={() => setEnergy(val)}
                className={cn(
                  "py-3 rounded-[14px] font-bold text-[14px] transition-all border", 
                  energy === val 
                    ? "bg-primary text-on-primary border-primary shadow-[0_4px_12px_rgba(16,185,129,0.25)]" 
                    : "bg-surface-variant/40 text-secondary border-outline-variant/30 hover:bg-surface-variant"
                )}
              >
                {val}
              </button>
            ))}
          </div>
        </section>

        {/* Time */}
        <section className="bg-surface-container-lowest rounded-[24px] p-5 shadow-sm border border-outline-variant/30 flex flex-col gap-4">
          <label className="text-[15px] font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500 text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>schedule</span>
            Thời gian tập hôm nay
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[20, 30, 45, 60].map(val => (
              <button 
                key={val} onClick={() => setTime(val)}
                className={cn(
                  "py-3.5 rounded-[14px] font-bold text-[15px] transition-all border", 
                  time === val 
                    ? "bg-primary text-on-primary border-primary shadow-[0_4px_12px_rgba(16,185,129,0.25)]" 
                    : "bg-surface-variant/40 text-secondary border-outline-variant/30 hover:bg-surface-variant"
                )}
              >
                {val} phút
              </button>
            ))}
          </div>
          
          <div className={cn(
            "mt-1 p-3 rounded-[16px] flex items-start gap-2.5 text-[13px] border",
            time < 60 
              ? "bg-tertiary/10 border-tertiary/20 text-tertiary" 
              : "bg-primary/10 border-primary/20 text-primary"
          )}>
            <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            <p className="leading-relaxed font-medium">
              {time < 60 
                ? `VietFit AI tự động rút gọn bài tập (còn ${time <= 20 ? 3 : time <= 30 ? 4 : 5} bài trọng tâm).`
                : 'Lộ trình tiêu chuẩn đầy đủ (6 bài tập toàn diện).'
              }
            </p>
          </div>
        </section>

        {/* Condition */}
        <section className="bg-surface-container-lowest rounded-[24px] p-5 shadow-sm border border-outline-variant/30 flex flex-col gap-4">
          <label className="text-[15px] font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>monitor_heart</span>
            Tình trạng cơ thể
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Good', 'Tired', 'Sore'].map(val => (
              <button 
                key={val} onClick={() => setCondition(val)}
                className={cn(
                  "py-3 rounded-[14px] font-bold text-[14px] transition-all border", 
                  condition === val 
                    ? "bg-primary text-on-primary border-primary shadow-[0_4px_12px_rgba(16,185,129,0.25)]" 
                    : "bg-surface-variant/40 text-secondary border-outline-variant/30 hover:bg-surface-variant"
                )}
              >
                {val}
              </button>
            ))}
          </div>
          {condition !== 'Good' && (
            <p className="mt-1 p-3 rounded-[16px] bg-surface-container border border-outline-variant/30 text-[13px] text-on-surface-variant leading-relaxed flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5 text-secondary">info</span>
              Hệ thống sẽ ghi nhận và điều chỉnh khối lượng tạ/bài tập phù hợp để tránh chấn thương.
            </p>
          )}
        </section>

        <div className="pt-4">
          <button 
            onClick={handleStart}
            className="w-full h-14 rounded-[16px] font-bold text-[16px] flex items-center justify-center gap-2 bg-on-surface text-surface-container-lowest hover:bg-on-surface/90 transition-all active:scale-95 shadow-floating"
          >
            TIẾP TỤC
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default DailyCheckIn;

import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '../components/MainLayout';

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateProfile } = useStore();
  
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: 'Tú',
    age: 25,
    gender: 'male' as const,
    weight: 70,
    height: 175,
    targetWeight: 65,
    goal: 'reduce body fat' as const,
    experience: 'Beginner' as const,
    equipment: 'Full Gym' as const,
    trainingDaysPerWeek: 4,
    workoutDurationMinutes: 60
  });

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      updateProfile(profile);
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col relative w-full h-screen bg-surface overflow-hidden">
      
      {/* Progress Bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-surface-container-high z-50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(step / 7) * 100}%` }}
        />
      </div>

      {/* Back Button */}
      {step > 1 && step < 7 && (
        <button 
          onClick={() => setStep(step - 1)}
          className="absolute top-6 left-5 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant z-50 transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
      )}

      <div className="flex-1 overflow-y-auto pt-20 px-6 pb-28 flex flex-col justify-center">
        
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <div className="w-12 h-12 bg-primary/10 rounded-[14px] flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-[24px]" style={{fontVariationSettings: "'FILL' 1"}}>flag</span>
            </div>
            <h2 className="text-[28px] font-black text-on-surface leading-tight tracking-tight">Chào bạn! Chúng ta hãy bắt đầu với mục tiêu nhé</h2>
            <div className="space-y-3 mt-4">
              {['improve fitness', 'maintain', 'build muscle', 'reduce body fat'].map(g => (
                <div 
                  key={g} 
                  onClick={() => setProfile({...profile, goal: g as any})}
                  className={cn(
                    "p-4 rounded-[20px] border-2 cursor-pointer transition-all",
                    profile.goal === g 
                      ? "border-primary bg-primary/5 shadow-[0_4px_12px_rgba(16,185,129,0.1)]" 
                      : "border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant"
                  )}
                >
                  <p className="font-bold capitalize text-on-surface text-[16px]">{g.replace(/_/g, ' ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <h2 className="text-[28px] font-black text-on-surface leading-tight tracking-tight">Thể trạng hiện tại của bạn?</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-bold text-on-surface-variant mb-2 block">Tên của bạn</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full h-14 bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-[16px] px-4 font-bold text-on-surface outline-none text-[16px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-bold text-on-surface-variant mb-2 block">Chiều cao (cm)</label>
                  <input type="number" value={profile.height} onChange={(e) => setProfile({...profile, height: Number(e.target.value)})} className="w-full h-14 bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-[16px] px-4 font-black text-on-surface outline-none text-[16px]" />
                </div>
                <div>
                  <label className="text-[13px] font-bold text-on-surface-variant mb-2 block">Cân nặng (kg)</label>
                  <input type="number" value={profile.weight} onChange={(e) => setProfile({...profile, weight: Number(e.target.value)})} className="w-full h-14 bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-[16px] px-4 font-black text-on-surface outline-none text-[16px]" />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-bold text-primary mb-2 block">Cân nặng mục tiêu (kg)</label>
                <input type="number" value={profile.targetWeight} onChange={(e) => setProfile({...profile, targetWeight: Number(e.target.value)})} className="w-full h-14 bg-primary/5 border border-primary/40 focus:border-primary rounded-[16px] px-4 font-black text-primary outline-none text-[16px]" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <h2 className="text-[28px] font-black text-on-surface leading-tight tracking-tight">Kinh nghiệm tập luyện</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Beginner', 'Intermediate', 'Advanced'].map(exp => (
                <button 
                  key={exp}
                  onClick={() => setProfile({...profile, experience: exp as any})}
                  className={cn(
                    "p-4 rounded-[20px] text-left transition-all border-2",
                    profile.experience === exp 
                      ? "bg-primary border-primary text-on-primary shadow-[0_4px_16px_rgba(16,185,129,0.3)]" 
                      : "bg-surface-container-lowest border-outline-variant/30 text-on-surface"
                  )}
                >
                  <span className="font-bold text-[16px] block">{exp}</span>
                  <span className={cn(
                    "text-[12px] mt-1 block leading-relaxed",
                    profile.experience === exp ? "text-on-primary/90" : "text-secondary"
                  )}>
                    {exp === 'Beginner' && 'Mới bắt đầu, cần hướng dẫn kỹ thuật chi tiết'}
                    {exp === 'Intermediate' && 'Đã tập 6+ tháng, nắm cơ bản form'}
                    {exp === 'Advanced' && 'Tập lâu năm, cần chương trình chuyên sâu'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <h2 className="text-[28px] font-black text-on-surface leading-tight tracking-tight">Lịch rảnh của bạn</h2>
            <div>
              <label className="text-[13px] font-bold text-on-surface-variant mb-2 block">Số buổi tập / tuần (1-6)</label>
              <input type="number" min={1} max={6} value={profile.trainingDaysPerWeek} onChange={(e) => setProfile({...profile, trainingDaysPerWeek: Number(e.target.value)})} className="w-full h-14 bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-[16px] px-4 font-black text-on-surface outline-none text-[16px]" />
            </div>
            <div>
              <label className="text-[13px] font-bold text-on-surface-variant mb-2 block">Thời lượng / buổi (phút)</label>
              <input type="number" min={15} max={120} step={15} value={profile.workoutDurationMinutes} onChange={(e) => setProfile({...profile, workoutDurationMinutes: Number(e.target.value)})} className="w-full h-14 bg-surface-container-lowest border border-outline-variant/40 focus:border-primary rounded-[16px] px-4 font-black text-on-surface outline-none text-[16px]" />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <h2 className="text-[28px] font-black text-on-surface leading-tight tracking-tight">Bạn tập ở đâu? (Thiết bị)</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Full Gym', 'Dumbbell Only', 'Bodyweight'].map(eq => (
                <button 
                  key={eq}
                  onClick={() => setProfile({...profile, equipment: eq as any})}
                  className={cn(
                    "p-4 rounded-[20px] font-bold text-[16px] text-left transition-all border-2",
                    profile.equipment === eq 
                      ? "bg-primary border-primary text-on-primary shadow-[0_4px_16px_rgba(16,185,129,0.3)]" 
                      : "bg-surface-container-lowest border-outline-variant/30 text-on-surface"
                  )}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <h2 className="text-[28px] font-black text-on-surface leading-tight tracking-tight">Xây dựng thói quen</h2>
            <p className="text-secondary text-[14px] leading-relaxed">Chúng tôi sẽ nhắc nhở bạn vào khung giờ bạn muốn tập để hình thành thói quen tốt.</p>
            <div className="p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-[20px] flex items-center justify-between">
              <span className="font-bold text-[15px] text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">notifications_active</span> Nhắc nhở tập
              </span>
              <input type="time" defaultValue="17:30" className="bg-surface-container px-3 py-2 border-none rounded-xl font-bold outline-none" />
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-6 flex flex-col items-center justify-center py-10 animate-in zoom-in-95 fade-in">
            <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center mb-2 shadow-[0_8px_32px_rgba(16,185,129,0.2)]">
              <span className="material-symbols-outlined text-primary text-[40px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-[28px] font-black text-on-surface leading-tight tracking-tight">Kế hoạch đã sẵn sàng!</h2>
              <p className="text-secondary text-[15px]">VietFit AI đã thiết kế lộ trình riêng biệt dành cho <strong className="text-on-surface">{profile.name}</strong>.</p>
            </div>
          </div>
        )}

      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-surface border-t border-outline-variant/20 pt-4 pb-safe-bottom">
        <button 
          onClick={handleNext}
          className="w-full h-14 bg-primary text-on-primary rounded-[16px] font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-[0_8px_20px_rgba(16,185,129,0.3)]"
        >
          {step === 7 ? (
            <>Bắt đầu hành trình <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span></>
          ) : (
            <>Tiếp tục <span className="material-symbols-outlined text-[20px]">arrow_forward</span></>
          )}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;

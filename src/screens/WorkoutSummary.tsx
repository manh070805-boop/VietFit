import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '../components/MainLayout';

const WorkoutSummary = () => {
  const { profile, currentWorkout, finishWorkout } = useStore();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [difficulty, setDifficulty] = useState('Vừa sức');

  return (
    <div className="flex flex-col relative w-full pt-8 pb-28 bg-surface min-h-screen">
      
      {/* Header with Celebration */}
      <div className="px-5 flex flex-col items-center text-center gap-2 mb-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-primary mb-2 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
          <span className="material-symbols-outlined text-[40px]" style={{fontVariationSettings: "'FILL' 1"}}>emoji_events</span>
        </div>
        <h1 className="text-2xl font-black text-on-surface tracking-tight">Tuyệt vời, {profile?.name || 'bạn'}! 🎉</h1>
        <p className="text-[14px] text-on-surface-variant max-w-[280px]">Bạn vừa hoàn thành xuất sắc buổi tập <strong className="text-on-surface">{currentWorkout?.title}</strong>.</p>
      </div>

      <div className="px-5 flex flex-col gap-5">
        
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container-lowest p-4 rounded-[20px] shadow-sm flex flex-col gap-1">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[18px]">timer</span>
            </div>
            <span className="text-[12px] font-bold text-secondary uppercase tracking-wider">Thời gian tập</span>
            <span className="text-2xl font-black text-on-surface">54 <span className="text-sm font-bold text-secondary lowercase">phút</span></span>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-[20px] shadow-sm flex flex-col gap-1">
            <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
            </div>
            <span className="text-[12px] font-bold text-secondary uppercase tracking-wider">Calo tiêu hao</span>
            <span className="text-2xl font-black text-on-surface">342 <span className="text-sm font-bold text-secondary lowercase">kcal</span></span>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-[20px] shadow-sm flex flex-col gap-1 col-span-2">
            <div className="w-8 h-8 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[18px]">fitness_center</span>
            </div>
            <span className="text-[12px] font-bold text-secondary uppercase tracking-wider">Tổng khối lượng (Volume)</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-on-surface">4,250 <span className="text-sm font-bold text-secondary lowercase">kg</span></span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                5% vs Tuần trước
              </span>
            </div>
          </div>
        </div>

        {/* PR Section */}
        <div className="rounded-[20px] bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-amber-700">
            <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>military_tech</span>
            <h3 className="text-[14px] font-bold uppercase tracking-wider">Kỷ lục mới (PR)</h3>
          </div>
          <div className="flex items-center justify-between bg-surface-container-lowest/80 p-3 rounded-xl shadow-sm backdrop-blur-sm border border-white/50">
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-on-surface">Barbell Bench Press</span>
              <span className="text-[12px] text-secondary">Tăng mức tạ tối đa</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[18px] font-black text-amber-600">60kg <span className="text-[14px] text-secondary">x 8</span></span>
              <span className="text-[10px] font-bold text-secondary line-through">Cũ: 55kg</span>
            </div>
          </div>
        </div>

        {/* AI Insight & Recovery */}
        <div className="rounded-[20px] bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            </div>
            <h3 className="text-[14px] font-bold text-on-surface">AI Đánh giá cơ bắp</h3>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0 font-bold text-sm">
              95%
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-bold text-on-surface">Cơ ngực & Tay sau đã mỏi</span>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">VietFit AI sẽ tự động điều chỉnh lịch ngày mai thành "Cardio & Bụng" hoặc "Nghỉ ngơi" để nhóm cơ Upper phục hồi.</p>
            </div>
          </div>
        </div>

        {/* User Feedback to AI */}
        <div className="rounded-[20px] bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-3">
          <h3 className="text-[14px] font-bold text-on-surface">Cảm nhận chung về buổi tập?</h3>
          <div className="flex gap-2">
            {['Quá nhẹ', 'Vừa sức', 'Hơi nặng', 'Kiệt sức'].map(opt => (
              <button 
                key={opt}
                onClick={() => setDifficulty(opt)}
                className={cn("flex-1 py-2 rounded-xl text-[11px] font-bold transition-all border", 
                  difficulty === opt ? "bg-primary-container text-on-primary-container border-primary-container shadow-sm" : "bg-surface text-secondary border-outline-variant/50"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-1">
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Có điểm nào chưa ưng ý? Ghi chú cho AI biết nhé..."
              className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-xl p-3 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[80px] resize-none"
            ></textarea>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md px-5 py-4 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <button 
          onClick={() => {
            finishWorkout();
            navigate('/');
          }}
          className="w-full h-14 rounded-[14px] bg-gradient-to-r from-primary-container via-emerald-600 to-primary text-on-primary text-[15px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_8px_20px_rgba(16,185,129,0.3)]"
        >
          <span className="material-symbols-outlined text-[20px]">task_alt</span>
          Lưu kết quả & Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default WorkoutSummary;

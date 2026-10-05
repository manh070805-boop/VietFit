import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '../components/MainLayout';

const Workout = () => {
  const { currentWorkout } = useStore();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});
  const [expandedEx, setExpandedEx] = useState<string | null>(null);

  if (!currentWorkout) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface p-5">
        <h2 className="text-xl font-bold">Chưa có lịch tập hôm nay</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary">Quay lại</button>
      </div>
    );
  }

  const toggleCheck = (id: string) => {
    setCheckedExercises(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="flex flex-col relative w-full pt-16 pb-28 bg-surface min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface bg-surface-container/60 hover:bg-surface-container active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold text-on-surface truncate max-w-[190px]">Chi Tiết Buổi Tập</h1>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>
          </div>
        </div>
      </header>

      {/* Action Sub-bar */}
      <div className="px-5 pt-2 pb-1 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors py-1">
          <span className="material-symbols-outlined text-[18px]">arrow_back_ios</span>
          <span className="text-[12px] font-semibold">Kế hoạch</span>
        </button>
        <div className="flex items-center gap-1">
          <button onClick={() => setBookmarked(!bookmarked)} className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center transition-transform active:scale-90">
            <span className={cn("material-symbols-outlined text-[19px]", bookmarked && "text-primary")} style={bookmarked ? {fontVariationSettings: "'FILL' 1"} : {}}>bookmark</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface transition-transform active:scale-90">
            <span className="material-symbols-outlined text-[19px]">share</span>
          </button>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-5">
        {/* Workout Hero Header Card */}
        <div className="rounded-xl bg-surface-container-lowest p-5 shadow-sm flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-1">
            <span className="px-2.5 py-1 rounded-full bg-primary-container/20 text-on-primary-container text-[11px] font-bold tracking-wide">
              Tuần 4 • Upper/Lower
            </span>
            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
              Cơ bản - Trung cấp
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[26px] font-bold text-on-surface tracking-tight leading-8">{currentWorkout.title}</h2>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary">track_changes</span>
              <p className="text-[13px]">Mục tiêu: Tăng sức mạnh & Săn chắc</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-1 pt-1">
            <div className="bg-surface-container-low rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-bold mb-0.5">
                <span className="material-symbols-outlined text-[15px] text-primary">timer</span>
                <span>Thời lượng</span>
              </div>
              <span className="text-[18px] font-semibold text-on-surface">{currentWorkout.expectedDuration} <span className="text-[13px] font-normal text-on-surface-variant">phút</span></span>
            </div>
            <div className="bg-surface-container-low rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-bold mb-0.5">
                <span className="material-symbols-outlined text-[15px] text-error">local_fire_department</span>
                <span>Ước tính</span>
              </div>
              <span className="text-[18px] font-semibold text-on-surface">~320 <span className="text-[13px] font-normal text-on-surface-variant">kcal</span></span>
            </div>
            <div className="bg-surface-container-low rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-on-surface-variant text-[11px] font-bold mb-0.5">
                <span className="material-symbols-outlined text-[15px] text-tertiary">fitness_center</span>
                <span>Khối lượng</span>
              </div>
              <span className="text-[18px] font-semibold text-on-surface">{currentWorkout.exercises.length} <span className="text-[13px] font-normal text-on-surface-variant">bài</span></span>
            </div>
          </div>
        </div>

        {/* AI Progression Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-tertiary-container/30 via-surface-container-lowest to-surface-container-low p-3 shadow-sm">
          <div className="flex items-start gap-2">
            <div className="w-9 h-9 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">AI Insight Tiến trình</span>
                <span className="material-symbols-outlined text-[14px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              </div>
              <p className="text-[13px] text-on-surface leading-snug">
                Hôm nay hãy thử thách mức <span className="font-semibold text-primary">tạ cao hơn 10%</span> ở bài đầu tiên để kích thích phát triển cơ tối ưu!
              </p>
            </div>
          </div>
        </div>

        {/* Pre-workout Briefing */}
        <div className="rounded-xl bg-surface-container-lowest p-3 flex flex-col gap-2 shadow-sm">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center shrink-0 mt-0.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[15px]">construction</span>
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-on-surface-variant">Thiết bị chuẩn bị:</span>
              <p className="text-[13px] text-on-surface">Cặp tạ đơn, Ghế phẳng, Thảm tập</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-secondary-container/40 p-2.5 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[15px]">sports_gymnastics</span>
            </div>
            <p className="text-[13px] text-on-surface">
              <strong className="text-[11px] font-bold text-on-surface block">Khởi động:</strong> Xoay nhẹ khớp vai & cổ tay 5 phút trước hiệp chính để làm ấm bao hoạt dịch.
            </p>
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[18px] font-bold text-on-surface">Danh sách bài tập</h3>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[11px] font-bold">{currentWorkout.exercises.length} động tác</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {currentWorkout.exercises.map((ex, idx) => {
            const isChecked = checkedExercises[ex.id];
            const isExpanded = expandedEx === ex.id;
            
            return (
              <div key={ex.id} className={cn("rounded-xl bg-surface-container-lowest p-3 shadow-sm flex flex-col gap-2 transition-all duration-200", isChecked && !isExpanded && "opacity-75")}>
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setExpandedEx(isExpanded ? null : ex.id)}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0 relative">
                    {ex.image ? (
                      <img src={ex.image} alt={ex.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-secondary text-xl">{ex.name.charAt(0)}</div>
                    )}
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-inverse-surface/80 text-inverse-on-surface text-[10px] font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold truncate">
                        {ex.name.split(' ')[0]} Focus
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCheck(ex.id);
                        }}
                        className={cn("w-7 h-7 rounded-full flex items-center justify-center transition-colors", isChecked ? "bg-primary-container text-on-primary-container" : "bg-surface-container-low text-on-surface-variant")}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={isChecked ? {fontVariationSettings: "'FILL' 1"} : {}}>check_circle</span>
                      </button>
                    </div>
                    <h4 className="text-[18px] font-bold text-on-surface leading-tight mt-0.5 truncate">{ex.name}</h4>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-[13px] text-on-surface-variant truncate">{ex.targetSets} sets × {ex.targetReps} reps</p>
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform" style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}}>expand_more</span>
                    </div>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="mt-2 pt-3 border-t border-outline-variant/30 animate-in fade-in slide-in-from-top-2 flex flex-col gap-3">
                    <p className="text-[13px] text-on-surface leading-relaxed">
                      {ex.description || 'Bài tập cơ bản giúp phát triển nhóm cơ hiệu quả.'}
                    </p>
                    
                    {ex.steps && ex.steps.length > 0 && (
                      <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-2">
                        <h5 className="text-[11px] font-bold text-primary uppercase flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
                          Hướng dẫn từng bước
                        </h5>
                        <ul className="flex flex-col gap-1.5">
                          {ex.steps.map((step, i) => (
                            <li key={i} className="flex gap-2 text-[12px] text-on-surface-variant">
                              <span className="font-bold text-primary shrink-0 w-4">{i + 1}.</span>
                              <span className="leading-snug">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between bg-surface-container-low/70 rounded-lg px-3 py-2 mt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">fitness_center</span>
                    <span className="text-[12px] font-bold text-on-surface">Mức tạ đề xuất</span>
                  </div>
                  <span className="text-[18px] font-semibold text-on-surface">{ex.suggestedLoad} kg</span>
                </div>
                
                {idx === 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary-container/20 text-on-primary-container">
                    <span className="material-symbols-outlined text-[15px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>trending_up</span>
                    <span className="text-[11px] font-bold">✨ AI gợi ý: Thử tăng 1-2kg ở set cuối</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom CTA Envelope */}
      <div className="fixed bottom-[80px] left-0 right-0 z-40 bg-surface/90 backdrop-blur-md px-5 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] border-t border-outline-variant/20">
        <div className="max-w-[430px] mx-auto flex items-center gap-2">
          <button 
            onClick={() => navigate('/workout-session')}
            className="flex-1 h-14 rounded-xl bg-primary hover:bg-on-primary-fixed-variant active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-on-primary shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
            <span className="text-[14px] font-bold">Bắt đầu buổi tập ngay 🚀</span>
          </button>
          <button className="h-14 w-14 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface active:scale-95 transition-all shrink-0">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workout;

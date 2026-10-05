import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { profile, currentWorkout, nutritionTarget, todayNutrition, adaptations } = useStore();
  const navigate = useNavigate();

  const recentAdaptation = adaptations[0];

  // Calculate calories percentage
  const maxCalories = nutritionTarget?.calories || 2000;
  const consumedCalories = todayNutrition?.calories || 0;
  const calPercent = Math.min(100, Math.round((consumedCalories / maxCalories) * 100));
  
  // Calculate SVG stroke-dashoffset (circumference = 251.2 for r=40)
  const dashOffset = 251.2 - (251.2 * calPercent) / 100;

  const proteinPercent = Math.min(100, Math.round(((todayNutrition?.protein || 0) / nutritionTarget.protein) * 100)) || 0;
  const carbsPercent = Math.min(100, Math.round(((todayNutrition?.carbs || 0) / nutritionTarget.carbs) * 100)) || 0;
  const fatPercent = Math.min(100, Math.round(((todayNutrition?.fat || 0) / nutritionTarget.fat) * 100)) || 0;

  return (
    <div className="flex flex-col relative w-full pt-4 pb-24 bg-surface min-h-screen">
      
      {/* Header specific to Home */}
      <header className="sticky top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe mb-4">
        <div className="h-16 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-sm relative overflow-hidden">
                <svg className="w-5 h-5 absolute" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{transform: 'scale(1.2)'}}>
                  <path d="M15 32H38L32 40H18L15 32Z" fill="#10B981"></path>
                  <path d="M19 44H35L29 52H23L19 44Z" fill="#10B981"></path>
                  <path d="M42 20L28 58H45L34 84L72 44H50L58 20H42Z" fill="#10B981"></path>
                  <circle cx="58" cy="28" fill="#732EE4" r="4.5"></circle>
                  <circle cx="70" cy="30" fill="#732EE4" r="4.5"></circle>
                  <circle cx="73" cy="42" fill="#732EE4" r="4"></circle>
                  <path d="M58 28L63 38L70 30" stroke="#732EE4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  <path d="M63 38L73 42" stroke="#732EE4" strokeLinecap="round" strokeWidth="3"></path>
                  <path d="M30 60L39 80L34 84" fill="#732EE4"></path>
                </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-on-surface leading-tight">VietFit AI</span>
              <span className="text-[11px] font-bold text-primary leading-none">Trang Chủ</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center" onClick={() => navigate('/profile')}>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-sm ring-2 ring-primary-container/20">
                {profile?.name ? profile.name.charAt(0) : 'U'}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface-container-lowest"></span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col w-full px-5 pb-6 gap-5">
        
        {/* Top Greeting & User Overview Banner */}
        <section className="flex items-center justify-between pt-1">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold">
                <span className="material-symbols-outlined text-[13px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                Hội viên VietFit Premium
              </span>
            </div>
            <h1 className="text-2xl font-bold text-on-surface tracking-tight truncate">
              Chào buổi sáng, {profile?.name || 'bạn'} 👋
            </h1>
            <p className="text-sm text-on-surface-variant">
              Hôm nay bạn tràn đầy năng lượng chứ? Hãy bắt đầu nhé!
            </p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 shadow-sm">
              <span className="text-base select-none">🔥</span>
              <span className="text-xs font-bold text-amber-700">5 ngày</span>
            </div>
          </div>
        </section>

        {/* Section 1: Hero Card "Hôm nay" (Today's Workout) */}
        <section className="relative w-full rounded-[22px] bg-surface-container-lowest p-5 shadow-[0_4px_24px_-2px_rgba(15,23,42,0.06)] overflow-hidden">
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-primary-container/10 blur-2xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider">BUỔI TẬP HÔM NAY</span>
              </div>
              <span className="text-[11px] text-secondary font-medium">Lịch tập cá nhân hóa</span>
            </div>
            
            <div>
              <h2 className="text-xl font-extrabold text-on-surface tracking-tight">
                {currentWorkout?.title || 'Chưa có lịch tập'}
              </h2>
              <p className="text-sm text-on-surface-variant mt-0.5">
                Tối ưu phát triển khối cơ & sức mạnh bộc phát cho bạn
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-[16px] bg-surface-container-lowest border border-outline-variant/40 shadow-sm text-on-surface">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-primary">timer</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-medium text-secondary truncate">Thời lượng</span>
                  <span className="text-[13px] font-bold truncate">{currentWorkout?.expectedDuration || 0} phút</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-[16px] bg-surface-container-lowest border border-outline-variant/40 shadow-sm text-on-surface">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-primary">format_list_bulleted</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-medium text-secondary truncate">Khối lượng</span>
                  <span className="text-[13px] font-bold truncate">{currentWorkout?.exercises.length || 0} bài</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 py-2.5 rounded-[16px] bg-surface-container-lowest border border-outline-variant/40 shadow-sm text-on-surface">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-amber-500" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-medium text-secondary truncate">Năng lượng</span>
                  <span className="text-[13px] font-bold truncate">~340 kcal</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3 py-2.5 rounded-[16px] bg-surface-container-lowest border border-outline-variant/40 shadow-sm text-on-surface">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-primary">fitness_center</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-medium text-secondary truncate">Thiết bị</span>
                  <span className="text-[13px] font-bold truncate">Tạ & Máy</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button 
                onClick={() => navigate('/daily-checkin')}
                className="flex-1 h-[52px] rounded-[14px] bg-gradient-to-r from-primary-container via-emerald-600 to-primary text-on-primary text-sm font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                <span>Check-in trước khi tập</span>
              </button>
              <button className="h-[52px] px-4 rounded-[14px] bg-surface-container text-on-surface text-sm font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform hover:bg-surface-container-high">
                <span className="material-symbols-outlined text-[18px] text-secondary">calendar_clock</span>
                <span>Dời lịch</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: AI Insight Card */}
        <section className="relative w-full rounded-[20px] bg-gradient-to-br from-tertiary/10 via-surface-container-lowest to-blue-500/10 p-5 shadow-[0_8px_24px_-4px_rgba(115,46,228,0.12),0_2px_8px_-2px_rgba(59,130,246,0.08)]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary/15 text-tertiary">
                <span className="material-symbols-outlined text-[16px] text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                <span className="text-[11px] font-bold uppercase tracking-wider">VietFit AI Đề xuất điều chỉnh</span>
              </div>
              <span className="text-[11px] text-secondary">Cập nhật 15p trước</span>
            </div>
            <p className="text-sm text-on-surface font-medium leading-relaxed">
              {recentAdaptation?.description || "Lượng calo tuần qua thường xuyên vượt mục tiêu. Hãy tập trung cải thiện tuân thủ dinh dưỡng trước khi thay đổi kế hoạch tập."}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button className="flex-1 h-10 rounded-xl bg-gradient-to-r from-tertiary to-blue-600 text-on-tertiary text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(115,46,228,0.25)] active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Xem thay đổi</span>
              </button>
              <button className="h-10 px-4 rounded-xl bg-surface-container-lowest text-secondary text-xs font-bold flex items-center justify-center hover:bg-surface-container active:scale-95 transition-transform">
                <span>Giữ lịch cũ</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Calories & Nutrition Card */}
        <section className="w-full rounded-[20px] bg-surface-container-lowest p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col gap-4">
          <div className="flex items-center justify-between" onClick={() => navigate('/nutrition')}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                <span className="material-symbols-outlined text-[20px]">nutrition</span>
              </div>
              <div>
                <h2 className="text-lg text-on-surface font-bold leading-tight">Dinh dưỡng & Calo</h2>
                <span className="text-[11px] font-bold text-secondary">Mục tiêu hằng ngày</span>
              </div>
            </div>
            <div className="text-xs text-primary font-semibold flex items-center gap-0.5 cursor-pointer">
              Chi tiết
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 bg-surface-container-low p-3 rounded-2xl">
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle className="stroke-surface-container-high" cx="50" cy="50" fill="none" r="40" strokeWidth="9"></circle>
                <circle 
                  className="stroke-primary-container" 
                  cx="50" cy="50" fill="none" r="40" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={dashOffset} 
                  strokeLinecap="round" strokeWidth="9"
                  style={{transition: 'stroke-dashoffset 1s ease-in-out'}}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-on-surface leading-none">{calPercent}%</span>
                <span className="text-[10px] font-bold text-secondary mt-0.5">đã nạp</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">Tổng calo hôm nay</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-on-surface">{consumedCalories}</span>
                <span className="text-sm text-secondary">/ {maxCalories} kcal</span>
              </div>
              <div className="inline-flex items-center gap-1 text-primary text-xs mt-1">
                <span className="material-symbols-outlined text-[16px]">restaurant</span>
                <span>Còn lại <strong>{Math.max(0, maxCalories - consumedCalories)} kcal</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <MacroBar label="Đạm (Protein)" current={todayNutrition?.protein || 0} target={nutritionTarget.protein} percent={proteinPercent} color="bg-blue-500" indicatorColor="bg-blue-500" />
            <MacroBar label="Tinh bột (Carbs)" current={todayNutrition?.carbs || 0} target={nutritionTarget.carbs} percent={carbsPercent} color="bg-orange-500" indicatorColor="bg-orange-500" />
            <MacroBar label="Chất béo (Fat)" current={todayNutrition?.fat || 0} target={nutritionTarget.fat} percent={fatPercent} color="bg-amber-400" indicatorColor="bg-amber-400" />
          </div>
        </section>

        {/* Section 4: Weekly Activity Strip */}
        <section className="w-full rounded-[20px] bg-surface-container-lowest p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">calendar_view_week</span>
              </div>
              <h2 className="text-lg text-on-surface font-bold">Chu kỳ tập trong tuần</h2>
            </div>
            <span className="text-[11px] text-primary font-semibold px-2 py-0.5 rounded-full bg-primary/10">Tuần 12</span>
          </div>
          
          <div className="grid grid-cols-7 gap-1.5 items-center">
            {/* Hardcoded for visual match to Stitch */}
            <div className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-surface-container-low text-center">
              <span className="text-[11px] font-bold text-secondary">T2</span>
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
              </div>
              <span className="text-[10px] text-primary font-medium">Xong</span>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-surface-container-low/50 text-center opacity-70">
              <span className="text-[11px] font-bold text-secondary">T3</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[14px]">bed</span>
              </div>
              <span className="text-[10px] text-secondary">Nghỉ</span>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-surface-container-low text-center">
              <span className="text-[11px] font-bold text-secondary">T4</span>
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
              </div>
              <span className="text-[10px] text-primary font-medium">Xong</span>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-surface-container-low/50 text-center opacity-70">
              <span className="text-[11px] font-bold text-secondary">T5</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[14px]">bed</span>
              </div>
              <span className="text-[10px] text-secondary">Nghỉ</span>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-amber-500/10 text-center">
              <span className="text-[11px] font-bold text-amber-700">T6</span>
              <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </div>
              <span className="text-[10px] text-amber-700 font-medium">Bỏ lỡ</span>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-primary/10 text-center shadow-sm">
              <span className="text-[11px] font-bold text-primary">T7</span>
              <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container animate-bounce">
                <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>fitness_center</span>
              </div>
              <span className="text-[10px] text-primary font-bold">Hôm nay</span>
            </div>
            
            <div className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl bg-surface-container-low/50 text-center opacity-70">
              <span className="text-[11px] font-bold text-secondary">CN</span>
              <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[14px]">spa</span>
              </div>
              <span className="text-[10px] text-secondary">Nghỉ</span>
            </div>
          </div>
        </section>

        {/* Section 5: Weight Mini-Chart Card */}
        <section className="w-full rounded-[20px] bg-surface-container-lowest p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] flex flex-col gap-4">
          <div className="flex items-center justify-between" onClick={() => navigate('/progress')}>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-primary">monitoring</span>
                <h2 className="text-lg text-on-surface font-bold">Tiến trình cân nặng</h2>
              </div>
              <span className="text-[11px] font-bold text-secondary mt-0.5">Cập nhật sáng nay lúc 06:45</span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold">
              -2.0 kg sau 4 tuần
            </div>
          </div>
          
          <div className="flex items-end justify-between pt-1">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-on-surface tracking-tight">{profile?.weight}</span>
                <span className="text-lg text-secondary font-bold">kg</span>
              </div>
              <p className="text-xs text-on-surface-variant">Bắt đầu: {Number(profile?.weight || 70) + 2} kg</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">Mục tiêu tiếp theo</span>
              <div className="text-sm font-bold text-on-surface">{profile?.targetWeight} kg</div>
              <span className="text-xs text-primary font-medium">Còn {Math.abs((profile?.weight || 0) - (profile?.targetWeight || 0)).toFixed(1)} kg nữa</span>
            </div>
          </div>
          
          <div className="relative w-full h-28 pt-2">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 90">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              <line stroke="#eff4ff" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="340" y1="20" y2="20"></line>
              <line stroke="#eff4ff" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="340" y1="65" y2="65"></line>
              <path d="M 0,25 C 60,30 90,45 150,50 C 210,55 260,70 340,78 L 340,90 L 0,90 Z" fill="url(#chartGradient)"></path>
              <path d="M 0,25 C 60,30 90,45 150,50 C 210,55 260,70 340,78" fill="none" stroke="#10b981" strokeLinecap="round" strokeWidth="3"></path>
              <circle cx="0" cy="25" fill="#006c49" r="4"></circle>
              <circle cx="150" cy="50" fill="#006c49" r="4"></circle>
              <circle cx="340" cy="78" fill="#10b981" r="5" stroke="#ffffff" strokeWidth="2"></circle>
            </svg>
            <div className="flex justify-between text-[11px] font-bold text-secondary pt-1">
              <span>Tuần 1 ({Number(profile?.weight || 70) + 2}kg)</span>
              <span>Tuần 2</span>
              <span>Tuần 3</span>
              <span className="font-bold text-primary">Hiện tại ({profile?.weight}kg)</span>
            </div>
          </div>
        </section>

        {/* Section 6: Quick Actions Row */}
        <section className="w-full">
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => navigate('/nutrition')}
              className="flex flex-col items-center text-center p-3 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_-2px_rgba(15,23,42,0.05)] active:scale-95 transition-transform gap-2 hover:bg-surface-container-low"
            >
              <div className="w-11 h-11 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">photo_camera</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-on-surface">Ghi bữa ăn</span>
                <span className="text-[10px] text-secondary">AI Scan món</span>
              </div>
            </button>
            <button 
              onClick={() => navigate('/progress')}
              className="flex flex-col items-center text-center p-3 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_-2px_rgba(15,23,42,0.05)] active:scale-95 transition-transform gap-2 hover:bg-surface-container-low"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">scale</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-on-surface">Ghi cân nặng</span>
                <span className="text-[10px] text-secondary">Theo dõi đều</span>
              </div>
            </button>
            <button 
              onClick={() => navigate('/ai-coach')}
              className="flex flex-col items-center text-center p-3 rounded-2xl bg-gradient-to-b from-surface-container-lowest to-tertiary/5 shadow-[0_4px_16px_-2px_rgba(115,46,228,0.12)] active:scale-95 transition-transform gap-2"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-tertiary to-blue-500 text-on-tertiary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-tertiary">Hỏi AI Coach</span>
                <span className="text-[10px] text-secondary">Chat giải đáp</span>
              </div>
            </button>
          </div>
        </section>
        
        {/* Section 7: Daily Tip Card */}
        <section className="w-full rounded-[20px] bg-surface-container-low p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]" style={{fontVariationSettings: "'FILL' 1"}}>tips_and_updates</span>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-primary uppercase">MẸO DINH DƯỠNG</span>
            </div>
            <p className="text-sm text-on-surface leading-snug">
              Đối với bữa phụ trước tập: 1 quả chuối chín + 1 quả trứng luộc cung cấp năng lượng giải phóng chậm hoàn hảo mà chi phí cực kỳ rẻ!
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

const MacroBar = ({ label, current, target, percent, color, indicatorColor }: { label: string, current: number, target: number, percent: number, color: string, indicatorColor: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="flex items-center gap-1.5 text-on-surface">
          <span className={`w-2.5 h-2.5 rounded-full ${indicatorColor}`}></span>
          {label}
        </span>
        <span className="text-on-surface font-bold">
          {current} / {target}g <span className="text-secondary font-normal">({percent}%)</span>
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default Home;

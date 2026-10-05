import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { cn } from '../components/MainLayout';

const GOAL_OPTIONS = [
  {
    id: 'build muscle',
    label: 'Tăng Cơ (Hypertrophy)',
    desc: 'Tập trung phát triển khối lượng cơ bắp. Đòi hỏi thặng dư calo (Caloric Surplus) và ưu tiên nhóm bài tập kháng lực với cường độ cao.',
    icon: 'fitness_center',
    targetCaloHint: '~2,600 kcal'
  },
  {
    id: 'reduce body fat',
    label: 'Giảm Mỡ (Fat Loss)',
    desc: 'Giảm tỷ lệ mỡ cơ thể, giữ cơ. Yêu cầu thâm hụt calo (Caloric Deficit). Khối lượng tập giữ mức vừa phải, có thể kết hợp thêm Cardio.',
    icon: 'local_fire_department',
    targetCaloHint: '~2,050 kcal'
  },
  {
    id: 'maintain',
    label: 'Duy trì (Maintenance)',
    desc: 'Duy trì vóc dáng, cân nặng và thể lực hiện tại. Lượng calo nạp bằng với lượng tiêu thụ (TDEE).',
    icon: 'monitor_weight',
    targetCaloHint: '~2,300 kcal'
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, nutritionTarget } = useStore();
  
  const [form, setForm] = useState(profile || {
    age: 25,
    gender: 'male' as const,
    weight: 70,
    height: 175,
    targetWeight: 65,
    goal: 'reduce body fat' as const,
    trainingDaysPerWeek: 4,
    workoutDurationMinutes: 60
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const isGoalChanged = profile && form.goal !== profile.goal;

  const handleSave = () => {
    updateProfile(form);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      navigate(-1);
    }, 1500);
  };

  const getBMI = () => {
    if (!form.weight || !form.height) return 0;
    return (form.weight / Math.pow(form.height / 100, 2)).toFixed(1);
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Thiếu cân', color: 'text-blue-500', bar: 'bg-blue-500' };
    if (bmi < 25) return { text: 'Bình thường', color: 'text-primary', bar: 'bg-primary' };
    if (bmi < 30) return { text: 'Thừa cân', color: 'text-orange-500', bar: 'bg-orange-500' };
    return { text: 'Béo phì', color: 'text-error', bar: 'bg-error' };
  };

  const bmi = Number(getBMI());
  const bmiInfo = getBMIStatus(bmi);

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
          <h1 className="text-xl font-bold text-on-surface tracking-tight leading-tight absolute left-1/2 -translate-x-1/2">Hồ Sơ Của Bạn</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="flex flex-col w-full px-5 gap-6">
        
        {/* User Info Overview */}
        <section className="bg-surface-container-lowest rounded-[24px] p-5 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.05)] border border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center text-2xl font-bold">
              VF
            </div>
            <div>
              <h2 className="text-lg font-bold text-on-surface">Người dùng VietFit</h2>
              <span className="inline-flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full mt-1 text-[11px] font-bold text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Gói Pro (AI Kích hoạt)
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[10px] text-secondary font-bold uppercase">Chỉ số BMI</p>
            <p className={cn("text-xl font-black mt-0.5", bmiInfo.color)}>{bmi}</p>
          </div>
        </section>

        {/* Goal Selector */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">flag</span> Mục tiêu thể hình
            </h3>
            <span className="text-[11px] text-secondary">Chọn để AI điều chỉnh</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {GOAL_OPTIONS.map((opt) => {
              const isSelected = form.goal === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setForm({ ...form, goal: opt.id as any })}
                  className={cn(
                    "p-4 rounded-[20px] border-2 transition-all cursor-pointer flex items-start gap-3.5",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-[14px] shrink-0 mt-0.5 flex items-center justify-center",
                    isSelected ? "bg-primary text-on-primary" : "bg-surface-variant text-secondary"
                  )}>
                    <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-on-surface text-[14px]">{opt.label}</p>
                      <span className="text-[11px] font-black text-primary">{opt.targetCaloHint}</span>
                    </div>
                    <p className="text-[12px] text-secondary mt-1 leading-relaxed">{opt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AI Real-time Notice */}
        {isGoalChanged && (
          <div className="p-4 rounded-[20px] bg-tertiary/10 border border-tertiary/30 flex items-start gap-3 animate-in fade-in">
            <span className="material-symbols-outlined text-tertiary shrink-0 mt-0.5 animate-pulse text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            <p className="text-[13px] text-on-surface leading-relaxed">
              <strong className="text-tertiary font-bold">VietFit AI Thích ứng: </strong>
              Khi lưu, AI sẽ tự động phân bổ lại lượng calo ({nutritionTarget.calories} kcal) và cơ cấu bài tập để phục vụ mục tiêu mới!
            </p>
          </div>
        )}

        {/* Target Metrics */}
        <section className="bg-surface-container-lowest rounded-[24px] p-5 shadow-sm border border-outline-variant/30 flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">monitor_weight</span> Thông số & Cân nặng
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] text-secondary font-bold block mb-1.5">Cân nặng hiện tại (kg)</label>
              <input
                type="number"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                className="w-full h-12 bg-surface-variant/40 border border-outline-variant/40 focus:border-primary rounded-[14px] px-3 font-black text-[16px] text-on-surface outline-none text-center"
              />
            </div>
            <div>
              <label className="text-[12px] text-primary font-bold block mb-1.5">Cân nặng mục tiêu (kg)</label>
              <input
                type="number"
                value={form.targetWeight}
                onChange={(e) => setForm({ ...form, targetWeight: Number(e.target.value) })}
                className="w-full h-12 bg-primary/5 border border-primary/40 focus:border-primary rounded-[14px] px-3 font-black text-[16px] text-primary outline-none text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[12px] text-secondary font-bold block mb-1.5">Chiều cao (cm)</label>
              <input
                type="number"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: Number(e.target.value) })}
                className="w-full h-12 bg-surface-variant/40 border border-outline-variant/40 focus:border-primary rounded-[14px] px-3 font-black text-[16px] text-on-surface outline-none text-center"
              />
            </div>
            <div>
              <label className="text-[12px] text-secondary font-bold block mb-1.5">Tuổi</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                className="w-full h-12 bg-surface-variant/40 border border-outline-variant/40 focus:border-primary rounded-[14px] px-3 font-black text-[16px] text-on-surface outline-none text-center"
              />
            </div>
          </div>
        </section>

        {/* Training Frequency */}
        <section className="bg-surface-container-lowest rounded-[24px] p-5 shadow-sm border border-outline-variant/30 flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span> Tần suất tập luyện
          </h3>

          <div>
            <label className="text-[12px] text-secondary font-bold block mb-2">Số buổi mỗi tuần</label>
            <div className="grid grid-cols-4 gap-2">
              {[3, 4, 5, 6].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setForm({ ...form, trainingDaysPerWeek: days })}
                  className={cn(
                    "py-2.5 rounded-[12px] font-bold text-[14px] transition-all border",
                    form.trainingDaysPerWeek === days
                      ? "bg-primary text-on-primary border-primary shadow-[0_4px_12px_rgba(16,185,129,0.25)]"
                      : "bg-surface-variant/40 text-secondary border-outline-variant/30 hover:bg-surface-variant"
                  )}
                >
                  {days}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12px] text-secondary font-bold block mb-2">Thời lượng tiêu chuẩn / buổi</label>
            <div className="grid grid-cols-3 gap-2">
              {[30, 45, 60].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setForm({ ...form, workoutDurationMinutes: dur })}
                  className={cn(
                    "py-2.5 rounded-[12px] font-bold text-[14px] transition-all border",
                    form.workoutDurationMinutes === dur
                      ? "bg-primary text-on-primary border-primary shadow-[0_4px_12px_rgba(16,185,129,0.25)]"
                      : "bg-surface-variant/40 text-secondary border-outline-variant/30 hover:bg-surface-variant"
                  )}
                >
                  {dur} p
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={savedSuccess}
            className={cn(
              "w-full h-14 rounded-[16px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all active:scale-95",
              savedSuccess
                ? "bg-green-600 text-white"
                : "bg-primary text-on-primary shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:bg-primary/90"
            )}
          >
            {savedSuccess ? (
              <>
                <span className="material-symbols-outlined animate-bounce">check_circle</span> ĐÃ LƯU MỤC TIÊU MỚI!
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span> LƯU & ÁP DỤNG AI
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

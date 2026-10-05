import { useState } from 'react';
import { useStore } from '../store/useStore';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { cn } from '../components/MainLayout';

const Progress = () => {
  const { progressHistory, profile, logWeight } = useStore();

  const currentWeight = progressHistory[progressHistory.length - 1]?.weight || profile?.weight;
  const startWeight = profile?.weight || 75;
  const targetWeight = profile?.targetWeight || 70;
  
  const weightChange = currentWeight && startWeight ? (currentWeight - startWeight).toFixed(1) : 0;
  const latestWorkoutAdherence = progressHistory[progressHistory.length - 1]?.workoutAdherence || 0;
  const latestNutritionAdherence = progressHistory[progressHistory.length - 1]?.nutritionAdherence || 0;

  const [weightInput, setWeightInput] = useState<string>('');
  
  const handleLogWeight = () => {
    if (weightInput && !isNaN(Number(weightInput))) {
      logWeight(Number(weightInput));
      setWeightInput('');
    }
  };

  return (
    <div className="flex flex-col relative w-full pt-4 pb-28 bg-surface min-h-screen">
      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md pt-safe mb-4">
        <div className="px-5 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-on-surface tracking-tight leading-tight">Tiến Trình</h1>
            <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">Theo dõi mục tiêu của bạn</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          </div>
        </div>
      </header>

      <div className="flex flex-col w-full px-5 gap-5">
        
        {/* Top Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container-lowest p-4 rounded-[20px] shadow-[0_4px_16px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between border border-outline-variant/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            <p className="text-[11px] uppercase text-secondary font-bold tracking-wider">Cân nặng hiện tại</p>
            <div className="mt-2 flex items-baseline gap-1 relative z-10">
              <span className="text-[32px] font-black text-on-surface leading-none tracking-tight">{currentWeight}</span>
              <span className="text-[13px] font-bold text-secondary">kg</span>
            </div>
            <div className={cn("inline-flex items-center gap-1 text-[11px] font-bold mt-3 px-2 py-0.5 rounded-full self-start", Number(weightChange) <= 0 ? "bg-primary/10 text-primary" : "bg-error/10 text-error")}>
              <span className="material-symbols-outlined text-[14px]">{Number(weightChange) <= 0 ? 'trending_down' : 'trending_up'}</span>
              {Math.abs(Number(weightChange))} kg
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-4 rounded-[20px] shadow-[0_4px_16px_-2px_rgba(15,23,42,0.05)] flex flex-col justify-between border border-outline-variant/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-tertiary/5 rounded-bl-full pointer-events-none"></div>
            <p className="text-[11px] uppercase text-secondary font-bold tracking-wider">Mục tiêu {profile?.goal === 'reduce body fat' ? 'giảm mỡ' : 'tăng cơ'}</p>
            <div className="mt-2 flex items-baseline gap-1 relative z-10">
              <span className="text-[32px] font-black text-on-surface leading-none tracking-tight">{targetWeight}</span>
              <span className="text-[13px] font-bold text-secondary">kg</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold mt-3 px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary self-start">
              <span className="material-symbols-outlined text-[14px]">flag</span>
              Còn {Math.abs((currentWeight || 0) - targetWeight).toFixed(1)} kg
            </div>
          </div>
        </div>

        {/* New Daily Weight Logging Form */}
        <section className="bg-gradient-to-br from-surface-container-lowest to-primary/5 rounded-[24px] p-5 shadow-sm border border-primary/20 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">monitor_weight</span>
              Ghi nhận cân nặng hôm nay
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input 
                type="number"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder={`${currentWeight} kg`}
                className="w-full h-12 bg-surface-container-highest/50 border border-outline-variant/40 focus:border-primary focus:bg-surface-container-lowest rounded-[14px] px-4 text-[16px] font-black text-on-surface outline-none transition-all placeholder:text-secondary/50 placeholder:font-normal"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-secondary">KG</span>
            </div>
            <button 
              onClick={handleLogWeight}
              disabled={!weightInput}
              className={cn("h-12 px-6 rounded-[14px] font-bold text-[14px] flex items-center gap-2 transition-all active:scale-95", 
                weightInput ? "bg-primary text-on-primary shadow-[0_4px_12px_rgba(16,185,129,0.25)]" : "bg-surface-container text-on-surface-variant cursor-not-allowed"
              )}
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              Lưu
            </button>
          </div>
        </section>

        {/* AI Insight */}
        <section className="bg-gradient-to-br from-tertiary/10 via-surface-container-lowest to-surface-container-low rounded-[24px] p-5 shadow-sm border border-tertiary/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
            </div>
            <h2 className="text-[14px] font-bold text-tertiary uppercase tracking-wider">VietFit AI Đánh Giá</h2>
          </div>
          <p className="text-[14px] text-on-surface leading-relaxed font-medium">
            "Bạn đang duy trì tỷ lệ tập luyện rất tốt (<strong className="text-primary">{latestWorkoutAdherence}%</strong>). Tuy nhiên, mức độ tuân thủ dinh dưỡng trong tuần qua đã giảm xuống <strong className="text-orange-500">{latestNutritionAdherence}%</strong>. Hãy cố gắng bám sát mục tiêu Calo để cân nặng tiếp tục giảm theo kế hoạch nhé."
          </p>
        </section>

        {/* Chart */}
        <section className="bg-surface-container-lowest rounded-[24px] p-5 shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">show_chart</span>
              Biểu đồ cân nặng
            </h3>
            <span className="text-[11px] font-bold text-secondary bg-surface-container-high px-2 py-0.5 rounded-md">30 ngày qua</span>
          </div>
          <div className="h-48 w-full -ml-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tickFormatter={(str) => str.split('-').slice(1).join('/')} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} dy={10} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px -4px rgba(15,23,42,0.1)' }}
                  labelStyle={{ color: '#64748b', fontWeight: 'bold', marginBottom: '4px', fontSize: '11px' }}
                  itemStyle={{ fontWeight: '900', color: '#10b981', fontSize: '14px' }}
                />
                <Area type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Adherence */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[16px] font-bold text-on-surface">Mức độ tuân thủ (Tuần này)</h3>
          
          <div className="bg-surface-container-lowest rounded-[16px] p-4 border border-outline-variant/30 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>fitness_center</span>
              <span className="text-[13px] font-bold text-on-surface-variant">Tập luyện</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${latestWorkoutAdherence}%` }} />
              </div>
              <span className="text-[13px] font-black w-10 text-right text-on-surface">{latestWorkoutAdherence}%</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-[16px] p-4 border border-outline-variant/30 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-orange-500" style={{fontVariationSettings: "'FILL' 1"}}>restaurant</span>
              <span className="text-[13px] font-bold text-on-surface-variant">Dinh dưỡng</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${latestNutritionAdherence}%` }} />
              </div>
              <span className="text-[13px] font-black w-10 text-right text-on-surface">{latestNutritionAdherence}%</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Progress;

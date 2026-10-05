import { useState } from 'react';
import { useStore } from '../store/useStore';

const Nutrition = () => {
  const { todayNutrition, nutritionTarget, logNutrition, profile } = useStore();
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({});
  const [showLogModal, setShowLogModal] = useState(false);
  const [form, setForm] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  const toggleExpand = (id: string) => {
    setExpandedMeals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLog = () => {
    logNutrition(form);
    setShowLogModal(false);
    setForm({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const getPercent = (current: number, target: number) => {
    return Math.min(100, Math.round((current / target) * 100)) || 0;
  };

  // Enhanced mock data with detailed ingredient weights
  const [mealSuggestions, setMealSuggestions] = useState([
    {
      id: 'm1',
      type: 'Bữa sáng',
      name: 'Phở bò ức (Nước trong) & Trứng',
      calories: 450,
      protein: 35,
      carbs: 55,
      fat: 10,
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?w=500&q=80',
      ingredients: [
        { name: 'Bánh phở tươi', weight: '150g' },
        { name: 'Thịt bò ức (nạc)', weight: '100g' },
        { name: 'Trứng gà luộc', weight: '1 quả (~50g)' },
        { name: 'Rau thơm, giá đỗ', weight: 'Tùy chọn' }
      ]
    },
    {
      id: 'm2',
      type: 'Bữa trưa',
      name: 'Cơm gạo lứt & Ức gà nướng mật ong',
      calories: 550,
      protein: 45,
      carbs: 65,
      fat: 12,
      image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=500&q=80',
      ingredients: [
        { name: 'Cơm gạo lứt (chín)', weight: '150g' },
        { name: 'Ức gà (sống)', weight: '180g' },
        { name: 'Súp lơ xanh luộc', weight: '200g' },
        { name: 'Dầu oliu (ướp)', weight: '5ml' }
      ]
    },
    {
      id: 'm3',
      type: 'Bữa tối',
      name: 'Cá hồi áp chảo & Khoai lang',
      calories: 480,
      protein: 38,
      carbs: 45,
      fat: 18,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80',
      ingredients: [
        { name: 'Cá hồi fillet', weight: '150g' },
        { name: 'Khoai lang luộc', weight: '120g' },
        { name: 'Măng tây nướng', weight: '100g' }
      ]
    }
  ]);

  const handleSwap = (mealId: string) => {
    // Simple mock swap
    setMealSuggestions(prev => prev.map(m => {
      if (m.id === mealId) {
        return {
          ...m,
          name: 'Salad Tôm & Bơ (AI Đổi)',
          calories: 410,
          protein: 32,
          carbs: 25,
          fat: 22,
          ingredients: [
            { name: 'Tôm sú lột vỏ', weight: '150g' },
            { name: 'Trái bơ', weight: '50g' },
            { name: 'Rau xà lách mix', weight: '100g' },
            { name: 'Sốt vừng rang', weight: '15ml' }
          ]
        };
      }
      return m;
    }));
  };

  const calPercent = getPercent(todayNutrition?.calories || 0, nutritionTarget.calories);
  const proteinPercent = getPercent(todayNutrition?.protein || 0, nutritionTarget.protein);
  const carbsPercent = getPercent(todayNutrition?.carbs || 0, nutritionTarget.carbs);
  const fatPercent = getPercent(todayNutrition?.fat || 0, nutritionTarget.fat);

  const dashOffset = 251.2 - (251.2 * calPercent) / 100;

  return (
    <div className="flex flex-col relative w-full pt-4 pb-28 bg-surface min-h-screen">
      
      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md pt-safe mb-4">
        <div className="px-5 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-on-surface tracking-tight leading-tight">Dinh Dưỡng</h1>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Hôm nay, {new Date().toLocaleDateString('vi-VN')}</span>
          </div>
          <button 
            onClick={() => setShowLogModal(true)}
            className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">add</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col w-full px-5 gap-5">
        
        {/* Main Circular Chart & Macro Bars */}
        <section className="w-full rounded-[24px] bg-surface-container-lowest p-5 shadow-[0_4px_24px_-2px_rgba(15,23,42,0.06)] flex flex-col gap-5 border border-outline-variant/30">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle className="stroke-surface-container-high" cx="50" cy="50" fill="none" r="40" strokeWidth="8"></circle>
                <circle 
                  className="stroke-primary" 
                  cx="50" cy="50" fill="none" r="40" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={dashOffset} 
                  strokeLinecap="round" strokeWidth="8"
                  style={{transition: 'stroke-dashoffset 1s ease-in-out'}}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-1">
                <span className="text-2xl font-black text-on-surface leading-none">{calPercent}%</span>
                <span className="text-[10px] font-bold text-secondary mt-1">Đã nạp</span>
              </div>
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider mb-1">Mục tiêu Calo</span>
              <div className="flex items-baseline gap-1.5 truncate">
                <span className="text-3xl font-black text-on-surface tracking-tight">{todayNutrition?.calories || 0}</span>
                <span className="text-sm text-secondary font-bold">/ {nutritionTarget.calories}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold mt-2 self-start">
                <span className="material-symbols-outlined text-[14px]">local_dining</span>
                Còn lại {Math.max(0, nutritionTarget.calories - (todayNutrition?.calories || 0))} kcal
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 border-t border-outline-variant/30">
            <MacroBar label="Đạm (Protein)" current={todayNutrition?.protein || 0} target={nutritionTarget.protein} percent={proteinPercent} color="bg-blue-500" />
            <MacroBar label="Tinh bột (Carbs)" current={todayNutrition?.carbs || 0} target={nutritionTarget.carbs} percent={carbsPercent} color="bg-orange-500" />
            <MacroBar label="Chất béo (Fat)" current={todayNutrition?.fat || 0} target={nutritionTarget.fat} percent={fatPercent} color="bg-amber-400" />
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="flex flex-col gap-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              AI Gợi Ý Bữa Ăn
            </h2>
            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">
              {profile?.goal === 'reduce body fat' ? 'Giảm mỡ' : profile?.goal === 'build muscle' ? 'Tăng cơ' : 'Duy trì'}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {mealSuggestions.map((meal) => (
              <div key={meal.id} className="rounded-[20px] bg-surface-container-lowest shadow-sm border border-outline-variant/40 overflow-hidden flex flex-col transition-all">
                <div 
                  className="flex items-center gap-3 p-3 cursor-pointer"
                  onClick={() => toggleExpand(meal.id)}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                    <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute bottom-1 left-1.5 text-white text-[10px] font-bold">{meal.calories} kcal</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">{meal.type}</span>
                    <h3 className="text-[15px] font-bold text-on-surface leading-tight mt-0.5">{meal.name}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[11px] font-medium text-secondary flex items-center gap-0.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span>{meal.protein}g</span>
                      <span className="text-[11px] font-medium text-secondary flex items-center gap-0.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span>{meal.carbs}g</span>
                      <span className="text-[11px] font-medium text-secondary flex items-center gap-0.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span>{meal.fat}g</span>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant transition-transform shrink-0" style={{transform: expandedMeals[meal.id] ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </button>
                </div>
                
                {expandedMeals[meal.id] && (
                  <div className="px-3 pb-4 animate-in fade-in slide-in-from-top-2">
                    <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-2">
                      <h4 className="text-[11px] font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px] text-primary">kitchen</span>
                        Định lượng nguyên liệu (Sống/Chưa nấu)
                      </h4>
                      <ul className="flex flex-col gap-1.5 mt-1">
                        {meal.ingredients.map((ing, idx) => (
                          <li key={idx} className="flex items-center justify-between text-[13px] border-b border-outline-variant/30 pb-1.5 last:border-0 last:pb-0">
                            <span className="text-on-surface-variant">{ing.name}</span>
                            <span className="font-bold text-on-surface">{ing.weight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button 
                        onClick={() => handleSwap(meal.id)}
                        className="h-10 px-4 rounded-xl bg-surface-container text-on-surface-variant text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform hover:bg-surface-container-high"
                      >
                        <span className="material-symbols-outlined text-[18px]">autorenew</span>
                        Đổi món
                      </button>
                      <button 
                        onClick={() => {
                          logNutrition({ calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat });
                        }}
                        className="flex-1 h-10 rounded-xl bg-primary text-on-primary text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                        Đã ăn bữa này
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Manual Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in">
          <div className="bg-surface-container-lowest w-full max-w-[430px] rounded-t-[32px] p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom-full flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-on-surface tracking-tight">Nhập thủ công</h3>
              <button onClick={() => setShowLogModal(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <div className="bg-primary/10 rounded-xl p-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[24px]">info</span>
              <p className="text-[12px] text-on-surface-variant">
                Nhập chính xác lượng dinh dưỡng bạn đã ăn để AI tính toán tiến trình hiệu quả hơn.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <InputRow label="Calories" unit="kcal" value={form.calories} onChange={(v) => setForm({...form, calories: v})} color="text-on-surface" />
              <InputRow label="Protein" unit="g" value={form.protein} onChange={(v) => setForm({...form, protein: v})} color="text-blue-500" />
              <InputRow label="Carbs" unit="g" value={form.carbs} onChange={(v) => setForm({...form, carbs: v})} color="text-orange-500" />
              <InputRow label="Fat" unit="g" value={form.fat} onChange={(v) => setForm({...form, fat: v})} color="text-amber-500" />
            </div>
            <button 
              onClick={handleLog} 
              className="w-full h-14 bg-gradient-to-r from-primary-container via-emerald-600 to-primary text-on-primary rounded-[16px] font-bold text-[15px] mt-2 shadow-[0_8px_20px_rgba(16,185,129,0.3)] active:scale-95 transition-transform"
            >
              Lưu Nhật Ký
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MacroBar = ({ label, current, target, percent, color }: { label: string, current: number, target: number, percent: number, color: string }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-[11px] font-bold">
        <span className="text-secondary uppercase tracking-wider">{label}</span>
        <span className="text-on-surface">
          {current} <span className="text-secondary font-medium">/ {target}g ({percent}%)</span>
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

const InputRow = ({ label, unit, value, onChange, color }: { label: string, unit: string, value: number, onChange: (v: number) => void, color: string }) => (
  <div className="flex items-center justify-between bg-surface-container-lowest border border-outline-variant/40 rounded-[16px] px-4 py-2 shadow-sm">
    <div className="flex flex-col">
      <span className="text-[13px] font-bold text-on-surface">{label}</span>
      <span className="text-[11px] text-secondary">{unit}</span>
    </div>
    <input 
      type="number" 
      value={value || ''} 
      onChange={(e) => onChange(Number(e.target.value))} 
      placeholder="0"
      className={`w-20 bg-surface-variant/30 rounded-xl px-2 py-2 text-right text-[16px] font-black outline-none focus:ring-1 focus:ring-primary ${color}`} 
    />
  </div>
);

export default Nutrition;

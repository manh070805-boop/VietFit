import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '../components/MainLayout';
import type { ExerciseLog } from '../types';

const WorkoutSession = () => {
  const { currentWorkout, logExercise } = useStore();
  const navigate = useNavigate();
  
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(60);
  const [showGuide, setShowGuide] = useState(false);
  
  // Local state for sets of current exercise
  const [sets, setSets] = useState<{reps: number, load: number, done: boolean}[]>([]);
  const [difficulty, setDifficulty] = useState<ExerciseLog['difficulty']>('Normal');

  const exercise = currentWorkout?.exercises[currentExIndex];

  useEffect(() => {
    if (exercise) {
      setSets(Array.from({length: exercise.targetSets}).map(() => ({ 
        reps: exercise.targetReps, 
        load: exercise.suggestedLoad, 
        done: false 
      })));
      setDifficulty('Normal');
      setShowGuide(false);
    }
  }, [currentExIndex, exercise]);

  useEffect(() => {
    let interval: any;
    if (isResting && restTime > 0) {
      interval = setInterval(() => setRestTime(prev => prev - 1), 1000);
    } else if (restTime === 0 && isResting) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, restTime]);

  if (!exercise) return null;

  const toggleSet = (idx: number) => {
    const newSets = [...sets];
    newSets[idx].done = !newSets[idx].done;
    setSets(newSets);
    
    // Auto-start rest timer if set completed
    if (newSets[idx].done) {
      setRestTime(60);
      setIsResting(true);
    } else {
      setIsResting(false);
    }
  };

  const updateSet = (idx: number, field: 'reps' | 'load', delta: number) => {
    const newSets = [...sets];
    newSets[idx][field] = Math.max(0, newSets[idx][field] + delta);
    setSets(newSets);
  };

  const allSetsDone = sets.length > 0 && sets.every(set => set.done);

  const completeExercise = () => {
    if (!allSetsDone) return;

    logExercise(exercise.id, {
      exerciseId: exercise.id,
      setsCompleted: sets.filter(set => set.done).length,
      repsPerSet: sets.map(set => set.reps),
      loadPerSet: sets.map(set => set.load),
      difficulty
    });

    if (currentExIndex < (currentWorkout?.exercises.length || 0) - 1) {
      setCurrentExIndex(prev => prev + 1);
      setIsResting(false);
    } else {
      navigate('/workout-summary');
    }
  };

  return (
    <div className="flex flex-col relative w-full pt-4 pb-28 bg-surface min-h-screen">
      
      {/* Header */}
      <header className="sticky top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md pt-safe mb-4">
        <div className="px-5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle className="stroke-surface-container-high" cx="50" cy="50" fill="none" r="44" strokeWidth="6"></circle>
                <circle 
                  className="stroke-primary" 
                  cx="50" cy="50" fill="none" r="44" 
                  strokeDasharray="276" 
                  strokeDashoffset={276 - (276 * (currentExIndex + 1)) / (currentWorkout?.exercises.length || 1)}
                  strokeLinecap="round" strokeWidth="6"
                  style={{transition: 'stroke-dashoffset 0.5s ease'}}
                ></circle>
              </svg>
              <span className="text-[13px] font-extrabold text-on-surface leading-none z-10">{currentExIndex + 1}/{currentWorkout?.exercises.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Đang tập</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold text-on-surface leading-none tracking-tight">{exercise.name}</span>
                <button 
                  onClick={() => setShowGuide(!showGuide)}
                  className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">info</span>
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface transition-transform active:scale-90">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </header>

      <div className="px-5 flex flex-col gap-6">
        
        {/* Guide / Info Section (Toggleable) */}
        {showGuide && (
          <div className="rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm border border-outline-variant/30 animate-in fade-in slide-in-from-top-2">
            {exercise.image ? (
              <img src={exercise.image} alt={exercise.name} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-32 bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-secondary">image</span>
              </div>
            )}
            <div className="p-4 flex flex-col gap-3">
              <p className="text-[14px] text-on-surface leading-relaxed font-medium">
                {exercise.description}
              </p>
              
              {exercise.steps && exercise.steps.length > 0 && (
                <div className="flex flex-col gap-2 mt-2 bg-surface-container-low p-3 rounded-xl">
                  <h4 className="text-[12px] font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">format_list_numbered</span>
                    Hướng dẫn chi tiết
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {exercise.steps.map((step, i) => (
                      <li key={i} className="flex gap-2 text-[13px] text-on-surface-variant">
                        <span className="font-bold text-primary shrink-0 w-4">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Big Timer (Rest Mode) */}
        {isResting && (
          <div className="w-full h-[220px] rounded-[24px] bg-gradient-to-br from-surface-container-lowest to-blue-500/5 shadow-sm border border-outline-variant/20 flex flex-col items-center justify-center relative overflow-hidden animate-in fade-in">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] opacity-60"></div>
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle className="stroke-surface-container-high" cx="80" cy="80" fill="none" r="72" strokeWidth="8"></circle>
                <circle 
                  className="stroke-blue-500" 
                  cx="80" cy="80" fill="none" r="72" 
                  strokeDasharray="452" 
                  strokeDashoffset={452 - (452 * restTime) / 60}
                  strokeLinecap="round" strokeWidth="8"
                  style={{transition: 'stroke-dashoffset 1s linear'}}
                ></circle>
              </svg>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[44px] font-black text-on-surface leading-none tracking-tighter">
                  0:{String(restTime).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mt-1">Nghỉ ngơi</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 z-10">
              <button onClick={() => setRestTime(prev => Math.max(0, prev - 15))} className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-[12px] font-bold active:scale-95 transition-transform">-15s</button>
              <button onClick={() => setIsResting(false)} className="px-5 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[13px] font-bold shadow-sm active:scale-95 transition-transform">Bỏ qua</button>
              <button onClick={() => setRestTime(prev => prev + 15)} className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-[12px] font-bold active:scale-95 transition-transform">+15s</button>
            </div>
          </div>
        )}

        {/* Set Loggers */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[13px] font-bold text-on-surface uppercase tracking-wider">Mục tiêu hôm nay</span>
            <span className="text-[12px] font-bold text-primary">{exercise.targetSets} hiệp × {exercise.suggestedLoad}kg</span>
          </div>

          <div className="flex flex-col gap-3">
            {sets.map((set, idx) => (
              <div 
                key={idx} 
                className={cn("w-full rounded-[16px] p-3 flex items-center justify-between gap-3 transition-all duration-300", 
                  set.done ? "bg-primary-container/20 border border-primary/20 shadow-sm" : "bg-surface-container-lowest border border-outline-variant/30 shadow-sm"
                )}
              >
                <div className="w-8 flex flex-col items-center justify-center">
                  <span className={cn("text-[11px] font-bold", set.done ? "text-primary" : "text-secondary")}>SET</span>
                  <span className={cn("text-[18px] font-black leading-none", set.done ? "text-primary" : "text-on-surface")}>{idx + 1}</span>
                </div>
                
                <div className="flex-1 min-w-0 flex gap-2">
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-secondary uppercase text-center tracking-wide">Trọng lượng (kg)</span>
                    <div className="flex items-center bg-surface-container-high/50 rounded-lg p-1 h-[42px] overflow-hidden">
                      <button onClick={() => updateSet(idx, 'load', -2.5)} className="w-8 h-full shrink-0 rounded-md flex items-center justify-center text-on-surface-variant hover:bg-surface-container active:scale-90 transition-all">-</button>
                      <input type="number" value={set.load} onChange={e => {
                        const newSets = [...sets]; newSets[idx].load = Number(e.target.value); setSets(newSets);
                      }} className="flex-1 min-w-0 w-full bg-transparent text-center text-[18px] font-bold text-on-surface border-none outline-none focus:ring-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <button onClick={() => updateSet(idx, 'load', 2.5)} className="w-8 h-full shrink-0 rounded-md flex items-center justify-center text-on-surface-variant hover:bg-surface-container active:scale-90 transition-all">+</button>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-secondary uppercase text-center tracking-wide">Số rep</span>
                    <div className="flex items-center bg-surface-container-high/50 rounded-lg p-1 h-[42px] overflow-hidden">
                      <button onClick={() => updateSet(idx, 'reps', -1)} className="w-8 h-full shrink-0 rounded-md flex items-center justify-center text-on-surface-variant hover:bg-surface-container active:scale-90 transition-all">-</button>
                      <input type="number" value={set.reps} onChange={e => {
                        const newSets = [...sets]; newSets[idx].reps = Number(e.target.value); setSets(newSets);
                      }} className="flex-1 min-w-0 w-full bg-transparent text-center text-[18px] font-bold text-on-surface border-none outline-none focus:ring-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <button onClick={() => updateSet(idx, 'reps', 1)} className="w-8 h-full shrink-0 rounded-md flex items-center justify-center text-on-surface-variant hover:bg-surface-container active:scale-90 transition-all">+</button>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => toggleSet(idx)}
                  className={cn("w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0 transition-all active:scale-90 shadow-sm", 
                    set.done ? "bg-primary text-on-primary shadow-primary/30" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                  )}
                >
                  <span className="material-symbols-outlined text-[26px]" style={set.done ? {fontVariationSettings: "'FILL' 1"} : {}}>check</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[16px] bg-surface-container-lowest border border-outline-variant/30 p-3 flex flex-col gap-2">
          <span className="text-[12px] font-bold text-on-surface">{'\u0110\u1ed9 kh\u00f3 b\u00e0i t\u1eadp'}</span>
          <div className="grid grid-cols-4 gap-2">
            {([
              ['Easy', '\u0044\u1ec5'],
              ['Normal', 'V\u1eeba'],
              ['Hard', 'Kh\u00f3'],
              ['Very Hard', 'R\u1ea5t kh\u00f3']
            ] as const).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setDifficulty(value)}
                className={cn(
                  'rounded-lg py-2 text-[11px] font-bold transition-colors',
                  difficulty === value
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>



      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md px-5 py-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-[430px] mx-auto flex items-center gap-3">
          <button className="h-14 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high flex flex-col items-center justify-center text-on-surface active:scale-95 transition-all shrink-0">
            <span className="material-symbols-outlined text-[20px]">swap_vert</span>
            <span className="text-[10px] font-bold mt-0.5">Đổi bài</span>
          </button>
          <button 
            onClick={completeExercise}
            disabled={!allSetsDone}
            className={cn("flex-1 h-14 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg",
              allSetsDone 
                ? "bg-primary text-on-primary shadow-primary/30 hover:bg-on-primary-fixed-variant" 
                : "bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70"
            )}
          >
            <span>{currentExIndex < (currentWorkout?.exercises.length || 0) - 1 ? 'Bài tiếp theo' : 'Hoàn thành buổi tập'}</span>
            <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSession;

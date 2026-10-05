import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, WorkoutSession, ExerciseLog, NutritionTarget, NutritionLog, ProgressMetric, AdaptiveDecision, CoachMessage, Exercise } from '../types';

export const INITIAL_NUTRITION_TARGET: NutritionTarget = {
  calories: 2200,
  protein: 150,
  carbs: 230,
  fat: 65,
};

// Mock 3 weeks of data
export const MOCK_PROGRESS: ProgressMetric[] = [
  { date: '2026-09-15', weight: 75.0, workoutAdherence: 100, nutritionAdherence: 95, strengthChange: 0 },
  { date: '2026-09-22', weight: 74.6, workoutAdherence: 100, nutritionAdherence: 90, strengthChange: 2 },
  { date: '2026-09-29', weight: 74.5, workoutAdherence: 50, nutritionAdherence: 85, strengthChange: 2 },
  { date: '2026-10-06', weight: 74.0, workoutAdherence: 90, nutritionAdherence: 65, strengthChange: 4 },
];

export const MUSCLE_BUILD_EXERCISES: Exercise[] = [
  { id: 'e1', name: 'Bench Press', targetSets: 4, targetReps: 8, suggestedLoad: 60, priority: 1, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop', description: 'Nằm trên ghế phẳng, hạ tạ xuống ngực và đẩy mạnh lên. Giữ vai cố định và gồng core.', steps: ['Nằm ngửa trên ghế, mắt nhìn thẳng thanh đòn.', 'Nắm đòn tạ rộng hơn vai một chút.', 'Hít vào, hạ tạ chậm rãi xuống chạm ngực giữa.', 'Thở ra, đẩy tạ dứt khoát lên vị trí ban đầu.'] },
  { id: 'e2', name: 'Lat Pulldown', targetSets: 4, targetReps: 10, suggestedLoad: 45, priority: 1, image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=400&auto=format&fit=crop', description: 'Ngồi thẳng lưng, kéo thanh tạ xuống ngực trên. Cảm nhận cơ xô (lưng) đang được siết chặt.', steps: ['Ngồi vào máy, cố định đùi đưới thanh chặn.', 'Nắm tay cầm rộng hơn vai, lưng giữ thẳng.', 'Thở ra, kéo thanh tay cầm xuống ngang ngực trên, siết chặt cơ lưng.', 'Hít vào, từ từ thả thanh tay cầm lên vị trí ban đầu.'] },
  { id: 'e3', name: 'Shoulder Press', targetSets: 3, targetReps: 10, suggestedLoad: 20, priority: 2, image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&auto=format&fit=crop', description: 'Đẩy tạ đòn qua đầu, không võng lưng quá mức.', steps: ['Ngồi trên ghế tựa, cầm tạ đơn hoặc tạ đòn ngang vai.', 'Thở ra, đẩy tạ lên cao qua đầu cho tới khi tay duỗi thẳng.', 'Hít vào, hạ tạ từ từ xuống ngang vai.', 'Giữ chặt cơ bụng, không võng lưng quá nhiều.'] },
  { id: 'e4', name: 'Barbell Row', targetSets: 3, targetReps: 10, suggestedLoad: 40, priority: 1, image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=400&auto=format&fit=crop', description: 'Cúi người góc 45 độ, giữ lưng thẳng, kéo tạ đòn sát vào bụng.', steps: ['Đứng rộng bằng vai, cúi gập người một góc khoảng 45 độ, lưng thẳng.', 'Cầm thanh tạ đòn thả lỏng dưới tay.', 'Thở ra, kéo tạ lên sát phần bụng dưới, ép chặt bả vai.', 'Hít vào, từ từ hạ tạ xuống.'] },
  { id: 'e5', name: 'Biceps Curl', targetSets: 3, targetReps: 12, suggestedLoad: 12, priority: 3, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop', description: 'Cầm tạ đơn, giữ cùi chỏ sát người và cuốn tạ lên.', steps: ['Đứng thẳng, hai tay cầm tạ đơn để hai bên hông.', 'Giữ cố định bắp tay trên, thở ra, gập khuỷu tay kéo tạ lên gần vai.', 'Siết chặt cơ bắp tay ở đỉnh động tác.', 'Hít vào, từ từ hạ tạ xuống vị trí ban đầu.'] },
  { id: 'e6', name: 'Triceps Pushdown', targetSets: 3, targetReps: 12, suggestedLoad: 15, priority: 3, image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?q=80&w=400&auto=format&fit=crop', description: 'Sử dụng cáp, đẩy tay cầm xuống dưới và siết chặt cơ tay sau.', steps: ['Đứng trước máy cáp, hai tay nắm tay cầm (thanh ngang hoặc dây thừng).', 'Khép chặt khuỷu tay vào sườn.', 'Thở ra, dùng lực cơ tay sau đẩy tay cầm xuống đến khi tay thẳng hoàn toàn.', 'Hít vào, từ từ để cáp kéo tay lên vị trí ngang ngực.'] },
];

export const FAT_LOSS_EXERCISES: Exercise[] = [
  { id: 'f1', name: 'Kettlebell Swings', targetSets: 4, targetReps: 15, suggestedLoad: 16, priority: 1, image: 'https://images.unsplash.com/photo-1526506114757-08035ee8ab99?q=80&w=400&auto=format&fit=crop', description: 'Dùng lực bùng nổ từ hông đẩy tạ lên cao ngang ngực.', steps: ['Đứng chân rộng hơn vai, hai tay nắm chặt quai tạ ấm (Kettlebell).', 'Đẩy hông ra sau, hơi khuỵu gối, vung tạ qua háng.', 'Dùng lực bùng nổ đẩy hông về trước, vung tạ lên ngang ngực.', 'Để tạ rơi tự do xuống và lặp lại động tác liên tục.'] },
  { id: 'f2', name: 'Goblet Squat', targetSets: 4, targetReps: 15, suggestedLoad: 20, priority: 1, image: 'https://images.unsplash.com/photo-1567598508481-65985588e295?q=80&w=400&auto=format&fit=crop', description: 'Ôm một quả tạ sát ngực, squat sâu xuống và đẩy lên.', steps: ['Đứng chân rộng bằng vai, hai tay ôm một quả tạ sát trước ngực.', 'Hít vào, đẩy hông ra sau và hạ thấp người như ngồi vào ghế.', 'Xuống sâu nhất có thể, giữ lưng thẳng, ngực ưỡn.', 'Thở ra, dùng lực đạp gót chân đứng thẳng lên.'] },
  { id: 'f3', name: 'Dumbbell Lunges', targetSets: 3, targetReps: 12, suggestedLoad: 10, priority: 2, image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=400&auto=format&fit=crop', description: 'Bước một chân tới trước, hạ gối sau chạm hờ mặt đất.', steps: ['Hai tay cầm tạ đơn buông thõng hai bên, đứng thẳng.', 'Hít vào, bước một chân dài về phía trước.', 'Hạ thấp trọng tâm cho đến khi cả hai đầu gối tạo thành góc 90 độ.', 'Thở ra, dùng gót chân trước đạp mạnh để thu chân về vị trí ban đầu.'] },
  { id: 'f4', name: 'Push-ups', targetSets: 3, targetReps: 15, suggestedLoad: 0, priority: 1, image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop', description: 'Chống đẩy cơ bản, siết chặt cơ bụng và mông.', steps: ['Vào tư thế chống đẩy, hai tay rộng hơn vai một chút.', 'Giữ cơ thể thành một đường thẳng từ đầu đến gót chân.', 'Hít vào, từ từ hạ người xuống đến khi ngực gần chạm sàn.', 'Thở ra, đẩy mạnh người lên vị trí ban đầu.'] },
  { id: 'f5', name: 'Plank', targetSets: 3, targetReps: 60, suggestedLoad: 0, priority: 3, image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?q=80&w=400&auto=format&fit=crop', description: 'Chống khuỷu tay, giữ thân người thành đường thẳng (Mục tiêu: 60 giây).', steps: ['Chống hai khuỷu tay vuông góc xuống sàn.', 'Duỗi thẳng hai chân ra sau, nhón mũi chân.', 'Siết chặt cơ bụng và mông, giữ thân người tạo thành một đường thẳng.', 'Giữ hơi thở đều đặn trong suốt thời gian duy trì tư thế.'] },
  { id: 'f6', name: 'Burpees', targetSets: 3, targetReps: 10, suggestedLoad: 0, priority: 3, image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=400&auto=format&fit=crop', description: 'Bài tập toàn thân kết hợp chống đẩy và bật nhảy.', steps: ['Bắt đầu ở tư thế đứng thẳng.', 'Ngồi xổm xuống và đặt hai tay chạm sàn.', 'Bật nhảy hai chân ra sau vào tư thế chống đẩy.', 'Thực hiện một nhịp chống đẩy, sau đó bật thu hai chân về tư thế ngồi xổm.', 'Bật nhảy thẳng người lên cao, vỗ hai tay qua đầu.'] },
];

export const MAINTAIN_EXERCISES: Exercise[] = [
  { id: 'm1', name: 'Squat đòn', targetSets: 3, targetReps: 10, suggestedLoad: 40, priority: 1, image: 'https://images.unsplash.com/photo-1567598508481-65985588e295?q=80&w=400&auto=format&fit=crop', description: 'Squat gánh tạ đòn, bài tập vua cho thân dưới.', steps: ['Vào trong khung gánh, đặt thanh đòn lên phần cơ cầu vai (traps).', 'Đứng thẳng, chân rộng bằng hoặc hơn vai một chút, mũi chân hơi hướng ra ngoài.', 'Hít vào, từ từ gập hông và đầu gối để hạ thấp người.', 'Thở ra, đạp mạnh gót chân đẩy người lên vị trí bắt đầu.'] },
  { id: 'm2', name: 'Bench Press', targetSets: 3, targetReps: 10, suggestedLoad: 50, priority: 1, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop', description: 'Nằm đẩy tạ đòn.', steps: ['Nằm ngửa trên ghế, mắt nhìn thẳng thanh đòn.', 'Nắm đòn tạ rộng hơn vai một chút.', 'Hít vào, hạ tạ chậm rãi xuống chạm ngực giữa.', 'Thở ra, đẩy tạ dứt khoát lên vị trí ban đầu.'] },
  { id: 'm3', name: 'Pull-ups', targetSets: 3, targetReps: 8, suggestedLoad: 0, priority: 2, image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=400&auto=format&fit=crop', description: 'Hít xà đơn, phát triển sức mạnh toàn diện cơ xô.', steps: ['Đu người trên xà, hai tay rộng hơn vai.', 'Thở ra, dùng cơ xô kéo người lên đến khi cằm vượt qua xà.', 'Giữ một giây ở điểm cao nhất.', 'Hít vào, hạ người xuống từ từ đến khi tay duỗi thẳng.'] },
  { id: 'm4', name: 'Lunges', targetSets: 3, targetReps: 12, suggestedLoad: 15, priority: 2, image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=400&auto=format&fit=crop', description: 'Chùng chân với tạ.', steps: ['Hai tay cầm tạ đơn buông thõng hai bên, đứng thẳng.', 'Hít vào, bước một chân dài về phía trước.', 'Hạ thấp trọng tâm cho đến khi cả hai đầu gối tạo thành góc 90 độ.', 'Thở ra, dùng gót chân trước đạp mạnh để thu chân về.'] },
  { id: 'm5', name: 'Biceps Curl', targetSets: 3, targetReps: 15, suggestedLoad: 10, priority: 3, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop', description: 'Cuốn tạ tay trước.', steps: ['Đứng thẳng, hai tay cầm tạ đơn.', 'Giữ cố định bắp tay trên, thở ra, gập khuỷu tay kéo tạ lên.', 'Hít vào, từ từ hạ tạ xuống vị trí ban đầu.'] },
  { id: 'm6', name: 'HIIT', targetSets: 1, targetReps: 10, suggestedLoad: 0, priority: 3, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop', description: '10 phút cardio cường độ cao.', steps: ['Khởi động nhẹ 2 phút.', 'Thực hiện động tác với cường độ tối đa (sprint) trong 30 giây.', 'Nghỉ ngơi chủ động (đi bộ chậm) trong 30 giây.', 'Lặp lại chu kỳ 30s-30s cho đủ 10 phút.'] },
];

export const FULL_WORKOUT_EXERCISES: Exercise[] = FAT_LOSS_EXERCISES;

export const INITIAL_WORKOUT: WorkoutSession = {
  id: 'w1',
  date: new Date().toISOString().split('T')[0],
  title: 'Upper Body',
  expectedDuration: 60,
  completed: false,
  exercises: FULL_WORKOUT_EXERCISES
};

interface AppState {
  hasOnboarded: boolean;
  profile: UserProfile | null;
  baseExercises: Exercise[];
  currentWorkout: WorkoutSession | null;
  workoutLogs: Record<string, ExerciseLog>; // keyed by exerciseId for today
  nutritionTarget: NutritionTarget;
  todayNutrition: NutritionLog | null;
  progressHistory: ProgressMetric[];
  adaptations: AdaptiveDecision[];
  coachMessages: CoachMessage[];
  demoWeek: number; // 1, 2, 3

  // Actions
  completeOnboarding: (profile: UserProfile) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  resetDemo: () => void;
  loadDemoWeek: (week: number) => void;
  
  // App Actions
  checkInWorkoutTime: (minutes: number) => void;
  logExercise: (exerciseId: string, log: ExerciseLog) => void;
  finishWorkout: () => void;
  logNutrition: (logData: Partial<NutritionLog>) => void;
  logWeight: (weight: number) => void;
  addCoachMessage: (role: 'user' | 'assistant', content: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasOnboarded: false,
      profile: null,
      baseExercises: FULL_WORKOUT_EXERCISES,
      currentWorkout: INITIAL_WORKOUT,
      workoutLogs: {},
      nutritionTarget: INITIAL_NUTRITION_TARGET,
      todayNutrition: null,
      progressHistory: MOCK_PROGRESS,
      adaptations: [],
      coachMessages: [
        { id: 'msg-1', role: 'assistant', content: 'Xin chào Minh! Tôi là VietFit AI Coach. Bạn cần hỗ trợ gì hôm nay?', timestamp: new Date().toISOString() }
      ],
      demoWeek: 3,

      completeOnboarding: (profile) => set({ hasOnboarded: true, profile }),

      updateProfile: (updated) => {
        const { profile, nutritionTarget, adaptations } = get();
        if (!profile) return;

        const oldGoal = profile.goal;
        const newProfile: UserProfile = { ...profile, ...updated };
        const goalChanged = updated.goal && updated.goal !== oldGoal;
        const targetWeightChanged = updated.targetWeight !== undefined && updated.targetWeight !== profile.targetWeight;
        const trainingDaysChanged = updated.trainingDaysPerWeek !== undefined && updated.trainingDaysPerWeek !== profile.trainingDaysPerWeek;

        let newNutrition = { ...nutritionTarget };
        let newBaseEx = [...get().baseExercises];
        const newAdaptations = [...adaptations];

        if (goalChanged) {
          if (newProfile.goal === 'build muscle') {
            newNutrition = { calories: 2600, protein: 170, carbs: 290, fat: 75 };
            newBaseEx = MUSCLE_BUILD_EXERCISES;
          } else if (newProfile.goal === 'reduce body fat') {
            newNutrition = { calories: 2050, protein: 160, carbs: 200, fat: 55 };
            newBaseEx = FAT_LOSS_EXERCISES;
          } else if (newProfile.goal === 'maintain') {
            newNutrition = { calories: 2350, protein: 140, carbs: 250, fat: 65 };
            newBaseEx = MAINTAIN_EXERCISES;
          } else if (newProfile.goal === 'gain weight') {
            newNutrition = { calories: 2800, protein: 165, carbs: 330, fat: 85 };
            newBaseEx = MUSCLE_BUILD_EXERCISES;
          } else {
            newNutrition = { calories: 2200, protein: 150, carbs: 230, fat: 65 };
            newBaseEx = MAINTAIN_EXERCISES;
          }

          newAdaptations.unshift({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            type: 'schedule_changed',
            description: `Mục tiêu đổi sang "${newProfile.goal}". VietFit AI đã đổi bộ bài tập mới và tính lại Calo (${newNutrition.calories} kcal).`,
            beforeContext: `Mục tiêu: ${oldGoal}`,
            afterContext: `Mục tiêu: ${newProfile.goal}`
          });
        } else if (trainingDaysChanged) {
          newAdaptations.unshift({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            type: 'schedule_changed',
            description: `Lịch tập điều chỉnh thành ${newProfile.trainingDaysPerWeek} buổi/tuần.`,
            beforeContext: `${profile.trainingDaysPerWeek} buổi`,
            afterContext: `${newProfile.trainingDaysPerWeek} buổi`
          });
        } else if (targetWeightChanged) {
          newAdaptations.unshift({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            type: 'schedule_changed',
            description: `Cân nặng mục tiêu đổi thành ${newProfile.targetWeight} kg.`,
            beforeContext: `${profile.targetWeight} kg`,
            afterContext: `${newProfile.targetWeight} kg`
          });
        }

        set({
          profile: newProfile,
          nutritionTarget: newNutrition,
          baseExercises: newBaseEx,
          currentWorkout: goalChanged ? { ...get().currentWorkout!, exercises: newBaseEx } : get().currentWorkout,
          adaptations: newAdaptations
        });
      },

      resetDemo: () => {
        set({
          hasOnboarded: false,
          profile: null,
          baseExercises: FULL_WORKOUT_EXERCISES,
          currentWorkout: INITIAL_WORKOUT,
          workoutLogs: {},
          nutritionTarget: INITIAL_NUTRITION_TARGET,
          todayNutrition: null,
          progressHistory: MOCK_PROGRESS,
          adaptations: [],
          demoWeek: 1,
          coachMessages: [
            { id: 'msg-1', role: 'assistant', content: 'Xin chào Minh! Tôi là VietFit AI Coach. Bạn cần hỗ trợ gì hôm nay?', timestamp: new Date().toISOString() }
          ],
        });
      },

      loadDemoWeek: (week) => {
        set({ demoWeek: week });
      },

      checkInWorkoutTime: (minutes) => {
        const { currentWorkout, adaptations } = get();
        if (!currentWorkout) return;
        
        // Base list containing all 6 exercises (merge current loads)
        const baseList = (get().baseExercises && get().baseExercises.length >= 6)
          ? get().baseExercises
          : FULL_WORKOUT_EXERCISES;

        const mergedBase = baseList.map(baseEx => {
          const active = currentWorkout.exercises.find(e => e.id === baseEx.id);
          return active ? { ...baseEx, suggestedLoad: active.suggestedLoad } : baseEx;
        });

        let selectedExercises: Exercise[];
        let description = '';

        if (minutes <= 20) {
          selectedExercises = mergedBase.filter(e => e.priority === 1).slice(0, 3);
          description = `Rút gọn bài tập xuống 20 phút (giữ lại 3 bài compound quan trọng nhất).`;
        } else if (minutes <= 30) {
          selectedExercises = mergedBase.filter(e => e.priority <= 2).slice(0, 4);
          description = `Điều chỉnh bài tập cho 30 phút (4 bài tập).`;
        } else if (minutes <= 45) {
          selectedExercises = mergedBase.slice(0, 5);
          description = `Điều chỉnh bài tập cho 45 phút (5 bài tập).`;
        } else {
          selectedExercises = [...mergedBase];
          description = `Khôi phục toàn bộ bài tập 60 phút (đầy đủ 6 bài tập).`;
        }

        const prevCount = currentWorkout.exercises.length;
        const newCount = selectedExercises.length;
        const newAdaptations = [...adaptations];

        if (prevCount !== newCount || currentWorkout.expectedDuration !== minutes) {
          newAdaptations.unshift({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            type: 'workout_shortened',
            description,
            beforeContext: `${prevCount} bài (${currentWorkout.expectedDuration} phút)`,
            afterContext: `${newCount} bài (${minutes} phút)`
          });
        }

        set({
          baseExercises: mergedBase,
          currentWorkout: {
            ...currentWorkout,
            expectedDuration: minutes,
            exercises: selectedExercises
          },
          adaptations: newAdaptations
        });
      },

      logExercise: (exerciseId, log) => {
        set(state => ({
          workoutLogs: {
            ...state.workoutLogs,
            [exerciseId]: log
          }
        }));
      },

      finishWorkout: () => {
        const { currentWorkout, workoutLogs, adaptations } = get();
        if (!currentWorkout) return;

        // Process adaptations based on logs
        const newAdaptations: AdaptiveDecision[] = [];
        const nextWorkout = {
          ...currentWorkout,
          exercises: currentWorkout.exercises.map(exercise => ({ ...exercise }))
        };
        
        currentWorkout.exercises.forEach((ex, idx) => {
          const log = workoutLogs[ex.id];
          if (log) {
            // Adaptive logic
            if (log.difficulty === 'Very Hard' || log.repsPerSet.some(r => r < ex.targetReps)) {
              newAdaptations.push({
                id: `adapt-${ex.id}-${Date.now()}`,
                date: new Date().toISOString(),
                type: 'load_adjusted',
                description: `${ex.name} load adjusted`,
                beforeContext: `${ex.suggestedLoad} kg`,
                afterContext: `${ex.suggestedLoad - 5} kg`
              });
              nextWorkout.exercises[idx] = { ...ex, suggestedLoad: ex.suggestedLoad - 5 };
            } else if (log.difficulty === 'Easy' && log.repsPerSet.every(r => r >= ex.targetReps)) {
              newAdaptations.push({
                id: `adapt-${ex.id}-${Date.now()}`,
                date: new Date().toISOString(),
                type: 'load_adjusted',
                description: `${ex.name} load adjusted for progressive overload`,
                beforeContext: `${ex.suggestedLoad} kg`,
                afterContext: `${ex.suggestedLoad + 2.5} kg`
              });
              nextWorkout.exercises[idx] = { ...ex, suggestedLoad: ex.suggestedLoad + 2.5 };
            }
          }
        });

        const updatedBase = (get().baseExercises && get().baseExercises.length >= 6 ? get().baseExercises : FULL_WORKOUT_EXERCISES).map(baseEx => {
          const matchingEx = nextWorkout.exercises.find(e => e.id === baseEx.id);
          return matchingEx ? { ...baseEx, suggestedLoad: matchingEx.suggestedLoad } : baseEx;
        });

        set({
          baseExercises: updatedBase,
          currentWorkout: { ...nextWorkout, completed: false, date: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
          workoutLogs: {},
          adaptations: [...newAdaptations, ...adaptations]
        });
      },

      logNutrition: (logData) => {
        set(state => {
          const current = state.todayNutrition || { date: new Date().toISOString().split('T')[0], calories: 0, protein: 0, carbs: 0, fat: 0 };
          const newCalories = current.calories + (logData.calories || 0);
          
          let newAdaptations = [...state.adaptations];
          let newWorkout = state.currentWorkout;
          
          const isOver = newCalories > state.nutritionTarget.calories;
          const hasAdaptedToday = state.adaptations.some(a => a.date.startsWith(current.date) && a.description.includes('nạp lố'));

          if (isOver && !hasAdaptedToday && newWorkout) {
             const excess = newCalories - state.nutritionTarget.calories;
             if (excess > 100) { 
                const cardioEx: Exercise = {
                  id: 'cardio-1',
                  name: `HIIT Cardio (Bù ${excess} kcal)`,
                  targetSets: 1,
                  targetReps: 15, 
                  suggestedLoad: 0,
                  priority: 1
                };
                
                if (!newWorkout.exercises.find(e => e.id === 'cardio-1')) {
                   newWorkout = {
                     ...newWorkout,
                     exercises: [...newWorkout.exercises, cardioEx]
                   };
                   
                   newAdaptations.unshift({
                     id: `adapt-cal-${Date.now()}`,
                     date: new Date().toISOString(),
                     type: 'schedule_changed',
                     description: `Bạn đã nạp lố ${excess} kcal hôm nay. VietFit AI tự động bổ sung 15 phút HIIT Cardio vào bài tập để bù trừ năng lượng.`,
                     beforeContext: `${state.nutritionTarget.calories} kcal`,
                     afterContext: `${newCalories} kcal`
                   });
                }
             }
          }

          return {
            todayNutrition: {
              ...current,
              calories: newCalories,
              protein: current.protein + (logData.protein || 0),
              carbs: current.carbs + (logData.carbs || 0),
              fat: current.fat + (logData.fat || 0),
            },
            adaptations: newAdaptations,
            currentWorkout: newWorkout
          };
        });
      },

      logWeight: (weight) => {
        const date = new Date().toISOString().split('T')[0];
        set(state => {
          let newHistory = [...state.progressHistory];
          const todayIndex = newHistory.findIndex(h => h.date === date);
          
          if (todayIndex >= 0) {
            newHistory[todayIndex] = { ...newHistory[todayIndex], weight };
          } else {
            newHistory.push({
               date, weight, workoutAdherence: 100, nutritionAdherence: 100, strengthChange: 0
            });
          }
          
          let newProfile = state.profile;
          if (newProfile) {
             newProfile = { ...newProfile, weight };
          }
          
          return { progressHistory: newHistory, profile: newProfile };
        });
      },

      addCoachMessage: (role, content) => {
        const { coachMessages, profile } = get();
        
        const newMsg: CoachMessage = {
          id: Date.now().toString(),
          role,
          content,
          timestamp: new Date().toISOString()
        };
        
        set({ coachMessages: [...coachMessages, newMsg] });

        // Simple Rule-based AI Engine
        if (role === 'user') {
          setTimeout(() => {
            const lowerContent = content.toLowerCase();
            let aiReply = "Tôi ghi nhận. Bạn cần tôi hỗ trợ gì thêm không?";
            let nextAdaptations = [...get().adaptations];
            let newProfile = profile;
            let currentWorkout = get().currentWorkout;
            
            if (lowerContent.includes('20 phút')) {
              get().checkInWorkoutTime(20);
              aiReply = "Hôm nay bạn có lịch Upper Body khoảng 60 phút. Tôi đã rút gọn xuống khoảng 20 phút và giữ lại 3 bài quan trọng nhất.";
            } else if (lowerContent.includes('60 phút') || lowerContent.includes('đầy đủ') || lowerContent.includes('hồi phục')) {
              get().checkInWorkoutTime(60);
              aiReply = "Tôi đã khôi phục lại toàn bộ lộ trình tiêu chuẩn 60 phút gồm đầy đủ 6 bài tập cho bạn.";
            } else if (lowerContent.includes('tăng cơ') || lowerContent.includes('đổi mục tiêu sang tăng cơ')) {
              get().updateProfile({ goal: 'build muscle' });
              aiReply = "Tôi đã cập nhật mục tiêu của bạn sang Tăng cơ (Hypertrophy). Lượng Calo mục tiêu đã được tự động nâng lên 2,600 kcal và các bài tập được cấu hình để tối đa hóa phát triển cơ bắp.";
              nextAdaptations = get().adaptations;
            } else if (lowerContent.includes('giảm mỡ') || lowerContent.includes('đổi mục tiêu sang giảm mỡ')) {
              get().updateProfile({ goal: 'reduce body fat' });
              aiReply = "Tôi đã cập nhật mục tiêu của bạn sang Giảm mỡ (Fat Loss). Lượng Calo mục tiêu đã được tự động điều chỉnh còn 2,050 kcal để duy trì thâm hụt năng lượng lành mạnh.";
              nextAdaptations = get().adaptations;
            } else if (lowerContent.includes('3 buổi')) {
              if (profile) {
                newProfile = { ...profile, trainingDaysPerWeek: 3 };
                set({ profile: newProfile });
                nextAdaptations = [
                  {
                    id: Date.now().toString(),
                    date: new Date().toISOString(),
                    type: 'schedule_changed',
                    description: `Weekly schedule changed: 4 → 3 sessions`,
                    beforeContext: '4 sessions',
                    afterContext: '3 sessions'
                  },
                  ...nextAdaptations
                ];
              }
              aiReply = "Tôi đã điều chỉnh lịch tập của bạn xuống còn 3 buổi/tuần để phù hợp với thời gian hiện tại.";
            } else if (lowerContent.includes('cân') && lowerContent.includes('không giảm')) {
              aiReply = "Workout adherence của bạn đang ở mức 90%, nhưng nutrition adherence chỉ khoảng 65%. Lượng calorie trung bình cao hơn mục tiêu khoảng 250 kcal/ngày. Vì vậy VietFit chưa giảm calorie mục tiêu và đề xuất cải thiện mức độ tuân thủ trước.";
            } else if (lowerContent.includes('quá nặng') || lowerContent.includes('bench press')) {
              // Simulate bench press adaptation
              aiReply = "Bạn không đạt số rep mục tiêu ở các set và đánh giá độ khó là Very Hard. Tôi đã giảm mức đề xuất cho buổi tiếp theo xuống 55kg.";
              if (currentWorkout) {
                 const newEx = currentWorkout.exercises.map(e => e.id === 'e1' ? { ...e, suggestedLoad: Math.max(20, e.suggestedLoad - 5) } : e);
                 const newBase = (get().baseExercises || FULL_WORKOUT_EXERCISES).map(e => e.id === 'e1' ? { ...e, suggestedLoad: Math.max(20, e.suggestedLoad - 5) } : e);
                 set({ 
                   baseExercises: newBase,
                   currentWorkout: { ...currentWorkout, exercises: newEx } 
                 });
                 nextAdaptations = [
                    {
                      id: Date.now().toString(),
                      date: new Date().toISOString(),
                      type: 'load_adjusted',
                      description: 'Bench Press load adjusted',
                      beforeContext: '60 kg',
                      afterContext: '55 kg'
                    },
                    ...nextAdaptations
                 ];
              }
            } else if (lowerContent.includes('gợi ý bữa tối') || lowerContent.includes('ít tinh bột')) {
              const suggestedMeal = { calories: 350, protein: 45, carbs: 10, fat: 15 };
              aiReply = "Tôi gợi ý bạn món 'Cá hồi áp chảo măng tây' (Khoảng 350 kcal, 45g Protein, 10g Carbs). Để bạn tiện theo dõi, tôi đã tự động thêm món này vào nhật ký dinh dưỡng hôm nay của bạn rồi nhé!";
              get().logNutrition(suggestedMeal);
            }

            set({
              adaptations: nextAdaptations,
              coachMessages: [...get().coachMessages, {
                id: Date.now().toString(),
                role: 'assistant',
                content: aiReply,
                timestamp: new Date().toISOString()
              }]
            });
          }, 800);
        }
      }
    }),
    {
      name: 'vietfit-storage',
    }
  )
);

import React, { useState, useEffect } from 'react';
import { Exercise, ExerciseType, UserStats, AppSettings } from './types';
import { EXERCISES_DATA, SUCCESS_MESSAGES, INSTRUCTIONS } from './data';
import { RehabExercise } from './components/RehabExercise';
import { ThemeSettings } from './components/ThemeSettings';
import { StatsDashboard } from './components/StatsDashboard';
import { ReminderModal } from './components/ReminderModal';
import { playSuccessChime, playVictoryChime, playTapChime } from './utils/audio';
import { triggerWarmNotification } from './utils/reminderScheduler';
import { 
  Heart, 
  Brain, 
  Sparkles, 
  Award, 
  ArrowLeft, 
  RotateCcw, 
  Star, 
  CheckCircle,
  HelpCircle,
  Smartphone,
  ChevronRight,
  Bell,
  BellRing,
  Home,
  MessageSquare,
  Layers,
  ListFilter,
  Users
} from 'lucide-react';

const DEFAULT_SETTINGS: AppSettings = {
  fontSize: 'large', // Default to senior-friendly 'large'
  speechRate: 0.8,   // Slightly slower voice for cognitive comfort
  accent: 'south',   // Default to Southern Vietnamese (Miền Nam)
  voiceVolume: 1.0,
  soundEffects: true,
  reminderEnabled: false,
  reminderTime: '09:00'
};

const DEFAULT_STATS: UserStats = {
  completedCount: 0,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  history: []
};

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [isSessionStarted, setIsSessionStarted] = useState<boolean>(false);
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Encouragement toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Lưu danh sách id câu hỏi đã trả lời đúng trong phiên để tránh tính trùng số từ đã học
  const [answeredCorrectlyInSession, setAnsweredCorrectlyInSession] = useState<Set<string>>(new Set());
  
  // Trạng thái mở/đóng modal nhắc nhở học tập
  const [isReminderOpen, setIsReminderOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'co_ban' | 'vat_dung' | 'giao_tiep' | 'gia_dinh_minh'>('all');

  const [activeExercises, setActiveExercises] = useState<Exercise[]>(() => {
    return EXERCISES_DATA;
  });

  // Thuật toán xáo trộn Fisher-Yates shuffle để đảo ngẫu nhiên mảng các bài học
  const shuffleExercises = (array: Exercise[]): Exercise[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Đồng bộ và tự động xáo trộn danh sách bài học ban đầu hoặc khi đổi chủ đề
  useEffect(() => {
    const filtered = EXERCISES_DATA.filter(
      ex => selectedCategory === 'all' || ex.category === selectedCategory
    );
    setActiveExercises(shuffleExercises(filtered));
  }, [selectedCategory]);

  // Load preferences and voices
  useEffect(() => {
    // Safely load settings
    try {
      const savedSettings = localStorage.getItem('stroke_rehab_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (e) {
      console.warn('LocalStorage not accessible', e);
    }

    // Safely load stats
    try {
      const savedStats = localStorage.getItem('stroke_rehab_stats');
      if (savedStats) {
        const parsedStats: UserStats = JSON.parse(savedStats);
        
        // Check streaks
        const todayStr = new Date().toISOString().split('T')[0];
        const lastActiveStr = parsedStats.lastActiveDate;
        
        let updatedStreak = parsedStats.streak;
        if (lastActiveStr && lastActiveStr !== todayStr) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (lastActiveStr === yesterdayStr) {
            // Consecutive day! Keep streak or increment
          } else {
            // Broke streak, reset back to 1
            updatedStreak = 1;
          }
        }
        
        setStats({
          ...parsedStats,
          streak: updatedStreak || 1
        });
      }
    } catch (e) {
      console.warn('LocalStorage not accessible', e);
    }

    // Manage WebSpeech API voices
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      }
    };

    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Tăng/giảm kích thước chữ toàn diện cho toàn bộ trang web (Elderly-Friendly Accessibility)
  useEffect(() => {
    const root = document.documentElement;
    if (settings.fontSize === 'normal') {
      root.style.fontSize = '16px';
    } else if (settings.fontSize === 'large') {
      root.style.fontSize = '19px'; // Standard slightly larger for elderly
    } else if (settings.fontSize === 'huge') {
      root.style.fontSize = '23px'; // Very big font size, easily visible
    }
  }, [settings.fontSize]);

  // Vận hành Scheduler ngầm để so khớp giờ hẹn và bắn thông báo đẩy "Nhắc nhở giờ học ấm áp"
  useEffect(() => {
    let lastNotifiedDate = '';

    const checkReminderTime = () => {
      if (!settings.reminderEnabled) return;
      
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeString = `${currentHours}:${currentMinutes}`;
      const todayStr = now.toISOString().split('T')[0];

      // Xem giờ hiện tại có trùng với giờ cài đặt hay không và trong ngày hôm nay đã nhắc chưa
      if (currentTimeString === settings.reminderTime && lastNotifiedDate !== todayStr) {
        lastNotifiedDate = todayStr;
        
        // 1. Gửi thông báo đẩy hệ thống (PWA Web Push)
        triggerWarmNotification();

        // 2. Dự phòng: Đọc lời nhắn bằng giọng nói (TTS) lớn và hiện Toast trực tiếp trong app
        if ('speechSynthesis' in window) {
          const reminderMsg = "Bố mẹ ơi, đến giờ rèn luyện tiếng Việt cùng con rồi ạ. Bố mẹ cùng bật máy lên tập nói nhé!";
          const utterance = new SpeechSynthesisUtterance(reminderMsg);
          utterance.rate = 0.85;
          window.speechSynthesis.speak(utterance);
        }
        setToastMessage("Bố mẹ ơi, đến giờ rèn luyện tiếng Việt cùng con rồi ạ! Ba mẹ hãy chạm 'Bắt đầu học' nhé! ❤️");
      }
    };

    // Chạy lượt kiểm tra ban đầu
    checkReminderTime();

    // Định kỳ kiểm tra mỗi 30 giây để đảm bảo chính xác về mặt phút
    const intervalId = setInterval(checkReminderTime, 30000);

    return () => clearInterval(intervalId);
  }, [settings.reminderEnabled, settings.reminderTime]);

  // Update configuration preferences
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      localStorage.setItem('stroke_rehab_settings', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Run on completing an exercise correctly
  const handleCorrectAnswer = () => {
    const currentEx = activeExercises[currentExerciseIndex];
    if (currentEx && !answeredCorrectlyInSession.has(currentEx.id)) {
      const nextSet = new Set(answeredCorrectlyInSession);
      nextSet.add(currentEx.id);
      setAnsweredCorrectlyInSession(nextSet);

      // Ghi nhận trực tiếp số từ đã học ngay khi trả lời đúng xuất sắc
      const todayStr = new Date().toISOString().split('T')[0];
      const newCompletedCount = stats.completedCount + 1;

      const updatedStats: UserStats = {
        ...stats,
        completedCount: newCompletedCount,
        lastActiveDate: todayStr
      };

      setStats(updatedStats);
      try {
        localStorage.setItem('stroke_rehab_stats', JSON.stringify(updatedStats));
      } catch (e) {
        console.error(e);
      }
    }

    // Show random warm encouraging Vietnamese phrase
    const randomIndex = Math.floor(Math.random() * SUCCESS_MESSAGES.length);
    setToastMessage(SUCCESS_MESSAGES[randomIndex]);
    
    // Automatically fade out the notification toast after 4.5 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Direct progress to next exercise
  const handleNextExercise = () => {
    playTapChime();
    setToastMessage(null);

    if (currentExerciseIndex < activeExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Finished all available exercises! Celebrate!
      finishSession();
    }
  };

  // Finish current training program
  const finishSession = () => {
    playVictoryChime();
    setIsSessionFinished(true);
    setIsSessionStarted(false);

    // Update historical milestones (just update streaks, as words completed are saved incrementally now)
    const todayStr = new Date().toISOString().split('T')[0];
    
    const updatedStats: UserStats = {
      ...stats,
      lastActiveDate: todayStr,
      streak: stats.streak + 1 // Increment streak upon finishing a full block
    };

    setStats(updatedStats);
    try {
      localStorage.setItem('stroke_rehab_stats', JSON.stringify(updatedStats));
    } catch (e) {
      console.error(e);
    }
  };

  // Bắt đầu một phiên luyện tập mới với bộ câu hỏi đã được xáo trộn ngẫu nhiên
  const startNewSession = () => {
    playTapChime();
    const filtered = EXERCISES_DATA.filter(
      ex => selectedCategory === 'all' || ex.category === selectedCategory
    );
    // Reset session answered set
    setAnsweredCorrectlyInSession(new Set());
    setActiveExercises(shuffleExercises(filtered));
    setCurrentExerciseIndex(0);
    setIsSessionStarted(true);
    setIsSessionFinished(false);
    setToastMessage(null);
  };

  // Reset entire progression and restart exercises
  const restartSession = () => {
    playTapChime();
    const filtered = EXERCISES_DATA.filter(
      ex => selectedCategory === 'all' || ex.category === selectedCategory
    );
    // Reset session answered set
    setAnsweredCorrectlyInSession(new Set());
    setActiveExercises(shuffleExercises(filtered));
    setCurrentExerciseIndex(0);
    setIsSessionFinished(false);
    setIsSessionStarted(true);
    setToastMessage(null);
  };

  // Exit back to dashboard
  const exitToDashboard = () => {
    playTapChime();
    setIsSessionStarted(false);
    setIsSessionFinished(false);
    setToastMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-800 font-sans antialiased flex flex-col selection:bg-teal-100 selection:text-teal-900" id="app_root">
      
      {/* 🌟 APPMETADATA HEADER */}
      <header className="bg-white border-b border-teal-50 shadow-sm sticky top-0 z-40" id="main_header">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto px-4 py-4.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl text-white shadow-md">
              <Brain className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Phục hồi Ngôn ngữ</span>
                <span className="hidden sm:inline-block text-xs bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Cho cha Hải mẹ Ánh
                </span>
              </h1>
              <p className="text-xs text-teal-700 font-semibold tracking-wide">Được tạo bởi Google AI Studio & Bé Béo, dành riêng cho cha mẹ</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2.5">
            {/* Nút nhắc nhở học chữ ấm áp */}
            <button
              onClick={() => {
                playTapChime();
                setIsReminderOpen(true);
              }}
              title="Cài đặt nhắc nhở giờ học"
              className={`p-2 sm:p-2.5 rounded-2xl border transition-all flex items-center space-x-1 cursor-pointer active:scale-95 shadow-sm transform hover:-translate-y-0.5 ${
                settings.reminderEnabled 
                  ? 'bg-teal-600 border-teal-700 text-white hover:bg-teal-700 shadow-teal-100 ring-2 ring-teal-200 font-black' 
                  : 'bg-amber-200 hover:bg-amber-300 border-amber-300 text-amber-950 font-black ring-2 ring-amber-100'
              }`}
            >
              {settings.reminderEnabled ? (
                <BellRing className="w-4.5 h-4.5 text-white animate-bounce shrink-0" />
              ) : (
                <Bell className="w-4.5 h-4.5 text-amber-900 shrink-0" />
              )}
              <span className="hidden sm:inline-block text-xs font-black px-0.5">Nhắc cha học</span>
            </button>

            <div className="flex items-center space-x-1 bg-red-50 border border-red-200 text-red-600 p-2 sm:p-2.5 rounded-2xl text-xs font-black shadow-sm shrink-0">
              <Heart className="w-4.5 h-4.5 fill-current animate-pulse shrink-0" />
              <span className="hidden sm:inline-block px-0.5">Dành tặng Cha</span>
            </div>
          </div>
        </div>
      </header>

      {/* 🚀 TOAST TO SERVE ENCOURAGING MOTIVATIONAL FEEDBACK */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-5 text-white shadow-2xl border border-teal-400/40 animate-bounce flex items-start space-x-3.5" id="toast_notification">
          <div className="p-1.5 bg-white/20 rounded-xl mt-0.5 shrink-0">
            <Sparkles className="w-5 h-5 text-yellow-300 fill-current" />
          </div>
          <div>
            <p className="font-extrabold text-lg leading-snug">{toastMessage}</p>
            <p className="text-xs text-teal-100 mt-1 font-medium">Bấm "Bài tiếp theo" để giữ đà tập luyện nhé cha!</p>
          </div>
        </div>
      )}

      {/* 📦 MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-4xl lg:max-w-5xl xl:max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* VIEW 1: WELCOME / HOME DASHBOARD */}
        {!isSessionStarted && !isSessionFinished && (
          <div className="space-y-6 animate-fade-in" id="welcome_view">
            
            {/* Friendly Greeting Card */}
            <div className="bg-gradient-to-br from-teal-50 via-teal-50/20 to-white border border-teal-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 text-teal-50/60 opacity-30 select-none pointer-events-none">
                <Brain className="w-64 h-64" />
              </div>
              
              <div className="max-w-2xl space-y-4">
                <span className="p-2 bg-teal-100 text-teal-800 rounded-xl font-extrabold text-xs uppercase tracking-widest inline-block">
                  Chương trình phục hồi tại nhà
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-teal-950 leading-tight">
                  Hé lô cha! Hôm nay chúng ta cùng học lại tiếng Việt cha nhé!
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                  {INSTRUCTIONS.welcome}
                </p>
                
                <div className="pt-2">
                  <button
                    onClick={startNewSession}
                    id="btn_start_lessons"
                    className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 hover:shadow-lg text-white font-black text-xl px-10 py-5.5 rounded-2xl transition-all hover:scale-102 active:scale-98 shadow-md flex items-center justify-center space-x-3 cursor-pointer"
                  >
                    <span>Bắt đầu buổi học ngay!</span>
                    <ChevronRight className="w-6 h-6 stroke-[3] animate-pulse" />
                  </button>
                </div>
              </div>
            </div>

            {/* 🎯 BÀI HỌC THEO CHỦ ĐỀ VÀ NHU CẦU */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5" id="topic_selector_panel">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-teal-800">
                  <ListFilter className="w-5 h-5 stroke-[2.5]" />
                  <h3 className="font-serif font-extrabold text-lg sm:text-2xl text-slate-900 tracking-tight">
                    Chọn Chủ Đề Luyện Tập Cho Cha
                  </h3>
                </div>
                <p className="text-slate-500 text-sm">
                  Cha hãy chọn một chủ đề phía dưới để bắt đầu rèn luyện từ vựng hoặc bày tỏ nhu cầu sinh hoạt hàng ngày nhé:
                </p>
              </div>

              {/* Grid of Interactive Topic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                
                {/* Topic Card 0: All Combined */}
                <button
                  type="button"
                  onClick={() => {
                    playTapChime();
                    setSelectedCategory('all');
                  }}
                  id="tab_all_exercises"
                  className={`relative p-5 pb-12 rounded-2xl text-left border-2 cursor-pointer transition-all flex flex-col justify-between h-full ${
                    selectedCategory === 'all'
                      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-teal-100/70 text-teal-800 rounded-xl">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black bg-teal-100 text-teal-800 px-2 py-0.5 rounded-lg text-nowrap">
                        {EXERCISES_DATA.length} bài học
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">Học Tổng Hợp</h4>
                    <p className="text-xs text-slate-500 mt-1">Đầy đủ tất cả bài học từ nhận diện cơ bản đến giao tiếp hàng ngày.</p>
                  </div>
                  {selectedCategory === 'all' && (
                    <div className="absolute bottom-3 right-3 text-xs font-black text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded-lg">
                      Đang chọn ✓
                    </div>
                  )}
                </button>

                {/* Topic Card 1: Từ vựng cơ bản */}
                <button
                  type="button"
                  onClick={() => {
                    playTapChime();
                    setSelectedCategory('co_ban');
                  }}
                  id="tab_basic_exercises"
                  className={`relative p-5 pb-12 rounded-2xl text-left border-2 cursor-pointer transition-all flex flex-col justify-between h-full ${
                    selectedCategory === 'co_ban'
                      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg text-nowrap">
                        {EXERCISES_DATA.filter(e => e.category === 'co_ban').length} bài học
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">Từ Vựng Cơ Bản</h4>
                    <p className="text-xs text-slate-500 mt-1">Quả trái, gia đình, xe cộ, nhà cửa... khơi dậy nhận thức phản xạ ban đầu.</p>
                  </div>
                  {selectedCategory === 'co_ban' && (
                    <div className="absolute bottom-3 right-3 text-xs font-black text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded-lg">
                      Đang chọn ✓
                    </div>
                  )}
                </button>

                {/* Topic Card 2: Vật dụng gia đình */}
                <button
                  type="button"
                  onClick={() => {
                    playTapChime();
                    setSelectedCategory('vat_dung');
                  }}
                  id="tab_household_exercises"
                  className={`relative p-5 pb-12 rounded-2xl text-left border-2 cursor-pointer transition-all flex flex-col justify-between h-full ${
                    selectedCategory === 'vat_dung'
                      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                        <Home className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg text-nowrap">
                        {EXERCISES_DATA.filter(e => e.category === 'vat_dung').length} bài học
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">Vật Dụng</h4>
                    <p className="text-xs text-slate-500 mt-1">Cái ghế, giường ngủ, chổi quét, bàn chải... các đồ vật quen gần gũi trong nhà.</p>
                  </div>
                  {selectedCategory === 'vat_dung' && (
                    <div className="absolute bottom-3 right-3 text-xs font-black text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded-lg">
                      Đang chọn ✓
                    </div>
                  )}
                </button>

                {/* Topic Card 3: Nhu cầu & Giao tiếp */}
                <button
                  type="button"
                  onClick={() => {
                    playTapChime();
                    setSelectedCategory('giao_tiep');
                  }}
                  id="tab_dialogue_exercises"
                  className={`relative p-5 pb-12 rounded-2xl text-left border-2 cursor-pointer transition-all flex flex-col justify-between h-full ${
                    selectedCategory === 'giao_tiep'
                      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-purple-100 text-purple-800 rounded-xl">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black bg-purple-100 text-purple-800 px-2 py-0.5 rounded-lg text-nowrap">
                        {EXERCISES_DATA.filter(e => e.category === 'giao_tiep').length} bài học
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">Giao Tiếp</h4>
                    <p className="text-xs text-slate-500 mt-1">Luyện nói câu ngắn: Đi tắm, đi ngủ, uống nước, đi vệ sinh, đi dạo sảng khoái.</p>
                  </div>
                  {selectedCategory === 'giao_tiep' && (
                    <div className="absolute bottom-3 right-3 text-xs font-black text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded-lg">
                      Đang chọn ✓
                    </div>
                  )}
                </button>

                {/* Topic Card 4: Gia Đình Mình (Personalized) */}
                <button
                  type="button"
                  onClick={() => {
                    playTapChime();
                    setSelectedCategory('gia_dinh_minh');
                  }}
                  id="tab_family_exercises"
                  className={`relative p-5 pb-12 rounded-2xl text-left border-2 cursor-pointer transition-all flex flex-col justify-between h-full ${
                    selectedCategory === 'gia_dinh_minh'
                      ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-500'
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-rose-100 text-rose-800 rounded-xl">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black bg-rose-100 text-rose-800 px-2 py-0.5 rounded-lg text-nowrap">
                        {EXERCISES_DATA.filter(e => e.category === 'gia_dinh_minh').length} bài học
                      </span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">Gia Đình Mình</h4>
                    <p className="text-xs text-slate-500 mt-1">Nhận diện gương mặt người thân, gọi tên thành viên và bày tỏ tình cảm gia đình.</p>
                  </div>
                  {selectedCategory === 'gia_dinh_minh' && (
                    <div className="absolute bottom-3 right-3 text-xs font-black text-rose-700 bg-white border border-rose-200 px-2 py-0.5 rounded-lg">
                      Đang chọn ✓
                    </div>
                  )}
                </button>

              </div>

              {/* Start selected category helper banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 rounded-2xl p-4 border border-slate-100 gap-3">
                <div className="text-left">
                  <p className="text-slate-800 font-bold text-sm">
                    Bạn đang chọn chủ đề: <span className="text-teal-700 underline font-extrabold">
                      {selectedCategory === 'all' && 'Bộ học tổng hợp đầy đủ'}
                      {selectedCategory === 'co_ban' && 'Từ vựng cơ bản ban đầu'}
                      {selectedCategory === 'vat_dung' && 'Vật dụng gia đình quen thuộc'}
                      {selectedCategory === 'giao_tiep' && 'Ngoại thoại về nhu cầu sinh hoạt'}
                      {selectedCategory === 'gia_dinh_minh' && 'Chủ đề Gia Đình Mình thân yêu'}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">Bấm nút học chủ đề này hoặc bấm nút "Bắt đầu buổi học ngay" để bắt đầu luyện tập!</p>
                </div>
                
                <button
                  onClick={startNewSession}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm py-2.5 px-5 rounded-xl cursor-pointer shadow-sm transition-all active:scale-95 flex items-center gap-1 shrink-0"
                >
                  <span>Học chủ đề này</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>

            {/* Grid Layout: Statistics & Adaptive Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Progress Metrics */}
              <div className="space-y-6">
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-800 mb-4 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-teal-600" />
                    <span>Thành tích của cha</span>
                  </h3>
                  <StatsDashboard stats={stats} />
                </div>
              </div>

              {/* Right Column: Audio & Visual Preferences */}
              <div className="space-y-6">
                <ThemeSettings 
                  settings={settings} 
                  onUpdateSettings={handleUpdateSettings} 
                  voices={voices} 
                  onOpenReminderSettings={() => setIsReminderOpen(true)}
                />
              </div>

            </div>

            {/* Smart info block for caregiver */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start space-x-3.5">
              <Smartphone className="w-5 h-5 text-teal-600 mt-1 shrink-0" />
              <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                <p className="font-bold text-slate-800">Cẩm nang hướng dẫn đồng hành cùng cha:</p>
                <p>
                  Hãy điều chỉnh phần <strong>"Kích thước chữ"</strong> và <strong>"Tốc độ giọng đọc"</strong> phù hợp nhất với trạng thái của cha. Hãy khuyến khích cha phát âm thật to rõ khi bấm nút màu cam, và đừng vội vã nhé. Sự động viên kiên trì của con là liều thuốc phục hồi tuyệt vời nhất!
                </p>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: ACTIVE EDUCATION / EXERCISE PLAYGROUND */}
        {isSessionStarted && !isSessionFinished && (
          <div className="space-y-6 animate-fade-in" id="active_rehab_view">
            
            {/* Session Controller Header */}
            <div className="flex items-center justify-between" id="active_rehab_header">
              <button
                onClick={exitToDashboard}
                id="btn_back_dashboard"
                className="flex items-center space-x-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold py-3 px-5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer text-sm"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500 stroke-[2.5]" />
                <span>Trở về Trang chủ</span>
              </button>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Tiến độ bài:</span>
                <div className="w-32 bg-slate-200 h-3.5 rounded-full overflow-hidden shadow-inner flex border border-white">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentExerciseIndex) / activeExercises.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-extrabold text-teal-800">
                  {Math.round(((currentExerciseIndex) / activeExercises.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Core Exercise Card Injection */}
            <RehabExercise 
              exercise={activeExercises[currentExerciseIndex]}
              settings={settings}
              onCorrect={handleCorrectAnswer}
              onNext={handleNextExercise}
              currentIndex={currentExerciseIndex}
              totalExercises={activeExercises.length}
              voices={voices}
            />

            {/* Simple footer checklist */}
            <div className="text-center text-xs text-slate-400">
              Chỉ số tiến triển được tính toán tự động dựa trên số câu cha đã hoàn thành ngày hôm nay.
            </div>

          </div>
        )}

        {/* VIEW 3: CELEBRATION / MASTERED WORDS WRAP */}
        {isSessionFinished && (
          <div className="max-w-xl mx-auto space-y-6 text-center py-6 sm:py-12 animate-fade-in" id="finished_view">
            
            {/* Sparkling Trophy Icon Container */}
            <div className="bg-white border-2 border-dashed border-teal-200 rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 left-4 animate-pulse">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
              </div>
              <div className="absolute top-8 right-6 animate-pulse" style={{ animationDelay: '0.4s' }}>
                <Star className="w-8 h-8 text-yellow-300 fill-current" />
              </div>
              
              <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full flex items-center justify-center mx-auto text-white shadow-lg animate-bounce">
                <Award className="w-12 h-12 stroke-[2]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold text-teal-700 bg-teal-100 px-3.5 py-1 rounded-full tracking-wider">
                  Buổi học hoàn thành xuất sắc!
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900">
                  Cha làm giỏi quá nè!
                </h2>
                <p className="text-slate-600 text-sm sm:text-base font-medium max-w-sm mx-auto">
                  {INSTRUCTIONS.completedSession} Mỗi ngày một chút, cha chắc chắn sẽ hồi phục!
                </p>
              </div>

              {/* Mastered vocabulary summaries */}
              <div className="border bg-slate-50 border-slate-100 rounded-2xl p-5 text-left space-y-3">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Danh sách âm vựng vừa ôn luyện thành công:</span>
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeExercises.map((ex) => (
                    <span 
                      key={ex.id}
                      className="bg-white border border-slate-200 text-teal-800 font-extrabold text-xs px-3 py-1.5 rounded-xl uppercase shadow-sm tracking-wide"
                    >
                      ✓ {ex.word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons to Restart or return to home */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                <button
                  onClick={restartSession}
                  id="btn_retry_all"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-lg py-4.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 space-y-0.5 cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Học lại từ đầu nhé cha, đừng nản chí!</span>
                </button>

                <button
                  onClick={exitToDashboard}
                  id="btn_back_home_after_finish"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg py-4.5 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                >
                  <span>Về Màn hình chính</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* 💚 SIMPLE CARE FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500" id="main_footer_bottom">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">Ứng dụng phục hồi chức năng tiếng Việt an toàn cho gia đình.</p>
          <p>Dành riêng cho cha Hải.</p>
        </div>
      </footer>

      {/* Container cấu hình giờ học ấm áp */}
      <ReminderModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

    </div>
  );
}

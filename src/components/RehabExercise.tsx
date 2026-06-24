import React, { useState, useEffect } from 'react';
import { Exercise, ExerciseType, AppSettings } from '../types';
import { Illustration } from './Illustration';
import { Volume2, CheckCircle2, AlertCircle, Mic, MicOff, ChevronRight, UserCheck, Sparkles, RefreshCw } from 'lucide-react';
import { playSuccessChime, playErrorChime, playTapChime } from '../utils/audio';
import { getBestVietnameseVoice } from '../utils/voiceSelector';

interface RehabExerciseProps {
  exercise: Exercise;
  settings: AppSettings;
  onCorrect: () => void;
  onNext: () => void;
  currentIndex: number;
  totalExercises: number;
  voices: SpeechSynthesisVoice[];
}

export const RehabExercise: React.FC<RehabExerciseProps> = ({
  exercise,
  settings,
  onCorrect,
  onNext,
  currentIndex,
  totalExercises,
  voices
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string>('');
  const [voiceConfidence, setVoiceConfidence] = useState<number>(0);

  // Clear states when exercise changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setSpeechError(null);
    setTranscription('');
    setIsRecording(false);
    
    // Automatically read the instruction aloud when the exercise loads to guide the patient
    speakUtterance(exercise.word);
  }, [exercise]);

  // Handle TTS with pronunciation optimization for volume and clarity
  const speakUtterance = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    // Tự động tối ưu hóa văn bản để giọng đọc Web Speech API khi phát âm có điểm nhấn, to rõ hơn
    let formattedText = textToSpeak;
    if (formattedText === 'Ngôi Nhà') {
      formattedText = 'Ngôi Nhà!'; // Thêm dấu chấm than để kích hoạt ngữ điệu to rõ
    } else if (formattedText === 'Cha yêu cả nhà') {
      formattedText = 'Cha yêu cả nhà!'; // Tạo lực nhấn âm thanh to hơn
    } else if (!/[.!?]$/.test(formattedText)) {
      formattedText = `${formattedText}!`; // Tự động thêm dấu chấm than cho các từ đơn/cụm từ ngắn để tăng âm lượng và độ dứt khoát
    }

    const utterance = new SpeechSynthesisUtterance(formattedText);
    utterance.rate = settings.speechRate;
    utterance.volume = 1.0; // Đảm bảo âm lượng phát âm ở mức tối đa (1.0)
    
    // Select voice according to preference with improved accuracy
    const selectedVoice = getBestVietnameseVoice(voices, settings);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  // Multiple Choice Handler
  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    
    playTapChime();
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === exercise.word) {
      setIsCorrect(true);
      playSuccessChime();
      onCorrect();
    } else {
      setIsCorrect(false);
      playErrorChime();
    }
  };

  // Web Speech API Voice Recognition (Client-side)
  const startSpeechRecognition = () => {
    playTapChime();
    
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setSpeechError('Trình duyệt hiện tại chưa hỗ trợ nhận diện giọng nói tự động. Hãy dùng nút xác nhận bên dưới!');
      return;
    }

    const rec = new SpeechRecognitionAPI();
    rec.lang = 'vi-VN';
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    setIsRecording(true);
    setSpeechError(null);
    setTranscription('');

    rec.onstart = () => {
      console.log('Voice listening started');
    };

    rec.onresult = (event: any) => {
      const resultText = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      
      setTranscription(resultText);
      setVoiceConfidence(confidence);
      
      // Check normalization compatibility
      const normalizedResult = resultText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
      const normalizedTarget = exercise.word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
      
      setIsAnswered(true);
      if (normalizedResult.includes(normalizedTarget) || normalizedTarget.includes(normalizedResult)) {
        setIsCorrect(true);
        playSuccessChime();
        onCorrect();
      } else {
        setIsCorrect(false);
        playErrorChime();
      }
    };

    rec.onerror = (event: any) => {
      setIsRecording(false);
      if (event.error === 'not-allowed') {
        setSpeechError('Vui lòng kích hoạt quyền Micro trên trình duyệt để ghi âm.');
      } else {
        setSpeechError('Không nhận diện rõ âm thanh. Cha hãy nói lại hay nhờ mẹ bấm nút xác nhận nhé!');
      }
    };

    rec.onend = () => {
      setIsRecording(false);
    };

    rec.start();
  };

  // Manual Relative Validation (Extremely supportive of stroke dysarthria rehabilitation)
  const handleCaregiverValidation = () => {
    playTapChime();
    setIsAnswered(true);
    setIsCorrect(true);
    setSpeechError(null);
    setTranscription(exercise.word);
    playSuccessChime();
    onCorrect();
  };

  const getFontSizeClass = () => {
    if (settings.fontSize === 'large') return 'text-3xl sm:text-4xl';
    if (settings.fontSize === 'huge') return 'text-4xl sm:text-5xl';
    return 'text-2xl sm:text-3xl';
  };

  const currentFontSize = settings.fontSize;

  // Tách câu thành từng từ để cho phép chạm vào từ nào máy phát âm riêng từ đó cực kỳ tiện lợi
  const renderInteractiveWordTokens = (phrase: string, textStyleClass: string) => {
    const tokens = phrase.split(/\s+/);
    return (
      <span className={`${textStyleClass} inline-flex flex-wrap justify-center gap-x-2 gap-y-1`}>
        {tokens.map((token, idx) => {
          // Làm sạch từ để phát âm chuẩn xác nhất (bỏ dấu chấm, phẩy, ngoặc kép...)
          const cleanToken = token.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()""“‘”’]/g, "").trim();
          return (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                if (cleanToken) {
                  speakUtterance(cleanToken);
                }
              }}
              className="inline-block cursor-pointer border-b-3 border-dashed border-teal-300 hover:border-amber-500 hover:text-amber-600 hover:scale-105 active:scale-95 px-1 rounded-lg transition-all hover:bg-teal-50"
              title="Chạm để nghe từ này"
            >
              {token}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8" id="active_exercise_panel">
      
      {/* Exercise Indicator */}
      <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3">
        <span className="text-teal-800 font-bold tracking-wide uppercase text-sm">
          {exercise.title}
        </span>
        <span className="text-slate-600 font-bold bg-white border border-slate-200 px-3 py-1 rounded-xl text-sm">
          Bài {currentIndex + 1} / {totalExercises}
        </span>
      </div>

      {/* Action Instruction */}
      <div className="space-y-1">
        <p className="text-slate-500 font-medium text-xs sm:text-sm uppercase tracking-wider">Mục tiêu luyện tập</p>
        <p className={`font-bold text-slate-800 leading-snug ${
          currentFontSize === 'huge' ? 'text-2xl sm:text-3xl' : currentFontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
        }`}>
          {exercise.instruction}
        </p>
      </div>

      {/* Main Sandbox for the Exercise Type */}
      <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 py-4">
        
        {/* SVG ILLUSTRATION (Common for type 1 and type 2) */}
        {exercise.illustrationType && (exercise.type === ExerciseType.IDENTIFY || exercise.type === ExerciseType.MULTIPLE_CHOICE) && (
          <div className="bg-gradient-to-tr from-teal-50/50 to-slate-50 rounded-full p-8 border border-teal-100/30 flex items-center justify-center shadow-inner select-none">
            <Illustration type={exercise.illustrationType} size={190} className="filter drop-shadow-md animate-fade-in" />
          </div>
        )}

        {/* --- DẠNG 1: IDENTIFY (NHÌN HÌNH HỌC TỪ) --- */}
        {exercise.type === ExerciseType.IDENTIFY && (
          <div className="w-full flex flex-col items-center space-y-6">
            
            {/* Pronunciation Target Block */}
            <div className="text-center space-y-3">
              <span className="text-slate-400 font-medium text-sm">Từ phát âm:</span>
              <div className="flex flex-col items-center select-none" id="identify_word">
                {renderInteractiveWordTokens(exercise.word, `font-extrabold text-teal-900 leading-tight uppercase tracking-wider ${getFontSizeClass()}`)}
                <p className="text-[11px] text-teal-700 font-extrabold mt-2 uppercase tracking-wider flex items-center justify-center gap-1 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  <span>👉 Chạm vào từng từ trên để máy đọc riêng từ đó</span>
                </p>
              </div>
            </div>

            {/* Huge Voice Playback and Recording triggers */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <button
                onClick={() => speakUtterance(exercise.word)}
                id="btn_voice_play"
                className="w-full flex items-center justify-center space-x-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-5 px-6 rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
              >
                <Volume2 className="w-8 h-8 shrink-0 animate-bounce" />
                <span className="text-lg">NGHE giọng đọc mẫu</span>
              </button>

              <button
                onClick={startSpeechRecognition}
                disabled={isRecording}
                id="btn_mic_record"
                className={`w-full flex items-center justify-center space-x-3 text-white font-extrabold py-5 px-6 rounded-2xl shadow-md cursor-pointer transition-all active:scale-95 ${
                  isRecording 
                    ? 'bg-rose-500 hover:bg-rose-600 animate-pulse'
                    : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                <Mic className="w-8 h-8 shrink-0" />
                <span className="text-lg">{isRecording ? 'Đang lắng nghe...' : 'BẤM để tập nói'}</span>
              </button>
            </div>
          </div>
        )}

        {/* --- DẠNG 2: MULTIPLE CHOICE (CHỌN TỪ ĐÚNG) --- */}
        {exercise.type === ExerciseType.MULTIPLE_CHOICE && (
          <div className="w-full space-y-6">
            
            {/* Play pronunciation again button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => speakUtterance(exercise.word)}
                id="btn_mc_play_voice"
                className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 hover:shadow-md text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-5 h-5 shrink-0 animate-bounce" />
                <span className="text-base">Nghe lại phát âm từ đúng</span>
              </button>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {exercise.options?.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === exercise.word;
                
                let btnStyle = 'border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/30 text-slate-700';
                if (isAnswered) {
                  if (isCorrectOption) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 shadow-sm opacity-90 line-through';
                  } else {
                    btnStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={option}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(option)}
                    id={`choice_${option.replace(/\s+/g, '_')}`}
                    className={`py-5 px-6 rounded-2xl border-3 font-extrabold transition-all text-center flex items-center justify-center cursor-pointer ${btnStyle} ${getFontSizeClass()}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {exercise.helperText && !isAnswered && (
              <p className="text-slate-500 text-sm text-center italic bg-slate-50 rounded-xl p-3 max-w-lg mx-auto border border-slate-100">
                💡 Gợi ý của con: {exercise.helperText}
              </p>
            )}
          </div>
        )}

        {/* --- DẠNG 3: LISTEN & REPEAT (NGHE VÀ LẶP LẠI PHÁT ÂM CÂU) --- */}
        {exercise.type === ExerciseType.LISTEN_REPEAT && (
          <div className="w-full flex flex-col items-center space-y-6">
            
            {/* Speech bubble vector representing audio speaker */}
            <div className="bg-gradient-to-b from-emerald-50 to-teal-50 border-2 border-dashed border-teal-200 rounded-3xl p-6 sm:p-10 w-full text-center relative max-w-xl shadow-inner">
              <span className="text-slate-400 font-semibold text-xs tracking-wider uppercase block mb-3">Câu luyện giao tiếp:</span>
              <div className="flex flex-col items-center" id="repeat_word">
                {renderInteractiveWordTokens(exercise.word, `font-black text-teal-900 tracking-wide leading-relaxed uppercase ${
                  currentFontSize === 'huge' ? 'text-4xl sm:text-5xl' : currentFontSize === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
                }`)}
                <p className="text-[11px] text-teal-700 font-extrabold mt-3.5 uppercase tracking-wider flex items-center justify-center gap-1 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  <span>👉 Chạm vào từ bất kỳ phía trên để nghe máy phát âm từ lẻ</span>
                </p>
              </div>
            </div>

            {/* Giant Action targets */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <button
                onClick={() => speakUtterance(exercise.word)}
                id="btn_read_aloud"
                className="w-full flex items-center justify-center space-x-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-5 px-6 rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
              >
                <Volume2 className="w-8 h-8 shrink-0 animate-bounce" />
                <span className="text-lg">NGHE giọng mẫu</span>
              </button>

              <button
                onClick={startSpeechRecognition}
                disabled={isRecording}
                id="btn_start_repeat_mic"
                className={`w-full flex items-center justify-center space-x-3 text-white font-extrabold py-5 px-6 rounded-2xl shadow-md cursor-pointer transition-all active:scale-95 ${
                  isRecording 
                    ? 'bg-rose-500 hover:bg-rose-600 animate-pulse'
                    : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                <Mic className="w-8 h-8 shrink-0" />
                <span className="text-lg">{isRecording ? 'Ba bắt đầu nói' : 'BẤM để tập nói'}</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Voice Transcript showing and fallback checking */}
      {isRecording && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center animate-pulse" id="mic_recording_feed">
          <p className="text-rose-800 font-bold text-lg flex items-center justify-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping shrink-0" />
            <span>Đang lắng nghe ba phát âm... Cha hãy nói to rõ nhé</span>
          </p>
        </div>
      )}

      {transcription && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
          <p className="text-slate-500 text-xs font-semibold uppercase">Âm thanh lọt vào micro:</p>
          <p className="text-lg font-bold text-slate-800">"{transcription}"</p>
        </div>
      )}

      {speechError && (
        <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200 text-center font-medium">
          ⚠️ {speechError}
        </p>
      )}

      {/* VERIFICATION FEEDBACK PANEL */}
      {isAnswered && (
        <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${
          isCorrect 
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-600 text-white shadow-md'
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`} id="answer_feedback_panel">
          
          <div className="flex items-center space-x-3">
            {isCorrect ? (
              <CheckCircle2 className="w-10 h-10 stroke-2 text-emerald-100 animate-spin" style={{ animationDuration: '3s' }} />
            ) : (
              <AlertCircle className="w-10 h-10 stroke-2 text-rose-500 shrink-0" />
            )}
            <div>
              <p className="font-extrabold text-xl">
                {isCorrect ? 'Cha đã hoàn thành tuyệt vời !' : 'Chưa khớp hoàn toàn cha ơi!'}
              </p>
              <p className={`text-sm ${isCorrect ? 'text-emerald-50' : 'text-rose-600 font-medium'}`}>
                {isCorrect 
                  ? 'Giỏi quá cha ơi!'
                  : 'Đừng nản chí cha nhé. Hãy nghe lại và thử nói to rõ hơn!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            {!isCorrect && (
              <button
                onClick={() => {
                  setSelectedOption(null);
                  setIsAnswered(false);
                  setIsCorrect(null);
                }}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Bấm thử lại</span>
              </button>
            )}

            <button
              onClick={onNext}
              id="btn_next_exercise"
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 font-black py-4 px-6 rounded-xl shadow-md cursor-pointer transition-all ${
                isCorrect 
                  ? 'bg-white text-teal-800 hover:bg-teal-50 hover:shadow-lg' 
                  : 'bg-slate-300 hover:bg-slate-400 text-slate-800'
              }`}
            >
              <span>Bài tiếp theo</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* 🤝 CAREGIVER CO-VALIDATION PANEL (Extremely supportive for stroke recovery) */}
      {!isCorrect && (
        <div className="border border-teal-100 bg-teal-50/50 rounded-2xl p-5 space-y-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <p className="text-slate-800 font-bold flex items-center gap-1.5 text-base justify-center sm:justify-start">
                <UserCheck className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Dành cho thành viên gia đình hỗ trợ (Caregiver)</span>
              </p>
              <p className="text-slate-500 text-xs sm:text-sm">
                Nếu cha nói đúng nhưng micro điện thoại không bắt rõ, con hãy bấm nút dưới đây để công nhận và khích lệ cha.
              </p>
            </div>
            <button
              onClick={handleCaregiverValidation}
              id="btn_caregiver_accept"
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-95 cursor-pointer text-sm shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Con nghe cha nói ĐÚNG ✓</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

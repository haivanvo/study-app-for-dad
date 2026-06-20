/**
 * Types and interfaces for the Stroke Language Rehabilitation App.
 */

export enum ExerciseType {
  IDENTIFY = 'IDENTIFY', // Nhìn hình học từ (Flashcard)
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE', // Chọn đáp án đúng
  LISTEN_REPEAT = 'LISTEN_REPEAT' // Nghe và lặp lại câu dài
}

export interface VocabularyItem {
  id: string;
  word: string; // e.g. "Quả Táo"
  phoneticDescription?: string; // Optional: guidance on syllable-by-syllable e.g. "Qu-ả T-áo"
  translation?: string; // Optional: English/other meaning if helpful
  svgPath: string; // Visual asset represented as a custom raw SVG or custom visual render structure
  accentPath?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  instruction: string;
  word: string; // Correct word/phrase
  options?: string[]; // Multiple choice options (for Type 2)
  helperText?: string;
  svgIcon?: string; // Key Lucide icon fallback or custom illustration ID
  illustrationType?: 'apple' | 'banana' | 'cat' | 'dog' | 'orange' | 'bicycle' | 'chicken' | 'cup' | 'house' | 'sun' | 'water' | 'family' | 'heart' | 'book' | 'bed' | 'chair' | 'toothbrush' | 'broom' | 'shower' | 'toilet' | 'mom' | 'daughter' | 'son' | 'daughter_in_law' | 'grandchild';
  category?: 'co_ban' | 'vat_dung' | 'giao_tiep' | 'gia_dinh_minh'; // co_ban: Từ vựng cơ bản, vat_dung: Vật dụng gia đình, giao_tiep: Giao tiếp & Nhu cầu, gia_dinh_minh: Gia Đình Mình
}

export interface UserStats {
  completedCount: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  history: {
    date: string;
    score: number;
    completedExercises: number;
  }[];
}

export type FontSizeSetting = 'normal' | 'large' | 'huge';
export type AccentSetting = 'south' | 'north' | 'auto';

export interface AppSettings {
  fontSize: FontSizeSetting;
  speechRate: number; // 0.5 to 1.5
  accent: AccentSetting;
  voiceVolume: number; // 0 to 1
  soundEffects: boolean;
  selectedVoiceName?: string; // Cache the manually-selected voice name
  reminderEnabled: boolean; // Trạng thái bật/tắt nhắc nhở giờ học
  reminderTime: string; // Khung giờ nhắc nhở (e.g., '09:00', '15:00')
}

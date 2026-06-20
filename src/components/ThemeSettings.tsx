import React from 'react';
import { AppSettings, FontSizeSetting, AccentSetting } from '../types';
import { Play, Volume2, Type, Sliders, Check, Settings2, Info, Bell } from 'lucide-react';
import { playTapChime } from '../utils/audio';
import { getBestVietnameseVoice, categorizeVoice } from '../utils/voiceSelector';

interface ThemeSettingsProps {
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  voices: SpeechSynthesisVoice[];
  onOpenReminderSettings: () => void;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  settings,
  onUpdateSettings,
  voices,
  onOpenReminderSettings
}) => {
  const handleFontSizeChange = (size: FontSizeSetting) => {
    playTapChime();
    onUpdateSettings({ fontSize: size });
  };

  const handleAccentChange = (accent: AccentSetting) => {
    playTapChime();
    // Reset manual voice selection when changing preset to let auto-selection decide
    onUpdateSettings({ accent, selectedVoiceName: undefined });
  };

  const handleVoiceSelect = (voiceName: string) => {
    playTapChime();
    onUpdateSettings({ selectedVoiceName: voiceName });
  };

  const handleRateChange = (rate: number) => {
    playTapChime();
    onUpdateSettings({ speechRate: rate });
  };

  const testVoice = () => {
    playTapChime();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Xin chào cha! Hôm nay lại cố lên cha nhé!');
      utterance.rate = settings.speechRate;
      utterance.volume = 1.0; // Đảm bảo âm lượng phát âm ở mức tối đa (1.0)
      
      const selectedVoice = getBestVietnameseVoice(voices, settings);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filter Vietnamese voices
  const vietnameseVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('vi'));
  const activeVoice = getBestVietnameseVoice(voices, settings);

  return (
    <div className="bg-slate-50 border border-teal-100 rounded-3xl p-6 sm:p-8 space-y-6 sm:space-y-8" id="settings_container">
      <div className="flex items-center space-x-3 border-b border-teal-100 pb-4">
        <Sliders className="w-7 h-7 text-teal-600" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-800">Cài đặt hỗ trợ</h2>
      </div>

      {/* Adjust Font Size */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-slate-700 font-medium text-lg">
          <Type className="w-5 h-5 text-teal-600 animate-pulse" />
          <span>Kích thước chữ hiển thị:</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['normal', 'large', 'huge'] as FontSizeSetting[]).map((size) => (
            <button
              key={size}
              id={`btn_font_${size}`}
              onClick={() => handleFontSizeChange(size)}
              className={`py-4 px-3 rounded-2xl border-2 font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                settings.fontSize === size
                  ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-md ring-2 ring-teal-300'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className={
                size === 'normal' ? 'text-base' : size === 'large' ? 'text-xl' : 'text-2xl'
              }>Chữ A</span>
              <span className="text-xs mt-1 font-normal uppercase tracking-wider block">
                {size === 'normal' ? 'Vừa' : size === 'large' ? 'To' : 'Rất To'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Adjust Speed of Speech */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-slate-700 font-medium text-lg">
          <Volume2 className="w-5 h-5 text-teal-600" />
          <span>Tốc độ giọng đọc của ứng dụng:</span>
        </label>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {[0.6, 0.8, 1.0, 1.2].map((rate) => (
            <button
              key={rate}
              id={`btn_rate_${rate}`}
              onClick={() => handleRateChange(rate)}
              className={`py-3 px-1 sm:px-2 rounded-xl border-2 font-semibold text-sm transition-all text-center cursor-pointer ${
                settings.speechRate === rate
                  ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm ring-2 ring-teal-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {rate === 0.6 ? 'Rất chậm' : rate === 0.8 ? 'Chậm' : rate === 1.0 ? 'Bình thường' : 'Nhanh'}
              <span className="block text-xs text-slate-400 mt-1 font-normal">({rate}x)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Choose Regional Accent */}
      <div className="space-y-3">
        <label className="text-slate-700 font-medium text-lg block">Ngữ điệu / Giọng đọc tiếng Việt miền:</label>
        <div className="grid grid-cols-3 gap-3">
          {(['auto', 'north', 'south'] as AccentSetting[]).map((accent) => (
            <button
              key={accent}
              id={`btn_accent_${accent}`}
              onClick={() => handleAccentChange(accent)}
              className={`py-3 px-2 rounded-xl border-2 font-bold transition-all text-center flex items-center justify-center cursor-pointer ${
                settings.accent === accent && !settings.selectedVoiceName
                  ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="text-sm">
                {accent === 'auto' ? 'Mặc định' : accent === 'north' ? 'Miền Bắc' : 'Miền Nam'}
              </span>
              {settings.accent === accent && !settings.selectedVoiceName && <Check className="w-4 h-4 ml-1.5 text-teal-600 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Mẹo nhỏ về âm lượng giọng nói */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5 shadow-sm" id="tip_volume_settings">
        <p className="font-extrabold flex items-center gap-1.5 text-sm text-amber-850">
          <Volume2 className="w-4 h-4 shrink-0 text-amber-600 animate-pulse" />
          <span>Mẹo giúp giọng đọc to rõ hơn cho chaa:</span>
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 font-semibold">
          <li>Tăng âm lượng hệ thống của thiết bị lên mức tối đa.</li>
          <li>Thử chọn <strong>"Miền Bắc"</strong> hoặc <strong>"Miền Nam"</strong>, hoặc chọn thử giọng đọc khác trong danh sách bên dưới. Một số giọng đọc có sẵn trên máy (ghi chú <i>"Có sẵn trên máy"</i>) có âm lượng to và sắc nét hơn giọng tải qua mạng.</li>
          <li>Bạn có thể kết nối thêm thiết bị loa bluetooth nhỏ bên cạnh để cha nghe rõ ràng từng từ hơn.</li>
        </ul>
      </div>

      {/* Advanced Exact Voice List on Device */}
      {vietnameseVoices.length > 0 && (
        <div className="space-y-3 pt-2">
          <label className="flex items-center space-x-2 text-slate-700 font-semibold text-sm uppercase tracking-wider">
            <Settings2 className="w-4 h-4 text-teal-600" />
            <span>Giọng đọc đang hoạt động trên hệ thống:</span>
          </label>
          
          <div className="space-y-2 bg-white p-3 rounded-2xl border border-slate-200/60 max-h-48 overflow-y-auto">
            {vietnameseVoices.map((v) => {
              const accent = categorizeVoice(v);
              const isSelected = activeVoice?.name === v.name;
              
              let accentText = 'Chưa xác định';
              let accentBadgeColor = 'bg-slate-100 text-slate-600';
              if (accent === 'south') {
                accentText = 'Miền Nam';
                accentBadgeColor = 'bg-emerald-100 text-emerald-800 font-extrabold';
              } else if (accent === 'north') {
                accentText = 'Miền Bắc';
                accentBadgeColor = 'bg-blue-100 text-blue-800 font-extrabold';
              }

              return (
                <button
                  key={v.name}
                  onClick={() => handleVoiceSelect(v.name)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-teal-50/50 border-teal-400 font-bold text-teal-900 ring-1 ring-teal-300' 
                      : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="truncate pr-2">
                    <p className="font-bold truncate">{v.name}</p>
                    <p className="text-[10px] text-slate-400">Ngôn ngữ: {v.lang} {v.localService ? '(Có sẵn trên máy)' : '(Qua mạng)'}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] shrink-0 ${accentBadgeColor}`}>
                    {accentText}
                  </span>
                </button>
              );
            })}
          </div>
          {activeVoice && (
            <p className="text-xs text-slate-500 italic bg-teal-50/40 p-2.5 rounded-xl flex items-start gap-1.5 border border-teal-100/30">
              <Info className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <span>
                Phát hiện & Chọn giọng đọc: <strong>{activeVoice.name}</strong> ({categorizeVoice(activeVoice) === 'south' ? 'Miền Nam' : categorizeVoice(activeVoice) === 'north' ? 'Miền Bắc' : 'Tiêu chuẩn'}).
              </span>
            </p>
          )}
        </div>
      )}

      {/* Hẹn giờ nhắc nhở học chữ ấm áp */}
      <div className="space-y-3 pt-2">
        <label className="flex items-center space-x-2 text-slate-700 font-medium text-lg">
          <Bell className="w-5 h-5 text-teal-600" />
          <span>Hẹn giờ nhắc nhở học chữ của con:</span>
        </label>
        <div className="flex items-center justify-between gap-3 bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-sm flex-wrap sm:flex-nowrap">
          <div className="text-xs text-slate-600 sm:pr-2">
            {settings.reminderEnabled ? (
              <p className="font-extrabold text-teal-800 flex items-center gap-1.5 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping shrink-0"></span>
                <span>Đang bật nhắc lúc {settings.reminderTime}</span>
              </p>
            ) : (
              <p className="font-bold text-slate-500 text-sm">Nhắc nhở học chữ chưa bật</p>
            )}
            <p className="text-[11px] text-slate-400 mt-1">Trình duyệt tự động gửi lời nhắn ấm áp của con.</p>
          </div>
          <button
            onClick={() => {
              playTapChime();
              onOpenReminderSettings();
            }}
            type="button"
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs py-3 px-5 rounded-xl cursor-pointer transition-all shrink-0 text-center shadow-md active:scale-95"
          >
            {settings.reminderEnabled ? 'Sửa giờ nhắc' : 'Cài đặt nhắc'}
          </button>
        </div>
      </div>

      {/* Button to Audibly Check Voice */}
      <button
        onClick={testVoice}
        id="btn_test_voice"
        className="w-full flex items-center justify-center space-x-3 bg-teal-100 hover:bg-teal-200 text-teal-800 font-bold py-4 px-6 rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer mt-4"
      >
        <Play className="w-5 h-5 fill-current" />
        <span>Nghe thử giọng đọc mẫu</span>
      </button>

      {vietnameseVoices.length === 0 && (
        <p className="text-xs text-amber-600 bg-amber-50 rounded-xl p-3 border border-amber-200">
          Chưa tìm thấy giọng đọc tiếng Việt chuyên biệt cài bên trong máy. Ứng dụng sẽ tự động tối ưu hóa giọng đọc tốt nhất của hệ thống.
        </p>
      )}
    </div>
  );
};

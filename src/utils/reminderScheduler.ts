import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, BellRing, X, Check, Clock, Sparkles, Heart, AlertCircle } from 'lucide-react';
import { AppSettings } from '../types';
import { playTapChime, playSuccessChime } from '../utils/audio';
import { requestNotificationPermission, triggerWarmNotification } from '../utils/reminderScheduler';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [customTime, setCustomTime] = useState<string>(settings.reminderTime || '09:00');

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, [isOpen]);

  const handleRequestPermission = async () => {
    playTapChime();
    const result = await requestNotificationPermission();
    setPermissionStatus(result);
    if (result === 'granted') {
      playSuccessChime();
      onUpdateSettings({ reminderEnabled: true });
    }
  };

  const toggleReminder = () => {
    playTapChime();
    if (permissionStatus !== 'granted') {
      handleRequestPermission();
    } else {
      onUpdateSettings({ reminderEnabled: !settings.reminderEnabled });
    }
  };

  const handleTimePresetClick = (presetTime: string) => {
    playTapChime();
    setCustomTime(presetTime);
    onUpdateSettings({ reminderTime: presetTime });
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setCustomTime(newTime);
    onUpdateSettings({ reminderTime: newTime });
  };

  const testTrigger = () => {
    playTapChime();
    if (permissionStatus !== 'granted') {
      handleRequestPermission();
    } else {
      triggerWarmNotification();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="reminder_modal_overlay">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal content box */}
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-100 z-10 max-h-[90vh] overflow-y-auto"
          id="reminder_modal_body"
        >
          {/* Close button with high target size */}
          <button
            onClick={onClose}
            aria-label="Đóng cài đặt nhắc nhở"
            className="absolute top-4 right-4 p-2.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Header */}
          <div className="flex items-start space-x-3.5 mb-6 pr-6">
            <div className={`p-3 rounded-2xl ${settings.reminderEnabled ? 'bg-teal-100 text-teal-700 animate-wiggle' : 'bg-slate-100 text-slate-400'}`}>
              {settings.reminderEnabled ? (
                <BellRing className="w-8 h-8" />
              ) : (
                <Bell className="w-8 h-8" />
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900 flex items-center gap-1.5 flex-wrap">
                <span>Nhắc nhở giờ học ấm áp</span>
                <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">Tính năng mới</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">Con yêu gửi lời động viên tới ba vào mỗi khung giờ vàng hẹn trước.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Status & Permission alert banner */}
            {permissionStatus === 'denied' && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-800 space-y-1">
                  <p className="font-bold">Trình duyệt đang chặn quyền thông báo</p>
                  <p>Để nhận được thông báo nhắc nhở rèn luyện tinh thần, vui lòng vào cài đặt trình duyệt (hoặc click icon ổ khóa ở góc trái thanh địa chỉ URL) và bật lại quyền <strong>"Thông báo" / "Notification"</strong> nhé.</p>
                </div>
              </div>
            )}

            {/* Quick Toggle Activation */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 text-base sm:text-lg">Kích hoạt chế độ nhắc nhở</p>
                <p className="text-xs text-slate-400 mt-0.5">Trình duyệt tự động hiển thị pop-up ấm áp khi tới giờ hẹn.</p>
              </div>
              <button
                onClick={toggleReminder}
                id="btn_toggle_reminder"
                className={`relative inline-flex h-7.5 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                  settings.reminderEnabled ? 'bg-teal-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6.5 w-6.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.reminderEnabled ? 'translate-x-6.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Choose golden hours presets */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-slate-700 font-bold text-sm uppercase tracking-wide">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Chọn khung giờ vàng hẹn học:</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '09:00 Sáng (Khởi động)', value: '09:00' },
                  { label: '15:00 Chiều (Thư giãn)', value: '15:00' },
                  { label: '19:00 Tối (Thân mật)', value: '19:00' },
                  { label: '08:00 Sáng (Chào ngày mới)', value: '08:00' }
                ].map((preset) => {
                  const isSelected = settings.reminderTime === preset.value;
                  return (
                    <button
                      key={preset.value}
                      onClick={() => handleTimePresetClick(preset.value)}
                      className={`p-3.5 rounded-xl border-2 text-xs font-semibold text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/50 text-teal-900 ring-1 ring-teal-200 font-extrabold'
                          : 'border-slate-100 hover:border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <p>{preset.label}</p>
                      <p className={`text-[10px] mt-1 font-mono font-bold ${isSelected ? 'text-teal-700' : 'text-slate-400'}`}>Tự động: {preset.value}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom precise time control */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-800 text-sm">Hẹn khung giờ khác tùy ý ba mẹ:</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Nhập chính xác giờ học mà ba mẹ mong đợi.</p>
              </div>
              <input
                type="time"
                value={customTime}
                onChange={handleCustomTimeChange}
                className="w-full sm:w-auto p-2 bg-white border-2 border-slate-200 rounded-xl font-mono text-center text-slate-700 font-bold focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-200 cursor-pointer"
              />
            </div>

            {/* Preview Warm Persona Card */}
            <div className="bg-teal-50/40 border border-teal-100/60 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-bold text-teal-800 flex items-center space-x-1 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                <span>Ví dụ nội dung nhắc nhở ngẫu nhiên:</span>
              </p>
              <div className="bg-white p-3 rounded-xl border border-teal-50 text-sm italic text-slate-700 font-medium relative pr-10 shadow-sm leading-relaxed">
                "Thời tiết hôm nay đẹp quá ba ơi, ba con mình cùng luyện chữ một chút nhé! ❤️"
                <div className="absolute right-3.5 bottom-2 text-xs flex items-center space-x-0.5 text-teal-600">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>

            {/* Action controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              {permissionStatus !== 'granted' && (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-md transition-all text-sm cursor-pointer hover:shadow-lg active:scale-95"
                >
                  Cho phép Thông báo đẩy
                </button>
              )}

              {permissionStatus === 'granted' && (
                <button
                  type="button"
                  onClick={testTrigger}
                  className="w-full bg-teal-100 hover:bg-teal-200 text-teal-800 font-extrabold py-4 px-6 rounded-2xl border border-teal-200 transition-all text-sm cursor-pointer flex items-center justify-center space-x-2 active:scale-95"
                >
                  <span>Gửi tin thông báo ngẫu nhiên để thử</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-all text-sm cursor-pointer"
              >
                Hoàn tất & Đóng
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

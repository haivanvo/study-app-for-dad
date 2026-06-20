import React from 'react';
import { UserStats } from '../types';
import { Award, Flame, Calendar, Activity, GraduationCap } from 'lucide-react';

interface StatsDashboardProps {
  stats: UserStats;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats }) => {
  const getMotivationalMessage = (streak: number) => {
    if (streak === 0) return 'Bắt đầu bài tập hôm nay thôi nào cha ơi!';
    if (streak === 1) return 'Khởi đầu ngày mới tràn đầy sức khỏe và phấn khởi!';
    if (streak < 3) return 'Tuyệt vời! Hãy duy trì bài tập liên tục nhé! Cố lên chaaaa!';
    return 'Giỏi quá! Cha đang tiến bộ lên rồi!';
  };

  return (
    <div className="space-y-6" id="dashboard_stats_panel">
      {/* Quick stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Streak card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 rounded-2xl p-5 flex items-center space-x-4 shadow-sm relative overflow-hidden">
          <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
            <Flame className="w-8 h-8 fill-current animate-bounce" />
          </div>
          <div>
            <p className="text-sm font-semibold text-orange-800 uppercase tracking-wider">Chuỗi ngày</p>
            <p className="text-3xl font-extrabold text-orange-900">{stats.streak} ngày</p>
          </div>
          <div className="absolute right-2 bottom-0 text-orange-100 font-bold text-6xl leading-none select-none opacity-40">
            {stats.streak}
          </div>
        </div>

        {/* Exercises count card */}
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-2xl p-5 flex items-center space-x-4 shadow-sm relative overflow-hidden">
          <div className="p-3 bg-teal-100 rounded-xl text-teal-600">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-teal-800 uppercase tracking-wider">Đã hoàn thành</p>
            <p className="text-3xl font-extrabold text-teal-900">{stats.completedCount} từ</p>
          </div>
          <div className="absolute right-2 bottom-0 text-teal-100 font-bold text-6xl leading-none select-none opacity-40">
            ✓
          </div>
        </div>
      </div>

      {/* Motivational helper */}
      <div className="bg-teal-500 text-white rounded-2xl p-5 shadow-sm">
        <p className="text-sm font-semibold text-teal-100 bg-teal-600/30 w-fit px-3 py-1 rounded-full mb-2">Lời động viên cho cha</p>
        <p className="text-lg font-bold">{getMotivationalMessage(stats.streak)}</p>
      </div>

      {/* Scientific explanation block for the Bioinformatician User */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-teal-700 font-bold border-b border-slate-100 pb-3">
          <Activity className="w-5 h-5 stroke-[2.5]" />
          <h3 className="text-base sm:text-lg">Cơ chế Hồi phục Ngôn ngữ (Aphasia Rehab)</h3>
        </div>
        
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
            <p>
              <strong>Bán cầu não trái (Broca / Wernicke Area):</strong> Việc phát âm chậm từng âm tiết kết hợp với phản xạ chọn từ đúng giúp kích thích vùng Broca (vận động lời nói) và Wernicke (thông hiểu ngôn ngữ).
            </p>
          </div>
          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
            <p>
              <strong>Phản hồi giác quan (Auditory-Motor Loop):</strong> Âm thanh phát ra từ ứng dụng đóng vai trò làm mẫu, sau đó việc tập nói to lại giúp tăng cường mạng lưới thần kinh phản hồi âm - vận động (auditory-motor integration).
            </p>
          </div>
          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
            <p>
              <strong>Cơ chế dẻo của não bộ (Neuroplasticity):</strong> Tập luyện đều đặn hằng ngày giúp củng cố các kết nối synapse mới thay thế cho vùng thần kinh bị tổn thương sau đột quỵ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Exercise, ExerciseType } from './types';

export const EXERCISES_DATA: Exercise[] = [
  // --- CHỦ ĐỀ 1: TỪ VỰNG CƠ BẢN (category: 'co_ban') ---
  {
    id: 'id-1',
    type: ExerciseType.IDENTIFY,
    title: 'Học từ vựng cơ bản',
    instruction: 'Nhìn hình ảnh bên dưới, nghe phát âm và luyện đọc to theo nhé!',
    word: 'Quả Táo',
    helperText: 'Từ này có hai âm tiết. Hãy phát âm tròn môi từ "Táo".',
    illustrationType: 'apple',
    category: 'co_ban'
  },
  {
    id: 'id-2',
    type: ExerciseType.IDENTIFY,
    title: 'Học từ vựng cơ bản',
    instruction: 'Nhìn hình ảnh bên dưới, nghe phát âm và luyện đọc to theo nhé!',
    word: 'Mặt Trời',
    helperText: 'Từ gồm âm "Mặt" ngắn dứt khoát kết hợp với âm "Trời" uốn nhẹ lưỡi.',
    illustrationType: 'sun',
    category: 'co_ban'
  },
  {
    id: 'id-3',
    type: ExerciseType.IDENTIFY,
    title: 'Học từ vựng cơ bản',
    instruction: 'Nhìn hình ảnh bên dưới, nghe phát âm và luyện đọc to theo nhé!',
    word: 'Ngôi Nhà',
    helperText: 'Từ vô cùng thân thuộc. Phát âm mở rộng môi: Ng-ôi Nh-à.',
    illustrationType: 'house',
    category: 'co_ban'
  },
  {
    id: 'id-4',
    type: ExerciseType.IDENTIFY,
    title: 'Học từ vựng cơ bản',
    instruction: 'Nhìn hình ảnh bên dưới, nghe phát âm và luyện đọc to theo nhé!',
    word: 'Xe Đạp',
    helperText: 'Sử dụng âm răng môi "Xe" kết hợp với âm bật hơi dứt khoát "Đạp".',
    illustrationType: 'bicycle',
    category: 'co_ban'
  },
  {
    id: 'mc-1',
    type: ExerciseType.MULTIPLE_CHOICE,
    title: 'Chọn đáp án đúng',
    instruction: 'Đây là con vật gì? Hãy chọn nút có từ viết đúng bên dưới.',
    word: 'Con Mèo',
    options: ['Con Chó', 'Con Mèo', 'Con Chim'],
    helperText: 'Con vật thích bắt chuột và kêu "Meo meo".',
    illustrationType: 'cat',
    category: 'co_ban'
  },
  {
    id: 'mc-2',
    type: ExerciseType.MULTIPLE_CHOICE,
    title: 'Chọn đáp án đúng',
    instruction: 'Đây là loại quả gì với vỏ có màu vàng?',
    word: 'Quả Chuối',
    options: ['Quả Chuối', 'Quả Cam', 'Quả Táo'],
    helperText: 'Quả chín có màu vàng thơm, rất bổ dưỡng cho sức khỏe.',
    illustrationType: 'banana',
    category: 'co_ban'
  },
  {
    id: 'mc-3',
    type: ExerciseType.MULTIPLE_CHOICE,
    title: 'Chọn đáp án đúng',
    instruction: 'Đây là bức hình đại diện cho ai?',
    word: 'Gia Đình',
    options: ['Bác Sĩ', 'Gia Đình', 'Bạn Bè'],
    helperText: 'Nơi ấm áp nhất luôn có con cháu sum vầy bên cha.',
    illustrationType: 'family',
    category: 'co_ban'
  },
  {
    id: 'mc-4',
    type: ExerciseType.MULTIPLE_CHOICE,
    title: 'Chọn đáp án đúng',
    instruction: 'Đây là con vật gì gáy vang báo thức vào mỗi buổi sáng?',
    word: 'Con Gà',
    options: ['Con Gà', 'Con Chó', 'Con Mèo'],
    helperText: 'Con vật gáy "Ò ó o" để báo trời đã rạng sáng.',
    illustrationType: 'chicken',
    category: 'co_ban'
  },

  // --- CHỦ ĐỀ 2: VẬT DỤNG GIA ĐÌNH (category: 'vat_dung') ---
  {
    id: 'id-vd-1',
    type: ExerciseType.IDENTIFY,
    title: 'Vật dụng gia đình',
    instruction: 'Nhìn hình ảnh cái ghế gỗ, nghe phát âm và luyện đọc to theo nhé!',
    word: 'Cái Ghế',
    helperText: 'Phát âm rõ âm đầu "Gh-" kết hợp vần "-ê" sắc sảo.',
    illustrationType: 'chair',
    category: 'vat_dung'
  },
  {
    id: 'id-vd-2',
    type: ExerciseType.IDENTIFY,
    title: 'Vật dụng gia đình',
    instruction: 'Nhìn hình ảnh chiếc giường ngủ, nghe phát âm và luyện đọc to theo nhé!',
    word: 'Chiếc Giường',
    helperText: '"Giường" là âm nặng, hãy phát âm chậm rãi, hơi kéo dài âm sắc.',
    illustrationType: 'bed',
    category: 'vat_dung'
  },
  {
    id: 'id-vd-3',
    type: ExerciseType.IDENTIFY,
    title: 'Vật dụng gia đình',
    instruction: 'Nhìn hình ảnh cái chổi quét nhà, nghe phát âm và luyện đọc to theo nhé!',
    word: 'Cái Chổi',
    helperText: 'Âm đầu "Ch-" uốn nhẹ, vần "-ôi" tròn môi và thanh hỏi.',
    illustrationType: 'broom',
    category: 'vat_dung'
  },
  {
    id: 'mc-vd-1',
    type: ExerciseType.MULTIPLE_CHOICE,
    title: 'Chọn đáp án đúng',
    instruction: 'Vật dụng nào dùng để vệ sinh răng miệng hàng ngày?',
    word: 'Bàn Chải',
    options: ['Cái Ca', 'Bàn Chải', 'Cái Chổi'],
    helperText: 'Giúp răng miệng sạch sẽ thơm tho vào mỗi buổi sáng và tối.',
    illustrationType: 'toothbrush',
    category: 'vat_dung'
  },
  {
    id: 'mc-vd-2',
    type: ExerciseType.MULTIPLE_CHOICE,
    title: 'Chọn đáp án đúng',
    instruction: 'Cái cốc uống nước hay còn được gọi là gì?',
    word: 'Cái Ca',
    options: ['Cái Ca', 'Cái Ghế', 'Trái Táo'],
    helperText: 'Vật dụng đựng nước lọc, nước trà để cha giải khát.',
    illustrationType: 'cup',
    category: 'vat_dung'
  },

  // --- CHỦ ĐỀ 3: GIAO TIẾP & NHU CẦU (category: 'giao_tiep') ---
  {
    id: 'repeat-1',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Ngữ điệu và Nhu cầu',
    instruction: 'Hãy lắng nghe và luyện đọc to lời chào buổi sáng tràn đầy năng lượng nhé!',
    word: 'Chào buổi sáng cha mẹ!',
    helperText: 'Lời chào ấm áp đầu ngày giúp khởi động cơ cấu miệng mềm câu.',
    illustrationType: 'sun',
    category: 'giao_tiep'
  },
  {
    id: 'repeat-2',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Ngữ điệu và Nhu cầu',
    instruction: 'Hãy tập nói câu bày tỏ lòng biết ơn trìu mến đến người chăm sóc nhé!',
    word: 'Cảm ơn con nhiều nhé!',
    helperText: 'Câu cảm ơn giúp tinh thần vui vẻ, xua tan mệt mỏi cho cả nhà.',
    illustrationType: 'heart',
    category: 'giao_tiep'
  },
  {
    id: 'repeat-3',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Ngữ điệu và Nhu cầu',
    instruction: 'Bày tỏ nhu cầu ăn uống cơ bản khi đến bữa cơm nhé!',
    word: 'Tôi muốn ăn một chén cơm.',
    helperText: 'Diễn tả rõ ràng nguyện vọng của cha chậm rãi từ từ.',
    illustrationType: 'cup',
    category: 'giao_tiep'
  },
  {
    id: 'repeat-4',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Ngữ điệu và Nhu cầu',
    instruction: 'Nói câu chúc ấm lòng gửi đến cả nhà trước khi chìm vào giấc ngủ ngon nhé!',
    word: 'Chúc cả nhà ngủ ngon!',
    helperText: 'Câu nói yêu thương khép lại một ngày rèn luyện tuyệt vời.',
    illustrationType: 'house',
    category: 'giao_tiep'
  },
  {
    id: 'repeat-nc-1',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Ngữ điệu và Nhu cầu',
    instruction: 'Luyện tập phát âm câu bày tỏ nhu cầu vệ sinh tắm rửa cơ bản!',
    word: 'Tôi muốn đi tắm.',
    helperText: 'Bày tỏ nhu cầu giữ gìn vệ sinh cơ thể mát mẻ, sảng khoái.',
    illustrationType: 'shower',
    category: 'giao_tiep'
  },
  {
    id: 'repeat-nc-2',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Ngữ điệu và Nhu cầu',
    instruction: 'Khi cơ thể mệt mỏi và muốn nghỉ ngơi, hãy phát âm câu thoại này nhé!',
    word: 'Tôi muốn đi ngủ.',
    helperText: 'Để gia đình hỗ trợ dắt cha lên chiếc giường ngủ êm ái kịp lúc.',
    illustrationType: 'bed',
    category: 'giao_tiep'
  },
  {
    id: 'repeat-nc-3',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Ngữ điệu và Nhu cầu',
    instruction: 'Phát âm câu thoại khi cha cảm thấy khát và muốn uống nước!',
    word: 'Cho cha uống nước.',
    helperText: 'Cung cấp nước giải khát giúp làm mát cổ họng và hỗ trợ nói dễ hơn.',
    illustrationType: 'water',
    category: 'giao_tiep'
  },
  {
    id: 'repeat-nc-4',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Ngữ điệu và Nhu cầu',
    instruction: 'Luyện câu thoại thiết thực nhất khi cần đi giải quyết vệ sinh cá nhân nhé!',
    word: 'Tôi muốn đi vệ sinh.',
    helperText: 'Thể hiện rõ ràng nhu cầu sinh lý cấp thiết để tránh sự cố bất tiện.',
    illustrationType: 'toilet',
    category: 'giao_tiep'
  },
  {
    id: 'repeat-nc-5',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Ngữ điệu và Nhu cầu',
    instruction: 'Đề nghị con dắt đi dạo hít thở không khí trong lành, sảng khoái nhé!',
    word: 'Con dắt cha đi chơi nhé.',
    helperText: 'Hãy nói vui tươi để tăng liên kết tình cảm gia đình ấm cúng.',
    illustrationType: 'bicycle',
    category: 'giao_tiep'
  },
  
  // --- CHỦ ĐỀ CÁ NHÂN HÓA: GIA ĐÌNH MÌNH (category: 'gia_dinh_minh') ---
  {
    id: 'id-gdm-1',
    type: ExerciseType.IDENTIFY,
    title: 'Gia Đình Mình',
    instruction: 'Nhìn hình ảnh Mẹ, nghe phát âm và gọi tên trìu mến nhé!',
    word: 'Mẹ Ánh',
    helperText: 'Từ gồm hai âm tiết. Phát âm rõ chữ "Mẹ" và uốn cong môi chữ "Ánh".',
    illustrationType: 'mom',
    category: 'gia_dinh_minh'
  },
  {
    id: 'id-gdm-2',
    type: ExerciseType.IDENTIFY,
    title: 'Gia Đình Mình',
    instruction: 'Nhìn hình con gái yêu quý, hãy nghe phát âm và gọi tên con nhé!',
    word: 'Hải Vân',
    helperText: 'Cụm từ dễ thương gọi đứa con gái bé nhỏ luôn ở bên chăm sóc cha.',
    illustrationType: 'daughter',
    category: 'gia_dinh_minh'
  },
  {
    id: 'id-gdm-3',
    type: ExerciseType.IDENTIFY,
    title: 'Gia Đình Mình',
    instruction: 'Nhìn hình con trai của cha, nghe phát âm và gọi tên con trai nhé!',
    word: 'Phúc Hải',
    helperText: 'Diễn tả tên "Phúc Hải" đầy niềm tin vững vàng và dứt khoát.',
    illustrationType: 'son',
    category: 'gia_dinh_minh'
  },
  {
    id: 'id-gdm-4',
    type: ExerciseType.IDENTIFY,
    title: 'Gia Đình Mình',
    instruction: 'Nhìn hình con dâu ngoan hiền, cùng nghe phát âm và gọi tên con nhé!',
    word: 'Kim Ngân',
    helperText: 'Cụm gồm vần "-im" và âm vần "-ân" khép môi nhẹ nhàng.',
    illustrationType: 'daughter_in_law',
    category: 'gia_dinh_minh'
  },
  {
    id: 'id-gdm-5',
    type: ExerciseType.IDENTIFY,
    title: 'Gia Đình Mình',
    instruction: 'Nhìn hình cháu nội bé bỏng đáng yêu, nghe phát âm và gọi tên cháu nhé!',
    word: 'Coca',
    helperText: 'Tên dễ thương của cậu cháu nội yêu quý, điểm tựa niềm vui ngọt ngào.',
    illustrationType: 'grandchild',
    category: 'gia_dinh_minh'
  },
  {
    id: 'mc-gdm-1',
    type: ExerciseType.MULTIPLE_CHOICE,
    title: 'Gia Đình Mình',
    instruction: 'Đây là hình ảnh đại diện cho chiếc tổ ấm thân thương nào?',
    word: 'Gia đình mình',
    options: ['Người quen', 'Gia đình mình', 'Nhà hàng xóm'],
    helperText: 'Toàn bộ tổ ấm nhỏ vui tươi, gắn kết thương yêu bền chặt.',
    illustrationType: 'family',
    category: 'gia_dinh_minh'
  },
  {
    id: 'repeat-gdm-1',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Gia Đình Mình',
    instruction: 'Hãy luyện nói to rõ câu bày tỏ tình yêu thương đong đầy gửi tới cả nhà nhé!',
    word: 'Cha yêu cả nhà',
    helperText: 'Câu ấm áp nhất sưởi ấm trái tim tất cả thành viên trong gia đình.',
    illustrationType: 'heart',
    category: 'gia_dinh_minh'
  },
  {
    id: 'repeat-gdm-2',
    type: ExerciseType.LISTEN_REPEAT,
    title: 'Gia Đình Mình',
    instruction: 'Hát nhịp câu nói tỏ lòng biết ơn trân quý tới mái nhà đầm ấm của chúng ta nhé!',
    word: 'Cảm ơn gia đình mình',
    helperText: 'Gia đình luôn yêu thương, đồng hành cùng cha từng bước rèn luyện.',
    illustrationType: 'family',
    category: 'gia_dinh_minh'
  }
];

export const SUCCESS_MESSAGES = [
  'Tuyệt vời quá cha ơi! Tiến bộ rõ rệt!',
  'Cha giỏi quá! Cố gắng luyện tập thêm nào!',
  'Đọc đúng rồi! Giọng đọc rất rõ ràng!',
  'Chúc mừng! Một câu hoàn chỉnh xuất sắc!',
  'Con tự hào về cha lắm! Hãy tiếp tục nhé!',
  'Dứt khoát và chuẩn xác! Thật tuyệt vời!'
];

export const INSTRUCTIONS = {
  welcome: 'Chào cha! Hôm nay chúng ta cùng nhau học lại tiếng Việt thật vui vẻ và thoải mái nhé. Hãy bấm nút màu cam ở mỗi bài để nghe giọng đọc.',
  completedSession: 'Chúc mừng cha đã hoàn thành buổi học hôm nay!'
};

export const REMINDER_MESSAGES = [
  "Cha ơi, hôm nay mình cùng nhau ôn lại vài chữ nhé! ❤️",
  "Thời tiết hôm nay đẹp quá, cha con mình cùng luyện chữ một chút nhé!",
  "Đến giờ hẹn học chữ của hai cha con mình rồi nè cha ơi. 🥰",
  "Mỗi ngày một chút tinh thần vui vẻ, cha cùng con vào đọc chữ nha!"
];

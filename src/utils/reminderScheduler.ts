import { REMINDER_MESSAGES } from '../data';

/**
 * Request permission for Web Notifications
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support desktop notifications.');
    return 'denied';
  }

  // Request permission
  const permission = await Notification.requestPermission();
  return permission;
}

/**
 * Triggers a web notification with a randomized warm encouraging message.
 */
export function triggerWarmNotification() {
  if (!('Notification' in window)) {
    console.warn('Browser does not support notifications.');
    return;
  }
  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted.');
    return;
  }

  const randomIndex = Math.floor(Math.random() * REMINDER_MESSAGES.length);
  const message = REMINDER_MESSAGES[randomIndex];

  const title = 'Nhắc nhở từ Con yêu ❤️';
  const options = {
    body: message,
    icon: '/icon.png', // Sử dụng icon.png đồng bộ tuyệt vời
    badge: '/icon.png',
    tag: 'warm-learning-reminder',
    requireInteraction: true // Giữ thông báo hiển thị cho tới khi chạm vào
  };

  // Ưu tiên hiển thị thông báo thông qua Service Worker 
  // Đây là cách duy nhất hoạt động và hiển thị ra màn hình ngoài/màn hình khóa trên thiết bị Smartphone/Tablet PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options)
        .catch((err) => {
          console.error('Service Worker showNotification failed, trying fallback:', err);
          fallbackNotification(title, options);
        });
    }).catch((err) => {
      console.warn('Service Worker not ready, trying fallback:', err);
      fallbackNotification(title, options);
    });
  } else {
    fallbackNotification(title, options);
  }
}

function fallbackNotification(title: string, options: any) {
  try {
    const notification = new Notification(title, options);
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (error) {
    console.error('Fallback Notification creation failed:', error);
  }
}

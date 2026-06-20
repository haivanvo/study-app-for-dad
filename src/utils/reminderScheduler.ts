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
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  const randomIndex = Math.floor(Math.random() * REMINDER_MESSAGES.length);
  const message = REMINDER_MESSAGES[randomIndex];

  try {
    // Generate notification
    const notification = new Notification('Nhắc nhở từ Con yêu ❤️', {
      body: message,
      icon: '/favicon.ico', // standard web icon or a heart
      tag: 'warm-learning-reminder',
      requireInteraction: true // Keeps notification visible until user interacts with it
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (error) {
    console.error('Failed to trigger notification:', error);
    
    // Fallback if browser requires service worker for notification (like some Android setups)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Nhắc nhở từ Con yêu ❤️', {
          body: message,
          tag: 'warm-learning-reminder',
          icon: '/favicon.ico'
        });
      });
    }
  }
}

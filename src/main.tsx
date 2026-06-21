import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Đăng ký Service Worker để hỗ trợ xuất phím tắt ứng dụng (iOS/Android stand-alone PWA) chạy mượt mà, đầy đủ icon và thông báo
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Đăng ký Service Worker thành công:', reg.scope))
      .catch((err) => console.warn('Đăng ký Service Worker thất bại:', err));
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
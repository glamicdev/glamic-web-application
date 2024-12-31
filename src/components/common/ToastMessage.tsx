import { useState, useImperativeHandle, forwardRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import type { ToastMethods } from '../../services/toastHandler';

interface ToastProps {
  message?: string;
  alertType?: 'error' | 'success' | 'info';
  duration?: number;
}

const Toast = (_: ToastProps, ref: React.ForwardedRef<ToastMethods>) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState<'error' | 'success' | 'info'>('error');
  
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  const isDarkMode = theme === 'dark';
  const direction = ['ar', 'he', 'fa'].includes(language) ? 'rtl' : 'ltr';

  useImperativeHandle(ref, () => ({
    show(message: string, alertType: 'error' | 'success' | 'info' = 'error', duration: number = 3000) {
      setIsVisible(true);
      setMessage(message);
      setAlertType(alertType);
      setTimeout(() => setIsVisible(false), duration);
    },
    hide() {
      setIsVisible(false);
    }
  }));

  const getAlertStyles = () => {
    const baseStyles = 'fixed z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out';
    const positionStyles = direction === 'rtl' ? 'top-5 left-5' : 'top-5 right-5';
    const responsiveStyles = 'w-full sm:w-96 max-w-screen-sm';
    const darkModeStyles = isDarkMode 
      ? 'bg-gray-800 text-white' 
      : 'bg-white text-gray-900';
    
    const alertColorStyles = {
      error: isDarkMode ? 'border-l-4 border-red-500' : 'border-l-4 border-red-600',
      success: isDarkMode ? 'border-l-4 border-green-500' : 'border-l-4 border-green-600',
      info: isDarkMode ? 'border-l-4 border-blue-500' : 'border-l-4 border-blue-600'
    }[alertType];

    return `${baseStyles} ${positionStyles} ${responsiveStyles} ${darkModeStyles} ${alertColorStyles}`;
  };

  if (!isVisible) return null;

  return (
    <div 
      className={getAlertStyles()}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className={`ml-4 text-sm font-medium ${
            isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'
          }`}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default forwardRef(Toast);

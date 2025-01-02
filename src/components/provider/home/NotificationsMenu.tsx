import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { translations } = useLanguage();
  const t = {
    title: translations?.dashboard?.sidebar?.notifications || 'Notifications',
    noNotifications: 'No new notifications'
  };

  return (
    <div className="relative">
      <button 
        className="relative p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          1
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              {t.title}
            </h3>
            <div className="space-y-4">
              {/* Placeholder for notifications */}
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                {t.noNotifications}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
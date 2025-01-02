import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { BottomSheet } from '../../common/BottomSheet';

export function NotificationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { translations } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const t = {
    title: translations?.dashboard?.sidebar?.notifications || 'Notifications',
    noNotifications: 'No new notifications'
  };

  const NotificationsContent = () => (
    <div className="space-y-4">
      {/* Placeholder for notifications */}
      <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center py-4">
        {t.noNotifications}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button 
        ref={buttonRef}
        className="relative p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
        onClick={() => setIsOpen(true)}
      >
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          1
        </span>
      </button>

      {/* Desktop Dropdown */}
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 md:block hidden"
        >
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              {t.title}
            </h3>
            <NotificationsContent />
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet - Only shown on mobile/tablet */}
      <div className="md:hidden">
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={t.title}
        >
          <NotificationsContent />
        </BottomSheet>
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Star, Settings, Users, HelpCircle, Globe, LogOut } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { LanguageToggle } from '../../../ui/LanguageToggle';
import { BottomSheet } from '../../common/BottomSheet';

interface UserMenuProps {
  name: string;
  avatar?: string;
}

export function UserMenu({ name }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { translations } = useLanguage();

  // Close menu when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { icon: User, label: 'Profile' },
    { icon: Star, label: 'Reviews' },
    { icon: Settings, label: 'Settings' },
    { icon: Users, label: 'Refer a friend' },
    { icon: HelpCircle, label: 'Help and support' },
  ];

  // Get initials from name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const MenuContent = () => (
    <div className="space-y-2">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm md:text-base text-[#0F172A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </button>
      ))}
      
      <div className="px-4 py-3 mt-1 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm md:text-base text-[#0F172A] dark:text-white">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5" />
            <span>Language</span>
          </div>
          <LanguageToggle />
        </div>
      </div>

      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm md:text-base text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mt-1 border-t border-gray-200 dark:border-gray-700">
        <LogOut className="w-5 h-5" />
        <span>Log out</span>
      </button>
    </div>
  );

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1.5 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {/* Desktop Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 md:block hidden">
          <div className="p-2">
            <MenuContent />
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet - Only shown on mobile/tablet */}
      <div className="md:hidden">
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Menu"
        >
          <MenuContent />
        </BottomSheet>
      </div>
    </div>
  );
}
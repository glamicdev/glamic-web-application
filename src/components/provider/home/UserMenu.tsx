import React, { useState } from 'react';
import { ChevronDown, User, Star, Settings, Users, HelpCircle, Globe, LogOut } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { LanguageToggle } from '../../../ui/LanguageToggle';

interface UserMenuProps {
  name: string;
  avatar?: string;
}

export function UserMenu({ name }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { translations } = useLanguage();

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

  return (
    <div className="relative">
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
            
            <div className="px-3 py-2 mt-1 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Language</span>
                </div>
                <LanguageToggle />
              </div>
            </div>

            <button className="w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-2 mt-1 border-t border-gray-200 dark:border-gray-700">
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
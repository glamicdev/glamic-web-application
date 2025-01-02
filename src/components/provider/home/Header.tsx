import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { ThemeToggle } from '../../../ui/ThemeToggle';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';

export function Header() {
  const { translations } = useLanguage();
  const t = translations?.dashboard?.header;
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const viewOptions = [
    { label: translations?.dashboard?.calendar?.day || 'Day', value: 'day' },
    { label: translations?.dashboard?.calendar?.week || 'Week', value: 'week' },
    { label: translations?.dashboard?.calendar?.month || 'Month', value: 'month' }
  ];

  const [selectedView, setSelectedView] = useState('day');

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-white dark:bg-primary-navy px-6 py-2 flex items-center justify-between">
        <div className="text-xl font-bold text-[#0F172A] dark:text-primary-gold">Glamic</div>
        <div className="flex items-center gap-4">
          <NotificationsMenu />
          <ThemeToggle />
          <UserMenu name="John Doe" />
        </div>
      </div>

      {/* Separator */}
      <div className="h-[1px] bg-gray-200 dark:bg-gray-700" />

      {/* Navigation Bar */}
      <div className="bg-white dark:bg-primary-navy px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium bg-[#0F172A] dark:bg-primary-gold text-white rounded-lg hover:bg-[#1E293B] dark:hover:bg-primary-gold/90">
            {t?.today || 'Today'}
          </button>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-[#0F172A] dark:text-white">
              {formattedDate}
            </span>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* View Selector */}
          <div className="relative">
            <button 
              className="px-4 py-2 text-sm font-medium text-[#0F172A] dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => setIsDateMenuOpen(!isDateMenuOpen)}
            >
              {viewOptions.find(option => option.value === selectedView)?.label}
              <ChevronDown className="w-4 h-4" />
            </button>

            {isDateMenuOpen && (
              <div className="absolute top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                {viewOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full px-4 py-2 text-sm text-[#0F172A] dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                    onClick={() => {
                      setSelectedView(option.value);
                      setIsDateMenuOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Button */}
          <button className="px-4 py-2 bg-[#0F172A] dark:bg-primary-gold text-white rounded-lg flex items-center gap-2 hover:bg-[#1E293B] dark:hover:bg-primary-gold/90">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">{t?.addButton || 'Add'}</span>
          </button>
        </div>
      </div>

      {/* Separator */}
      <div className="h-[1px] bg-gray-200 dark:bg-gray-700" />

      {/* Team Member Row */}
      <div className="bg-white dark:bg-primary-navy px-6 py-4 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#0F172A]/10 flex items-center justify-center">
            <span className="text-sm font-medium text-[#0F172A] dark:text-primary-gold">OH</span>
          </div>
          <span className="text-sm font-medium text-[#0F172A] dark:text-white">Omarov Hassanov</span>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { BottomSheet } from '../../common/BottomSheet';
import { useLanguage } from '../../../context/LanguageContext';

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
  isOpen: boolean;
  isMobile?: boolean;
}

export function DatePicker({ selectedDate, onDateSelect, onClose, isOpen, isMobile = true }: DatePickerProps) {
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const { translations } = useLanguage();
  const t = translations?.dashboard?.calendar;

  const monthKeys = React.useMemo(() => [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ] as const, []);

  const getMonthName = React.useCallback((date: Date) => {
    const monthIndex = date.getMonth();
    const key = monthKeys[monthIndex];
    return t?.months?.[key] || key.charAt(0).toUpperCase() + key.slice(1);
  }, [t, monthKeys]);

  const weekDays = React.useMemo(() => [
    { short: t?.weekDays?.sun || 'Sun' },
    { short: t?.weekDays?.mon || 'Mon' },
    { short: t?.weekDays?.tue || 'Tue' },
    { short: t?.weekDays?.wed || 'Wed' },
    { short: t?.weekDays?.thu || 'Thu' },
    { short: t?.weekDays?.fri || 'Fri' },
    { short: t?.weekDays?.sat || 'Sat' }
  ], [t]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Generate months from 1 year ago to 2 years in future
  const months = React.useMemo(() => {
    const today = new Date();
    const startDate = new Date(today.getFullYear() - 1, today.getMonth(), 1); // 1 year ago
    const totalMonths = 36; // 12 months past + current month + 24 months future
    
    return Array.from({ length: totalMonths }, (_, i) => {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      return date;
    });
  }, []);

  const generateMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  // Find the index of the current month to scroll to it
  const currentMonthIndex = React.useMemo(() => {
    return months.findIndex(month => 
      month.getMonth() === selectedDate.getMonth() && 
      month.getFullYear() === selectedDate.getFullYear()
    );
  }, [months, selectedDate]);

  // Scroll to current month when opened
  React.useEffect(() => {
    if (isOpen && currentMonthIndex !== -1) {
      const container = document.getElementById('calendar-container');
      const monthElement = document.getElementById(`month-${currentMonthIndex}`);
      
      if (container && monthElement) {
        const scrollTop = monthElement.offsetTop - container.offsetHeight / 3;
        container.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    }
  }, [isOpen, currentMonthIndex]);

  const CalendarContent = () => (
    <div className="space-y-8">
      {months.map((month, monthIndex) => (
        <div key={monthIndex} id={`month-${monthIndex}`}>
          <h3 className="text-base font-semibold text-[#0F172A] dark:text-white mb-4">
            {`${getMonthName(month)} ${month.getFullYear()}`}
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {/* Weekday headers */}
            {weekDays.map(day => (
              <div key={day.short} className="text-xs text-center text-gray-500 dark:text-gray-400 py-2">
                {day.short}
              </div>
            ))}
            
            {/* Calendar days */}
            {generateMonthDays(month).map((date, index) => (
              <div key={index} className="aspect-square">
                {date ? (
                  <button
                    onClick={() => onDateSelect(date)}
                    className={`w-full h-full flex items-center justify-center text-sm rounded-full
                      ${isSelected(date) 
                        ? 'bg-[#0F172A] dark:bg-primary-gold text-white' 
                        : isToday(date)
                          ? 'bg-gray-100 dark:bg-gray-700 text-[#0F172A] dark:text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-[#0F172A] dark:text-gray-200'
                      }`}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        title={translations?.dashboard?.calendar?.selectDate || "Select Date"}
      >
        <div id="calendar-container" className="scrollbar-hide overflow-y-auto px-4">
          <CalendarContent />
          {/* Add extra padding at bottom for better scrolling */}
          <div className="h-8" />
        </div>
      </BottomSheet>
    );
  }

  return (
    <div 
      ref={calendarRef}
      id="calendar-container"
      className="absolute top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 p-4 w-[340px] max-h-[400px] overflow-y-auto"
    >
      <CalendarContent />
    </div>
  );
}
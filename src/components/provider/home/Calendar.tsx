import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

interface TimeSlot {
  time: string;
  hour: number;
}

// Generate 24-hour time slots
const timeSlots: TimeSlot[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  hour: i
}));

export function Calendar() {
  const { translations } = useLanguage();
  const t = translations?.dashboard?.calendar;

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-[#0B1121]">
      <div className="min-h-full relative">
        {/* Current Time Indicator */}
        <div 
          className="absolute left-0 right-0 border-t-2 border-red-400 dark:border-red-500 z-10"
          style={{
            top: `${(new Date().getHours() * 60 + new Date().getMinutes()) / 1440 * 100}%`
          }}
        >
          <div className="absolute -top-3 -left-16 text-xs text-red-400 dark:text-red-500">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })}
          </div>
        </div>

        {/* Time Slots */}
        {timeSlots.map((slot, i) => (
          <div 
            key={i} 
            className="grid grid-cols-[auto_1fr] group min-h-[60px]"
          >
            <div className="w-16 py-4 px-4 text-right text-xs text-[#64748B] dark:text-gray-400 -mt-3 sticky left-0 bg-white dark:bg-[#0B1121] border-r border-gray-200 dark:border-gray-700">
              {slot.time}
            </div>
            <div className="border-b border-gray-100 dark:border-gray-800 group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/30">
              {/* Add appointment slots here */}
            </div>
          </div>
        ))}

        {/* No Appointments Message */}
        {timeSlots.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-sm text-[#64748B] dark:text-gray-400">
              {t?.noAppointments || 'No appointments scheduled'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
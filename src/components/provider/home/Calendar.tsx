import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import type { TeamMember } from './TeamSelector';

// Default color palette for team members if no color is set
const defaultColors = [
  { bg: 'bg-blue-100 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-900 dark:text-blue-100', textSecondary: 'text-blue-700 dark:text-blue-300' },
  { bg: 'bg-purple-100 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-900 dark:text-purple-100', textSecondary: 'text-purple-700 dark:text-purple-300' },
  { bg: 'bg-green-100 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', text: 'text-green-900 dark:text-green-100', textSecondary: 'text-green-700 dark:text-green-300' },
  { bg: 'bg-orange-100 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800', text: 'text-orange-900 dark:text-orange-100', textSecondary: 'text-orange-700 dark:text-orange-300' },
  { bg: 'bg-pink-100 dark:bg-pink-900/20', border: 'border-pink-200 dark:border-pink-800', text: 'text-pink-900 dark:text-pink-100', textSecondary: 'text-pink-700 dark:text-pink-300' }
];

interface Appointment {
  id: string;
  memberId: string;
  startTime: string;
  endTime: string;
  title: string;
  type: string;
}

interface CalendarProps {
  selectedMembers: TeamMember[];
  view: 'day' | 'week' | 'month';
  selectedDate: Date;
}

interface TimeSlot {
  time: string;
  hour: number;
  minutes: number;
  showLabel: boolean;
}

// Helper function to format time in 12-hour format
const formatTime = (hour: number, minutes: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes === 0 ? '00' : minutes} ${period}`;
};

// Generate 48 half-hour time slots
const timeSlots: TimeSlot[] = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? '00' : '30';
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  
  return {
    time: minutes === '00' ? `${displayHour} ${period}` : '',
    hour: hour,
    minutes: minutes === '00' ? 0 : 30,
    showLabel: minutes === '00'
  };
});

// Mock appointments - replace with actual data
interface Appointment {
  id: string;
  memberId: string;
  date: string; // ISO date string
  startTime: string;
  endTime: string;
  title: string;
  type: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    memberId: '1',
    date: '2025-01-01', // January 1st, 2025
    startTime: '13:30',
    endTime: '14:45',
    title: 'Classic Lash Fill',
    type: 'Walk-In'
  },
  {
    id: '2',
    memberId: '2',
    date: '2025-01-01', // January 1st, 2025
    startTime: '14:45',
    endTime: '15:45',
    title: 'Haircut',
    type: 'Walk-In'
  },
  {
    id: '3',
    memberId: '3',
    date: '2025-01-01', // January 1st, 2025
    startTime: '16:15',
    endTime: '16:45',
    title: 'Manicure',
    type: 'Walk-In'
  }
];

// Helper function to get color styles for a member
const getMemberColorStyles = (memberId: string, selectedMembers: TeamMember[]) => {
  const memberIndex = selectedMembers.findIndex(m => m.id === memberId);
  const colorIndex = memberIndex % defaultColors.length;
  return defaultColors[colorIndex];
};

const DayView = ({ selectedMembers, selectedDate }: { selectedMembers: TeamMember[], selectedDate: Date }) => {
  const [hoverInfo, setHoverInfo] = useState<{
    time: string;
    x: number;
    y: number;
  } | null>(null);

  const handleTimeSlotHover = (
    event: React.MouseEvent<HTMLDivElement>,
    hour: number,
    minutes: number,
    memberIndex: number
  ) => {
    if (hour >= 24 || (hour === 23 && minutes > 30)) {
      return;
    }
    
    const formattedTime = formatTime(hour, minutes);
    
    setHoverInfo({
      time: formattedTime,
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleTimeSlotLeave = () => {
    setHoverInfo(null);
  };

  return (
    <>
      {/* Calendar Grid */}
      <div className="grid" style={{ gridTemplateColumns: `auto repeat(${selectedMembers.length}, 1fr)` }}>
        {/* Time Column */}
        <div className="border-r border-gray-200 dark:border-gray-700">
          {/* Empty header cell to align with member headers */}
          <div className="h-[30px] sticky top-0 z-20 bg-white dark:bg-[#0B1121] border-b border-gray-200 dark:border-gray-700" />
          {timeSlots.map((slot, i) => (
            <div 
              key={i} 
              className="h-[30px] px-4 sticky left-0 bg-white dark:bg-[#0B1121] z-10 flex items-center"
            >
              {slot.showLabel && (
                <span className="text-xs text-[#64748B] dark:text-gray-400">
                  {slot.time}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Member Columns */}
        {selectedMembers.map((member, memberIndex) => (
          <div key={member.id} className="relative">
            {/* Member Header */}
            <div className="h-[30px] sticky top-0 z-20 bg-white dark:bg-[#0B1121] border-b border-gray-200 dark:border-gray-700 px-4 flex items-center gap-2">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-medium">
                  {member.initials}
                </div>
              )}
              <span className="text-xs font-medium text-[#0F172A] dark:text-white truncate">
                {member.name}
              </span>
            </div>

            {/* Time Grid */}
            {timeSlots.map((slot, i) => (
              <div 
                key={i}
                className="h-[30px] border-b border-r border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 relative cursor-pointer"
                onMouseMove={(e) => handleTimeSlotHover(e, slot.hour, slot.minutes, memberIndex)}
                onMouseLeave={handleTimeSlotLeave}
              />
            ))}

            {/* Appointments */}
            {appointments
              .filter(apt => {
                // Only show appointments for this specific member
                if (apt.memberId !== member.id) {
                  return false;
                }
                
                // Compare dates using the appointment's date property
                const aptDate = new Date(apt.date);
                return aptDate.toDateString() === selectedDate.toDateString();
              })
              .map(appointment => {
                const startHour = parseInt(appointment.startTime.split(':')[0]);
                const startMinute = parseInt(appointment.startTime.split(':')[1]);
                const endHour = parseInt(appointment.endTime.split(':')[0]);
                const endMinute = parseInt(appointment.endTime.split(':')[1]);
                
                const startMinutes = startHour * 60 + startMinute;
                const endMinutes = endHour * 60 + endMinute;
                const durationMinutes = endMinutes - startMinutes;
                
                const headerHeight = 30;
                const top = headerHeight + Math.floor(startMinutes / 30) * 30;
                const height = Math.ceil(durationMinutes / 30) * 30;

                return (
                  <div
                    key={appointment.id}
                    className={`absolute left-0 right-0 mx-1 rounded-lg overflow-hidden border ${getMemberColorStyles(appointment.memberId, selectedMembers).bg} ${getMemberColorStyles(appointment.memberId, selectedMembers).border}`}
                    style={{
                      top: `${top}px`,
                      height: `${height}px`
                    }}
                  >
                    <div className={`text-xs flex flex-col ${height <= 30 ? 'h-[30px] justify-center py-0.5 px-1.5' : 'h-full justify-center p-2'}`}>
                      <div className={`font-medium truncate text-[10px] ${getMemberColorStyles(appointment.memberId, selectedMembers).text}`}>
                        {formatTime(startHour, startMinute)} - {formatTime(endHour, endMinute)}
                      </div>
                      <div className={`truncate text-[10px] ${getMemberColorStyles(appointment.memberId, selectedMembers).textSecondary}`}>
                        {appointment.type} • {appointment.title}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {/* Current Time Indicator */}
      <div 
        className="absolute left-0 right-0 border-t-2 border-red-400 dark:border-red-500 z-10"
        style={{
          top: `${(new Date().getHours() * 60 + new Date().getMinutes()) / 720 * 100}%`
        }}
      >
        <div className="absolute -top-3 -left-16 text-xs text-red-400 dark:text-red-500">
          {new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </div>
      </div>

      {/* No Appointments Message */}
      {selectedMembers.length > 0 && appointments.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-sm text-[#64748B] dark:text-gray-400">
            No appointments scheduled
          </div>
        </div>
      )}

      {/* Time Hover Tooltip */}
      {hoverInfo && (
        <div
          className="fixed bg-[#0F172A] dark:bg-primary-gold text-white px-3 py-1.5 rounded-md text-sm font-medium pointer-events-none z-50 shadow-lg"
          style={{
            left: `${hoverInfo.x + 10}px`,
            top: `${hoverInfo.y - 25}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {hoverInfo.time}
        </div>
      )}
    </>
  );
};

const WeekView = ({ selectedMembers, selectedDate }: { selectedMembers: TeamMember[], selectedDate: Date }) => {
  // Get start of week (Sunday)
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

  // Generate array of dates for the week
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const { translations } = useLanguage();
  const weekDays = [
    translations?.dashboard?.calendar?.weekDays?.sun || 'Sun',
    translations?.dashboard?.calendar?.weekDays?.mon || 'Mon',
    translations?.dashboard?.calendar?.weekDays?.tue || 'Tue',
    translations?.dashboard?.calendar?.weekDays?.wed || 'Wed',
    translations?.dashboard?.calendar?.weekDays?.thu || 'Thu',
    translations?.dashboard?.calendar?.weekDays?.fri || 'Fri',
    translations?.dashboard?.calendar?.weekDays?.sat || 'Sat'
  ];

  return (
    <div className="grid" style={{ gridTemplateColumns: `auto repeat(7, 1fr)` }}>
      {/* Time Column */}
      <div className="border-r border-gray-200 dark:border-gray-700">
        {/* Empty corner cell */}
        <div className="h-[60px] sticky top-0 z-20 bg-white dark:bg-[#0B1121] border-b border-gray-200 dark:border-gray-700" />
        {timeSlots.map((slot, i) => (
          <div
            key={i}
            className="h-[30px] px-4 sticky left-0 bg-white dark:bg-[#0B1121] z-10 flex items-center"
          >
            {slot.showLabel && (
              <span className="text-xs text-[#64748B] dark:text-gray-400">
                {slot.time}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Days of the week */}
      {weekDates.map((date, dayIndex) => (
        <div key={dayIndex} className="relative">
          {/* Date Header */}
          <div className="h-[60px] sticky top-0 z-20 bg-white dark:bg-[#0B1121] border-b border-gray-200 dark:border-gray-700 px-4 flex flex-col justify-center">
            <div className="text-xs text-[#64748B] dark:text-gray-400">
              {weekDays[dayIndex]}
            </div>
            <div className={`text-sm font-medium ${
              date.toDateString() === new Date().toDateString()
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-[#0F172A] dark:text-white'
            }`}>
              {date.getDate()}
            </div>
          </div>

          {/* Time Grid */}
          {timeSlots.map((slot, i) => (
            <div
              key={i}
              className="h-[30px] border-b border-r border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 relative cursor-pointer"
            />
          ))}

          {/* Appointments */}
          {appointments
            .filter(apt => {
              // Only show appointments for selected members that belong to this day
              const aptDate = new Date(apt.date);
              return aptDate.toDateString() === date.toDateString() &&
                     selectedMembers.some(member => member.id === apt.memberId);
            })
            .map(appointment => {
              const startHour = parseInt(appointment.startTime.split(':')[0]);
              const startMinute = parseInt(appointment.startTime.split(':')[1]);
              const endHour = parseInt(appointment.endTime.split(':')[0]);
              const endMinute = parseInt(appointment.endTime.split(':')[1]);
              
              const startMinutes = startHour * 60 + startMinute;
              const endMinutes = endHour * 60 + endMinute;
              const durationMinutes = endMinutes - startMinutes;
              
              const headerHeight = 60;
              const top = headerHeight + Math.floor(startMinutes / 30) * 30;
              const height = Math.ceil(durationMinutes / 30) * 30;

              return (
                <div
                  key={appointment.id}
                  className={`absolute left-0 right-0 mx-1 rounded-lg overflow-hidden border ${getMemberColorStyles(appointment.memberId, selectedMembers).bg} ${getMemberColorStyles(appointment.memberId, selectedMembers).border}`}
                  style={{
                    top: `${top}px`,
                    height: `${height}px`
                  }}
                >
                  <div className={`text-xs flex flex-col ${height <= 30 ? 'h-[30px] justify-center py-0.5 px-1.5' : 'h-full justify-center p-2'}`}>
                    <div className={`font-medium truncate text-[10px] ${getMemberColorStyles(appointment.memberId, selectedMembers).text}`}>
                      {formatTime(startHour, startMinute)} - {formatTime(endHour, endMinute)}
                    </div>
                    <div className={`truncate text-[10px] ${getMemberColorStyles(appointment.memberId, selectedMembers).textSecondary}`}>
                      {appointment.type} • {appointment.title}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

const MonthView = ({ selectedMembers, selectedDate }: { selectedMembers: TeamMember[], selectedDate: Date }) => {
  const { translations } = useLanguage();
  
  // Get first day of month
  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  // Get last day of month
  const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  // Get the day of week for the first day (0-6)
  const firstDayOfWeek = firstDay.getDay();

  // Generate array of dates for the month view
  const monthDates = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(firstDay);
    date.setDate(1 - firstDayOfWeek + i);
    return date;
  });

  const weekDays = [
    translations?.dashboard?.calendar?.weekDays?.sun || 'Sun',
    translations?.dashboard?.calendar?.weekDays?.mon || 'Mon',
    translations?.dashboard?.calendar?.weekDays?.tue || 'Tue',
    translations?.dashboard?.calendar?.weekDays?.wed || 'Wed',
    translations?.dashboard?.calendar?.weekDays?.thu || 'Thu',
    translations?.dashboard?.calendar?.weekDays?.fri || 'Fri',
    translations?.dashboard?.calendar?.weekDays?.sat || 'Sat'
  ];

  const getMonthName = (date: Date) => {
    const monthIndex = date.getMonth();
    const monthKeys = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ] as const;
    const key = monthKeys[monthIndex];
    return translations?.dashboard?.calendar?.months?.[key] ||
      key.charAt(0).toUpperCase() + key.slice(1);
  };

  return (
    <div className="h-full grid grid-cols-7 grid-rows-[auto_repeat(6,1fr)] gap-px bg-gray-200 dark:bg-gray-700">
      {/* Week day headers */}
      {weekDays.map(day => (
        <div key={day} className="bg-white dark:bg-[#0B1121] p-2 text-center">
          <span className="text-xs font-medium text-[#64748B] dark:text-gray-400">
            {day}
          </span>
        </div>
      ))}

      {/* Calendar days */}
      {monthDates.map((date, i) => {
        const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
        const isToday = date.toDateString() === new Date().toDateString();
        const dayAppointments = appointments.filter(apt => {
          // First filter by selected members
          if (!selectedMembers.some(member => member.id === apt.memberId)) {
            return false;
          }
          
          // Compare dates using the appointment's date property
          const aptDate = new Date(apt.date);
          return aptDate.toDateString() === date.toDateString();
        });

        return (
          <div
            key={i}
            className={`bg-white dark:bg-[#0B1121] p-2 min-h-[100px] ${
              !isCurrentMonth ? 'opacity-50' : ''
            }`}
          >
            <div className={`text-sm font-medium mb-2 ${
              isToday
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-[#0F172A] dark:text-white'
            }`}>
              {date.getDate()}
            </div>
            
            {/* Appointments */}
            <div className="space-y-1">
              {dayAppointments.map(apt => (
                <div
                  key={apt.id}
                  className={`text-[10px] p-1 rounded truncate ${getMemberColorStyles(apt.memberId, selectedMembers).bg} ${getMemberColorStyles(apt.memberId, selectedMembers).text}`}
                >
                  {formatTime(parseInt(apt.startTime.split(':')[0]), parseInt(apt.startTime.split(':')[1]))} • {apt.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export function Calendar({ selectedMembers, view, selectedDate }: CalendarProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-[#0B1121] h-full">
      <div className={`${view === 'month' ? 'h-full' : 'h-[1440px]'} relative`}>
        {view === 'day' && <DayView selectedMembers={selectedMembers} selectedDate={selectedDate} />}
        {view === 'week' && <WeekView selectedMembers={selectedMembers} selectedDate={selectedDate} />}
        {view === 'month' && <MonthView selectedMembers={selectedMembers} selectedDate={selectedDate} />}
      </div>
    </div>
  );
}
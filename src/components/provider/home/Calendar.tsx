import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import type { TeamMember } from './TeamSelector';

interface CalendarProps {
  selectedMembers: TeamMember[];
}

interface TimeSlot {
  time: string;
  hour: number;
}

// Generate 24-hour time slots
const timeSlots: TimeSlot[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  hour: i
}));

export function Calendar({ selectedMembers }: CalendarProps) {
  const { translations } = useLanguage();
  const t = translations?.dashboard?.calendar;

  // Mock appointments - replace with actual data
  const appointments = [
    {
      id: '1',
      memberId: '1',
      startTime: '13:30',
      endTime: '14:45',
      title: 'Classic Lash Fill',
      type: 'Walk-In'
    },
    {
      id: '2',
      memberId: '2',
      startTime: '14:45',
      endTime: '15:45',
      title: 'Haircut',
      type: 'Walk-In'
    },
    {
      id: '3',
      memberId: '3',
      startTime: '16:15',
      endTime: '16:45',
      title: 'Manicure',
      type: 'Walk-In'
    }
  ];

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

        {/* Calendar Grid */}
        <div className="grid" style={{ gridTemplateColumns: `auto repeat(${selectedMembers.length}, 1fr)` }}>
          {/* Time Column */}
          <div className="border-r border-gray-200 dark:border-gray-700">
            {timeSlots.map((slot, i) => (
              <div 
                key={i} 
                className="h-[60px] px-4 -mt-3 sticky left-0 bg-white dark:bg-[#0B1121] z-10"
              >
                <span className="text-xs text-[#64748B] dark:text-gray-400">
                  {slot.time}
                </span>
              </div>
            ))}
          </div>

          {/* Member Columns */}
          {selectedMembers.map((member, memberIndex) => (
            <div key={member.id} className="relative">
              {/* Member Header */}
              <div className="sticky top-0 z-20 bg-white dark:bg-[#0B1121] border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-2">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-medium">
                    {member.initials}
                  </div>
                )}
                <span className="text-sm font-medium text-[#0F172A] dark:text-white">
                  {member.name}
                </span>
              </div>

              {/* Time Grid */}
              {timeSlots.map((slot, i) => (
                <div 
                  key={i}
                  className="h-[60px] border-b border-r border-gray-100 dark:border-gray-800 group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/30"
                />
              ))}

              {/* Appointments */}
              {appointments
                .filter(apt => apt.memberId === member.id)
                .map(appointment => {
                  const startHour = parseInt(appointment.startTime.split(':')[0]);
                  const startMinute = parseInt(appointment.startTime.split(':')[1]);
                  const endHour = parseInt(appointment.endTime.split(':')[0]);
                  const endMinute = parseInt(appointment.endTime.split(':')[1]);
                  
                  const top = (startHour * 60 + startMinute) / 1440 * 100;
                  const height = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / 1440 * 100;

                  return (
                    <div
                      key={appointment.id}
                      className="absolute left-0 right-0 mx-1 bg-blue-100 dark:bg-blue-900/20 rounded-lg p-2"
                      style={{
                        top: `${top}%`,
                        height: `${height}%`
                      }}
                    >
                      <div className="text-xs">
                        <div className="font-medium text-blue-900 dark:text-blue-100">
                          {appointment.startTime} - {appointment.endTime} {appointment.type}
                        </div>
                        <div className="text-blue-700 dark:text-blue-300">
                          {appointment.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>

        {/* No Appointments Message */}
        {selectedMembers.length > 0 && appointments.length === 0 && (
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
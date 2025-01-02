import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Plus, CalendarDays, Calendar as CalendarIcon } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { ThemeToggle } from '../../../ui/ThemeToggle';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import { DatePicker } from './DatePicker';
import { ViewSelector } from './ViewSelector';
import { TeamSelector, type TeamMember } from './TeamSelector';

interface HeaderProps {
  teamMembers: TeamMember[];
  selectedTeamMembers: TeamMember[];
  onTeamMemberSelect: (members: TeamMember[]) => void;
}

export function Header({ teamMembers, selectedTeamMembers, onTeamMemberSelect }: HeaderProps) {
  const { translations } = useLanguage();
  const t = translations?.dashboard?.header;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedView, setSelectedView] = useState('day');

  const viewOptions = [
    { 
      label: translations?.dashboard?.calendar?.day || 'Day', 
      value: 'day',
      icon: <CalendarDays className="w-5 h-5" />
    },
    { 
      label: translations?.dashboard?.calendar?.week || 'Week', 
      value: 'week',
      icon: <CalendarIcon className="w-5 h-5" />
    },
    { 
      label: translations?.dashboard?.calendar?.month || 'Month', 
      value: 'month',
      icon: <CalendarIcon className="w-5 h-5" />
    }
  ];

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

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
          {/* Today button - Desktop only */}
          <button 
            onClick={() => setSelectedDate(new Date())}
            className="hidden md:block px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700 text-[#0F172A] dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {t?.today || 'Today'}
          </button>
          
          {/* Date Navigator - Desktop */}
          <div className="hidden md:flex items-center gap-2 relative">
            <button 
              onClick={handlePrevDay}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowDatePicker(true)}
              className="text-sm font-medium text-[#0F172A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-2 py-1"
            >
              {formattedDate}
            </button>
            <button 
              onClick={handleNextDay}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Desktop Date Picker */}
            <DatePicker
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onClose={() => setShowDatePicker(false)}
              isOpen={showDatePicker}
              isMobile={false}
            />
          </div>

          {/* Date Navigator - Mobile */}
          <button 
            className="md:hidden px-4 py-2 text-sm font-medium text-[#0F172A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2"
            onClick={() => setShowDatePicker(true)}
          >
            <span>{formattedDate}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Team Selector */}
          <div className="relative">
            <TeamSelector
              selectedMembers={selectedTeamMembers}
              members={teamMembers}
              onMemberSelect={onTeamMemberSelect}
            />
          </div>

          {/* View Selector */}
          <ViewSelector
            selectedView={selectedView}
            onViewChange={setSelectedView}
            options={viewOptions}
          />

          {/* Add Button */}
          <button className="flex items-center gap-2 px-4 py-2 md:bg-[#0F172A] md:dark:bg-primary-gold text-[#0F172A] md:text-white dark:text-primary-gold md:dark:text-white rounded-lg hover:bg-gray-100 md:hover:bg-[#1E293B] dark:hover:bg-gray-700 md:dark:hover:bg-primary-gold/90">
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline text-sm font-medium">
              {t?.addButton || 'Add'}
            </span>
          </button>
        </div>
      </div>

      {/* Separator */}
      <div className="h-[1px] bg-gray-200 dark:bg-gray-700" />

      {/* Mobile Date Picker */}
      <div className="md:hidden">
        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
          isOpen={showDatePicker}
          isMobile={true}
        />
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Calendar as CalendarComponent } from '../../../components/provider/dashboard/pages/calendar/Calendar';
import { Header } from '../../../components/provider/dashboard/common/Header';
import type { TeamMember } from '../../../components/provider/dashboard/pages/calendar/TeamSelector';
import { DashboardLayout } from '../../components/provider/home/DashboardLayout';

// Mock team members data - move to a central location later
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Omarov Hassanov',
    initials: 'OH',
    isCurrentUser: true
  },
  {
    id: '2',
    name: 'Didar Kursun',
    initials: 'DK'
  },
  {
    id: '3',
    name: 'Wendy Smith',
    initials: 'WS',
    avatar: 'https://i.pravatar.cc/300?img=1'
  }
];

export default function CalendarPage() {
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<TeamMember[]>([teamMembers[0]]);
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DashboardLayout>
      <Header
        teamMembers={teamMembers}
        selectedTeamMembers={selectedTeamMembers}
        onTeamMemberSelect={setSelectedTeamMembers}
        selectedView={selectedView}
        onViewChange={setSelectedView}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <main className="flex-1 overflow-x-auto bg-white dark:bg-primary-navy/50">
        <CalendarComponent
          selectedMembers={selectedTeamMembers}
          view={selectedView}
          selectedDate={selectedDate}
        />
      </main>
    </DashboardLayout>
  );
}
import React, { useState } from 'react';
import { Calendar } from '../../components/provider/home/Calendar';
import { Sidebar } from '../../components/provider/home/Sidebar';
import { Header } from '../../components/provider/home/Header';
import type { TeamMember } from '../../components/provider/home/TeamSelector';

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

export default function Dashboard() {
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<TeamMember[]>([teamMembers[0]]);
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-primary-navy/95">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden pl-16">
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
          <Calendar
            selectedMembers={selectedTeamMembers}
            view={selectedView}
            selectedDate={selectedDate}
          />
        </main>
      </div>
    </div>
  );
}
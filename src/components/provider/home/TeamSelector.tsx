import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { BottomSheet } from '../../common/BottomSheet';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  isCurrentUser?: boolean;
}

interface TeamSelectorProps {
  selectedMembers: TeamMember[];
  members: TeamMember[];
  onMemberSelect: (members: TeamMember[]) => void;
}

export function TeamSelector({ selectedMembers, members, onMemberSelect }: TeamSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside
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

  const handleMemberToggle = (member: TeamMember) => {
    const isSelected = selectedMembers.some(m => m.id === member.id);
    let newSelectedMembers: TeamMember[];

    if (isSelected) {
      newSelectedMembers = selectedMembers.filter(m => m.id !== member.id);
    } else {
      newSelectedMembers = [...selectedMembers, member];
    }

    onMemberSelect(newSelectedMembers);
  };

  const handleSelectAll = () => {
    onMemberSelect([...members]);
    setIsOpen(false);
  };

  const TeamList = () => (
    <div className="space-y-4">
      {/* All Team Option */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-sm md:text-base text-[#0F172A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        onClick={handleSelectAll}
      >
        <Users className="w-5 h-5" />
        <span>All team</span>
      </button>

      {/* Team Members */}
      <div>
        <div className="flex items-center justify-between px-4 py-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Team members
          </h3>
          <button 
            onClick={() => onMemberSelect([])}
            className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-1">
          {members.map((member) => {
            const isSelected = selectedMembers.some(m => m.id === member.id);
            return (
              <button
                key={member.id}
                onClick={() => handleMemberToggle(member)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm md:text-base rounded-lg
                  ${isSelected
                    ? 'bg-purple-50 dark:bg-purple-900/20'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-medium">
                    {member.initials}
                  </div>
                )}
                <span className={`flex-1 text-left ${member.isCurrentUser ? 'font-medium' : ''}`}>
                  {member.name}
                  {member.isCurrentUser && ' (You)'}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded bg-purple-600 dark:bg-purple-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Display text for the button
  const buttonText = selectedMembers.length === members.length
    ? 'All team'
    : selectedMembers.length === 1
      ? selectedMembers[0].name
      : `${selectedMembers.length} team members`;

  return (
    <div className="relative" ref={menuRef}>
      {/* Desktop Button */}
      <button
        className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0F172A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedMembers.length === 1 ? (
          selectedMembers[0].avatar ? (
            <img
              src={selectedMembers[0].avatar}
              alt={selectedMembers[0].name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-medium">
              {selectedMembers[0].initials}
            </div>
          )
        ) : (
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        )}
        <span>{buttonText}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {/* Mobile Button */}
      <button
        className="md:hidden p-2 text-[#0F172A] dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <Users className="w-5 h-5" />
      </button>

      {/* Desktop Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 md:block hidden">
          <div className="p-2">
            <TeamList />
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden">
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Select Team Members"
        >
          <div className="px-2">
            <TeamList />
          </div>
        </BottomSheet>
      </div>
    </div>
  );
}
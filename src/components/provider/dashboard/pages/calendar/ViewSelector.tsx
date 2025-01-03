import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { BottomSheet } from '../../../../common/BottomSheet';

export interface ViewOption {
  label: string;
  value: 'day' | 'week' | 'month';
  icon?: React.ReactNode;
}

interface ViewSelectorProps {
  selectedView: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  options: ViewOption[];
}

export function ViewSelector({ selectedView, onViewChange, options }: ViewSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside (desktop only)
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

  const handleSelect = (value: 'day' | 'week' | 'month') => {
    onViewChange(value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedView);

  const MenuContent = () => (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.value}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm md:text-base rounded-lg
            ${selectedView === option.value
              ? 'bg-[#0F172A] dark:bg-primary-gold text-white'
              : 'text-[#0F172A] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          onClick={() => handleSelect(option.value)}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative" ref={menuRef}>
      {/* Desktop View */}
      <button 
        className="hidden md:flex px-4 py-2 text-sm font-medium text-[#0F172A] dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Mobile View */}
      <button 
        className="md:hidden p-2 text-[#0F172A] dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <CalendarIcon className="w-5 h-5" />
      </button>

      {/* Desktop Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 md:block hidden">
          <div className="p-2">
            <MenuContent />
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet - Only shown on mobile/tablet */}
      <div className="md:hidden">
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Select View"
        >
          <MenuContent />
        </BottomSheet>
      </div>
    </div>
  );
}
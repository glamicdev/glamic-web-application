import React from 'react';
import { LanguageToggle } from '../../ui/LanguageToggle';
import { ThemeToggle } from '../../ui/ThemeToggle';

export function Navigation() {
  return (
    <div className="fixed top-0 right-0 flex items-center gap-2 p-4 z-50">
      <LanguageToggle />
      <ThemeToggle />
    </div>
  );
}
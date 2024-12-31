import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { OnboardingProvider } from './context/OnboardingContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { router } from './router';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <OnboardingProvider>
          <RouterProvider router={router} />
        </OnboardingProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

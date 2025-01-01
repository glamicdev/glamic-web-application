import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useOnboarding } from '../../context/OnboardingContext';
import { useLanguage } from '../../context/LanguageContext';

const LoadingScreen = () => {
  const { theme } = useTheme();
  const { dispatch } = useOnboarding();
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      message: translations.loading?.settingUpStore ?? 'Creating your beauty business profile',
      animation: '💅',
    },
    {
      message: translations.loading?.settingUpShelves ?? 'Customizing your service menu',
      animation: '✨',
    },
    {
      message: translations.loading?.cleaningUp ?? 'Polishing the final details',
      animation: '✨',
    },
    {
      message: translations.loading?.settingUpSystems ?? 'Setting up your booking system and website',
      animation: '🌟',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === steps.length - 1) {
          clearInterval(interval);
          // Move to next step in onboarding flow after 20 seconds
          setTimeout(() => {
            dispatch({ type: 'SET_STEP', payload: 11 });
          }, 5000); // Last message shows for 5 seconds
          return prev;
        }
        return prev + 1;
      });
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <div className="text-center space-y-12">
        <div className="text-6xl animate-bounce">
          {steps[currentStep].animation}
        </div>
        <h2 className="text-2xl font-semibold">
          {steps[currentStep].message}
        </h2>
        <p className="text-lg opacity-75">
          {translations.loading?.almostReady ?? 'Your glamorous business space is almost ready!'}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
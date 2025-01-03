import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useLanguage } from '../../../context/LanguageContext';

const LoadingScreen = () => {
  const { theme } = useTheme();
  const { dispatch } = useOnboarding();
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const steps = [
    {
      message: translations.loading?.settingUpStore ?? 'Creating your beauty business profile',
    },
    {
      message: translations.loading?.settingUpShelves ?? 'Customizing your service menu',
    },
    {
      message: translations.loading?.cleaningUp ?? 'Polishing the final details',
    },
    {
      message: translations.loading?.settingUpSystems ?? 'Setting up your booking system and website',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => {
          if (prev === steps.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              dispatch({ type: 'SET_STEP', payload: 11 });
            }, 5000);
            return prev;
          }
          return prev + 1;
        });
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, steps.length]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <div className="text-center space-y-12 relative">
        {/* Modern Loading Animation */}
        <div className="relative w-24 h-24 mx-auto">
          {/* Spinning ring */}
          <div 
            className={`
              absolute inset-0 border-4 rounded-full animate-spin
              ${theme === 'dark' 
                ? 'border-primary-gold border-t-transparent' 
                : 'border-primary-navy border-t-transparent'
              }
            `}
          />
          {/* Ripple effect */}
          <div 
            className={`
              absolute inset-0 border-2 rounded-full animate-ripple
              ${theme === 'dark' 
                ? 'border-primary-gold/30' 
                : 'border-primary-navy/30'
              }
            `}
          />
          {/* Inner pulse */}
          <div 
            className={`
              absolute inset-4 rounded-full animate-pulse
              ${theme === 'dark' 
                ? 'bg-primary-gold/20' 
                : 'bg-primary-navy/20'
              }
            `}
          />
        </div>

        <h2 
          className={`
            text-2xl font-semibold
            transition-all duration-300 ease-in-out
            ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}
          `}
        >
          {steps[currentStep].message}
        </h2>
        <p 
          className={`
            text-lg
            transition-all duration-300 ease-in-out
            ${isTransitioning ? 'opacity-0' : 'opacity-75'}
          `}
        >
          {translations.loading?.almostReady ?? 'Your glamorous business space is almost ready!'}
        </p>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentStep 
                  ? `w-4 ${theme === 'dark' ? 'bg-primary-gold' : 'bg-primary-navy'}` 
                  : index < currentStep 
                    ? `w-2 ${theme === 'dark' ? 'bg-primary-gold/60' : 'bg-primary-navy/60'}` 
                    : `w-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
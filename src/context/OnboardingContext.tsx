import React, { createContext, useContext, useReducer } from 'react';
import type { OnboardingState, OnboardingAction } from '../types/onboarding';

const initialState: OnboardingState = {
  selectedCategories:[],
  selectedServiceTypes:[],
  baseAddress:{
    lat:null,
    long:null,
    address:null,
    country_code:null,
    country:null
  }
};

const OnboardingContext = createContext<{
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
}>({ state: initialState, dispatch: () => null });

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState {
  switch (action.type) {
  
    case 'SET_SELECTED_CATEGORIES':
      return {
        ...state,
        selectedCategories: action.payload,
      };
    case 'SET_SELECTED_SERVICE_TYPES':
      return {
        ...state,
        selectedServiceTypes: action.payload,
      };
    
    case 'SET_BASE_ADDRESS':
      return {
        ...state,
        baseAddress: action.payload,
      };
  
    default:
      return state;
  }
}

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
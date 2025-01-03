import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import OnboardingFlow from './pages/OnboardingFlow';
import SubscriptionManagement from './components/provider/onboarding/SubscriptionManagement';
import SubscriptionCancellation from './components/provider/onboarding/SubscriptionCancellation';
import SubscriptionSwitch from './components/provider/onboarding/SubscriptionSwitch';
import Dashboard from './pages/ProviderPages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <OnboardingFlow />,
  },
  {
    path: '/subscription',
    element: <SubscriptionManagement />,
  },
  {
    path: '/subscription/cancel',
    element: <SubscriptionCancellation />,
  },
  {
    path: '/subscription/switch',
    element: <SubscriptionSwitch />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import OnboardingFlow from './pages/OnboardingFlow';
import SubscriptionManagement from './components/provider/SubscriptionManagement';
import SubscriptionCancellation from './components/provider/SubscriptionCancellation';
import SubscriptionSwitch from './components/provider/SubscriptionSwitch';

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
]);
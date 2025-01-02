import { OnboardingProvider } from '../../context/OnboardingContext';

interface OnboardingWrapperProps {
  children: React.ReactNode;
}

export default function OnboardingWrapper({ children }: OnboardingWrapperProps) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}

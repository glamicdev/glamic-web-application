import React from 'react';
import { Header } from '../ui/Header';
import AuthOptions from '../components/common/AuthOptions';
import SignUpForm from '../components/provider/onboarding/SignUpForm';
import VerificationCode from '../components/common/VerificationCode';
import EmailVerification from '../components/common/EmailVerification';
import ServicesSelection from '../components/provider/onboarding/ServicesSelection';
import ServiceLocation from '../components/provider/onboarding/ServiceLocation';
import AddressInput from '../components/provider/onboarding/AddressInput';
import SuccessCompletion from '../components/provider/onboarding/SuccessCompletion';
import WebsiteSuccess from '../components/provider/onboarding/WebsiteSuccess';
import PoliciesConfirmation from '../components/provider/onboarding/PoliciesConfirmation';
import ScheduleConfirmation from '../components/provider/onboarding/ScheduleConfirmation';
import AvailabilityConfirmation from '../components/provider/onboarding/AvailabilityConfirmation';
import ServiceConfirmation from '../components/provider/onboarding/ServiceConfirmation';
import ServiceArea from '../components/provider/onboarding/ServiceArea';
import WebsiteThemeSelection from '../components/provider/onboarding/WebsiteThemeSelection';
import WebsiteSlug from '../components/provider/onboarding/WebsiteSlug';
import WebsiteLogo from '../components/provider/onboarding/WebsiteLogo';
import WebsiteCover from '../components/provider/onboarding/WebsiteCover';
import WebsiteMainHeadline from '../components/provider/onboarding/WebsiteMainHeadline';
import WebsiteSubheadline from '../components/provider/onboarding/WebsiteSubheadline';
import WebsitePortfolio from '../components/provider/onboarding/WebsitePortfolio';
import WebsiteBio from '../components/provider/onboarding/WebsiteBio';
import MarketplaceVerification from '../components/provider/onboarding/MarketplaceVerification';
import DepositSettings from '../components/provider/onboarding/DepositSettings';
import CashPaymentSettings from '../components/provider/onboarding/CashPaymentSettings';
import BalanceReminder from '../components/provider/onboarding/BalanceReminder';
import WebsitePaymentsSuccess from '../components/provider/onboarding/WebsitePaymentsSuccess';
import CreditCardPayments from '../components/provider/onboarding/CreditCardPayments';
import SubscriptionPlans from '../components/provider/onboarding/SubscriptionPlans';
import SubscriptionSuccess from '../components/provider/onboarding/SubscriptionSuccess';
import AppDownload from '../components/common/AppDownload';
import ContactDisplaySettings from '../components/provider/onboarding/ContactDisplaySettings';
import LoadingScreen from '../components/provider/onboarding/LoadingScreen';
import { useOnboarding } from '../context/OnboardingContext';

export default function OnboardingFlow() {
  const { state, dispatch } = useOnboarding();

  const renderStep = () => {
    // Skip ServiceArea step if studio-only is selected
    if (state.step === 8 && state.serviceLocation.type === 'studio') {
      dispatch({ type: 'SET_STEP', payload: 9 });
      return null;
    }

    switch (state.step) {
      case 1:
        return <AuthOptions />;
      case 2:
        return <SignUpForm />;
      case 3:
        return <VerificationCode />;
      case 4:
        return <EmailVerification />;
      case 5:
        return <ServicesSelection />;
      case 6:
        return <ServiceLocation />;
      case 7:
        return <AddressInput />;
      case 8: 
        return <ServiceArea />;
      case 9:
        return <SuccessCompletion />;
      case 10:
        return <LoadingScreen />;
      case 11:
        return <ServiceConfirmation />;
      case 12:
        return <PoliciesConfirmation />;
      case 13:
        return <ScheduleConfirmation />;
      case 14:
        return <AvailabilityConfirmation />;
      case 15:
        return <WebsiteSuccess />;
      case 16:
        return <ContactDisplaySettings />;
      case 17:
        return <WebsiteThemeSelection />;
      case 18:
        return <WebsiteSlug />;
      case 19:
        return <WebsiteLogo />;
      case 20:
        return <WebsiteCover />;
      case 21:
        return <WebsiteMainHeadline />;
      case 22:
        return <WebsiteSubheadline />;
      case 23:
        return <WebsitePortfolio />;
      case 24:
        return <WebsiteBio />;
      case 25:
        return <MarketplaceVerification />;
      case 26:
        return <WebsitePaymentsSuccess />;
      case 27:
        return <DepositSettings />;
      case 28:
        return <BalanceReminder />;
      case 29:
        return <CashPaymentSettings />;
      case 30:
        return <CreditCardPayments />;
      case 31:
        return <SubscriptionPlans />;
      case 32:
        return <SubscriptionSuccess />;
      case 33:
        return <AppDownload />;
      default:
        return <AuthOptions />;
    }
  };

  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto pb-safe">
        <div className={`w-full ${state.step === 4 ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-[7.5px] sm:px-4 md:px-6 py-4 md:py-6`}>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
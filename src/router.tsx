import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import AuthWrapper from './components/common/AuthWrapper';
import OnboardingWrapper from './components/common/OnboardingWrapper';
import { Header } from './ui/Header';
import AuthOptions from './components/common/AuthOptions';
import SignUpForm from './components/provider/SignUpForm';
import VerificationCode from './components/common/VerificationCode';
import EmailVerification from './components/common/EmailVerification';
import ServicesSelection from './components/provider/ServicesSelection';
import ServiceLocation from './components/provider/ServiceLocation';
import AddressInput from './components/provider/AddressInput';
import SuccessCompletion from './components/provider/SuccessCompletion';
import WebsiteSuccess from './components/provider/WebsiteSuccess';
import PoliciesConfirmation from './components/provider/PoliciesConfirmation';
import ScheduleConfirmation from './components/provider/ScheduleConfirmation';
import AvailabilityConfirmation from './components/provider/AvailabilityConfirmation';
import ServiceConfirmation from './components/provider/ServiceConfirmation';
import ServiceArea from './components/provider/ServiceArea';
import WebsiteThemeSelection from './components/provider/WebsiteThemeSelection';
import WebsiteSlug from './components/provider/WebsiteSlug';
import WebsiteLogo from './components/provider/WebsiteLogo';
import WebsiteCover from './components/provider/WebsiteCover';
import WebsiteMainHeadline from './components/provider/WebsiteMainHeadline';
import WebsiteSubheadline from './components/provider/WebsiteSubheadline';
import WebsitePortfolio from './components/provider/WebsitePortfolio';
import WebsiteBio from './components/provider/WebsiteBio';
import MarketplaceVerification from './components/provider/MarketplaceVerification';
import DepositSettings from './components/provider/DepositSettings';
import CashPaymentSettings from './components/provider/CashPaymentSettings';
import BalanceReminder from './components/provider/BalanceReminder';
import WebsitePaymentsSuccess from './components/provider/WebsitePaymentsSuccess';
import CreditCardPayments from './components/provider/CreditCardPayments';
import SubscriptionPlans from './components/provider/SubscriptionPlans';
import SubscriptionSuccess from './components/provider/SubscriptionSuccess';
import SubscriptionManagement from './components/provider/SubscriptionManagement';
import SubscriptionCancellation from './components/provider/SubscriptionCancellation';
import SubscriptionSwitch from './components/provider/SubscriptionSwitch';
import AppDownload from './components/common/AppDownload';
import ContactDisplaySettings from './components/provider/ContactDisplaySettings';
import BusinessNamePage from './pages/auth/BusinessNamePage';
import NamePage from './pages/auth/NamePage';
import EmailPage from './pages/auth/EmailPage';
import PhonePage from './pages/auth/PhonePage';
import InstagramPage from './pages/auth/InstagramPage';

function OnboardingLayout() {
  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto pb-safe">
        <div className="w-full max-w-3xl mx-auto px-[7.5px] sm:px-4 md:px-6 py-4 md:py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OnboardingLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth" replace />,
      },
      {
        path: "auth",
        element: <AuthWrapper><AuthOptions /></AuthWrapper>,
      },
      {
        path: "auth/business-name",
        element: <AuthWrapper><BusinessNamePage /></AuthWrapper>,
      },
      {
        path: "auth/name",
        element: <AuthWrapper><NamePage /></AuthWrapper>,
      },
      {
        path: "auth/email",
        element: <AuthWrapper><EmailPage /></AuthWrapper>,
      },
      {
        path: "auth/phone",
        element: <AuthWrapper><PhonePage /></AuthWrapper>,
      },
      {
        path: "auth/instagram",
        element: <AuthWrapper><InstagramPage /></AuthWrapper>,
      },
      {
        path: "signup",
        element: <AuthWrapper><SignUpForm /></AuthWrapper>,
      },
      {
        path: "verify",
        element: <AuthWrapper><VerificationCode /></AuthWrapper>,
      },
      {
        path: "email-verification",
        element: <AuthWrapper><EmailVerification /></AuthWrapper>,
      },
      {
        path: "services",
        element: <OnboardingWrapper><ServicesSelection /></OnboardingWrapper>,
      },
      {
        path: "location",
        element: <OnboardingWrapper><ServiceLocation /></OnboardingWrapper>,
      },
      {
        path: "address",
        element: <OnboardingWrapper><AddressInput /></OnboardingWrapper>,
      },
      {
        path: "service-area",
        element: <ServiceArea />,
      },
      {
        path: "completion",
        element: <SuccessCompletion />,
      },
      {
        path: "service-confirmation",
        element: <ServiceConfirmation />,
      },
      {
        path: "policies",
        element: <PoliciesConfirmation />,
      },
      {
        path: "schedule",
        element: <ScheduleConfirmation />,
      },
      {
        path: "availability",
        element: <AvailabilityConfirmation />,
      },
      {
        path: "website-success",
        element: <WebsiteSuccess />,
      },
      {
        path: "contact-display",
        element: <ContactDisplaySettings />,
      },
      {
        path: "theme",
        element: <WebsiteThemeSelection />,
      },
      {
        path: "slug",
        element: <WebsiteSlug />,
      },
      {
        path: "logo",
        element: <WebsiteLogo />,
      },
      {
        path: "cover",
        element: <WebsiteCover />,
      },
      {
        path: "headline",
        element: <WebsiteMainHeadline />,
      },
      {
        path: "subheadline",
        element: <WebsiteSubheadline />,
      },
      {
        path: "portfolio",
        element: <WebsitePortfolio />,
      },
      {
        path: "bio",
        element: <WebsiteBio />,
      },
      {
        path: "marketplace",
        element: <MarketplaceVerification />,
      },
      {
        path: "payments-success",
        element: <WebsitePaymentsSuccess />,
      },
      {
        path: "deposit",
        element: <DepositSettings />,
      },
      {
        path: "balance",
        element: <BalanceReminder />,
      },
      {
        path: "cash-payments",
        element: <CashPaymentSettings />,
      },
      {
        path: "credit-card",
        element: <CreditCardPayments />,
      },
      {
        path: "subscription",
        element: <SubscriptionPlans />,
      },
      {
        path: "subscription-success",
        element: <SubscriptionSuccess />,
      },
      {
        path: "subscription/manage",
        element: <SubscriptionManagement />,
      },
      {
        path: "subscription/cancel",
        element: <SubscriptionCancellation />,
      },
      {
        path: "subscription/switch",
        element: <SubscriptionSwitch />,
      },
      {
        path: "app-download",
        element: <AppDownload />,
      },
    ],
  },
]);

import { OnboardingProvider } from './context/OnboardingContext';
import Dashboard from './pages/ProviderPages/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import AppDownload from './components/common/AppDownload';
import ContactDisplaySettings from './components/provider/ContactDisplaySettings';
import LoadingScreen from './components/provider/LoadingScreen';
import ToastMessage from './components/common/ToastMessage';
import ToastHandler from './services/toastHandler';
import { Provider } from 'react-redux';
import store from './store';

function OnboardingLayout() {
  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto pb-safe">
        <div className="w-full max-w-3xl mx-auto px-[7.5px] sm:px-4 md:px-6 py-4 md:py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<AuthOptions />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/verify" element={<VerificationCode />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/services" element={<ServicesSelection />} />
            <Route path="/location" element={<ServiceLocation />} />
            <Route path="/address" element={<AddressInput />} />
            <Route path="/service-area" element={<ServiceArea />} />
            <Route path="/completion" element={<SuccessCompletion />} />
            <Route path="/loading" element={<LoadingScreen />} />
            <Route path="/service-confirmation" element={<ServiceConfirmation />} />
            <Route path="/policies" element={<PoliciesConfirmation />} />
            <Route path="/schedule" element={<ScheduleConfirmation />} />
            <Route path="/availability" element={<AvailabilityConfirmation />} />
            <Route path="/website-success" element={<WebsiteSuccess />} />
            <Route path="/contact-display" element={<ContactDisplaySettings />} />
            <Route path="/theme" element={<WebsiteThemeSelection />} />
            <Route path="/slug" element={<WebsiteSlug />} />
            <Route path="/logo" element={<WebsiteLogo />} />
            <Route path="/cover" element={<WebsiteCover />} />
            <Route path="/headline" element={<WebsiteMainHeadline />} />
            <Route path="/subheadline" element={<WebsiteSubheadline />} />
            <Route path="/portfolio" element={<WebsitePortfolio />} />
            <Route path="/bio" element={<WebsiteBio />} />
            <Route path="/marketplace" element={<MarketplaceVerification />} />
            <Route path="/payments-success" element={<WebsitePaymentsSuccess />} />
            <Route path="/deposit" element={<DepositSettings />} />
            <Route path="/balance" element={<BalanceReminder />} />
            <Route path="/cash-payments" element={<CashPaymentSettings />} />
            <Route path="/credit-card" element={<CreditCardPayments />} />
            <Route path="/subscription" element={<SubscriptionPlans />} />
            <Route path="/subscription-success" element={<SubscriptionSuccess />} />
            <Route path="/app-download" element={<AppDownload />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <LanguageProvider>
            <OnboardingProvider>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/*" element={<OnboardingLayout />} />
              </Routes>
              <ToastMessage ref={ToastHandler.setToastRef} />
            </OnboardingProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

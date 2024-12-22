export interface UserData {
  businessName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  authMethod?: 'phone' | 'email' | 'social';
  instagram?: string;
  verificationCode: string;
  displaySettings?: {
    showPhone: boolean;
    showEmail: boolean;
    showInstagram: boolean;
  };
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

export interface ServiceLocation {
  type: 'mobile' | 'studio' | 'both';
  address?: string;
  billingAddress?: string;
  sameAsBilling?: boolean;
  mobileRadius?: number;
  scheduleSettings?: {
    bookingWindow?: string;
    minimumNotice?: string;
    rescheduleWindow?: string;
    mobile?: {
      workDays: Array<{
        day: string;
        enabled: boolean;
        hours: Array<{
          id: string;
          startTime: string;
          endTime: string;
        }>;
      }>;
    };
    studio?: {
      workDays: Array<{
        day: string;
        enabled: boolean;
        hours: Array<{
          id: string;
          startTime: string;
          endTime: string;
        }>;
      }>;
    };
  };
  travelFeePerKm?: number;
  minTravelFee?: number;
  minimumSpend?: number;
}

export interface OnboardingState {
  step: number;
  userData: UserData;
  services: Service[];
  serviceLocation: ServiceLocation;
  loading: boolean;
  error: string | null;
  websiteTheme?: string;
  websiteSlug?: string;
  websiteLogo?: {
    type: 'text' | 'image';
    content: string;
  };
  websiteCover?: string;
  websiteHeadline?: {
    title: string;
    subtitle: string;
  };
  websiteBio?: string;
  profilePhoto?: string;
  paymentSettings?: {
    cashInstructions: string;
    depositPercentage: number;
    balanceReminderTiming: string;
  };
  portfolioImages?: {
    id: string;
    url: string;
    crop?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }[];
}

export type OnboardingAction =
  | { type: 'SET_USER_DATA'; payload: Partial<UserData> }
  | { type: 'SET_SERVICES'; payload: Service[] }
  | { type: 'SET_SERVICE_LOCATION'; payload: ServiceLocation }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_WEBSITE_THEME'; payload: string }
  | { type: 'SET_WEBSITE_LOGO'; payload: { type: 'text' | 'image'; content: string } }
  | { type: 'SET_WEBSITE_COVER'; payload: string }
  | { type: 'SET_WEBSITE_HEADLINE'; payload: { title: string; subtitle: string } }
  | { type: 'SET_WEBSITE_BIO'; payload: string }
  | { type: 'SET_PORTFOLIO_IMAGES'; payload: OnboardingState['portfolioImages'] }
  | { type: 'SET_PAYMENT_SETTINGS'; payload: { cashInstructions: string } }
  | { type: 'SET_PROFILE_PHOTO'; payload: string }
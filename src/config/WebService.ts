// BASE CONSTANTS
import { IS_PRODUCTION } from "./Constants";

export const BASE_URL: string = IS_PRODUCTION
  ? 'https://app.glamic.com'
  : '';

export const API_URL: string = '/api/';
export const API_TIMEOUT: number = 60000;
export const LIMIT: number = 10;
export const API_LOG: boolean = true;
export const API_USER_NAME: string = '';
export const API_PASSWORD: string = '';
export const X_API_TOKEN: string = 'X-Access-Token';
export const APP_NAME: string = 'Glamic';

// REQUEST TYPES
export enum REQUEST_TYPE {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

// API Endpoint Interface
export interface ApiEndpoint {
  route: string;
  access_token_required: boolean;
  type: REQUEST_TYPE;
}

// AUTH
export const API_CHECK_USER_EXIST: ApiEndpoint = {
  route: `${API_URL}check-user-exists`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_LOGIN: ApiEndpoint = {
  route: `${API_URL}signin`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SOCIAL_LOGIN: ApiEndpoint = {
  route: `${API_URL}social-login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SEND_VERIFICATION_PHONE: ApiEndpoint = {
  route: `${API_URL}verify-phone`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SEND_VERIFICATION_EMAIL: ApiEndpoint = {
  route: `${API_URL}send-verification-email`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SEND_VERIFICATION_CODE: ApiEndpoint = {
  route: `${API_URL}send-verification-code`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_VERIFY_EMAIL_CODE: ApiEndpoint = {
  route: `${API_URL}verify-email`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_VERIFY_PHONE_CODE: ApiEndpoint = {
  route: `${API_URL}verify-authy-code`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SIGNUP: ApiEndpoint = {
  route: `${API_URL}signup`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_EMAIL_PASSWORD: ApiEndpoint = {
  route: `${API_URL}password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_VERIFY_CODE: ApiEndpoint = {
  route: `${API_URL}verify-code`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_LOGOUT: ApiEndpoint = {
  route: `${API_URL}logout`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_FORGOT_PASSEORD: ApiEndpoint = {
  route: `${API_URL}forgot-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_PROFILE: ApiEndpoint = {
  route: `${API_URL}update-profile`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_GET_PROFILE: ApiEndpoint = {
  route: `${API_URL}app-user`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_READ_NOTIFICATION: ApiEndpoint = {
  route: `${API_URL}mark-read`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_GET_UNREAD_NOTIFICATION_COUNT: ApiEndpoint = {
  route: `${API_URL}unread-count`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_TOGGLE_NOTIFICATION: ApiEndpoint = {
  route: `${API_URL}notification-toggle`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Provider Setting
export const API_PROVIDER_SETTING: ApiEndpoint = {
  route: `${API_URL}service-provider-setting`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_PROVIDER_STUDIO_ADDRESS: ApiEndpoint = {
  route: `${API_URL}service-provider-studio-address`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Get Profession
export const API_PROFESSIONS: ApiEndpoint = {
  route: `${API_URL}professions`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_UPLOAD_FILE: ApiEndpoint = {
  route: `${API_URL}upload-file`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Services
export const API_SERVICE_CATEGORY: ApiEndpoint = {
  route: `${API_URL}service-category`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_MY_SERVICE: ApiEndpoint = {
  route: `${API_URL}service`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CATEGORIZED_SERVICE: ApiEndpoint = {
  route: `${API_URL}categorized-services`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_ATTACH_ADDONS: ApiEndpoint = {
  route: `${API_URL}attach_addons`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_MY_ADDONS: ApiEndpoint = {
  route: `${API_URL}my-addons`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_DELETE_ADDONS: ApiEndpoint = {
  route: `${API_URL}my-addons`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_UPDATE_ADDONS: ApiEndpoint = {
  route: `${API_URL}my-addons`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_MY_SERVICE_GUEST: ApiEndpoint = {
  route: `${API_URL}service`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_CHANGE_SERVICE_STATUS: ApiEndpoint = {
  route: `${API_URL}service-change-active-status`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_VIEW_SERVICE: ApiEndpoint = {
  route: `${API_URL}view-service`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_GET_POPULAR_SERVICES: ApiEndpoint = {
  route: `${API_URL}service-booking-popular`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

//Service Providers
export const API_SERVICE_PROVIDERS: ApiEndpoint = {
  route: `${API_URL}v2/service-providers`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

//Add Verfication
export const API_ADD_VERIFICATION: ApiEndpoint = {
  route: `${API_URL}verification-proof`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_VERIFICATIONS: ApiEndpoint = {
  route: `${API_URL}verification-proof`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_ADDONS: ApiEndpoint = {
  route: `${API_URL}get-addons`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Address Book
export const API_GET_ADDRESS_LIST: ApiEndpoint = {
  route: `${API_URL}address-book`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_ADDRESS: ApiEndpoint = {
  route: `${API_URL}address-book`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_ADDRESS: ApiEndpoint = {
  route: `${API_URL}address-book`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_DELETE_ADDRESS: ApiEndpoint = {
  route: `${API_URL}address-book`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_VERIFY_LOCATION: ApiEndpoint = {
  route: `${API_URL}verify-location`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_USER_LOCATION: ApiEndpoint = {
  route: `${API_URL}user-locations`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Notification
export const API_NOTIFICATIONS_LIST: ApiEndpoint = {
  route: `${API_URL}notifications`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Promotions
export const API_PROMOTIONS: ApiEndpoint = {
  route: `${API_URL}my-coupon-codes`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Report Problem
export const API_REPORT_PROBLEM: ApiEndpoint = {
  route: `${API_URL}service-provider-report`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_BOOKING_REPORT: ApiEndpoint = {
  route: `${API_URL}service-booking-report`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Favorite
export const API_MY_FAVORITE_SERVICES: ApiEndpoint = {
  route: `${API_URL}service-like`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Favorite Provider
export const API_MY_FAVORITE_MASTERS: ApiEndpoint = {
  route: `${API_URL}service-provider-like`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Add favorite provider
export const API_FAVORITE_UNFAVORITE_MASTER: ApiEndpoint = {
  route: `${API_URL}service-provider-like`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Add favorite Service
export const API_FAVORITE_UNFAVORITE_SERVICE: ApiEndpoint = {
  route: `${API_URL}service-like`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Bookings
export const API_BOOKING: ApiEndpoint = {
  route: `${API_URL}service-booking`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_BOOKING_BY_MONTH: ApiEndpoint = {
  route: `${API_URL}service-booking-month-wise`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_BOOKING_BY_STATUS: ApiEndpoint = {
  route: `${API_URL}service-booking-status-wise`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_BOOKING_SLOTS: ApiEndpoint = {
  route: `${API_URL}service-booking-get-slots`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_PAYMENT_INTENT: ApiEndpoint = {
  route: `${API_URL}create-payment-intent`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_BOOKING_CALCULATIONS: ApiEndpoint = {
  route: `${API_URL}service-booking-calculation`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_CANCEL_BOOKING = (id: number): ApiEndpoint => ({
  route: `${API_URL}cancel-booking/${id}`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
});

//Promotions
export const API_GET_PROMOTIONS: ApiEndpoint = {
  route: `${API_URL}service-category`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Scheduled Management
export const API_SERVICE_PROVIDER_LEAVE: ApiEndpoint = {
  route: `${API_URL}service-provider-leave`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Scheduled Management Schedule
export const API_SERVICE_PROVIDER_SCHEDULE: ApiEndpoint = {
  route: `${API_URL}service-provider-schedule`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Reviews
export const API_REVIEWS: ApiEndpoint = {
  route: `${API_URL}service-booking-rating`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_POST_REVIEWS: ApiEndpoint = {
  route: `${API_URL}service-booking-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Api Payment Method Review
export const API_POST_REVIEWS_PAYMENT: ApiEndpoint = {
  route: `${API_URL}create-payment-intent-tip`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//Tags
export const API_GET_TAGS_LIST: ApiEndpoint = {
  route: `${API_URL}rating-tags`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_DASHBOARD: ApiEndpoint = {
  route: `${API_URL}get-home/basic?longitude=31.065550&latitude=-29.648750`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_DASHBOARD_GUEST: ApiEndpoint = {
  route: `${API_URL}get-home/basic-guest?longitude=31.065550&latitude=-29.648750`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_GET_DASHBOARD_SP: ApiEndpoint = {
  route: `${API_URL}get-home/provider`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//App Content
export const API_GET_APP_CONTENT: ApiEndpoint = {
  route: `${API_URL}content-page/`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

//App Settings
export const API_GET_APP_SETTINGS: ApiEndpoint = {
  route: `${API_URL}application-setting`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

//App Video Links
export const API_GET_APP_VIDEO_LINKS: ApiEndpoint = {
  route: `${API_URL}in-app-video-links`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

//Add Bank
export const API_ADD_BANK: ApiEndpoint = {
  route: `${API_URL}create-external-account`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_BANK_LIST: ApiEndpoint = {
  route: `${API_URL}get-bank-accounts`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_CATEGORIES_LIST: ApiEndpoint = {
  route: `${API_URL}provider-category`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_CATEGORIES_EDIT: ApiEndpoint = {
  route: `${API_URL}provider-category`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

//Get Portfolio
export const API_GET_PORTFOLIO: ApiEndpoint = {
  route: `${API_URL}service-provider-portfolio`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_GET_PORTFOLIO_USER: ApiEndpoint = {
  route: `${API_URL}portfolio`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//Add Portfolio
export const API_ADD_PORTFOLIO: ApiEndpoint = {
  route: `${API_URL}portfolio`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_TIPS: ApiEndpoint = {
  route: `${API_URL}booking-tips`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_DELETE_ACCOUNT: ApiEndpoint = {
  route: `${API_URL}delete-account`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//professions-noAuth
export const API_GET_PROFESSIONS: ApiEndpoint = {
  route: `${API_URL}get-professions`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_GENERATE_DEEP_LINK: ApiEndpoint = {
  route: `${API_URL}generate-deep-link`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_DELETE_CALENDER_GRANT: ApiEndpoint = {
  route: `${API_URL}delete-calendar-grant`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//PAYMENT SETTINGS
export const API_GET_PAYMENT_SETTINGS: ApiEndpoint = {
  route: `${API_URL}payment-settings`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_UPDATE_PAYMENT_SETTINGS: ApiEndpoint = {
  route: `${API_URL}payment-settings`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

//POLICIES
export const API_GET_POLICIES: ApiEndpoint = {
  route: `${API_URL}policy`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_POLICIES: ApiEndpoint = {
  route: `${API_URL}policy`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_POLICIES: ApiEndpoint = {
  route: `${API_URL}policy`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_DELETE_POLICIES: ApiEndpoint = {
  route: `${API_URL}policy`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

//Waivers
export const API_GET_WAIVER: ApiEndpoint = {
  route: `${API_URL}waiver`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_UPDATE_WAIVER: ApiEndpoint = {
  route: `${API_URL}waiver`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_ADD_WAIVER: ApiEndpoint = {
  route: `${API_URL}waiver`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_DELETE_WAIVER: ApiEndpoint = {
  route: `${API_URL}waiver`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_PRO_ONBOARDING_QUESTIONS: ApiEndpoint = {
  route: `${API_URL}pro-onboarding-questions`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_MARK_BOOKING: ApiEndpoint = {
  route: `${API_URL}mark-booking`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_MARK_TRANSACTION: ApiEndpoint = {
  route: `${API_URL}mark-transaction`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_DELETE_TRANSACTION: ApiEndpoint = {
  route: `${API_URL}delete-transaction`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_ADD_EXTRA_CHARGES: ApiEndpoint = {
  route: `${API_URL}add-extra-charge`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_CREATE_SUBSCRIPTION: ApiEndpoint = {
  route: `${API_URL}create-subscription`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_SUBSCRIPTION: ApiEndpoint = {
  route: `${API_URL}subscription`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_UNPAUSE_SUBSCRIPTION: ApiEndpoint = {
  route: `${API_URL}resume-subscription`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_PAYMENT_INTENT: ApiEndpoint = {
  route: `${API_URL}get-payment-intent`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SETUP_INTENT: ApiEndpoint = {
  route: `${API_URL}get-setup-intent`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CANCEL_SUBSCRIPTION: ApiEndpoint = {
  route: `${API_URL}cancel-subscription`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_REMOVE_SUBSCRIPTION: ApiEndpoint = {
  route: `${API_URL}remove-subscription`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_UPGRADE_SUBSCRIPTION_TO_ANNUAL: ApiEndpoint = {
  route: `${API_URL}upgrade-to-yearly-plan`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_REVERT_SUBSCRIPTION_CANCELLATION: ApiEndpoint = {
  route: `${API_URL}revert-subscription-cancellation`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_ACCOUNT_SETUP: ApiEndpoint = {
  route: `${API_URL}check-account-setup`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_NOTIFICATION_SETTINGS: ApiEndpoint = {
  route: `${API_URL}notification_setting`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_UPDATE_NOTIFICATION_SETTINGS: ApiEndpoint = {
  route: `${API_URL}notification_setting`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_GET_WEB_SETTINGS: ApiEndpoint = {
  route: `${API_URL}web-settings`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_UPDATE_WEB_SETTINGS: ApiEndpoint = {
  route: `${API_URL}web-settings`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_WEB_THEMES: ApiEndpoint = {
  route: `${API_URL}themes`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//REQUEST CUSTOMER REVIEW
export const API_REQUEST_CUSTOMER_REVIEW: ApiEndpoint = {
  route: `${API_URL}request-review`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

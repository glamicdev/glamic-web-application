import React from 'react';
import { Crown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../ui/Layout';
import { Heading, Text } from '../../ui/Typography';
import { Button } from '../../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { Navigation } from '../common/Navigation';
import type { SubscriptionManagementTranslations } from '../../types/translations';

interface PlanCardProps {
  type: 'yearly' | 'monthly';
  price: string;
  equivalent?: string;
  isCurrentPlan?: boolean;
  savings?: string;
  translations: {
    yearly: string;
    monthly: string;
    currentPlan: string;
    yearPeriod: string;
    monthPeriod: string;
    equivalent: string;
  };
}

function PlanCard({ type, price, equivalent, isCurrentPlan, savings, translations }: PlanCardProps) {
  return (
    <div className={`relative p-6 rounded-2xl border ${
      isCurrentPlan ? 'border-2 border-primary-navy' : 'border-gray-200 dark:border-white/10'
    }`}>
      {savings && (
        <div className="absolute -top-3 right-6 px-4 py-1 bg-primary-navy text-white text-sm font-medium rounded-full">
          {savings}
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {type === 'yearly' ? translations.yearly : translations.monthly}
          </h3>
          {isCurrentPlan && (
            <span className="text-sm text-primary-navy font-medium">{translations.currentPlan}</span>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-sm text-gray-500">/{type === 'yearly' ? translations.yearPeriod : translations.monthPeriod}</span>
      </div>
      
      {equivalent && (
        <Text className="text-sm text-gray-500">
          {translations.equivalent.replace('{price}', equivalent)}
        </Text>
      )}
    </div>
  );
}

interface FeatureProps {
  title: string;
  description: string;
}

function Feature({ title, description }: FeatureProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <Crown className="w-8 h-8 text-primary-gold" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        <Text className="text-sm text-gray-600 dark:text-gray-300">{description}</Text>
      </div>
    </div>
  );
}

const defaultTranslations: SubscriptionManagementTranslations = {
  title: "Save on the annual plan",
  subtitle: "Glamic Pro members earn 5x and save 10x more time on average than others",
  features: {
    earnings: {
      title: "Boost Your Earnings:",
      description: "Earn up to 5x more with advanced booking tools and smart pricing."
    },
    time: {
      title: "Save Time:",
      description: "Automate reminders and deposits to reduce admin tasks by 10x."
    },
    image: {
      title: "Enhanced Professional Image:",
      description: "Access a custom website, secure payments, and dynamic scheduling."
    }
  },
  plans: {
    yearly: "YEARLY",
    monthly: "MONTHLY",
    currentPlan: "Current Plan",
    yearPeriod: "YR",
    monthPeriod: "MO",
    savings: "20% savings",
    equivalent: "Equivalent to {price}/MO",
    pricePerDay: "65 cents/day"
  },
  currentPlan: "You are currently on monthly plan. Renews on {date}",
  switchButton: "SWITCH TO ANNUAL",
  cancelButton: "Cancel"
};

export default function SubscriptionManagement() {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  
  // Merge translations with defaults, handling undefined values
  const t = {
    title: translations?.subscriptionManagement?.title ?? defaultTranslations.title,
    subtitle: translations?.subscriptionManagement?.subtitle ?? defaultTranslations.subtitle,
    features: {
      earnings: {
        title: translations?.subscriptionManagement?.features?.earnings?.title ?? defaultTranslations.features.earnings.title,
        description: translations?.subscriptionManagement?.features?.earnings?.description ?? defaultTranslations.features.earnings.description
      },
      time: {
        title: translations?.subscriptionManagement?.features?.time?.title ?? defaultTranslations.features.time.title,
        description: translations?.subscriptionManagement?.features?.time?.description ?? defaultTranslations.features.time.description
      },
      image: {
        title: translations?.subscriptionManagement?.features?.image?.title ?? defaultTranslations.features.image.title,
        description: translations?.subscriptionManagement?.features?.image?.description ?? defaultTranslations.features.image.description
      }
    },
    plans: translations?.subscriptionManagement?.plans ?? defaultTranslations.plans,
    currentPlan: translations?.subscriptionManagement?.currentPlan ?? defaultTranslations.currentPlan,
    switchButton: translations?.subscriptionManagement?.switchButton ?? defaultTranslations.switchButton,
    cancelButton: translations?.subscriptionManagement?.cancelButton ?? defaultTranslations.cancelButton
  };

  const handleSwitchToAnnual = () => {
    navigate('/subscription/switch');
  };

  const handleCancel = () => {
    navigate('/subscription/cancel');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <Layout maxWidth="md" showBackButton={false}>
        <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-8 mt-4">
          <Heading className="text-3xl mb-2">{t.title}</Heading>
          <Text className="text-xl text-gray-600 dark:text-gray-300">
            {t.subtitle}
          </Text>
        </div>

        <div className="space-y-8 pb-20">
          <div className="space-y-6">
            <Feature
              title={t.features.earnings.title}
              description={t.features.earnings.description}
            />
            <Feature
              title={t.features.time.title}
              description={t.features.time.description}
            />
            <Feature
              title={t.features.image.title}
              description={t.features.image.description}
            />
          </div>

          <div className="pt-4">
            <Text className="text-sm text-gray-500 mb-2">{t.plans.pricePerDay}</Text>
            <div className="grid gap-4">
              <PlanCard
                type="yearly"
                price="$239.99"
                equivalent="$19.99"
                savings={t.plans.savings}
                translations={t.plans}
              />
              <PlanCard
                type="monthly"
                price="$24.99"
                isCurrentPlan={true}
                translations={t.plans}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Text className="text-center text-gray-600 dark:text-gray-300">
              {t.currentPlan.replace('{date}', '2025/01/05')}
            </Text>
            
            <Button
              variant="primary"
              onClick={handleSwitchToAnnual}
              className="w-full"
            >
              {t.switchButton}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full text-red-500"
            >
              {t.cancelButton}
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
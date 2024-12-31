import React, { useState } from 'react';
import { Crown, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../ui/Layout';
import { Heading, Text } from '../../ui/Typography';
import { Button } from '../../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { Navigation } from '../common/Navigation';
import type { SubscriptionSwitchTranslations } from '../../types/translations';

interface BenefitProps {
  title: string;
  description: string;
}

function Benefit({ title, description }: BenefitProps) {
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

interface SwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: {
    title: string;
    message: string;
    closeButton: string;
  };
}

function SwitchModal({ isOpen, onClose, translations }: SwitchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
          <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <Heading className="text-2xl mb-2 text-center">{translations.title}</Heading>
        <Text className="text-center mb-4">
          {translations.message.replace('{date}', '2025/01/05')}
        </Text>
        <Button variant="primary" onClick={onClose} className="w-full">
          {translations.closeButton}
        </Button>
      </div>
    </div>
  );
}

const defaultTranslations: SubscriptionSwitchTranslations = {
  title: "Switch to Annual Plan",
  subtitle: "Save more with our annual subscription!",
  comparison: {
    monthly: {
      label: "Current Monthly Plan",
      price: "$24.99",
      period: "/month"
    },
    annual: {
      label: "Annual Plan",
      price: "$19.99",
      period: "/month"
    },
    savings: "Save $60 per year"
  },
  benefits: {
    cost: {
      title: "Lower Monthly Cost",
      description: "Pay less per month with our annual subscription."
    },
    price: {
      title: "Guaranteed Price",
      description: "Lock in your current rate for the entire year."
    },
    support: {
      title: "Priority Support",
      description: "Get priority access to our customer support team."
    },
    access: {
      title: "Early Access",
      description: "Be the first to try new premium features."
    }
  },
  confirmButton: "Confirm Switch to Annual Plan",
  priceNote: "Your new plan will be billed annually at $239.99",
  modal: {
    title: "Switched to Annual Plan!",
    message: "Your subscription has been upgraded to the annual plan.\nYou will receive an email confirmation.\nYour new billing date will be {date}",
    closeButton: "Close"
  }
};

export default function SubscriptionSwitch() {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  // Merge translations with defaults, handling undefined values
  const t = {
    title: translations?.subscriptionSwitch?.title ?? defaultTranslations.title,
    subtitle: translations?.subscriptionSwitch?.subtitle ?? defaultTranslations.subtitle,
    comparison: {
      monthly: {
        label: translations?.subscriptionSwitch?.comparison?.monthly?.label ?? defaultTranslations.comparison.monthly.label,
        price: translations?.subscriptionSwitch?.comparison?.monthly?.price ?? defaultTranslations.comparison.monthly.price,
        period: translations?.subscriptionSwitch?.comparison?.monthly?.period ?? defaultTranslations.comparison.monthly.period
      },
      annual: {
        label: translations?.subscriptionSwitch?.comparison?.annual?.label ?? defaultTranslations.comparison.annual.label,
        price: translations?.subscriptionSwitch?.comparison?.annual?.price ?? defaultTranslations.comparison.annual.price,
        period: translations?.subscriptionSwitch?.comparison?.annual?.period ?? defaultTranslations.comparison.annual.period
      },
      savings: translations?.subscriptionSwitch?.comparison?.savings ?? defaultTranslations.comparison.savings
    },
    benefits: {
      cost: {
        title: translations?.subscriptionSwitch?.benefits?.cost?.title ?? defaultTranslations.benefits.cost.title,
        description: translations?.subscriptionSwitch?.benefits?.cost?.description ?? defaultTranslations.benefits.cost.description
      },
      price: {
        title: translations?.subscriptionSwitch?.benefits?.price?.title ?? defaultTranslations.benefits.price.title,
        description: translations?.subscriptionSwitch?.benefits?.price?.description ?? defaultTranslations.benefits.price.description
      },
      support: {
        title: translations?.subscriptionSwitch?.benefits?.support?.title ?? defaultTranslations.benefits.support.title,
        description: translations?.subscriptionSwitch?.benefits?.support?.description ?? defaultTranslations.benefits.support.description
      },
      access: {
        title: translations?.subscriptionSwitch?.benefits?.access?.title ?? defaultTranslations.benefits.access.title,
        description: translations?.subscriptionSwitch?.benefits?.access?.description ?? defaultTranslations.benefits.access.description
      }
    },
    confirmButton: translations?.subscriptionSwitch?.confirmButton ?? defaultTranslations.confirmButton,
    priceNote: translations?.subscriptionSwitch?.priceNote ?? defaultTranslations.priceNote,
    modal: {
      title: translations?.subscriptionSwitch?.modal?.title ?? defaultTranslations.modal.title,
      message: translations?.subscriptionSwitch?.modal?.message ?? defaultTranslations.modal.message,
      closeButton: translations?.subscriptionSwitch?.modal?.closeButton ?? defaultTranslations.modal.closeButton
    }
  };

  const handleSwitch = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/subscription');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <Layout maxWidth="md" showBackButton={false}>
        <div className="space-y-6 mt-4">
          <button 
            onClick={() => navigate('/subscription')}
            className="flex items-center text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div>
            <Heading className="text-3xl mb-2">{t.title}</Heading>
            <Text className="text-xl">{t.subtitle}</Text>
          </div>

          <div className="bg-primary-navy/5 dark:bg-primary-navy/20 rounded-xl p-6">
            <div className="flex justify-between items-baseline mb-4">
              <div>
                <Text className="text-sm text-primary-navy font-medium">{t.comparison.monthly.label}</Text>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{t.comparison.monthly.price}</span>
                  <span className="text-sm text-gray-500">{t.comparison.monthly.period}</span>
                </div>
              </div>
              <ArrowLeft className="w-6 h-6 rotate-180 text-primary-navy" />
              <div>
                <Text className="text-sm text-primary-navy font-medium">{t.comparison.annual.label}</Text>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{t.comparison.annual.price}</span>
                  <span className="text-sm text-gray-500">{t.comparison.annual.period}</span>
                </div>
              </div>
            </div>
            <div className="bg-primary-navy text-white px-4 py-2 rounded-lg text-center">
              {t.comparison.savings}
            </div>
          </div>

          <div className="space-y-6">
            <Benefit
              title={t.benefits.cost.title}
              description={t.benefits.cost.description}
            />
            <Benefit
              title={t.benefits.price.title}
              description={t.benefits.price.description}
            />
            <Benefit
              title={t.benefits.support.title}
              description={t.benefits.support.description}
            />
            <Benefit
              title={t.benefits.access.title}
              description={t.benefits.access.description}
            />
          </div>

          <Button
            variant="primary"
            onClick={handleSwitch}
            className="w-full"
          >
            {t.confirmButton}
          </Button>

          <Text className="text-sm text-center text-gray-500">
            {t.priceNote}
          </Text>
        </div>

        <SwitchModal
          isOpen={showModal}
          onClose={handleModalClose}
          translations={t.modal}
        />
      </Layout>
    </div>
  );
}
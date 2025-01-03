import React, { useState } from 'react';
import { Crown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../../ui/Layout';
import { Heading, Text } from '../../../ui/Typography';
import { Button } from '../../../ui/Button';
import { useLanguage } from '../../../context/LanguageContext';
import { Navigation } from '../../common/Navigation';
import type { SubscriptionCancelTranslations } from '../../../types/translations';

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

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: {
    title: string;
    message: string;
    closeButton: string;
  };
}

function CancellationModal({ isOpen, onClose, translations }: CancellationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full">
        <Heading className="text-2xl mb-2">{translations.title}</Heading>
        <Text className="mb-4">
          {translations.message.replace('{date}', '2025/01/05')}
        </Text>
        <Button variant="primary" onClick={onClose} className="w-full">
          {translations.closeButton}
        </Button>
      </div>
    </div>
  );
}

interface FeedbackFormProps {
  onSubmit: () => void;
  onBack: () => void;
  translations: {
    title: string;
    subtitle: string;
    reasons: {
      features: string;
      expensive: string;
      buggy: string;
      otherSoftware: string;
      hardToUse: string;
    };
    detailsPrompt: string;
    submitButton: string;
  };
}

function FeedbackForm({ onSubmit, onBack, translations }: FeedbackFormProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [feedback, setFeedback] = useState('');

  const reasons = [
    { key: 'features', text: translations.reasons.features },
    { key: 'expensive', text: translations.reasons.expensive },
    { key: 'buggy', text: translations.reasons.buggy },
    { key: 'otherSoftware', text: translations.reasons.otherSoftware },
    { key: 'hardToUse', text: translations.reasons.hardToUse },
  ];

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center text-gray-600 dark:text-gray-300">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div>
        <Heading className="text-3xl mb-2">{translations.title}</Heading>
        <Text>{translations.subtitle}</Text>
      </div>

      <div className="space-y-4">
        {reasons.map(({ key, text }) => (
          <div
            key={key}
            onClick={() => setSelectedReason(key)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${selectedReason === key ? 'border-primary-navy bg-primary-navy/10' : 'border-gray-300'}`}
            >
              {selectedReason === key && (
                <div className="w-3 h-3 rounded-full bg-primary-navy" />
              )}
            </div>
            <span className="text-gray-900 dark:text-white">{text}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Text className="text-sm">{translations.detailsPrompt}</Text>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Your feedback..."
        />
      </div>

      <Button
        variant="outline"
        onClick={onSubmit}
        className="w-full text-red-500"
      >
        {translations.submitButton}
      </Button>
    </div>
  );
}

const defaultTranslations: SubscriptionCancelTranslations = {
  title: "Are you sure?",
  subtitle: "You will lose access to all the below benefits!",
  benefits: {
    website: {
      title: "Premium Website:",
      description: "You will lose access to premium professional booking website."
    },
    policies: {
      title: "Policies Features:",
      description: "You will lose access to all your policies and waivers."
    },
    customization: {
      title: "Pro Customizations:",
      description: "You will lose access to the ability to customize your business settings."
    },
    marketplace: {
      title: "Marketplace Fees:",
      description: "You will be charged a 25% cut fee on any bookings you get from Glamic marketplace which are 0% if you are on pro plan."
    },
    features: {
      title: "Future Premium Features:",
      description: "You will not gain access to our future Pro features."
    },
    pricing: {
      title: "Pricing:",
      description: "You will lose access to your current price and may have to pay more if you decide to come back."
    }
  },
  confirmButton: "Yes, Cancel Subscription",
  feedback: {
    title: "We're sorry to see you go.",
    subtitle: "Let us know why you'd like to cancel",
    reasons: {
      features: "Subscription is lacking features I need.",
      expensive: "Subscription is expensive.",
      buggy: "The app is buggy.",
      otherSoftware: "I prefer to use another software.",
      hardToUse: "The application is hard to use."
    },
    detailsPrompt: "Can you help us and explain your reason to cancel in more details?",
    submitButton: "Cancel"
  },
  modal: {
    title: "Subscription Cancelled",
    message: "Your subscription has been canceled.\nYou will receive an email confirmation.\nYou will stay a pro user till {date}",
    closeButton: "Close"
  }
};

export default function SubscriptionCancellation() {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [step, setStep] = useState<'confirm' | 'feedback'>('confirm');
  const [showModal, setShowModal] = useState(false);

  // Merge translations with defaults, handling undefined values
  const t = {
    title: translations?.subscriptionCancel?.title ?? defaultTranslations.title,
    subtitle: translations?.subscriptionCancel?.subtitle ?? defaultTranslations.subtitle,
    benefits: {
      website: {
        title: translations?.subscriptionCancel?.benefits?.website?.title ?? defaultTranslations.benefits.website.title,
        description: translations?.subscriptionCancel?.benefits?.website?.description ?? defaultTranslations.benefits.website.description
      },
      policies: {
        title: translations?.subscriptionCancel?.benefits?.policies?.title ?? defaultTranslations.benefits.policies.title,
        description: translations?.subscriptionCancel?.benefits?.policies?.description ?? defaultTranslations.benefits.policies.description
      },
      customization: {
        title: translations?.subscriptionCancel?.benefits?.customization?.title ?? defaultTranslations.benefits.customization.title,
        description: translations?.subscriptionCancel?.benefits?.customization?.description ?? defaultTranslations.benefits.customization.description
      },
      marketplace: {
        title: translations?.subscriptionCancel?.benefits?.marketplace?.title ?? defaultTranslations.benefits.marketplace.title,
        description: translations?.subscriptionCancel?.benefits?.marketplace?.description ?? defaultTranslations.benefits.marketplace.description
      },
      features: {
        title: translations?.subscriptionCancel?.benefits?.features?.title ?? defaultTranslations.benefits.features.title,
        description: translations?.subscriptionCancel?.benefits?.features?.description ?? defaultTranslations.benefits.features.description
      },
      pricing: {
        title: translations?.subscriptionCancel?.benefits?.pricing?.title ?? defaultTranslations.benefits.pricing.title,
        description: translations?.subscriptionCancel?.benefits?.pricing?.description ?? defaultTranslations.benefits.pricing.description
      }
    },
    confirmButton: translations?.subscriptionCancel?.confirmButton ?? defaultTranslations.confirmButton,
    feedback: {
      title: translations?.subscriptionCancel?.feedback?.title ?? defaultTranslations.feedback.title,
      subtitle: translations?.subscriptionCancel?.feedback?.subtitle ?? defaultTranslations.feedback.subtitle,
      reasons: {
        features: translations?.subscriptionCancel?.feedback?.reasons?.features ?? defaultTranslations.feedback.reasons.features,
        expensive: translations?.subscriptionCancel?.feedback?.reasons?.expensive ?? defaultTranslations.feedback.reasons.expensive,
        buggy: translations?.subscriptionCancel?.feedback?.reasons?.buggy ?? defaultTranslations.feedback.reasons.buggy,
        otherSoftware: translations?.subscriptionCancel?.feedback?.reasons?.otherSoftware ?? defaultTranslations.feedback.reasons.otherSoftware,
        hardToUse: translations?.subscriptionCancel?.feedback?.reasons?.hardToUse ?? defaultTranslations.feedback.reasons.hardToUse
      },
      detailsPrompt: translations?.subscriptionCancel?.feedback?.detailsPrompt ?? defaultTranslations.feedback.detailsPrompt,
      submitButton: translations?.subscriptionCancel?.feedback?.submitButton ?? defaultTranslations.feedback.submitButton
    },
    modal: {
      title: translations?.subscriptionCancel?.modal?.title ?? defaultTranslations.modal.title,
      message: translations?.subscriptionCancel?.modal?.message ?? defaultTranslations.modal.message,
      closeButton: translations?.subscriptionCancel?.modal?.closeButton ?? defaultTranslations.modal.closeButton
    }
  };

  const handleCancel = () => {
    setStep('feedback');
  };

  const handleFeedbackSubmit = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/subscription');
  };

  if (step === 'feedback') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        <Layout maxWidth="md" showBackButton={false}>
          <div className="mt-4">
            <FeedbackForm
              onSubmit={handleFeedbackSubmit}
              onBack={() => setStep('confirm')}
              translations={t.feedback}
            />
          </div>
          <CancellationModal
            isOpen={showModal}
            onClose={handleModalClose}
            translations={t.modal}
          />
        </Layout>
      </div>
    );
  }

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

          <div className="space-y-6">
            <Benefit
              title={t.benefits.website.title}
              description={t.benefits.website.description}
            />
            <Benefit
              title={t.benefits.policies.title}
              description={t.benefits.policies.description}
            />
            <Benefit
              title={t.benefits.customization.title}
              description={t.benefits.customization.description}
            />
            <Benefit
              title={t.benefits.marketplace.title}
              description={t.benefits.marketplace.description}
            />
            <Benefit
              title={t.benefits.features.title}
              description={t.benefits.features.description}
            />
            <Benefit
              title={t.benefits.pricing.title}
              description={t.benefits.pricing.description}
            />
          </div>

          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full text-red-500"
          >
            {t.confirmButton}
          </Button>
        </div>
      </Layout>
    </div>
  );
}
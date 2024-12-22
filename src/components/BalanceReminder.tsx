import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../context/OnboardingContext';
import { Heading, Text } from './ui/Typography';
import { Button } from './ui/Button';
import { Clock, AlertCircle, ChevronDown } from 'lucide-react';
import { fadeIn } from './ui/animations';
import { Layout } from './ui/Layout';
import { saveBalanceReminder } from '../services/api';

const reminderOptions = [
  { id: 'after', label: 'After appointment completed', description: 'Send reminder once service is complete' },
  { id: '24h', label: '24 Hours Before', description: 'Best for last-minute confirmations' },
  { id: '3d', label: '3 Days Before', description: 'Recommended for most services' },
  { id: '1w', label: '1 Week Before', description: 'Good for standard appointments' },
  { id: '2w', label: '2 Weeks Before', description: 'Ideal for premium services' },
  { id: '1m', label: '1 Month Before', description: 'Perfect for major events' }
];

export default function BalanceReminder() {
  const { state, dispatch } = useOnboarding();
  const [selectedTiming, setSelectedTiming] = useState<string>(
    state?.paymentSettings?.balanceReminderTiming ?? '3d'
  );
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedOption = reminderOptions.find(option => option.id === selectedTiming);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Saving balance reminder timing:', selectedTiming);
      const response = await saveBalanceReminder(selectedTiming);

      if (!response.success) {
        throw new Error(response.error || 'Failed to save balance reminder settings');
      }

      console.log('Balance reminder settings saved successfully:', response.data);

      // Update state with confirmed timing
      dispatch({ 
        type: 'SET_PAYMENT_SETTINGS',
        payload: {
          ...state.paymentSettings,
          balanceReminderTiming: selectedTiming
        }
      });

      // Navigate to CashPaymentSettings
      dispatch({ type: 'SET_STEP', payload: 28 });
    } catch (err) {
      console.error('Error saving balance reminder settings:', err);
      setError('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout maxWidth="md">
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-primary-gold/10 text-primary-gold px-4 py-2 rounded-full mb-4"
        >
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Balance Reminder</span>
        </motion.div>
        
        <Heading className="mb-3">Balance Payment Reminder</Heading>
        
        <Text className="text-gray-600">
          When should clients receive their first payment reminder?
        </Text>
      </div>

      <div className="relative mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 rounded-xl bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 text-left flex items-center justify-between hover:border-primary-gold dark:hover:border-primary-gold transition-colors"
        >
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{selectedOption?.label}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{selectedOption?.description}</div>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full mt-2 bg-white dark:bg-primary-navy/95 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden backdrop-blur-sm"
          >
            {reminderOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedTiming(option.id);
                  setIsOpen(false);
                }}
                className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-white/10 transition-colors
                  ${selectedTiming === option.id ? 'bg-primary-gold/10 dark:bg-white/10' : ''}`}
              >
                <div className="font-medium text-gray-900 dark:text-white">{option.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{option.description}</div>
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <Button
        variant="primary"
        onClick={handleSave}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Saving...' : 'Save'}
      </Button>
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </Layout>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Heading } from '../../ui/Typography';
import { Layout } from '../../ui/Layout';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validation';

export default function EmailPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const [value, setValue] = React.useState(state.email);
  const [error, setError] = React.useState('');

  const handleNext = () => {
    if (!value.trim()) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(value)) {
      setError('Please enter a valid email address');
      return;
    }

    dispatch({
      type: 'UPDATE_AUTH_DATA',
      payload: { email: value }
    });

    // Navigate based on auth method
    if (!state.mobile_number && (state.authMethod === 'email' || state.authMethod === 'social')) {
      navigate('/auth/phone');
    } else {
      navigate('/auth/instagram');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  return (
    <Layout maxWidth="md">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8 w-full"
      >
        <div className="text-center">
          <Heading>What's your email address?</Heading>
        </div>

        <div className="max-w-md mx-auto">
          <Input
            type="email"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter your email"
            error={error}
            fullWidth
            autoFocus
          />

          <div className="mt-8">
            <Button
              variant="primary"
              onClick={handleNext}
              className="w-full max-w-xs mx-auto"
            >
              Continue
            </Button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Heading } from '../../ui/Typography';
import { Layout } from '../../ui/Layout';
import { useAuth } from '../../context/AuthContext';

export default function NamePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const [firstName, setFirstName] = React.useState(state.full_name);
  const [lastName, setLastName] = React.useState(state.last_name);
  const [error, setError] = React.useState('');

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Both first and last name are required');
      return;
    }

    dispatch({
      type: 'UPDATE_AUTH_DATA',
      payload: { 
        full_name: firstName,
        last_name: lastName
      }
    });

    // Navigation logic based on auth method
    if (!state.email && state.authMethod !== 'email') {
      navigate('/auth/email');
    } else if (!state.mobile_number && (state.authMethod === 'email' || state.authMethod === 'social')) {
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
          <Heading>What's your name?</Heading>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <Input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="First name"
            error={error}
            fullWidth
            autoFocus
          />

          <Input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Last name"
            error={error}
            fullWidth
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

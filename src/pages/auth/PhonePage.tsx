import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { PhoneInput as PhoneInputUI } from '../../ui/PhoneInput';
import { Heading } from '../../ui/Typography';
import { Layout } from '../../ui/Layout';
import { useAuth } from '../../context/AuthContext';

export default function PhonePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const [value, setValue] = React.useState(state.mobile_number);
  const [isValid, setIsValid] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleNext = () => {
    if (!value) {
      setError('Phone number is required');
      return;
    }
    if (!isValid) {
      setError('Please enter a valid phone number');
      return;
    }

    dispatch({
      type: 'UPDATE_AUTH_DATA',
      payload: { mobile_number: value }
    });

    navigate('/auth/instagram');
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
          <Heading>What's your phone number?</Heading>
        </div>

        <div className="max-w-md mx-auto">
          <PhoneInputUI
            value={value}
            onChange={(value) => {
              setValue(value);
              setError('');
            }}
            onValidChange={setIsValid}
            error={error}
            required
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

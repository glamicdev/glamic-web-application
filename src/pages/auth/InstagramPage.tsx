import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Heading } from '../../ui/Typography';
import { Layout } from '../../ui/Layout';
import { useAuth } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { signMeUp } from '../../ducks/auth/actions';

export default function InstagramPage() {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [value, setValue] = React.useState(state.instagram);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const reduxDispatch = useDispatch();

  const handleComplete = async () => {
    setLoading(true);
    try {
      const verify_phone = state.authMethod === 'phone';
      const verify_email = state.authMethod === 'email';

      reduxDispatch(signMeUp({
        payload: {
          verify_phone,
          verify_email,
          user_type: 'provider',
          business_name: state.business_name,
          full_name: state.full_name,
          last_name: state.last_name,
          email: state.email,
          instagram: value,
          mobile_number: state.mobile_number,
          timezone: state.timezone
        },
        callback: () => {
          if (state.authMethod !== 'social') {
            navigate('/verify');
          } else {
            navigate('/services');
          }
        }
      }));
    } catch (err) {
      console.error("Error saving user data:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleComplete();
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
          <Heading>What's your Instagram handle?</Heading>
        </div>

        <div className="max-w-md mx-auto">
          <Input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="@yourbusiness"
            error={error}
            fullWidth
            autoFocus
          />

          <div className="mt-8">
            <Button
              variant="primary"
              onClick={handleComplete}
              disabled={loading}
              className="w-full max-w-xs mx-auto"
            >
              {loading ? "Please wait..." : "Complete"}
            </Button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

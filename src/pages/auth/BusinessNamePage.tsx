import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Heading, Text } from '../../ui/Typography';
import { Layout } from '../../ui/Layout';
import { useAuth } from '../../context/AuthContext';

export default function BusinessNamePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const [value, setValue] = React.useState(state.business_name);

  const handleNext = () => {
    dispatch({ 
      type: 'UPDATE_AUTH_DATA', 
      payload: { business_name: value }
    });
    navigate('/auth/name');
  };

  return (
    <Layout maxWidth="md">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8 w-full"
      >
        <div className="text-center space-y-4">
          <Heading>What's your business name?</Heading>
          <Text className="text-gray-500 dark:text-gray-400">
            You can add this later if you're not sure yet
          </Text>
        </div>

        <div className="max-w-md mx-auto">
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter business name (optional)"
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

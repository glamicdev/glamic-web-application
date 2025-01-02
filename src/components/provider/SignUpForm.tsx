import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../context/OnboardingContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { PhoneInput } from '../../ui/PhoneInput';
import { Heading, Text } from '../../ui/Typography';
import { validateEmail } from '../../utils/validation';
import { Layout } from '../../ui/Layout';
import { Input } from '../../ui/Input';
import { useDispatch } from 'react-redux';
import { signMeUp } from '../../ducks/auth/actions';

interface FormData {
  business_name: string;
  full_name: string;
  last_name: string;
  email: string;
  instagram: string;
  mobile_number: string;
  timezone: string;
}

interface Question {
  id: string;
  field: keyof FormData;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
  validate?: (value: string) => string | undefined;
}

export default function SignUpForm() {
  const { state } = useOnboarding();
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method') as 'phone' | 'email' | 'social';


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<FormData>({
    business_name: state.userData.business_name || "",
    full_name: state.userData.full_name || "",
    last_name: state.userData.last_name || "",
    email: state.userData.email || "",
    instagram: state.userData.instagram || "",
    mobile_number: state.userData.phone || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const reduxDispatch = useDispatch()
  const questions: Question[] = [
    // Show phone input first for social login users and email login users who don't have phone
    ...((method === 'social' || method === 'email') && !state.userData.phone ? [{
      id: "phone",
      field: "mobile_number" as keyof FormData,
      label: "What's your phone number?",
      placeholder: "Enter your phone number",
      type: "tel",
      required: true
    }] : []),
    {
      id: "businessName",
      field: "business_name" as keyof FormData,
      label: "What's your business name?",
      placeholder: "Enter business name (optional)",
      type: "text",
    },
    {
      id: "full_name",
      field: "full_name" as keyof FormData,
      label: "What's your first name?",
      placeholder: "Enter your first name",
      type: "text",
      required: true,
    },
    {
      id: "last_name",
      field: "last_name" as keyof FormData,
      label: "What's your last name?",
      placeholder: "Enter your last name",
      type: "text",
      required: true,
    },
    ...(state.userData.email
      ? []
      : [
          {
            id: "email",
            field: "email" as keyof FormData,
            label: "What's your email address?",
            placeholder: "Enter your email",
            type: "email",
            required: true,
            validate: (value: string) =>
              !validateEmail(value)
                ? "Please enter a valid email address"
                : undefined,
          },
        ]),
    {
      id: "instagram",
      field: "instagram" as keyof FormData,
      label: "What's your Instagram handle?",
      placeholder: "@yourbusiness",
      type: "text",
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentQuestion.field]: value,
    }));
    setError(undefined);
  };

  const validateCurrentQuestion = (): boolean => {
    if (currentQuestion.required && !formData[currentQuestion.field]) {
      setError("This field is required");
      return false;
    }

    if (currentQuestion.validate) {
      const validationError = currentQuestion.validate(
        formData[currentQuestion.field]
      );
      if (validationError) {
        setError(validationError);
        return false;
      }
    }
    return true;
  };

  const navigate = useNavigate();
  
  const handleNext = async () => {

    if (!validateCurrentQuestion()) return;
    if (currentQuestionIndex < questions.length - 1) {;

      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setLoading(true);
      try {

        const verify_phone = method === 'phone';
        const verify_email = method === 'email';

        reduxDispatch(signMeUp({
          payload:{
            verify_phone,
            verify_email,
            user_type:'provider',
            ...formData
          },
          callback:()=>{
            if(method !== 'social'){
              navigate(`/verify?method=${method}`);
            }else{
              navigate('/services')
            }
          }
        }))
      } catch (err) {
        console.error("Error saving user data:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleNext();
    }
  };

  return (
    <Layout maxWidth="md">
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8 w-full"
      >
        <div className="text-center space-y-4">
          <Heading>{currentQuestion.label}</Heading>
          {currentQuestion.field === "business_name" && (
            <Text className="text-gray-500 dark:text-gray-400">
              You can add this later if you're not sure yet
            </Text>
          )}
        </div>

        <div className="max-w-md mx-auto">
          {currentQuestion.type === 'tel' ? (
            <PhoneInput
              value={formData[currentQuestion.field]}
              onChange={handleInputChange}
              error={error}
              required={currentQuestion.required}
            />
          ) : (
            <Input
              type={currentQuestion.type}
              value={formData[currentQuestion.field]}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentQuestion.placeholder}
              error={error}
              fullWidth
              autoFocus
            />
          )}

          <div className="mt-8 flex flex-col items-center gap-4">
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={loading}
              className="w-full max-w-xs"
            >
              {loading
                ? "Please wait..."
                : currentQuestionIndex === questions.length - 1
                ? "Complete"
                : "Continue"}
            </Button>

            <div className="flex gap-2 mt-4">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentQuestionIndex
                      ? "w-8 bg-primary-gold"
                      : index < currentQuestionIndex
                      ? "bg-primary-gold"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

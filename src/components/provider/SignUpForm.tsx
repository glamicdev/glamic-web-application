import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "../../context/OnboardingContext";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Heading, Text } from "../../ui/Typography";
import { validateEmail } from "../../utils/validation";
import { Layout } from "../../ui/Layout";

interface Question {
  id: string;
  field: keyof FormData;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
  validate?: (value: string) => string | undefined;
}

interface FormData {
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  instagram: string;
}

export default function SignUpForm() {
  const { state, dispatch } = useOnboarding();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    businessName: state.userData.businessName || "",
    firstName: state.userData.firstName || "",
    lastName: state.userData.lastName || "",
    email: state.userData.email || "",
    instagram: state.userData.instagram || "",
  });

  const questions: Question[] = [
    {
      id: "businessName",
      field: "businessName",
      label: "What's your business name?",
      placeholder: "Enter business name (optional)",
      type: "text",
    },
    {
      id: "firstName",
      field: "firstName",
      label: "What's your first name?",
      placeholder: "Enter your first name",
      type: "text",
      required: true,
    },
    {
      id: "lastName",
      field: "lastName",
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
            field: "email",
            label: "What's your email address?",
            placeholder: "Enter your email",
            type: "email",
            required: true,
            validate: (value) =>
              !validateEmail(value)
                ? "Please enter a valid email address"
                : undefined,
          },
        ]),
    {
      id: "instagram",
      field: "instagram",
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
    setError(null);
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

  const handleNext = async () => {
    if (!validateCurrentQuestion()) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setLoading(true);
      try {
        // Update context with form data
        dispatch({
          type: "SET_USER_DATA",
          payload: formData,
        });

        // Navigate to next step
        dispatch({ type: "SET_STEP", payload: 3 });
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
          {currentQuestion.field === "businessName" && (
            <Text className="text-gray-500 dark:text-gray-400">
              You can add this later if you're not sure yet
            </Text>
          )}
        </div>

        <div className="max-w-md mx-auto">
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

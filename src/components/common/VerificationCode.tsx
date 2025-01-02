import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import { Heading, Text } from '../../ui/Typography';
import { staggerChildren } from '../../ui/animations';
import { Layout } from '../../ui/Layout';
import { verifyCode } from '../../ducks/auth/actions';
import { useDispatch } from 'react-redux';

export default function VerificationCode() {
  const { state, dispatch } = useOnboarding();
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method') as 'phone' | 'email' | 'social';
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(59);
  const [code, setCode] = useState(["", "", "", ""]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const _dispatch = useDispatch()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Autofocus first input on mount
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleCodeChange = async (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      console.log("Code digit entered:", { index, value });
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        console.log("Moving focus to next input");
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }

      // If all digits are filled, proceed
      if (newCode.every((digit) => digit) && value) {
        console.log("Verification code complete:", newCode.join(""));
       

        _dispatch(verifyCode({
          payload:{
            mobile_number:method === 'phone' ? state.userData.mobile_number : null,
            email:method === 'email' ? state.userData.email : null,
            verification_code:newCode.join("")
          },
          callback:()=>navigate('/services')
        }))
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  if (state.loading) {
    return (
      <Layout maxWidth="md">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying...</p>
        </div>
      </Layout>
    );
  }

  if (state.error) {
    return (
      <Layout maxWidth="md">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">{state.error}</p>
          <button
            onClick={() => {
              dispatch({ type: "SET_ERROR", payload: null });
              setCode(["", "", "", ""]);
              if (firstInputRef.current) {
                firstInputRef.current.focus();
              }
            }}
            className="text-primary-gold hover:text-primary-gold/80"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout maxWidth="md">
      <Heading className="mb-4 text-center">
        {state.userData.authMethod === "phone"
          ? "Verify Your Phone"
          : "Verify Your Phone Number"}
      </Heading>

      <Text className="text-center mb-8">
        {state.userData.phone
          ? `A verification code has been sent to ${state.userData.phone}`
          : "A verification code has been sent to your phone number"}
      </Text>

      <motion.div
        {...staggerChildren}
        className="flex justify-center gap-4 mb-8"
      >
        {code.map((digit, index) => (
          <input
            key={index}
            ref={index === 0 ? firstInputRef : null}
            id={`code-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-16 h-16 text-center text-2xl border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-gold focus:ring-0 bg-white dark:bg-primary-navy/50 text-gray-900 dark:text-white"
          />
        ))}
      </motion.div>

      <Text className="text-center">Code expires in {timeLeft} seconds</Text>

      {timeLeft === 0 && (
        <button
          onClick={() => setTimeLeft(59)}
          className="mt-4 w-full text-primary-gold dark:text-primary-gold py-2 hover:text-primary-gold/80"
        >
          Resend Code
        </button>
      )}
    </Layout>
  );
}

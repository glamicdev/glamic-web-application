import { useState } from "react";
import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { PhoneInput } from "../../ui/PhoneInput";
import { Heading } from "../../ui/Typography";
import { Divider } from "../../ui/Divider";
import { fadeIn, staggerChildren } from "../../ui/animations";
import { useOnboarding } from "../../context/OnboardingContext";
import {
  signInWithEmail,
  signInWithPhone,
  signInWithGoogle,
  signInWithApple,
} from "../../services/auth";
import { validateEmail } from "../../utils/validation";
import { normalizePhoneNumber } from "../../utils/phoneNumber";

export default function AuthOptions() {
  const { state, dispatch } = useOnboarding();
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneState, setPhoneState] = useState({
    value: value,
    isValid: false,
  });

  const handleContinue = async () => {
    setError(null);

    const currentValue = authMethod === "phone" ? phoneState.value : value;

    if (!currentValue) {
      setError("This field is required");
      return;
    }

    if (authMethod === "email" && !validateEmail(currentValue)) {
      setError("Please enter a valid email address");
      return;
    }

    if (authMethod === "phone" && !phoneState.isValid) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);

    try {
      const response = await (authMethod === "phone"
        ? signInWithPhone(normalizePhoneNumber(phoneState.value))
        : signInWithEmail(currentValue));

      if (response.success) {
        dispatch({
          type: "SET_USER_DATA",
          payload: {
            phone: authMethod === "phone" ? phoneState.value : "",
            email: authMethod === "email" ? currentValue : "",
            authMethod,
          },
        });
        dispatch({ type: "SET_STEP", payload: 2 });
      } else {
        setError(response.error || "Authentication failed");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "apple") => {
    setLoading(true);
    setError(null);
    console.log(`Attempting ${provider} authentication`);

    try {
      const response = await (provider === "google"
        ? signInWithGoogle()
        : signInWithApple());

      console.log(`${provider} auth response:`, response);

      if (response.success) {
        console.log(
          "Social authentication successful, updating user data:",
          response.data?.user
        );
        dispatch({
          type: "SET_USER_DATA",
          payload: {
            authMethod: "social",
            ...(response.data?.user || {}),
          },
        });
        dispatch({ type: "SET_STEP", payload: 2 });
      } else {
        console.error("Social authentication failed:", response.error);
        setError(response.error || "Authentication failed");
      }
    } catch (err) {
      console.error("Social authentication error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMethod = () => {
    setAuthMethod(authMethod === "phone" ? "email" : "phone");
    setValue("");
    setPhoneState((prev) => ({ ...prev, value: "", isValid: false }));
    setError(null);
  };

  return (
    <motion.div {...fadeIn} className="w-full max-w-md mx-auto space-y-6 p-8">
      <Heading className="mb-8 text-center">Log in or Sign Up</Heading>

      <motion.div {...fadeIn} className="text-center mb-12">
        Create an account or log in to manage your business
      </motion.div>

      <motion.div {...staggerChildren} className="space-y-4">
        <Button variant="outline" onClick={toggleAuthMethod} fullWidth>
          Continue with {authMethod === "phone" ? "Email" : "Phone"}
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth("google")}
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <Button
          variant="outline"
          icon={Apple}
          fullWidth
          onClick={() => handleSocialAuth("apple")}
          disabled={loading}
        >
          Continue with Apple
        </Button>
      </motion.div>

      <Divider text="OR" />

      <motion.div {...staggerChildren} className="space-y-4">
        {authMethod === "phone" ? (
          <PhoneInput
            value={value}
            onChange={(value) => {
              setPhoneState((prev) => ({ ...prev, value }));
              setValue(value); // Update parent state as well
            }}
            onValidChange={(isValid) => {
              setPhoneState((prev) => ({ ...prev, isValid }));
            }}
            error={error}
            disabled={loading}
          />
        ) : (
          <Input
            type="email"
            placeholder="Email Address"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            error={error}
            disabled={loading}
          />
        )}
        <Button
          variant="primary"
          fullWidth
          onClick={handleContinue}
          disabled={
            loading ||
            (authMethod === "phone" ? !phoneState.isValid : !value.trim())
          }
        >
          {loading ? "Please wait..." : "Continue"}
        </Button>
      </motion.div>
    </motion.div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "../../context/OnboardingContext";
import { Heading, Text } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import { DollarSign } from "lucide-react";
import { fadeIn, staggerChildren } from "../../ui/animations";
import { Layout } from "../../ui/Layout";
import { extractCountryFromAddress } from "../../utils/address";
import { saveCashPaymentSettings } from "../../services/api";

const getDefaultInstructions = (countryCode: string, email: string) => {
  if (countryCode === "US") {
    return `Please send the payment via [Venmo/PayPal/Zelle] to my [email address/username/phone number], and include your appointment ID in the notes. Kindly notify me once the payment has been made.`;
  }
  return `Please e-transfer to my email address ${email} and mention your appointment ID in the notes. Please notify me when you make the payment.`;
};

export default function CashPaymentSettings() {
  const { state, dispatch } = useOnboarding();
  const countryCode = extractCountryFromAddress(
    state.serviceLocation.billingAddress || ""
  );
  const [instructions, setInstructions] = useState(
    state?.paymentSettings?.cashInstructions ||
      getDefaultInstructions(countryCode, state.userData.email)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (instructions.trim()) {
      setLoading(true);
      setError(null);

      try {
        console.log("Saving cash payment instructions:", instructions);
        const response = await saveCashPaymentSettings(instructions.trim());

        if (!response.success) {
          throw new Error(
            response.error || "Failed to save cash payment settings"
          );
        }

        console.log("Cash payment settings saved successfully:", response.data);

        // Update state with confirmed instructions
        dispatch({
          type: "SET_PAYMENT_SETTINGS",
          payload: {
            ...state?.paymentSettings,
            cashInstructions: instructions.trim(),
          },
        });

        // Navigate to CreditCardPayments
        dispatch({ type: "SET_STEP", payload: 29 });
      } catch (err) {
        console.error("Error saving cash payment settings:", err);
        setError("Failed to save settings. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout maxWidth="md">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-primary-gold/10 text-primary-gold px-4 py-2 rounded-full mb-4"
        >
          <DollarSign className="w-4 h-4" />
          <span className="text-sm font-medium">Cash Payments</span>
        </motion.div>

        <Heading className="mb-4">Cash Payment Instructions</Heading>

        <Text className="max-w-2xl mx-auto">
          Customize the payment instructions that clients will receive via SMS
          after booking. The deposit amount will be automatically added to the
          message.
        </Text>
      </div>

      <motion.div
        variants={staggerChildren}
        className="space-y-6 max-w-xl mx-auto"
      >
        {/* Country Tag */}
        <div className="inline-flex items-center gap-2 bg-primary-gold/10 text-primary-gold px-4 py-2 rounded-full">
          <span className="text-sm font-medium">
            {countryCode === "US"
              ? "USA Cash Instructions"
              : "Canada Cash Instructions"}
          </span>
        </div>

        {/* Instructions Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Payment Instructions
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter your payment instructions..."
            className="w-full min-h-[150px] px-6 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-primary-gold focus:ring-0 text-lg resize-none bg-white dark:bg-primary-navy/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            rows={6}
          />
        </div>

        <motion.div variants={fadeIn} className="flex justify-center pt-4">
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading || !instructions.trim()}
            className="w-full"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </motion.div>
      </motion.div>
    </Layout>
  );
}

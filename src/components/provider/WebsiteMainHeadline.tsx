import { useState } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "../../context/OnboardingContext";
import { Heading, Text } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import { Type } from "lucide-react";
import { fadeIn, staggerChildren } from "../../ui/animations";
import { saveWebsiteHeadline } from "../../services/api";

export default function WebsiteMainHeadline() {
  const { state, dispatch } = useOnboarding();
  const [headline, setHeadline] = useState("Pure Beauty Perfected");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Saving headline:", headline);
      const response = await saveWebsiteHeadline(headline);

      if (!response.success) {
        throw new Error(response.error || "Failed to save headline");
      }

      console.log("Headline saved successfully:", response.data);

      // Update state with confirmed headline
      dispatch({
        type: "SET_WEBSITE_HEADLINE",
        payload: {
          title: headline.trim(),
          subtitle: state.websiteHeadline?.subtitle || "",
        },
      });

      // Navigate to WebsiteSubheadline
      dispatch({ type: "SET_STEP", payload: 21 });
    } catch (err) {
      console.error("Error saving headline:", err);
      setError("Failed to save headline. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div {...fadeIn} className="w-full max-w-xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-primary-gold/10 text-primary-gold px-4 py-2 rounded-full mb-4"
        >
          <Type className="w-4 h-4" />
          <span className="text-sm font-medium">Main Headline</span>
        </motion.div>

        <Heading className="mb-4">Create Your Main Headline</Heading>

        <Text className="max-w-md mx-auto">
          Your main headline is the first thing visitors will see. Make it
          clear, compelling, and focused on your core value proposition.
        </Text>
      </div>

      <motion.div variants={staggerChildren} className="space-y-8">
        <div className="space-y-6">
          {/* Examples */}
          <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border-2 border-gray-200 dark:border-white/10">
            <Text className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Example Headlines:
            </Text>
            <div className="space-y-4 text-gray-600">
              <div className="font-semibold text-gray-700 dark:text-gray-300">
                "Professional Makeup Artist for Your Special Day"
              </div>
              <div className="font-semibold text-gray-700 dark:text-gray-300">
                "Expert Hair Styling in New York City"
              </div>
              <div className="font-semibold text-gray-700 dark:text-gray-300">
                "Transform Your Look with Expert Beauty Services"
              </div>
            </div>
          </div>

          {/* Input Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Main Headline
            </label>
            <textarea
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter your main headline..."
              className="w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-primary-gold focus:ring-0 text-lg resize-none bg-white dark:bg-primary-navy dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              rows={2}
              maxLength={60}
            />
            <Text className="text-sm text-gray-500 text-right">
              {headline.length}/60 characters
            </Text>
          </div>
        </div>

        <motion.div variants={fadeIn} className="grid gap-4">
          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

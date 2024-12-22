import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "../../context/OnboardingContext";
import { Heading } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import {
  Calendar,
  Clock,
  RefreshCw,
  CalendarRange,
  ChevronDown,
} from "lucide-react";
import { fadeIn, staggerChildren } from "../../ui/animations";
import { Layout } from "../../ui/Layout";
import { Dropdown, DropdownItem } from "../../ui/Dropdown";

const bookingWindows = [
  { value: "1m", label: "1 Month" },
  { value: "2m", label: "2 Months" },
  { value: "3m", label: "3 Months" },
  { value: "6m", label: "6 Months" },
  { value: "1y", label: "1 Year" },
  { value: "18m", label: "18 Months" },
];

const noticeOptions = [
  { value: "4h", label: "4 Hours" },
  { value: "6h", label: "6 Hours" },
  { value: "24h", label: "24 Hours" },
  { value: "2d", label: "2 Days" },
  { value: "1w", label: "1 Week" },
];

const rescheduleOptions = [
  { value: "4h", label: "4 Hours" },
  { value: "6h", label: "6 Hours" },
  { value: "24h", label: "24 Hours" },
  { value: "2d", label: "2 Days" },
  { value: "1w", label: "1 Week" },
];

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  onClick?: () => void;
  isButton?: boolean;
  children?: React.ReactNode;
}

function StatCard({
  icon,
  value,
  label,
  onClick,
  isButton,
  children,
}: StatCardProps) {
  const Component = isButton ? "button" : "div";
  return (
    <motion.div
      variants={fadeIn}
      className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition-all"
      onClick={onClick}
    >
      <div className="p-2 bg-primary-gold/10 dark:bg-white/10 rounded-xl text-primary-gold dark:text-white">
        {icon}
      </div>
      <div className="flex-1">
        {children || (
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {value}
          </div>
        )}
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      </div>
      {isButton && <ChevronDown className="w-5 h-5 text-gray-400" />}
    </motion.div>
  );
}

export default function AvailabilityConfirmation() {
  const { state, dispatch } = useOnboarding();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNoticeDropdown, setShowNoticeDropdown] = useState(false);
  const [showRescheduleDropdown, setShowRescheduleDropdown] = useState(false);
  const [selectedWindow, setSelectedWindow] = useState(() => {
    const saved = state.serviceLocation.scheduleSettings?.bookingWindow;
    return bookingWindows.find((w) => w.value === saved) || bookingWindows[4];
  });
  const [selectedNotice, setSelectedNotice] = useState(() => {
    const saved = state.serviceLocation.scheduleSettings?.minimumNotice;
    return noticeOptions.find((n) => n.value === saved) || noticeOptions[3];
  });
  const [selectedReschedule, setSelectedReschedule] = useState(() => {
    const saved = state.serviceLocation.scheduleSettings?.rescheduleWindow;
    return (
      rescheduleOptions.find((r) => r.value === saved) || rescheduleOptions[3]
    );
  });

  const handleAccept = () => {
    // Save settings to context
    dispatch({
      type: "SET_SERVICE_LOCATION",
      payload: {
        ...state.serviceLocation,
        scheduleSettings: {
          ...state.serviceLocation.scheduleSettings,
          bookingWindow: selectedWindow.value,
          minimumNotice: selectedNotice.value,
          rescheduleWindow: selectedReschedule.value,
        },
      },
    });

    dispatch({ type: "SET_STEP", payload: 14 });
  };

  return (
    <Layout maxWidth="2xl">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-primary-gold/10 text-primary-gold px-4 py-2 rounded-full mb-4"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Booking Settings</span>
        </motion.div>

        <Heading>Your Availability</Heading>
      </div>

      <motion.div variants={staggerChildren} className="grid gap-4 mb-12">
        <div className="relative">
          <StatCard
            icon={<CalendarRange className="w-5 h-5" />}
            value={selectedWindow.label}
            label="Advance booking window"
            isButton
            onClick={() => setShowDropdown(!showDropdown)}
          />

          <Dropdown
            isOpen={showDropdown}
            onClose={() => setShowDropdown(false)}
          >
            {bookingWindows.map((window) => (
              <DropdownItem
                key={window.value}
                onClick={() => {
                  setSelectedWindow(window);
                  setShowDropdown(false);
                }}
                selected={selectedWindow.value === window.value}
              >
                <span className="font-medium">{window.label}</span>
              </DropdownItem>
            ))}
          </Dropdown>
        </div>

        <div className="relative">
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            value={selectedNotice.label}
            label="Minimum notice required"
            isButton
            onClick={() => setShowNoticeDropdown(!showNoticeDropdown)}
          />

          <Dropdown
            isOpen={showNoticeDropdown}
            onClose={() => setShowNoticeDropdown(false)}
          >
            {noticeOptions.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => {
                  setSelectedNotice(option);
                  setShowNoticeDropdown(false);
                }}
                selected={selectedNotice.value === option.value}
              >
                <span className="font-medium">{option.label}</span>
              </DropdownItem>
            ))}
          </Dropdown>
        </div>

        <div className="relative">
          <StatCard
            icon={<RefreshCw className="w-5 h-5" />}
            value={selectedReschedule.label}
            label="Rescheduling window. Customers can't reschedule or cancel after this window is finished"
            isButton
            onClick={() => setShowRescheduleDropdown(!showRescheduleDropdown)}
          />

          <Dropdown
            isOpen={showRescheduleDropdown}
            onClose={() => setShowRescheduleDropdown(false)}
          >
            {rescheduleOptions.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => {
                  setSelectedReschedule(option);
                  setShowRescheduleDropdown(false);
                }}
                selected={selectedReschedule.value === option.value}
                className="text-gray-900 dark:text-white"
              >
                <span className="font-medium">{option.label}</span>
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </motion.div>

      <motion.div variants={fadeIn} className="grid gap-4">
        <Button variant="primary" onClick={handleAccept} fullWidth>
          Save
        </Button>
      </motion.div>
    </Layout>
  );
}

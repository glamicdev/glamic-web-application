export interface SubscriptionManagementTranslations {
  title: string;
  subtitle: string;
  features: {
    earnings: {
      title: string;
      description: string;
    };
    time: {
      title: string;
      description: string;
    };
    image: {
      title: string;
      description: string;
    };
  };
  plans: {
    yearly: string;
    monthly: string;
    currentPlan: string;
    yearPeriod: string;
    monthPeriod: string;
    savings: string;
    equivalent: string;
    pricePerDay: string;
  };
  currentPlan: string;
  switchButton: string;
  cancelButton: string;
}

export interface SubscriptionCancelTranslations {
  title: string;
  subtitle: string;
  benefits: {
    website: {
      title: string;
      description: string;
    };
    policies: {
      title: string;
      description: string;
    };
    customization: {
      title: string;
      description: string;
    };
    marketplace: {
      title: string;
      description: string;
    };
    features: {
      title: string;
      description: string;
    };
    pricing: {
      title: string;
      description: string;
    };
  };
  confirmButton: string;
  feedback: {
    title: string;
    subtitle: string;
    reasons: {
      features: string;
      expensive: string;
      buggy: string;
      otherSoftware: string;
      hardToUse: string;
    };
    detailsPrompt: string;
    submitButton: string;
  };
  modal: {
    title: string;
    message: string;
    closeButton: string;
  };
}

export interface SubscriptionSwitchTranslations {
  title: string;
  subtitle: string;
  comparison: {
    monthly: {
      label: string;
      price: string;
      period: string;
    };
    annual: {
      label: string;
      price: string;
      period: string;
    };
    savings: string;
  };
  benefits: {
    cost: {
      title: string;
      description: string;
    };
    price: {
      title: string;
      description: string;
    };
    support: {
      title: string;
      description: string;
    };
    access: {
      title: string;
      description: string;
    };
  };
  confirmButton: string;
  priceNote: string;
  modal: {
    title: string;
    message: string;
    closeButton: string;
  };
}

export interface ServiceCategoriesTranslations {
  title: string;
  subtitle: string;
  saving: string;
  continue: string;
  categories: {
    makeup: string;
    nails: string;
    sprayTan: string;
    hair: string;
    waxing: string;
    esthetics: string;
    henna: string;
    eyelashes: string;
    eyelashesEyebrows: string;
    hairstyling: string;
    barber: string;
    wedding: string;
  };
}

export interface Translations {
  subscriptionManagement: SubscriptionManagementTranslations;
  subscriptionCancel: SubscriptionCancelTranslations;
  subscriptionSwitch: SubscriptionSwitchTranslations;
  services: ServiceCategoriesTranslations;
}

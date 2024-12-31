import React from "react";

export interface ToastMethods {
  show: (message: string, alertType: 'error' | 'success' | 'info', duration?: number) => void;
  hide: () => void;
};

class ToastHandler {
  private static toastRef: React.MutableRefObject<ToastMethods | null> = { current: null };

  public static setToastRef(ref: ToastMethods | null) {
    ToastHandler.toastRef.current = ref;
  }

  public static showToast(
    message: string, 
    alertType: 'error' | 'success' | 'info' = 'error', 
    duration: number = 3000
  ) {
    if (ToastHandler.toastRef.current) {
      ToastHandler.toastRef.current.show(message, alertType, duration);
    }
  }

  public static hideToast() {
    if (ToastHandler.toastRef.current) {
      ToastHandler.toastRef.current.hide();
    }
  }
}

// Helper functions for easier usage
export const showSuccessToast = (message: string, duration?: number) => {
  ToastHandler.showToast(message, 'success', duration);
};

export const showErrorToast = (message: string, duration?: number) => {
  ToastHandler.showToast(message, 'error', duration);
};

export const showInfoToast = (message: string, duration?: number) => {
  ToastHandler.showToast(message, 'info', duration);
};

export const hideToast = () => {
  ToastHandler.hideToast();
};

export default ToastHandler;

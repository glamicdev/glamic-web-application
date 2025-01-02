import React, { createContext, useContext, useReducer } from 'react';

interface AuthState {
  authMethod: 'phone' | 'email' | 'social' | null;
  business_name: string;
  full_name: string;
  last_name: string;
  email: string;
  instagram: string;
  mobile_number: string;
  timezone: string;
  loading: boolean;
  error: string | null;
}

type AuthAction = 
  | { type: 'SET_AUTH_METHOD'; payload: AuthState['authMethod'] }
  | { type: 'UPDATE_AUTH_DATA'; payload: Partial<AuthState> }
  | { type: 'RESET_AUTH_DATA' }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AuthState = {
  authMethod: null,
  business_name: '',
  full_name: '',
  last_name: '',
  email: '',
  instagram: '',
  mobile_number: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  loading: false,
  error: null
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_AUTH_METHOD':
      return {
        ...state,
        authMethod: action.payload
      };
    case 'UPDATE_AUTH_DATA':
      return {
        ...state,
        ...action.payload
      };
    case 'RESET_AUTH_DATA':
      return initialState;
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

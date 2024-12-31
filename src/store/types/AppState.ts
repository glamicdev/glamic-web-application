import { User } from "../../ducks/auth/types";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
}

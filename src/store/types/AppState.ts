import { User } from "../../ducks/auth/types";
import { ServiceCategoriesState } from "../../ducks/serviceCategories/types";
import { RequestFlagsState } from "../../ducks/requestFlags/types";

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  serviceCategories: ServiceCategoriesState;
  requestFlags: RequestFlagsState;
}

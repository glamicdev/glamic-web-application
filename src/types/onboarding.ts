export interface UserData {
  authMethod?: 'phone' | 'email' | 'social';
  businessName: string;
  full_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  instagram: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

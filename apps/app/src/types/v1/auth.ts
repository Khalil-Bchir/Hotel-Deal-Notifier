export interface AuthState {
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  user: User | null;
}

interface User {
  id: string;
  email: string;
  name: string;
}

import { createContext } from "react";

import type {
  SignInInput,
  SignUpInput,
} from "../graphql/__generated__/graphql";

export type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (input: SignInInput) => void;
  signUp: (input: SignUpInput) => void;
  logOut: () => void;
  signInLoading: boolean;
  signUpLoading: boolean;
  logOutLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

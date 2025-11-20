import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation } from "@apollo/client/react";

import {
  SignInDocument,
  SignUpDocument,
  LogOutDocument,
} from "../graphql/__generated__/graphql";
import { AuthContext, type AuthContextType } from "./auth-context";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [signInMutation] = useMutation(SignInDocument, {
    onCompleted: (data) => {
      setTokenToStorage(data?.auth.signIn?.token);
    },
  });
  const [signUpMutation] = useMutation(SignUpDocument, {
    onCompleted: (data) => {
      setTokenToStorage(data?.auth.signUp?.token);
    },
  });
  const [logOutMutation] = useMutation(LogOutDocument, {
    onCompleted: () => {
      setTokenToStorage();
    },
  });

  const setTokenToStorage = useCallback((token?: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setIsAuthenticated(!!token);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTokenToStorage(token);
  }, [setTokenToStorage]);

  const value: AuthContextType = useMemo(
    () => ({
      isInitialized,
      isAuthenticated,
      signIn: (input) => signInMutation({ variables: { input } }),
      signUp: (input) => signUpMutation({ variables: { input } }),
      logOut: logOutMutation,
    }),
    [
      isInitialized,
      isAuthenticated,
      signInMutation,
      signUpMutation,
      logOutMutation,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

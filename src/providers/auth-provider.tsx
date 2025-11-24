import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useApolloClient, useMutation } from "@apollo/client/react";

import {
  SignInDocument,
  SignUpDocument,
  LogOutDocument,
  type SignInInput,
  type SignUpInput,
} from "../graphql/__generated__/graphql";
import { AuthContext, type AuthContextType } from "./auth-context";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const apolloClient = useApolloClient();
  const [signInMutation, { loading: signInLoading }] = useMutation(
    SignInDocument,
    {
      onCompleted: (data) => {
        setTokenToStorage(data?.auth.signIn?.token);
      },
    }
  );
  const [signUpMutation, { loading: signUpLoading }] = useMutation(
    SignUpDocument,
    {
      onCompleted: (data) => {
        setTokenToStorage(data?.auth.signUp?.token);
      },
    }
  );
  const [logOutMutation, { loading: logOutLoading }] = useMutation(
    LogOutDocument,
    {
      onCompleted: () => {
        setTokenToStorage();
        apolloClient.clearStore();
      },
      onError: () => {
        setTokenToStorage();
        apolloClient.clearStore();
      },
    }
  );

  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const signIn = useCallback(
    (input: SignInInput) => {
      signInMutation({ variables: { input } });
    },
    [signInMutation]
  );

  const signUp = useCallback(
    (input: SignUpInput) => {
      signUpMutation({ variables: { input } });
    },
    [signUpMutation]
  );

  const logOut = useCallback(() => {
    logOutMutation();
  }, [logOutMutation]);

  const value: AuthContextType = useMemo(
    () => ({
      isInitialized,
      isAuthenticated,
      signIn,
      signUp,
      logOut,
      signInLoading,
      signUpLoading,
      logOutLoading,
    }),
    [
      isInitialized,
      isAuthenticated,
      signIn,
      signUp,
      logOut,
      signInLoading,
      signUpLoading,
      logOutLoading,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

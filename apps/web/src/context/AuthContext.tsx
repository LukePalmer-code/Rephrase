import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  type CognitoUserSession,
} from "amazon-cognito-identity-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { userPool } from "../lib/cognito";

type AuthUser = {
  email: string;
  idToken: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function sessionToUser(session: CognitoUserSession): AuthUser {
  const idToken = session.getIdToken();
  return {
    email: String(idToken.payload.email ?? ""),
    idToken: idToken.getJwtToken(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, check whether amazon-cognito-identity-js already has a
  // valid (or refreshable) session stashed in localStorage from a previous visit.
  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (!err && session?.isValid()) {
        setUser(sessionToUser(session));
      }
      setIsLoading(false);
    });
  }, []);

  function signIn(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
      const authDetails = new AuthenticationDetails({ Username: email, Password: password });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          setUser(sessionToUser(session));
          resolve();
        },
        onFailure: (err) => reject(err),
      });
    });
  }

  function signUp(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      const attributes = [new CognitoUserAttribute({ Name: "email", Value: email })];
      userPool.signUp(email, password, attributes, [], (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  function confirmSignUp(email: string, code: string) {
    return new Promise<void>((resolve, reject) => {
      const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
      cognitoUser.confirmRegistration(code, true, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  function signOut() {
    userPool.getCurrentUser()?.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, confirmSignUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import type { CognitoUserSession } from "amazon-cognito-identity-js";
import { userPool } from "./cognito";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function getIdToken(): Promise<string | null> {
  return new Promise((resolve) => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      resolve(null);
      return;
    }

    currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session?.isValid()) {
        resolve(null);
        return;
      }
      resolve(session.getIdToken().getJwtToken());
    });
  });
}

/** Fetch wrapper that attaches the current Cognito ID token as a Bearer header. */
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const idToken = await getIdToken();
  const headers = new Headers(init.headers);
  if (idToken) {
    headers.set("Authorization", `Bearer ${idToken}`);
  }
  return fetch(`${API_URL}${path}`, { ...init, headers });
}

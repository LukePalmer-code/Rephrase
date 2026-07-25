import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const clientId = import.meta.env.VITE_COGNITO_APP_CLIENT_ID;

if (!userPoolId || !clientId) {
  // Fails loudly at startup rather than producing confusing auth errors later.
  throw new Error(
    "Missing VITE_COGNITO_USER_POOL_ID or VITE_COGNITO_APP_CLIENT_ID — copy apps/web/.env.example to .env and fill them in.",
  );
}

export const userPool = new CognitoUserPool({
  UserPoolId: userPoolId,
  ClientId: clientId,
});

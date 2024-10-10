import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { ISODateString, TokenSet } from "next-auth/src/core/types";

declare module "next-auth" {
  interface Account extends Partial<TokenSet> {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    expires: ISODateString;
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    user?: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  }
}

import axios from "@/lib/axios";
import { getServerSession, NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  secret: process.env["NEXTAUTH_SECRET"],
  session: {
    strategy: "jwt",
    maxAge: 2_592_000, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    session({ session, token, ...rest }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;

      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
    jwt({ token, user, account, ...rest }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_at * 1000;
      }

      if (user) {
        token.user = user;
      }

      return token;
    },
  },
  events: {
    async signOut({ token }) {
      try {
        await axios.delete("/api/@me/logout", {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
      } catch (error) {
        //
      }
    },
  },
  providers: [
    {
      id: "theater",
      name: "Email",
      type: "oauth",
      version: "2.0",
      idToken: false,
      authorization: {
        url: `${process.env["NEXT_PUBLIC_API_URL"]}/oauth/authorize`,
        params: {
          scope: "",
        },
      },
      token: {
        url: `${process.env["NEXT_PUBLIC_API_URL"]}/oauth/token`,
      },
      userinfo: {
        url: `${process.env["NEXT_PUBLIC_API_URL"]}/api/@me`,
      },
      checks: ["pkce", "state"],
      client: {
        token_endpoint_auth_method: "none",
      },
      profile: ({ payload: profile }) => ({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      }),
      clientId: process.env["NEXTAUTH_CLIENT_ID"] as string,
      clientSecret: "",
    },
  ],
};

export default authOptions;

export const getCurrentSession = async () => {
  return await getServerSession(authOptions);
};

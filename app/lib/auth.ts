import {NextAuthOptions} from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authConfig: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
  ],
};

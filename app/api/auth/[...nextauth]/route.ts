import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process.env.AUTH_TWITTER_ID!,
      clientSecret: process.env.AUTH_TWITTER_SECRET!,
      version: "2.0",
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({session, token}: {session: any; token: any}) => {
      if (session?.user) {
        session.user.username = token.username;
      }
      if (session?.user) {
        session.user.uid = token.uid;
      }

      return session;
    },
    jwt: async ({token, profile}: {token: any; profile: any}) => {
      if (profile?.data) {
        token.username = profile.data.username;
        token.uid = profile.data.id;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions as any);

export {handler as GET, handler as POST};

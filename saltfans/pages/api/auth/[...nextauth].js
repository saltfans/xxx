import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";

const options = {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        issuer: process.env.AUTH0_ISSUER,
      }),
    ],
    database: {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
    },
  };
  
  export default (req, res) => NextAuth(req, res, options);
  
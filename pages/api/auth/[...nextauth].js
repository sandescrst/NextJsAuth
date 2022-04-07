import axios from "axios";
import NextAuth from "next-auth";
import { encode } from "next-auth/jwt";
import GoogleProviders from "next-auth/providers/google";
const encryption = require('jwt-simple');

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent", //consent
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: 
  {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token[account.provider] = {
          accessToken: account.access_token
        }
        // token.accessToken = account.oauth_token;
        console.log(account.access_token);
        let response = await axios.post(
          process.env.BACKEND_URL+"/rest-auth/google/",
          {
            access_token: account.access_token,
          }
        );
        
        const decoded_token = await encryption.encode(response.data["access"], process.env.NEXTAUTH_SECRET);
        token["a_token"] = decoded_token;
        console.log("ACCESS: ", response.data);
        // console.log("Encrypted: ", decoded_token);
      } 
      // console.log("token: ", token["google"]);
      // console.log("user: ", user);
      return token;
    },
    async session({ session, token }) {
      session.a_token = token["a_token"]

      return session
    }

  },
});

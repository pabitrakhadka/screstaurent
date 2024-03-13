import prisma from "@/db/db.config";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  pages: {
    signIn: "/auth/login",  
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      secret: process.env.JWT_SECRET_KEY,
    }),
    CredentialsProvider({
      name: "UserCredentials",
      async authorize(credentials, req) {
        try {
          const { email, password, loginType } = credentials;
          const url = process.env.AUTH_URL;

          if (loginType === "user") {
            const res = await axios.post(`${url}/userlogin`, { email, password });
            if (res.status === 200) {
              const user = res.data;
              user.email = user.id;
              user.image = "user";
              user.name = user.name;
              return user;
            } else {
              return null;
            }
          } else if (loginType === "admin") {
            const res = await axios.post(`${url}/adminlogin`, { email, password });
            if (res.status === 200) {
              const user = res.data;
              user.email = user.id;
              user.image = "admin";
              user.name = user.name;
              return user;
            } else {
              return null;
            }
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
 
  
});

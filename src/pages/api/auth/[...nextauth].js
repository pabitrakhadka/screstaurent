import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    pages: {
      signIn: "/login", // Default sign-in page
      // signOut: '/auth/signout',
      // error: '/auth/error',
      // verifyRequest: '/auth/verify-request',
      // newUser: '/auth/new-user',
      signIn: {
        user: "/login", // Sign-in page for users
        admin: "/admin", // Sign-in page for admins
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "UserCredentials",
      async authorize(credentials, req) {
        try {
          const { email, password ,loginType} = credentials;
          const url =process.env.AUTH_URL;
         
         
          if (loginType === "user") {
            const res = await axios.post(`${url}/userlogin`, { email, password });
            if (res.status === 200) {
           
              const user = res.data;
              user.email = user.id;
              user.image = "user";
              
              user.name = user.name;
              return user;
            } else {
              console.log("else retur null");
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
          console.log("catch error");
          return null; // Handle error cases gracefully
        }
      },
    }),
  ],
});

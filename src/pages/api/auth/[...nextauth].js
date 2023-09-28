import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          const res = await axios.post('http://screstaurent.vercel.app/api/login', { email, password });

          if (res.data.status) {
            console.log("res:", res.data.result);
            const user = res.data.result;
            user.email = user.result[0].user_id;
            user.name = user.result[0].user_name;
            
            return user;

          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          console.log("catch error");

        }
      }
    })
  ]
})
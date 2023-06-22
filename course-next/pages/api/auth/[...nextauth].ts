import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "../addMeetup";

export const authOptions: NextAuthOptions = {
  // page:
  pages: {
    signIn: "/auth/login",
  },
  // session def
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "clientID",
      clientSecret: "secretSecret",
    }),
    // ...add more providers here
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "Example email",
          type: "Email",
        },
        password: {
          label: "Password",
          placeholder: "*******",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        console.log("Authorization : Started singIn");

        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const db = await connectToDb();
          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({ email: email });

          /**/
          if (user) {
            if (user.password === password)
              return {
                id: user._id.toString(),
                name: user.firstName + " " + user.lastName,
                email: user.email,
              };
            else throw new Error("Invalide password");
          } else throw new Error("Invalide email");
        } catch (error) {
          throw new Error("Credentials arenot correct");
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);

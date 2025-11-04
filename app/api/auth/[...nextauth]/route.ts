import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        const userRef = doc(db, "users", email);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) throw new Error("User not found");

        const userData = userSnap.data();

        const isValid = await compare(password, userData.passwordHash);
        if (!isValid) throw new Error("Invalid credentials");

        return { id: email, name: userData.name, email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const ref = doc(db, "users", user.email!);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, {
            name: user.name,
            email: user.email,
            provider: "google",
          });
        }
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
  },

  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

function isGoogleProfile(profile: unknown): profile is { picture?: string } {
  return (
    typeof profile === "object" &&
    profile !== null &&
    "picture" in (profile as Record<string, unknown>)
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user?.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? undefined,
          image: user.image ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google" || !user.email) return true;

      try {
        const image = isGoogleProfile(profile)
          ? (profile.picture ?? null)
          : null;
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "User",
              image,
              password: null,
            },
          });
        } else if (image) {
          await prisma.user.update({
            where: { email: user.email },
            data: { image },
          });
        }
      } catch (error) {
        console.error("[NextAuth] Error saving Google user:", error);
        return false;
      }

      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google" && user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser) {
          token.id = String(dbUser.id);
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.picture =
            dbUser.image ??
            (isGoogleProfile(profile) ? (profile.picture ?? null) : null);
        }
        return token;
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        if ("image" in user && user.image) {
          token.picture = user.image;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.email = (token.email as string) ?? session.user.email;
        session.user.name = (token.name as string) ?? session.user.name;
        session.user.image = (token.picture as string | null) ?? null;
      }
      return session;
    },
  },
});

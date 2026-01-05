import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

/**
 * Type guard برای تشخیص profile ای که شامل picture است.
 */
function isGoogleProfile(profile: unknown): profile is { picture?: string } {
  return (
    typeof profile === "object" &&
    profile !== null &&
    "picture" in (profile as Record<string, unknown>)
  );
}

// بررسی اینکه credentials درست هستند
const googleClientId = process.env.GOOGLE_CLIENT_ID ?? "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";

if (!googleClientId || !googleClientSecret) {
  console.error("[NextAuth] ❌ GOOGLE_CLIENT_ID یا GOOGLE_CLIENT_SECRET در .env تنظیم نشده است!");
} else {
  console.log("[NextAuth] ✅ Google OAuth credentials loaded:", {
    clientId: googleClientId.substring(0, 20) + "...",
    hasSecret: !!googleClientSecret,
  });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // استفاده از JWT strategy - adapter را برای OAuth استفاده نمی‌کنیم
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        // اگر کاربر OAuth است (password ندارد)، نمی‌تواند با credentials لاگین کند
        if (!user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

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
      console.log("[NextAuth] signIn callback:", {
        provider: account?.provider,
        email: user.email,
        hasProfile: !!profile,
      });

      // وقتی کاربر از Google لاگین می‌کند، او را در دیتابیس ذخیره می‌کنیم
      if (account?.provider === "google" && user.email) {
        try {
          // بررسی می‌کنیم که آیا کاربر قبلاً وجود دارد یا نه
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            // اگر کاربر وجود ندارد، ایجاد می‌کنیم
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "User",
                image: isGoogleProfile(profile) ? profile.picture : null,
                password: null, // برای OAuth users password نداریم
              },
            });
            console.log("[NextAuth] Created new user:", newUser.email);
          } else {
            // اگر کاربر وجود دارد، image را به‌روزرسانی می‌کنیم
            if (isGoogleProfile(profile) && profile.picture) {
              await prisma.user.update({
                where: { email: user.email },
                data: { image: profile.picture },
              });
              console.log("[NextAuth] Updated user image:", user.email);
            }
          }
        } catch (error) {
          console.error("[NextAuth] Error saving user to database:", error);
          // در صورت خطا، اجازه می‌دهیم که لاگین ادامه یابد
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        
        // اگر این لاگین از Google آمده و profile شامل picture است → ست کن
        if (account?.provider === "google" && isGoogleProfile(profile)) {
          token.picture = profile.picture ?? null;
        }
        
        // اگر user از Google provider آمده و image دارد
        if (account?.provider === "google" && user.image) {
          token.picture = user.image;
        }
        
        // اگر authorize در Credentials مقدار image برگردانده
        if ("image" in user && user.image) {
          token.picture = (user as { image?: string | null }).image ?? null;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = (token.picture as string | null) ?? null;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      console.log("[NextAuth] Redirect callback:", { url, baseUrl });
      
      // اگر url خالی یا /login است، به home redirect کن
      if (url === baseUrl || url === `${baseUrl}/` || url === `${baseUrl}/login` || url === "/login") {
        console.log("[NextAuth] Redirecting to home");
        return `${baseUrl}/`;
      }
      
      // اگر url یک مسیر داخلی است (شروع با /)
      if (url.startsWith("/")) {
        const finalUrl = `${baseUrl}${url}`;
        console.log("[NextAuth] Redirecting to:", finalUrl);
        return finalUrl;
      }

      // اگر url یک URL کامل است
      try {
        const parsedUrl = new URL(url);
        // اگر origin با baseUrl یکی است، اجازه بده
        if (parsedUrl.origin === baseUrl) {
          console.log("[NextAuth] Redirecting to same origin:", url);
          return url;
        }
        // اگر origin متفاوت است (مثل Google OAuth)، اجازه بده که redirect شود
        console.log("[NextAuth] Allowing external redirect:", url);
        return url;
      } catch (error) {
        console.error("[NextAuth] Error parsing URL:", error);
        // در صورت خطا در parse کردن URL، به home بازگردان
        return `${baseUrl}/`;
      }
    },
  },
});

export const { GET, POST } = handlers;

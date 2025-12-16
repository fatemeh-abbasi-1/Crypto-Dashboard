// import { PrismaAdapter } from "@auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import type { AuthOptions } from "next-auth";
// import bcrypt from "bcryptjs";

// import { prisma } from "@/lib/prisma";

// /**
//  * Auth options for NextAuth.
//  * - PrismaAdapter: برای ذخیره کاربران / accounts / sessions در دیتابیس
//  * - CredentialsProvider: ورود با ایمیل/پسورد
//  * - GoogleProvider: OAuth با گوگل
//  *
//  * Callbacks:
//  * - jwt: وقتی user بعد از لاگین آمده، id را در token قرار می‌دهیم
//  * - session: مقدار id را از token به session.user.id منتقل می‌کنیم
//  * - redirect: ریدایرکت ایمن پس از لاگین/لاگ‌اوت
//  */
// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(prisma),

//   // استفاده از JWT strategy (می‌تونی به session strategy: "database" تغییر بدی اگر خواستی)
//   session: { strategy: "jwt" },

//   // حتما در .env مقدار NEXTAUTH_SECRET را قرار بده
//   secret: process.env.NEXTAUTH_SECRET,

//   providers: [
//     // Google OAuth
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     }),

//     // Credentials (email + password)
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       // تابع authorize با امضای مورد انتظار NextAuth (credentials, req)
//       // از `unknown` برای req استفاده شده تا از any جلوگیری شود.
//       async authorize(
//         credentials: Record<"email" | "password", string> | undefined,
//         _req: unknown
//       ) {
//         if (!credentials?.email || !credentials.password) {
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null;

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isValid) return null;

//         // NextAuth expects user properties (id, email, name...)
//         // Convert id explicitly to string to match our typings/augmentation.
//         return {
//           id: String(user.id),
//           email: user.email,
//           name: user.name ?? undefined,
//         };
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/",
//   },

//   callbacks: {
//     /**
//      * jwt callback:
//      * - وقتی user تازه لاگین کرده باشد، user در دسترس است.
//      * - ما id کاربر را داخل token قرار می‌دهیم تا بعداً در session قابل دسترس شود.
//      */
//     async jwt({ token, user }) {
//       if (user && "id" in user) {
//         // user.id ممکن است number یا string باشد، پس صریحا به string تبدیل می‌کنیم
//         token.id = String((user as { id: string | number }).id);
//       }
//       return token;
//     },

//     /**
//      * session callback:
//      * - مقادیر اضافی را از token به session منتقل می‌کنیم.
//      * - پس از augmentation، session.user.id تایپ شده است.
//      */
//     async session({ session, token }) {
//       if (session.user && token.id) {
//         session.user.id = String(token.id);
//       }
//       return session;
//     },

//     /**
//      * redirect callback:
//      * - از redirect های امن اطمینان حاصل می‌کند.
//      */
//     async redirect({ url, baseUrl }) {
//       // مسیرهای داخلی را نسبت به baseUrl بازمی‌گردانیم
//       try {
//         // اگر url مسیر شروع‌شده با '/' است، آن را به baseUrl الحاق کن
//         if (url.startsWith("/")) return `${baseUrl}${url}`;

//         // اگر url یک URL کامل است که origin آن با baseUrl یکی است، اجازه بده
//         const destUrl = new URL(url);
//         if (destUrl.origin === baseUrl) return url;
//       } catch {
//         // در صورت خطا، به baseUrl بازگردان
//       }

//       return baseUrl;
//     },
//   },
// };
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

/**
 * Type guard برای تشخیص profile ای که شامل picture است.
 * - بدون استفاده از `any`
 * - بدون تداخل با تایپ‌های داخلی GoogleProvider
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

export const authOptions: AuthOptions = {
  // استفاده از JWT strategy برای CredentialsProvider
  // PrismaAdapter را حذف می‌کنیم و user را به صورت دستی ذخیره می‌کنیم
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // فعال کردن debug mode

  providers: [
    // GoogleProvider — بدون generic سفارشی تا با constraint های داخلی تداخل نداشته باشیم
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),

    // Credentials
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // اگر کاربر OAuth است (password ندارد)، نمی‌تواند با credentials لاگین کند
        if (!user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
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

  pages: {
    signIn: "/login", // صفحه لاگین واقعی
    error: "/login", // اگر OAuthCallback یا خطای دیگر باشد
  },
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
        // این برای OAuth flow ضروری است
        console.log("[NextAuth] Allowing external redirect:", url);
        return url;
      } catch (error) {
        console.error("[NextAuth] Error parsing URL:", error);
        // در صورت خطا در parse کردن URL، به baseUrl بازگردان
      return baseUrl;
      }
    },
  },
};

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
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

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return { id: user.id + "", email: user.email, name: user.name };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  // ✅ مسیر ریدایرکت بعد از لاگین و لاگ‌اوت
  callbacks: {
    async redirect({ url, baseUrl }) {
      // اگر از login اومده → بفرست به صفحه اصلی
      if (url === "/") return baseUrl;
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

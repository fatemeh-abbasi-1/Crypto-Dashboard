import { NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET - دریافت portfolio کاربر
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);
    
    const portfolio = await prisma.portfolio.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("Portfolio GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST - اضافه کردن یا به‌روزرسانی دارایی
export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);
    const { coinId, coinSymbol, amount } = await req.json();

    if (!coinId || !coinSymbol || amount === undefined) {
      return NextResponse.json(
        { error: "coinId, coinSymbol, and amount are required" },
        { status: 400 }
      );
    }

    const portfolio = await prisma.portfolio.upsert({
      where: {
        userId_coinId: {
          userId,
          coinId,
        },
      },
      update: {
        amount,
        updatedAt: new Date(),
      },
      create: {
        userId,
        coinId,
        coinSymbol,
        amount,
      },
    });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("Portfolio POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


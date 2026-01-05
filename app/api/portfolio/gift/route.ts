import { NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// POST - دادن هدیه به کاربر جدید
export async function POST() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);
    
    // بررسی اینکه آیا کاربر قبلاً هدیه دریافت کرده
    const existingGift = await prisma.portfolio.findFirst({
      where: {
        userId,
        coinId: "bitcoin",
      },
    });

    if (existingGift && existingGift.amount > 0) {
      return NextResponse.json(
        { message: "Gift already received", portfolio: existingGift },
        { status: 200 }
      );
    }

    // دادن 0.001 BTC به عنوان هدیه
    const gift = await prisma.portfolio.upsert({
      where: {
        userId_coinId: {
          userId,
          coinId: "bitcoin",
        },
      },
      update: {
        amount: 0.001,
        updatedAt: new Date(),
      },
      create: {
        userId,
        coinId: "bitcoin",
        coinSymbol: "BTC",
        amount: 0.001,
      },
    });

    return NextResponse.json({ 
      message: "Gift received successfully",
      portfolio: gift 
    });
  } catch (error) {
    console.error("Gift error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


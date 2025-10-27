import { NextResponse } from "next/server";

// ✅ تعریف دقیق type داده‌ها
interface PricePoint {
  date: string;
  price: number;
}

interface NormalizedPoint {
  date: string;
  change: number;
}

interface CoinResult {
  id: string;
  prices: NormalizedPoint[];
}

export async function GET() {
  try {
    const coinIds = ["bitcoin", "ethereum", "solana"];
    const days = 7;

    const results: CoinResult[] = await Promise.all(
      coinIds.map(async (id) => {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
          { next: { revalidate: 3600 } }
        );

        if (!res.ok) throw new Error(`Failed to fetch ${id}`);
        const data = await res.json();

        // 🧩 قیمت خام
        const prices: PricePoint[] = data.prices.map(
          ([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            price,
          })
        );

        // ✅ نرمال‌سازی به درصد تغییر
        const basePrice = prices[0].price;
        const normalized: NormalizedPoint[] = prices.map((p) => ({
          date: p.date,
          change: ((p.price - basePrice) / basePrice) * 100,
        }));

        return { id, prices: normalized };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Chart API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "1";
    const perPage = searchParams.get("per_page") ?? "13";
    const search = searchParams.get("search");

    // If search query is provided, search through all coins
    if (search && search.trim()) {
      const searchRes = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(search.trim())}`,
        { next: { revalidate: 60 } }
      );

      if (!searchRes.ok) {
        return NextResponse.json(
          { error: "Failed to search coins", status: searchRes.status },
          { status: searchRes.status }
        );
      }

      const searchData = await searchRes.json();
      const coinIds = searchData.coins?.slice(0, 50).map((coin: any) => coin.id).join(",") || "";

      if (!coinIds) {
        return NextResponse.json([]);
      }

      const marketsRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=false`,
        { next: { revalidate: 0 } }
      );

      if (!marketsRes.ok) {
        return NextResponse.json(
          { error: "Failed to fetch coin markets", status: marketsRes.status },
          { status: marketsRes.status }
        );
      }

      const marketsData = await marketsRes.json();
      return NextResponse.json(Array.isArray(marketsData) ? marketsData : []);
    }

    // Normal pagination
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`,
      { next: { revalidate: 0 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch coins", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

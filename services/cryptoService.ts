"use server";

export const fetchCoins = async (page = 1, perPage = 13) => {
  console.log("Fetching page:", page);

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets` +
      `?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`,
    { cache: "no-store" } // جلوگیری از کش
  );

  if (!res.ok) throw new Error("Failed to fetch cryptos");

  return res.json();
};

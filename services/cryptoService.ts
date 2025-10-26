export const fetchCoins = async (page = 1, perPage = 13) => {
  const res = await fetch(`/api/coins?page=${page}&per_page=${perPage}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch cryptos");

  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("Unexpected response:", data);
    return [];
  }

  return data;
};

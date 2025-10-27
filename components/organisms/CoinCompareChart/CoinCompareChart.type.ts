export interface NormalizedPoint {
  date: string;
  change: number;
}

export interface CoinData {
  id: string;
  prices: NormalizedPoint[];
}

export interface CombinedData {
  date: string;
  bitcoin: number;
  ethereum: number;
  solana: number;
}

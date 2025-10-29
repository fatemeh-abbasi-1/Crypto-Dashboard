export interface CombinedData {
  date: string;
  bitcoin: number;
  ethereum: number;
  solana: number;
}

export interface Data {
  data: CombinedData[];
}

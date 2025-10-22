import CoinCard from "@/components/molecules/CoinCard/CoinCard";
import { BiHome } from "react-icons/bi";

export default function Home() {
  return (
    <div className="flex gap-4">
      <CoinCard
        title="BET COIN"
        amount="234C"
        percentChange="10"
        icon={BiHome}
      />
      <CoinCard
        title="BET COIN"
        amount="234C"
        percentChange="10"
        icon={BiHome}
      />
      <CoinCard
        title="BET COIN"
        amount="234C"
        percentChange="10"
        icon={BiHome}
      />
    </div>
  );
}

import React from "react";

import Text from "@/components/atoms/Text/Text";
import { Icon } from "@/components/atoms/Icon/Icon";

import { CoinCardProps } from "./CoinCard.types";

export const CoinCard: React.FC<CoinCardProps> = ({
  title,
  amount,
  percentChange,
  icon: IconCmp,
}) => {
  return (
    <div className="bg-gradient-2 w-96 h-24 px-6 rounded-lg flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <Text size="small">{title}</Text>
        <div className="flex gap-2">
          <Text size="large" className="font-bold">
            {amount}
          </Text>
          <Text
            size="small"
            className={percentChange.includes("+") ? "green" : "red"}
          >
            {percentChange}%
          </Text>
        </div>
      </div>

      <Icon icon={IconCmp} size={24} variant="filled" />
    </div>
  );
};
export default CoinCard;

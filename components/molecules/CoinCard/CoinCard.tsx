"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Text from "@/components/atoms/Text/Text";
import Title from "@/components/atoms/Title/Title";
import { CoinCardProps } from "./CoinCard.type";

type AnimatedCoinCardProps = CoinCardProps & { index: number };

export const CoinCard: React.FC<AnimatedCoinCardProps> = ({
  crypto,
  index,
}) => {
  const { name, current_price, price_change_percentage_24h, image } = crypto;
  const isPositive = Number(price_change_percentage_24h) >= 0;

  return (
    <motion.div
      className="
        bg-zinc-800 w-[400px] h-28 px-6 rounded-2xl flex justify-between items-center
       hover:scale-[1.02]
        transition-transform duration-300 ease-in-out
      "
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: Math.min((index % 13) * 0.18, 1.5),
        ease: "easeIn",
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col gap-2">
        <Text size="medium">{name}</Text>
        <div className="flex items-center gap-2">
          <Title variant="h2">${current_price.toLocaleString()}</Title>
          <Text
            size="small"
            className={isPositive ? "text-green-400" : "text-red-400"}
          >
            {isPositive ? "+" : ""}
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </div>
      </div>
      <Image
        width={40}
        height={40}
        src={image}
        alt={name}
        className="rounded-xl"
      />
    </motion.div>
  );
};

export default CoinCard;

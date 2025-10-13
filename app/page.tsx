"use client";

import React from "react";

import Title from "@/components/atoms/Title/Title";
import Text from "@/components/atoms/Text/Text";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      {/* عنوان صفحه */}
      <Title variant="h2" className="text-white">
        Dashboard Overview
      </Title>

      {/* اطلاعات کلی */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-secondary rounded-2xl p-4">
          <Text size="medium" className="text-gray-300">
            Total Balance
          </Text>
          <Title variant="h2" className="text-white mt-2">
            $25,430
          </Title>
        </div>

        <div className="bg-secondary rounded-2xl p-4">
          <Text size="medium" className="text-gray-300">
            New Clients
          </Text>
          <Title variant="h2" className="text-white mt-2">
            +1,245
          </Title>
        </div>

        <div className="bg-secondary rounded-2xl p-4">
          <Text size="medium" className="text-gray-300">
            Total Sales
          </Text>
          <Title variant="h2" className="text-white mt-2">
            $82,400
          </Title>
        </div>
      </div>
    </div>
  );
}

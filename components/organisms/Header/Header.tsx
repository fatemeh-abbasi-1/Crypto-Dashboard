import React from "react";
import clsx from "clsx";

import { Icon } from "@/components/atoms/Icon/Icon";
import { HeaderProps } from "./Header.types";
import { FiUser, FiSettings, FiBell } from "react-icons/fi";

import Text from "@/components/atoms/Text/Text";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <header
      className={clsx(
        "bg-transparent flex items-center justify-between w-full px-6 py-6 shadow-xl"
      )}
    >
      <div className="flex flex-col">
        <div className="flex gap-1">
          <Text size="small" color="gray">
            Pages /
          </Text>
          <Text size="small">{currentPage}</Text>
        </div>

        <Text size="medium">{currentPage}</Text>
      </div>

      <div className="flex items-center gap-4">
        <SearchBox />

        <div className="flex items-center gap-8 text-lg">
          <Icon icon={FiUser} />
          <Icon icon={FiSettings} />
          <Icon icon={FiBell} />
        </div>
      </div>
    </header>
  );
};

export default Header;

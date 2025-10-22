import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300" />
      <input
        type="text"
        placeholder="Type here..."
        className="bg-gradient-2 text-white text-sm px-9 py-1.5 rounded-lg border border-gray-300 outline-none placeholder-gray"
      />
    </div>
  );
};

export default SearchBox;

import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" />
      <input
        type="text"
        placeholder="Type here..."
        className="bg-gradient-2 text-white text-sm px-9 py-1.5 rounded-lg border outline-none focus:ring-1 focus:ring-red placeholder-gray"
      />
    </div>
  );
};

export default SearchBox;

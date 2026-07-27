import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Search = ({ onChange, value, onClearSearch }) => {
  return (
    <div
      className="
      w-80
      bg-slate-100
      flex
      items-center
      rounded-md
      px-3
    "
    >
      <input
        type="search"
        placeholder="Search todo list"
        className="
          outline-none
          w-full
          text-sm
          bg-transparent
          py-2.5
        "
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="
            text-xl
            text-slate-400
            cursor-pointer
            hover:text-black
            mr-3
          "
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="
          text-slate-400
          cursor-pointer
          hover:text-black
        "
      />
    </div>
  );
};

export default Search;

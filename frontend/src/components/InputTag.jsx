import { useState } from "react";
import { MdClose } from "react-icons/md";
import { MdAdd } from "react-icons/md";

const InputTag = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  //add tag function
  const addNewTags = () => {
    if (input.trim() !== "") {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };
  // remove or delete tag fuction
  const deleteTag = (tagName) => {
    setTags(tags.filter((tag) => tag !== tagName));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center mb-5 mt-5 gap-4">
        {tags?.map((tag) => (
          <span className="text-slate-500 flex gap-3 items-center bg-slate-300 text-sm px-2 py-1">
            # {tag}
            <button
              onClick={() => {
                deleteTag(tag);
              }}
            >
              <MdClose className="cursor-pointer" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="enter tag"
          className="input-box w-[75%]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => {
            addNewTags();
          }}
          className="-mt-4 w-12 h-12 flex justify-center cursor-pointer items-center rounded bg-blue-500 text-white"
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

export default InputTag;

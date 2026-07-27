import { useState } from "react";
import InputTag from "./InputTag";
import toast from "react-hot-toast";

const AddAndEdit = ({ type, todoData, onClose, onSuccess }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(
    type === "edit" && todoData ? todoData.title : "",
  );

  const [content, setContent] = useState(
    type === "edit" && todoData ? todoData.content : "",
  );

  const [tags, setTags] = useState(
    type === "edit" && todoData ? todoData.tags : [],
  );

  const [priority, setPriority] = useState(
    type === "edit" && todoData?.priority ? todoData.priority : "low",
  );

  const [dueDate, setDueDate] = useState(
    type === "edit" && todoData?.dueDate ? todoData.dueDate.slice(0, 10) : "",
  );

  const saveTodo = async () => {
    if (!title.trim()) {
      setError("Please enter title");
      toast.error("Please enter title");

      return;
    }

    if (!content.trim()) {
      setError("Please enter content");
      toast.error("Please enter content");

      return;
    }

    try {
      setLoading(true);

      setError("");

      const token = localStorage.getItem("token");

      let url = "http://localhost:5000/api/todos";

      let method = "POST";

      if (type === "edit") {
        url = `http://localhost:5000/api/todos/${todoData._id}`;

        method = "PUT";
      }

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,

          content,

          tags,

          priority,

          dueDate: dueDate || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          type === "edit"
            ? "Todo updated successfully ✨"
            : "Todo created successfully 🎉",
        );

        if (onSuccess) {
          onSuccess();
        }

        if (onClose) {
          onClose();
        }
      } else {
        toast.error(data.message || "Something went wrong");

        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);

      toast.error("Server error. Please try again");

      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
  w-[95%]
  max-w-xl
  max-h-[90vh]
  overflow-y-auto
  bg-white
  rounded-2xl
  p-8
  fixed
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
  shadow-2xl
  border
  border-slate-200
  z-50
  "
    >
      <h2
        className="
  text-2xl
  font-bold
  text-slate-800
  mb-6
  flex
  items-center
  gap-2
  "
      >
        {type === "edit" ? "✏️ Edit Todo" : "✨ Create Todo"}
      </h2>

      <div className="flex flex-col mb-4">
        <label
          className="
text-sm
font-semibold
text-slate-700
mb-2
"
        >
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          className="
          border
          border-slate-400
          rounded-md
          p-3
          outline-none
          "
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-2 font-medium">Content</label>

        <textarea
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter todo content"
          className="
          resize-none
          border
          border-slate-400
          rounded-md
          p-3
          outline-none
          "
        />
      </div>

      {/* PRIORITY */}

      <div className="mb-4">
        <label className="mb-2 block font-medium">Priority</label>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="
  w-full
  border
  border-slate-200
  rounded-xl
  p-3
  bg-slate-50
  focus:bg-white
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-100
  outline-none
  transition
  "
        >
          <option value="low">Low</option>

          <option value="medium">Medium</option>

          <option value="high">High</option>
        </select>
      </div>

      {/* DUE DATE */}

      <div className="mb-4">
        <label className="mb-2 block font-medium">Due Date</label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="
          border
          border-slate-400
          rounded-md
          p-3
          outline-none
          w-full
          "
        />
      </div>

      {/* TAGS */}

      <div className="mb-4">
        <label className="mb-2 block font-medium">Tags</label>

        <InputTag tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="flex gap-3 mt-6">
        <button
          onClick={saveTodo}
          disabled={loading}
          className="
  flex-1
  bg-blue-600
  hover:bg-blue-700
  text-white
  font-medium
  py-3
  rounded-xl
  transition
  shadow-md
  shadow-blue-200
  disabled:opacity-50
  "
        >
          {loading
            ? "Saving..."
            : type === "edit"
              ? "Update Todo"
              : "Create Todo"}
        </button>

        <button
          onClick={onClose}
          className="
  px-6
  py-3
  rounded-xl
  border
  border-slate-200
  text-slate-600
  hover:bg-slate-100
  transition
  "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddAndEdit;

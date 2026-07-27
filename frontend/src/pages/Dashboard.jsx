import { useEffect, useState } from "react";
import AddAndEdit from "../components/addAndEdit";
import TodoCards from "../components/TodoCards";

import { MdAdd, MdClose } from "react-icons/md";
import toast from "react-hot-toast";

const Dashboard = ({ search }) => {
  const [todos, setTodos] = useState([]);

  const [openModel, setOpenModel] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const getTodos = async (searchValue = "") => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://full-stack-todo-list-vbw6.onrender.com/api/todos?search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      const todosData = Array.isArray(data) ? data : data.todos || [];

      const sortedTodos = [...todosData].sort((a, b) => {
        if (a.isPinned && !b.isPinned) {
          return -1;
        }

        if (!a.isPinned && b.isPinned) {
          return 1;
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setTodos(sortedTodos);
    } catch (error) {
      console.log(error);

      toast.error("Failed loading todos");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getTodos(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`https://full-stack-todo-list-vbw6.onrender.com/api/todos/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Todo deleted");

        getTodos(search);
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.log(error);

      toast.error("Server error");
    }
  };

  const confirmDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">Delete this todo?</p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              deleteTodo(id);

              toast.dismiss(t.id);
            }}
            className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-lg
            "
          >
            Delete
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="
            border
            px-4
            py-2
            rounded-lg
            "
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const togglePin = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://full-stack-todo-list-vbw6.onrender.com/api/todos/${id}/pin`,

        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        toast.success("Pin updated");

        getTodos(search);
      }
    } catch (error) {
      console.log(error);

      toast.error("Server error");
    }
  };

  const toggleComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://full-stack-todo-list-vbw6.onrender.com/api/todos/${id}/complete`,

        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);

        getTodos(search);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Server error");
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-slate-50
      dark:bg-slate-900
      transition-colors
      px-4
      sm:px-6
      lg:px-10
      py-6
      "
    >
      {todos.length === 0 && (
        <div
          className="
            max-w-xl
            mx-auto
            mt-20
            bg-white
            dark:bg-slate-800
            rounded-2xl
            shadow-sm
            border
            border-slate-200
            dark:border-slate-700
            p-10
            text-center
            "
        >
          <h2
            className="
              text-xl
              font-semibold
              text-slate-700
              dark:text-white
              "
          >
            {search ? "No results found" : "No todos yet 🚀"}
          </h2>

          <p
            className="
            mt-3
            text-slate-500
            dark:text-slate-400
            "
          >
            {search
              ? "Try another search keyword"
              : "Create your first task and start organizing"}
          </p>
        </div>
      )}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-6
        max-w-7xl
        mx-auto
        "
      >
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="
              animate-in
              fade-in
              duration-300
              "
          >
            <TodoCards
              id={todo._id}
              todo={todo}
              title={todo.title}
              date={new Date(todo.createdAt).toLocaleString()}
              content={todo.content}
              tags={todo.tags}
              isPinned={todo.isPinned}
              completed={todo.completed}
              onPin={() => togglePin(todo._id)}
              onComplete={() => toggleComplete(todo._id)}
              onDelete={confirmDelete}
              onEdit={(selectedTodo) => {
                setOpenModel({
                  isShow: true,

                  type: "edit",

                  data: selectedTodo,
                });
              }}
            />
          </div>
        ))}
      </div>

      {openModel.isShow && (
        <>
          <div
            className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-sm
            z-40
            "
          />

          <AddAndEdit
            key={openModel.data?._id || "new"}
            type={openModel.type}
            todoData={openModel.data}
            onClose={() => {
              setOpenModel({
                isShow: false,

                type: "add",

                data: null,
              });
            }}
            onSuccess={() => {
              getTodos(search);
            }}
          />
        </>
      )}

      <button
        className="
        fixed
        bottom-8
        right-8
        h-16
        w-16
        rounded-2xl
        bg-blue-600
        hover:bg-blue-700
        shadow-xl
        flex
        items-center
        justify-center
        transition
        "
      >
        {openModel.isShow ? (
          <MdClose
            className="
          text-3xl
          text-white
          cursor-pointer
          "
            onClick={() => {
              setOpenModel({
                isShow: false,

                type: "add",

                data: null,
              });
            }}
          />
        ) : (
          <MdAdd
            className="
          text-3xl
          text-white
          cursor-pointer
          "
            onClick={() => {
              setOpenModel({
                isShow: true,

                type: "add",

                data: null,
              });
            }}
          />
        )}
      </button>
    </div>
  );
};

export default Dashboard;

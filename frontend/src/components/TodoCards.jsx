import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

const TodoCards = ({
  id,
  title,
  date,
  content,
  tags,
  isPinned,
  completed,
  onDelete,
  onEdit,
  onPin,
  onComplete,
  todo,
}) => {
  const priorityStyle = {
    high: "bg-red-100 text-red-600",

    medium: "bg-yellow-100 text-yellow-600",

    low: "bg-green-100 text-green-600",
  };

  return (
    <div
      className="
      border
      border-slate-100
      rounded
      bg-white
      p-5
      hover:shadow-lg
      transition-all
      ease-out
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-medium mb-2">{title}</h4>

          <span className="text-sm text-gray-500">{date}</span>

          {/* PRIORITY BADGE */}

          {todo?.priority && (
            <div
              className={`
                mt-2
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                w-fit
                ${priorityStyle[todo.priority]}
                `}
            >
              {todo.priority.toUpperCase()}
            </div>
          )}
        </div>

        <MdOutlinePushPin
          onClick={onPin}
          className={`
          text-2xl
          cursor-pointer

          ${isPinned ? "text-blue-500" : "text-slate-300"}

          `}
        />
      </div>

      <p className="text-slate-500 mb-4 mt-4">{content?.slice(0, 50)}</p>

      <div className="flex items-center justify-between">
        <div className="text-slate-800">
          {Array.isArray(tags) ? tags.join(", ") : tags}
        </div>

        <div className="flex items-center gap-4">
          <MdCreate
            onClick={() => onEdit && onEdit(todo)}
            className="
            icon-btn
            hover:text-green-400
            cursor-pointer
            "
          />

          <MdCheckCircle
            onClick={onComplete}
            className={`
            icon-btn
            cursor-pointer

            ${completed ? "text-green-500" : "text-slate-300"}

            `}
          />

          <MdDelete
            onClick={() => onDelete && onDelete(id)}
            className="
            icon-btn
            hover:text-red-400
            cursor-pointer
            "
          />
        </div>
      </div>
    </div>
  );
};

export default TodoCards;

import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPinned: {
    type: Boolean,
     default: false,
    },
     priority:{
    type:String,
    enum:["low","medium","high"],
    default:"low"
  },
  dueDate:{
  type:Date,
  default:null
},
    completed: {
      type: Boolean,
      default: false,
    },
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const TodoList = mongoose.model("TodoList", todoListSchema);

export default TodoList;
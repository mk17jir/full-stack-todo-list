import TodoList from "../models/TodoList.js";


// GET all todos (search + filter + pagination)
export const getTodos = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const { search, completed } = req.query;


    const filter = {
      user: req.user._id,
    };


    // Search
    if (search) {

      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          content: {
            $regex: search,
            $options: "i",
          },
        },
      ];

    }


    // Completed filter
    if (completed !== undefined) {

      filter.completed = completed === "true";

    }



    const todos = await TodoList.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);



    const total = await TodoList.countDocuments(filter);



    res.status(200).json({

      total,

      page,

      pages: Math.ceil(total / limit),

      limit,

      todos,

    });



  } catch (error) {

    res.status(500).json({

      message:error.message

    });

  }
};





// GET single todo
export const getTodoById = async (req,res)=>{

  try{

    const todo = await TodoList.findOne({

      _id:req.params.id,

      user:req.user._id

    });



    if(!todo){

      return res.status(404).json({

        message:"Todo not found"

      });

    }



    res.status(200).json(todo);



  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};







// CREATE TODO
export const createTodo = async(req,res)=>{

  try{


    const {
      title,
      content,
      tags,
      priority,
      dueDate
    } = req.body;



    const todo = await TodoList.create({

      title,

      content,

      tags,

      priority,

      dueDate,

      user:req.user._id,

    });



    res.status(201).json(todo);



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }

};







// UPDATE TODO
export const updateTodo = async(req,res)=>{

  try{


    const {
      title,
      content,
      tags,
      completed,
      priority,
      dueDate
    } = req.body;



    const todo = await TodoList.findOneAndUpdate(

      {
        _id:req.params.id,

        user:req.user._id

      },


      {

        title,

        content,

        tags,

        completed,

        priority,

        dueDate

      },


      {

        new:true,

        runValidators:true

      }

    );




    if(!todo){

      return res.status(404).json({

        message:"Todo not found or unauthorized"

      });

    }



    res.status(200).json(todo);



  }catch(error){


    res.status(400).json({

      message:error.message

    });


  }

};








// DELETE TODO
export const deleteTodo = async(req,res)=>{

  try{


    const todo = await TodoList.findOneAndDelete({

      _id:req.params.id,

      user:req.user._id

    });



    if(!todo){

      return res.status(404).json({

        message:"Todo not found or unauthorized"

      });

    }



    res.status(200).json({

      message:"Todo deleted successfully"

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};








// PIN / UNPIN TODO
export const togglePinTodo = async(req,res)=>{

  try{


    const todo = await TodoList.findOne({

      _id:req.params.id,

      user:req.user._id

    });



    if(!todo){

      return res.status(404).json({

        message:"Todo not found"

      });

    }



    todo.isPinned = !todo.isPinned;



    await todo.save();



    res.status(200).json(todo);



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};









// COMPLETE / UNCOMPLETE TODO
export const toggleComplete = async(req,res)=>{

  try{


    const todo = await TodoList.findOne({

      _id:req.params.id,

      user:req.user._id

    });



    if(!todo){

      return res.status(404).json({

        message:"Todo not found"

      });

    }



    todo.completed = !todo.completed;



    await todo.save();



    res.status(200).json({

      message: todo.completed
        ? "Todo completed"
        : "Todo marked incomplete",

      todo

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validEmail, checkPassword } from "../lib/config.js";
import Password from "../components/Password.jsx";

import toast from "react-hot-toast";

import {
  MdEmail,
  MdPerson
} from "react-icons/md";


const Signup = () => {


  const navigate = useNavigate();


  const [name,setName] = useState("");

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [error,setError] = useState("");

  const [loading,setLoading] = useState(false);





  const handleSubmit = async(e)=>{


    e.preventDefault();




    if(!name.trim()){

      toast.error("Please enter your name");

      return;

    }




    if(!validEmail(email)){

      toast.error("Please enter a valid email");

      return;

    }




    if(!checkPassword(password)){

      toast.error(
        "Password must be stronger"
      );

      return;

    }





    try{


      setLoading(true);

      setError("");



      const response = await fetch(

        "http://localhost:5000/api/auth/register",

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },


          body:JSON.stringify({

            name,

            email,

            password

          })

        }

      );





      const data = await response.json();





      if(response.ok){


        toast.success(
          "Account created successfully 🎉"
        );


        navigate("/login");


      }else{


        toast.error(
          data.message
          ||
          "Signup failed"
        );


      }





    }catch(error){


      console.log(error);


      toast.error(
        "Server error"
      );


    }finally{


      setLoading(false);


    }



  };







  return (


    <div

      className="
      min-h-[calc(100vh-80px)]
      flex
      items-center
      justify-center
      px-5
      bg-slate-50
      "

    >




      <div

        className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-xl
        shadow-sky-100
        border
        border-sky-100
        p-8
        "

      >






        <div className="text-center mb-8">


          <h1

            className="
            text-3xl
            font-bold
            bg-linear-to-r
            from-sky-500
            to-blue-600
            bg-clip-text
            text-transparent
            "

          >

            Create Account

          </h1>



          <p className="
          text-slate-500
          mt-2
          "
          >

            Start organizing your tasks today

          </p>


        </div>








        <form

          onSubmit={handleSubmit}

          className="
          space-y-5
          "

        >







          <div className="relative">


            <MdPerson

              className="
              absolute
              left-4
              top-3.5
              text-xl
              text-sky-400
              "

            />


            <input

              type="text"

              placeholder="Your name"

              value={name}

              onChange={
                e=>setName(e.target.value)
              }


              className="
              input-box
              pl-12
              "

            />


          </div>








          <div className="relative">


            <MdEmail

              className="
              absolute
              left-4
              top-3.5
              text-xl
              text-sky-400
              "

            />



            <input

              type="email"

              placeholder="Email address"

              value={email}

              onChange={
                e=>setEmail(e.target.value)
              }


              className="
              input-box
              pl-12
              "

            />


          </div>








          <Password

            value={password}

            onchange={
              e=>setPassword(e.target.value)
            }

          />








          {
            error && (

              <p className="
              text-red-500
              text-sm
              "
              >

                {error}

              </p>

            )
          }









          <button

            disabled={loading}

            className="
            w-full
            py-3
            rounded-xl
            bg-linear-to-r
            from-sky-500
            to-blue-600
            text-white
            font-semibold
            shadow-lg
            shadow-sky-200
            hover:scale-[1.02]
            transition
            disabled:opacity-50 cursor-pointer
            "

          >

            {
              loading
              ?
              "Creating account..."
              :
              "Create Account"
            }


          </button>







        </form>







        <p

          className="
          text-center
          text-sm
          text-slate-500
          mt-6
          "

        >

          Already have an account?


          <Link

            to="/login"

            className="
            ml-1
            text-sky-600
            font-semibold
            hover:underline
            "

          >

            Login

          </Link>


        </p>






      </div>



    </div>


  );

};


export default Signup;
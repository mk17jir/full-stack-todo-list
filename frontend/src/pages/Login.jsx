import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Password from "../components/Password.jsx";
import { validEmail } from "../lib/config.js";

import toast from "react-hot-toast";

import { MdEmail } from "react-icons/md";


const Login = () => {


  const navigate = useNavigate();


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");





  const handleSubmit = async(e)=>{


    e.preventDefault();





    if(!validEmail(email)){


      toast.error(
        "Please enter a valid email"
      );


      return;


    }




    if(!password){


      toast.error(
        "Please enter your password"
      );


      return;


    }







    try{


      setLoading(true);

      setError("");



      const response = await fetch(

        "http://localhost:5000/api/auth/login",

        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },


          body:JSON.stringify({

            email,

            password

          })

        }

      );







      const data = await response.json();







      if(response.ok){



        localStorage.setItem(
          "token",
          data.token
        );



        if(data.user){

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

        }





        toast.success(
          "Welcome back 👋"
        );



        navigate("/dashboard");



        window.location.reload();



      }else{


        toast.error(
          data.message || "Login failed"
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

            Welcome Back

          </h1>





          <p

            className="
            text-slate-500
            mt-2
            "

          >

            Login to manage your tasks

          </p>



        </div>









        <form

          onSubmit={handleSubmit}

          className="
          space-y-5
          "

        >







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

              <p

                className="
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

              "Logging in..."

              :

              "Login"

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

          Don't have an account?


          <Link

            to="/signup"

            className="
            ml-1
            text-sky-600
            font-semibold
            hover:underline
            "

          >

            Create account

          </Link>



        </p>






      </div>





    </div>


  );


};


export default Login;
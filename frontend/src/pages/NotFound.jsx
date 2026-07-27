import { Link } from "react-router-dom";

import {
  MdHome,
  MdArrowBack
} from "react-icons/md";


const NotFound = () => {


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
        max-w-lg
        w-full
        bg-white
        rounded-3xl
        border
        border-sky-100
        shadow-xl
        shadow-sky-100
        p-10
        text-center
        "

      >






        <div

          className="
          text-7xl
          font-bold
          bg-linear-to-r
          from-sky-500
          to-blue-600
          bg-clip-text
          text-transparent
          "

        >

          404

        </div>








        <h1

          className="
          text-2xl
          font-bold
          text-slate-800
          mt-5
          "

        >

          Page Not Found

        </h1>






        <p

          className="
          text-slate-500
          mt-3
          "

        >

          The page you are looking for doesn't exist
          or has been moved.

        </p>









        <div

          className="
          flex
          flex-col
          sm:flex-row
          gap-3
          justify-center
          mt-8
          "

        >





          <Link

            to="/dashboard"

            className="
            flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            rounded-xl
            bg-linear-to-r
            from-sky-500
            to-blue-600
            text-white
            font-semibold
            shadow-lg
            shadow-sky-200
            hover:scale-105
            transition
            "

          >

            <MdHome className="text-xl"/>

            Dashboard

          </Link>







          <button

            onClick={() => window.history.back()}

            className="
            flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            rounded-xl
            border
            border-sky-200
            text-sky-600
            font-semibold
            hover:bg-sky-50
            transition
            "

          >

            <MdArrowBack className="text-xl"/>

            Go Back

          </button>






        </div>






      </div>





    </div>


  );

};


export default NotFound;
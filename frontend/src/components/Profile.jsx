import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileName } from "../lib/profile";

import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");

          return;
        }

        const response = await fetch(
          "https://full-stack-todo-list-vbw6.onrender.com/api/auth/profile",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          localStorage.removeItem("token");

          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  if (!user) {
    return null;
  }

  return (
    <div
      className="
      flex
      items-center
      gap-3
      bg-white
      border
      border-slate-200
      rounded-full
      px-3
      py-2
      shadow-sm
      hover:shadow-md
      transition
      "
    >
      {/* Avatar */}

      <div
        className="
        h-10
        w-10
        rounded-full
        bg-linear-to-r
        from-sky-400
        to-blue-600
        flex
        items-center
        justify-center
        text-white
        font-semibold 
        "
      >
        {user.name ? getProfileName(user.name) : <FaUser />}
      </div>

      {/* Name */}

      <div className="hidden sm:block">
        <p
          className="
          text-sm
          font-semibold
          text-slate-800
          "
        >
          {user.name}
        </p>

        <p
          className="
          text-xs
          text-slate-400
          "
        >
          Member
        </p>
      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="
        ml-2
        h-9
        w-9
        rounded-full
        flex
        items-center
        justify-center
        text-slate-400
        hover:text-red-500
        hover:bg-red-50
        transition
        "
        title="Logout"
      >
        <MdLogout className="text-xl" />
      </button>
    </div>
  );
};

export default Profile;

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Password = ({ value, onchange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative mb-5">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="input-box mb-0 pr-12"
        value={value}
        onChange={onchange}
      />

      {!showPassword ? (
        <FaRegEyeSlash
          onClick={togglePassword}
          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        />
      ) : (
        <FaRegEye
          onClick={togglePassword}
          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        />
      )}
    </div>
  );
};

export default Password;
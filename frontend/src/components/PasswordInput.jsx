import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function passwordInput({ value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-2 px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"

        // minLength={6}
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-violet-800 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-black cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
}

export default passwordInput;

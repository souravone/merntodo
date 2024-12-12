import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../utils/helper";

import PasswordInput from "../components/PasswordInput";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // if (!validateEmail(email)) {
    //   setError("Please enter a valid email address");
    //   return;
    // }

    // if (!validatePassword(password)) {
    //   setError(
    //     "Please enter a strong password, 4 -12 characters (1 uppercase, 1 lowercase, 1 number, 1 special)"
    //   );
    //   return;
    // }

    // setError("");

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>
          <input
            type="text"
            placeholder="email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button
            type="submit"
            className="btn-primary hover:translate-y-[-1px]"
          >
            Login
          </button>
          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-violet-800 underline hover:text-violet-700 transition-colors duration-300 "
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

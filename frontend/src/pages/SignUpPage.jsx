import { useState, useEffect } from "react";

import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/helper";
import { useSelector, useDispatch } from "react-redux";
import { useSignupMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [signup, { isLoading }] = useSignupMutation();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Please enter a strong password, 4 -12 characters (1 uppercase, 1 lowercase, 1 number, 1 special)"
      );
      return;
    }

    setError("");

    try {
      const res = await signup({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignup}>
          <h4 className="text-2xl mb-7">Sign up</h4>
          <input
            type="text"
            placeholder="Name"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Already got an account?{" "}
            <Link
              to="/login"
              className="font-medium text-violet-800 underline hover:text-violet-700 transition-colors duration-300 "
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;

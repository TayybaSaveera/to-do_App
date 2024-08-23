import { React, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import login from "../assets/login.png";
import { Link, Navigate } from "react-router-dom";
function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(""); // For form submission error handling
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  // Validation flags
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isValidLength, setIsValidLength] = useState(false);

  // Function to handle real-time password validation
  const validatePassword = (password) => {
    setPassword(password);

    // Check if password contains at least one uppercase letter
    setIsUpperCase(/[A-Z]/.test(password));
    // Check if password contains at least one symbol
    setIsSymbol(/[\W_]/.test(password));
    // Check if password contains at least one number
    setIsNumber(/\d/.test(password));
    // Check if password has at least 8 characters
    setIsValidLength(password.length >= 8);
  };

  // Check if all conditions are met for password
  const isPasswordValid = isUpperCase && isSymbol && isNumber && isValidLength;

  async function registerUser(ev) {
    ev.preventDefault();
    if (!isPasswordValid) {
      setError("Password does not meet all requirements.");
      return;
    }
    try {
      await axios.post("/signup", {
        name,
        email,
        password,
      });
      alert("registered successfully");
      setRedirect(true);
    } catch (e) {
      alert("registered unsuccessfully");
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="px-4 lg:px-28 pb-8">
      <div className="flex flex-row  h-20  py-6 lg:mt-4 items-center">
        <Link className="flex items-center">
          <img src={logo} className="h-16 w-16 cursor-pointer" />
          <h1 className="hidden lg:block text-2xl font-semibold ">Todo App</h1>
        </Link>
      </div>
      <div className="lg:grid lg:grid-cols-2 gap-8">
        <div className="mt-5">
          <h1 className="text-4xl font-bold my-4">Sign Up</h1>
          {/* Display error messages */}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form className="flex flex-col gap-4" onSubmit={registerUser}>
            <div className="flex flex-col h-16 px-2 py-2 rounded-lg border border-black">
              <label className="font-semibold">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="outline-none bg-white"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>

            <div className="flex flex-col h-16 px-2 py-2 rounded-lg border border-black">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                placeholder="email"
                className="outline-none bg-white"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>

            <div className="flex flex-col h-16 px-2 py-2 rounded-lg border border-black">
              <label className="font-semibold">Password</label>
              <div className="flex justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="outline-none bg-white"
                  value={password}
                  onChange={(ev) => validatePassword(ev.target.value)}
                />
                <svg
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-black cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                  <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                  <path d="M3 3l18 18" />
                </svg>
              </div>
              {/* Password validation messages */}
              <div className="text-sm mt-2">
                <p style={{ color: isUpperCase ? "green" : "red" }}>
                  {isUpperCase ? "✔ " : "✘ "} Must contain an uppercase letter
                </p>
                <p style={{ color: isSymbol ? "green" : "red" }}>
                  {isSymbol ? "✔ " : "✘ "} Must contain a symbol (e.g., @, #, $)
                </p>
                <p style={{ color: isNumber ? "green" : "red" }}>
                  {isNumber ? "✔ " : "✘ "} Must contain a number
                </p>
                <p style={{ color: isValidLength ? "green" : "red" }}>
                  {isValidLength ? "✔ " : "✘ "} Must be at least 8 characters
                </p>
              </div>
            </div>
            {/* <div className="text-center bg-cyan rounded-lg  cursor-pointer mt-16"> */}
            {/* <button className="h-12 font-medium text-xl">Sign up</button> */}
            <button
              className={`h-12 font-medium text-xl text-center bg-cyan rounded-lg  cursor-pointer mt-16 ${
                !isPasswordValid ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              disabled={!isPasswordValid}
            >
              Sign up
            </button>
            {/* </div> */}

            <p className="text-center">
              Already Signed up?
              <Link to="/login">
                <a className="underline cursor-pointer">Go to Login</a>
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden lg:block">
          <img src={login} className="px-20 lg:mt-10" />
        </div>
      </div>
    </div>
  );
}

export default Signup;

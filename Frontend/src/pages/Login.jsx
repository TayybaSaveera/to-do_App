import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import login from "../assets/login.png";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const { setUser } = useContext(UserContext);
  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      localStorage.setItem("token", data.token);
      alert("login succcessful");
      setRedirect(true);
    } catch (error) {
      alert("login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/home"} />;
  }
  return (
    <div className="px-4 lg:px-28">
      <div className="flex flex-row  h-20  py-6 lg:mt-4 items-center">
        <Link className="flex items-center">
          <img src={logo} className="h-16 w-16 cursor-pointer" />
          <h1 className="hidden lg:block text-2xl font-semibold ">Todo App</h1>
        </Link>
      </div>
      <div className="lg:grid lg:grid-cols-2 gap-8">
        <div className="mt-5">
          <h1 className="text-4xl font-bold my-4">Log in</h1>
          <form className="flex flex-col gap-4" onSubmit={loginUser}>
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
                  onChange={(ev) => setPassword(ev.target.value)}
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
            </div>
            {/* <div className="text-center bg-cyan rounded-lg  cursor-pointer"> */}
            <button className="h-12 font-medium text-center bg-cyan rounded-lg  cursor-pointer">
              Login
            </button>
            {/* </div> */}

            <p className="underline">
              <span>Forget your password?</span>
            </p>
            <p className="text-center">
              Don’t have an account?
              <Link to="/signup">
                <a className="underline cursor-pointer">Sign up</a>
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

export default Login;

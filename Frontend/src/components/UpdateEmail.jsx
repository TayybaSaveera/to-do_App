// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { UserContext } from "../UserContext";

// function UpdateEmail() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { user } = useContext(UserContext);

//   const passcheck = () => {
//     const userpassword = user.password;
//     if (userpassword === password) {
//       return true;
//     }
//   };
//   const handleChange = (e) => {
//     e.preventDefault();
//     try {
//     } catch (error) {}
//   };
//   return (
//     <div>
//       <div className="shadow-lg flex gap-3 text-xl font-semibold px-2 py-4 rounded-lg items-center">
//         <Link to="/account">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             stroke-width="2"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M5 12l14 0" />
//             <path d="M5 12l6 6" />
//             <path d="M5 12l6 -6" />
//           </svg>
//         </Link>

//         <h1>Change email address</h1>
//       </div>
//       <form onSubmit={handleChange}>
//         <div className="flex flex-col gap-2 px-4 py-6 mt-4">
//           <h1 className="font-medium capitalize">new email</h1>
//           <input
//             type="email"
//             className="outline-1 outline px-2 py-3 rounded-lg"
//             value={email}
//             onChange={(ev) => setEmail(ev.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2 px-4 py-6">
//           <h1 className="font-medium capitalize">password</h1>
//           <input
//             text="password"
//             className="outline-1 outline px-2 py-3 rounded-lg"
//             value={password}
//             onChange={(ev) => setPassword(ev.target.value)}
//           />
//         </div>
//         <div className="flex gap-3 justify-end px-4">
//           <button className="btn">cancel</button>
//           <button
//             className={`btn bg-cyan text-white ${passcheck ? "bg-cyan/5" : ""}`}
//             disabled={!passcheck}
//           >
//             Change Email
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UpdateEmail;
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function UpdateEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display error messages
  const { user, setUser } = useContext(UserContext); // Assuming setUser to update user context
  const navigate = useNavigate();
  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/updateEmail/${user.id}`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Example token, adjust as needed
          },
        }
      );

      if (response.status === 200) {
        // Update user context with new email
        setUser((prevUser) => ({ ...prevUser, email: response.data.email }));
        alert("Email updated successfully.");
        navigate("/account");
      } else {
        setError("Failed to update email.");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      setError("An error occurred while updating the email.");
    }
  };

  return (
    <div className="card">
      <div className="shadow-lg flex gap-3 text-xl font-semibold px-2 py-4 rounded-b-lg text-black items-center bg-cyan">
        <Link to="/account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
        </Link>
        <h1>Change email address</h1>
      </div>
      <form
        onSubmit={handleChange}
        className="flex flex-col lg:w-96 lg:ml-10  "
      >
        <div className="flex flex-col gap-2 px-4 py-6 mt-4">
          <h1 className="font-medium capitalize lg:font-bold">New email</h1>
          <input
            type="email"
            className="outline-1 outline px-2 py-3 rounded-lg"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 px-4 py-6">
          <h1 className="font-medium capitalize lg:font-bold">Password</h1>
          <input
            type="password"
            className="outline-1 outline px-2 py-3 rounded-lg"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        {error && <p className="text-red-500 px-4">{error}</p>}
        <div className="flex gap-3 justify-end px-4 ">
          <Link to="/account">
            <button type="button" className="btn">
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            className="btn bg-cyan text-white"
            disabled={!email || !password}
          >
            Change Email
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEmail;

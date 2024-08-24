import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Account() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);

  const [isButtonVisible, setIsButtonVisible] = useState(false); // State to show/hide update button

  const navigate = useNavigate();

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/deleteAccount/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Example token, adjust as needed
        },
      });

      if (response.status === 200) {
        alert("Account deleted successfully.");
        setIsVisible(false);
        navigate("/login"); // Navigate to login after account deletion
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting the account.");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsButtonVisible(true); // Show the update button when name is changed
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/updateName/${user.id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Example token
          },
        }
      );

      if (response.status === 200) {
        setUser((prevUser) => ({ ...prevUser, name: response.data.name }));
        alert("Name updated successfully.");
        setIsButtonVisible(false); // Hide the update button after successful update
      } else {
        alert("Failed to update name.");
      }
    } catch (error) {
      console.error("Error updating name:", error);
      alert("An error occurred while updating the name.");
    }
  };

  return (
    <div>
      <div className="shadow-lg flex gap-3 text-xl font-semibold px-2 py-4 rounded-b-lg items-center bg-cyan    text-black">
        <Link to="/home">
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
        <h1>Account</h1>
      </div>
      <div className="flex flex-col px-7 py-7 gap-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-xl text-black">Name</h1>
            <input
              type="text"
              value={name}
              className="bg-white input input-bordered input-md w-full max-w-xs"
              onChange={handleNameChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-xl text-black">Email</h1>
          <p className="font-medium">{user.email}</p>
          <Link to="/updateEmail">
            <button className="btn bg-blue-gray-100 text-black w-36">
              Change email
            </button>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-medium">Delete Account</h1>
          <button
            className="btn btn-outline btn-error w-36"
            onClick={handleDelete}
          >
            Delete account
          </button>
        </div>

        {/* Show update/cancel buttons only if name is changed, inside the card */}
        {isButtonVisible && (
          <div className="flex gap-3 justify-end">
            <Link to="/account">
              <button type="button" className="btn">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="btn bg-cyan text-white"
              onClick={handleNameUpdate}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;

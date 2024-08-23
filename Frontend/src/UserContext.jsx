// import axios from "axios";
// import { createContext, useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom"; // Assuming you're using react-router

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);
//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await axios.get("/profile");
//         setUser(data);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           // Handle token expiration by redirecting to login page
//           setUser(null);
//           navigate("/login"); // Redirect to login page
//         } else {
//           console.error(
//             "Error fetching profile:",
//             error.response?.data || error.message
//           );
//         }
//       } finally {
//         setReady(true);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   return (
//     <UserContext.Provider value={{ user, setUser, ready }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation to check current route

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser(data);
      } catch (error) {
        if (error.response?.status === 401) {
          // Check if the user is already on a public route (e.g., login, signup)
          const publicRoutes = ["/login", "/signup"];
          if (!publicRoutes.includes(location.pathname)) {
            // Only redirect to login if they are trying to access a protected route
            setUser(null);
            navigate("/login");
          }
        } else {
          console.error(
            "Error fetching profile:",
            error.response?.data || error.message
          );
        }
      } finally {
        setReady(true);
      }
    };

    fetchProfile();
  }, [navigate, location]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

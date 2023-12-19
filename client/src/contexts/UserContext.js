import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

  function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch("/me")
        .then((r) => {
          if (r.status === 204) {
            // No Content, return without attempting to parse JSON
            return;
          }
          if (!r.ok) {
            throw new Error("Network response was not ok");
          }
          return r.json();
        })
        .then((userData) => {
          if (userData) {
            setUser(userData);
          }
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setError(err.message);
        });
    }, []);
    

    return (
      <UserContext.Provider value={{ user, setUser, error }}>
        {children}
      </UserContext.Provider>
    );
  }

export { UserContext, UserProvider };

import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

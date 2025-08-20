import React, { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  user : JSON.parse(localStorage.getItem("user")) || null
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "admin-log-in":
        localStorage.setItem("admin" , JSON.stringify( action.payload.admin))
        return { ...state, admin: action.payload.admin };
    case "admin-log-out":
        localStorage.removeItem("admin")
      return { admin: null };
    case "user-verified":
        localStorage.setItem("user", JSON.stringify(action.payload)); 
        return { ...state, user: action.payload };
    case "userProfile-update":
         localStorage.setItem('user', JSON.stringify(action.payload));
        return { ...state , user : action.payload}
    case "user-log-in":
        localStorage.setItem("user" , JSON.stringify(action.payload))
        return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

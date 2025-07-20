import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserContext = ({ children }) => {
  const [userChat, setuserChat] = useState([]);
  const [AIChat, setAIChat] = useState([]);

  return (
    <UserDataContext.Provider value={{ userChat, setuserChat, AIChat, setAIChat }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
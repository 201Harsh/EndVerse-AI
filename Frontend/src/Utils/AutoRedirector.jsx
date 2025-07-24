import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoRedirector = () => {
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();

  useEffect(() => {
    if (token) {
      Navigate("/dashboard");
    } else {
      Navigate("/welcome");
    }
  }, [token, Navigate]);
  

};

export default AutoRedirector;

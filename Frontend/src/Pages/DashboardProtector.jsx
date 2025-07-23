import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import axiosInstance from "../config/Axios";
import Preloader from "../Components/Preloader";

const DashboardProtector = ({ children }) => {
  const [IsLoading, setIsLoading] = useState(true);

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    Navigate("/");
  }

  useEffect(() => {
    const IsUserCheck = async () => {
      try {
        const res = await axiosInstance.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        } else {
          localStorage.clear();
          Navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        localStorage.clear();
        Navigate("/");
      }
    };

    IsUserCheck();
  }, [token, Navigate]);

  if (IsLoading) {
    return (
      <>
        <Preloader />
      </>
    );
  }

  return <>{children}</>;
};

export default DashboardProtector;

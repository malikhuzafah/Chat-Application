import React, { useEffect } from "react";
// import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
const Logout = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return <>{props.children}</>;
};

export default Logout;

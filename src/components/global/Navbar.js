import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { useMoralis } from "react-moralis";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import HoverButton from "./HoverButton";

const Navbar = () => {
  const { authenticate, isAuthenticated, logout, authError } = useMoralis();
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const logoutMoralis = () => {
    logout().then(() => {
      navigate("/");
    });
  };
  useEffect(() => {
    if (authError && authError.message && isLogin) {
      notification.error({
        message: authError.message,
      });
      setIsLogin(false);
    }
  }, [authError]);
  return (
    <div className="headerBg">
      <div className="logo-content w-50">
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
      </div>
      <div className="nav-items w-50">
        {isAuthenticated ? (
          <>
            <HoverButton onClick={() => navigate("/course")} buttonText="Start" />
            <HoverButton onClick={() => navigate("/aboutUs")} buttonText="About" />
            <HoverButton onClick={() => navigate("/profile")} buttonText="Profile" />
            <HoverButton onClick={logoutMoralis} buttonText="Logout" />
      
          </>
        ) : (
          <HoverButton onClick={() => {
            setIsLogin(true);
            authenticate();
          }} buttonText="Metamask Login" />

        )}
      </div>
    </div>
  );
};

export default Navbar;

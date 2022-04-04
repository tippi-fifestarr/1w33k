import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { useMoralis } from "react-moralis";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

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
            <div className="nav-item" onClick={() => navigate("/profile")}>
              <h3>Profile</h3>
            </div>
            <div className="nav-item" onClick={() => logoutMoralis()}>
              <h3>Logout</h3>
            </div>
          </>
        ) : (
          <div
            className="nav-item"
            onClick={() => {
              setIsLogin(true);
              authenticate();
            }}
          >
            <h3>Login with metamask</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

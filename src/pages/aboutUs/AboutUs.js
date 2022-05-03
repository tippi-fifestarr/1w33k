import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";

import "./aboutUs.css";
import beTheHero from "../../assets/beTheHero.svg";
import { notification } from "antd";
import HoverButton from "../../components/global/HoverButton";

// this is the about us page, but actually home.
const AboutUs = () => {
  const navigate = useNavigate();
  const { authenticate, isAuthenticated, authError } = useMoralis();
  const [clickOnStart, setClickOnStart] = useState(false);

  useEffect(() => {
    if (authError && authError.message && clickOnStart) {
      notification.error({
        message: authError.message,
      });
      setClickOnStart(false);
    }
  }, [authError]);

  useEffect(() => {
    if (clickOnStart && isAuthenticated) {
      navigate("/");
    }
    setClickOnStart(false);
  }, [isAuthenticated]);

  const startStackTimer = () => {
    setClickOnStart(true);
    if (isAuthenticated) {
      navigate("/");
    } else {
      authenticate();
    }
  };
  return (
    <div>
      <div className="home-course">
        <div className="w-50 data-content h-100">
          <h1 className="title">About UN 5tack</h1>
          <h2 className="subtitle">
            We are a team who wants to encourage people to read more books.  
            <br />
            A stack of books a day keeps the duldrums away.
          </h2>
          <br />
          <HoverButton
            buttonText="Start STACKING!"
            onClick={startStackTimer}
          />
        </div>
        <div className="w-50 image-content h-100">
          <img
            src={beTheHero}
            alt="course-person"
            className="img-home-person"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

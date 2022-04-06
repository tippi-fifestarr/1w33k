import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";

import "./Home.css";
import HomePerson from "../../assets/homePerson.svg";
import { notification } from "antd";
import HoverButton from "../../components/global/HoverButton";

const Home = () => {
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
      navigate("/course");
    }
    setClickOnStart(false);
  }, [isAuthenticated]);

  const startCourse = () => {
    setClickOnStart(true);
    if (isAuthenticated) {
      navigate("/course");
    } else {
      authenticate();
    }
  };
  return (
    <div>
      <div className="home-course">
        <div className="w-50 data-content h-100">
          <h1 className="title">1w33k pop quiz</h1>
          <h2 className="subtitle">
            1W33k is a quiz about comics to people become familiar with the principal topics of the comics. To start, you need to sign in.
          </h2>
          <br />
          <HoverButton buttonText="Start for Free Homie!" onClick={startCourse}/>
        </div>
        <div className="w-50 image-content h-100">
          <img
            src={HomePerson}
            alt="course-person"
            className="img-home-person"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

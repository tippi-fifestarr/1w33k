import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";

import "./Home.css";
import HomePerson from "../../assets/homePerson.jpg";
import { notification } from "antd";

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
          <h1 className="title">Learn to program with 1w33k Academy</h1>
          <h2 className="subtitle">
            1W33k's team create a questionarie about comics to people become
            familiar with the principal topics
          </h2>
          <br />
          <div className="nav-item-home" onClick={startCourse}>
            <h3>Start for FREE!</h3>
          </div>
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

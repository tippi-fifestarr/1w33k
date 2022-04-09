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
          <h1 className="title">About 1w33k</h1>
          <h2 className="subtitle">
            We are a team of developers and designers who are passionate about
            things.
            <br />
            Our client is an equipment supplier for Comic-Con fairs. The staff
            of the company has changed over the years. A large part of the young
            employees are not sufficiently familiar with classics such as Star
            Wars. In their work, they are often involved in conversations with
            exhibitors who have been in the scene for a long time and are well
            established. This has repeatedly led to disputes with hardcore
            nerds, which subsequently have a negative impact on business.
          </h2>
          <br />
          <HoverButton
            buttonText="Fart for Free, From Us!!!"
            onClick={startCourse}
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

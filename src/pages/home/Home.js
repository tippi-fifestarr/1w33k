import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import StackSetup from "../../components/global/stacks/StackSetup";
import "./Home.css";
import Education from "../../assets/Education.svg";
import { notification } from "antd";
import HoverButton from "../../components/global/HoverButton";
import Timer from "../../components/global/Timer";

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
  
  const MinSecs = { minutes:5, seconds:0 }

  return (
    <div>
      {isAuthenticated ? (


        // component for authenticated users
        <>
          < StackSetup />

          <div>yeah it works </div>
        </>

      ) : (
        <div className="home-course">
          <div className="w-50 data-content h-100">
            <h1 className="title">Unstack your stacks!</h1>
            <h2 className="subtitle">
            Reading increases intelligence, enhances empathy, and protects the brain from memory loss. Start today with your 5 Stack.
            </h2>
            <br />
            <HoverButton buttonText="Start STACKING!" onClick={startCourse}/>
            <br />
            <h2 className="subtitle">
            27 minutes. 5 books. <br />
  <p> 5 min. each book, 30 sec. breaks. adjust as needed. </p>
</h2>
          </div>
          <div className="w-50 image-content h-100">
            <img
              src={Education}
              alt="course-person"
              className="img-home-person"
            />
          </div>
          <p>Build a habit. Fall in love with learning again. Get rewarded when you read and engage with the un5tack community.</p>
        </div>
      )}
    </div>
  )
};

export default Home;

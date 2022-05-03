import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import "./Profile.css";
import knowledgeRoad from "../../assets/undraw_road_to_knowledge_m8s0.svg";
import bibliophile from "../../assets/bibliophile.svg";
import { notification } from "antd";
import HoverButton from "../../components/global/HoverButton";

// this is the profile page, which has Summary and Activities.
const Profile = () => {
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
      navigate("/stack");
    }
    setClickOnStart(false);
  }, [isAuthenticated]);

  const startStack = () => {
    setClickOnStart(true);
    if (isAuthenticated) {
      navigate("/stack");
    } else {
      authenticate();
    }
  };
  return (
    <div>
      <div className="home-stack">
        <div className="w-50 data-content h-100">
          <h1 className="title">Summary & Activity</h1>
          <section className="main-summary">
            <div className="user-info">
              <h1>Alice Stackington </h1>
              <p className="user-info-subtitle">Reader since May 1st, 2022</p>
              <h2 className="achievements">Achievements</h2>
            <div className="achievement-card">
              <h2 className="achievement-title">[2] 2 Day Streak</h2>
              <p className="achievement-subtitle">keep it up!</p>
            </div>
            <div className="achievement-card">
            <img
            src={bibliophile}
            alt="bibliophile"
            className="info-image"
          />
              <h2 className="achievement-title">8/100 Books Unstacked</h2>
              <p className="achievement-subtitle">Complete your first milestone for your badge!</p>
              </div>
            </div>
          <div className="achievement-card">
          <h2 className="achievement-title">200pts</h2>
              <p className="achievement-subtitle">engage with community</p>
             
            </div>
          </section>
          <section className="main-activity">
            <h2 className="activity-user">Stacker Bob</h2>
            <p className="activity-message">"hey! welcome to the UN.5tacker DAO! Did you know "stack and stake" is coming soon?"</p>
            </section>
          
          <br />
          <HoverButton
            buttonText="Start a Stack"
            onClick={startStack}
          />
        </div>
        <div className="w-50 image-content h-100">
          <img
            src={knowledgeRoad}
            alt="steps-of-books"
            className="img-home-person"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

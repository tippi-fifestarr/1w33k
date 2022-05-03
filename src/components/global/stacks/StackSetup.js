import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import "./HomeStacks.css";
import knowledgeRoad from "../../../assets/undraw_road_to_knowledge_m8s0.svg";
import readingTime from "../../../assets/reading-time.svg";
import { notification } from "antd";
import HoverButton from "../HoverButton";

// this is the add stacks home page, which lets the stacker
// 1. upload a picture to NFT storage and save the CID to moralis db for profile
// 2. make a new stack of books: #of books, #minutes per book, #minutes per rest, save to web3.storage
// 3. start the stack button activates timer thing
// 4. add the CID to the stacker's profile and redirect to the timer page
const StackSetup = () => {
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
      navigate("/stackTimer");
    }
    setClickOnStart(false);
  }, [isAuthenticated]);

  const startStackTimer = () => {
    setClickOnStart(true);
    if (isAuthenticated) {
      navigate("/stackTimer");
    } else {
      authenticate();
    }
  };
  return (
    <div>
      <div className="home-stack">
        <div className="w-50 data-content h-100">
          <h1 className="title">Setup Stacks</h1>
          <section className="stack-box">
            <div className="user-info">
            <img
            src={readingTime}
            alt="Reading timer"
            className="info-image"
          />
              <h1>Alice Stackington</h1>
            </div>
          </section>
          <section className="stack-box">
            <div className="stack-info">
              <h2># of Books </h2>
              <label for="quantity">Quantity (stack height):</label>
              <input type="number" id="quantity" name="quantity" min="1" max="42" value="5" />
            </div>
          </section>
          <section className="stack-box">
            <div className="stack-info">
              <h2>Time per Book </h2>
              <label for="minutes">minutes:</label>
              <input type="number" id="minutes" name="minutes" min="1" max="42" value="5"/>
              <label for="seconds">secs:</label>
              <input type="number" id="seconds" name="seconds" min="0" max="60" value="0"/>
            </div>
          </section>
          <section className="stack-box">
            <div className="stack-info">
              <h2>Rest per Book</h2>
              <label for="minutes">mins:</label>
              <input type="number" id="minutes" name="minutes" min="1" max="42" value="0"/>
              <label for="seconds">secs:</label>
              <input type="number" id="seconds" name="seconds" min="0" max="60" value="30"/>
            </div>
          </section>
          <section className="upload-image">
            <h2 className="activity-user">Upload Image</h2>
            
            </section>
          
          <br />
          <HoverButton
            buttonText="Start a Stack"
            onClick={startStackTimer}
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

export default StackSetup;

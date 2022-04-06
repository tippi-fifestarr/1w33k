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

  const addAlbumToMetamask = async () => {
    const tokenAddress = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
    const tokenSymbol = "USDT";
    const tokenDecimals = 18;
    const tokenImage =
      "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png";
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="home-course">
        <div className="w-50 data-content h-100">
          <h1 className="title">1w33k pop quiz</h1>
          <h2 className="subtitle">
            1W33k is a quiz about comics to people become familiar with the
            principal topics of the comics. To start, you need to sign in.
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

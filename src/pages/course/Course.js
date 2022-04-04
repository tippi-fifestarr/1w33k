import React, { useEffect, useState } from "react";
import {
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
} from "react-moralis";
import "./Course.css";
import helper from "./Helper.json";
import { Radio, Space, notification, Progress } from "antd";
import { LeftOutlined, RightOutlined, CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/global/Loading";

const Course = () => {
  const { save } = useNewMoralisObject("userCourse");
  const { user, isAuthenticated } = useMoralis();
  const [firstLoad, setFirstLoad] = useState(0);
  const { data, fetch, isFetching } = useMoralisQuery(
    "userCourse",
    (query) => query.equalTo("ethAddress", user?.attributes?.ethAddress),
    [user],
    { autoFetch: false }
  );

  const [dataToShow, setDataToShow] = useState({});
  const [optionSelected, setOptionSelected] = useState();
  const [showValidation, setShowValidation] = useState(true);
  const [showClaim, setShowClaim] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && firstLoad === 0) {
      setFirstLoad(1);
      fetch();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (firstLoad !== 0) {
      if (data.length > 0) {
        if (firstLoad === 1) {
          setFirstLoad(2);
          let auxData = data.length;
          while (auxData - 1 >= helper.length) {
            auxData--;
          }
          setDataToShow(helper[auxData - 1]);
        } else {
          if (data.length > dataToShow.chapter) {
            dataToShow.questions.options.forEach((option, index) => {
              if (option.value) {
                setOptionSelected(index);
              }
            });

            setShowValidation(false);
            if (dataToShow.chapter === helper.length) {
              setShowClaim(true);
            }
          }
        }
      } else {
        initChapter();
      }
    }
  }, [data]);

  useEffect(() => {
    if (dataToShow.chapter) {
      fetch();
    }
  }, [dataToShow]);

  const initChapter = () => {
    save({ ethAddress: user.attributes.ethAddress, chapter: 0 });
    setDataToShow(helper[0]);
  };

  const validateAnswer = () => {
    if (dataToShow.questions?.options[optionSelected].value) {
      setShowValidation(false);
      notification.success({
        message: "This is correct",
        description: "Go on to the next chapter",
        duration: 5,
      });

      save({
        ethAddress: user.attributes.ethAddress,
        chapter: dataToShow.chapter,
      });
    } else {
      notification.error({
        message: "This is wrong",
        description: "Correct your answer and try again",
        duration: 5,
      });
    }
  };

  const previous = () => {
    setOptionSelected();
    setShowValidation(true);
    setShowClaim(false);
    setDataToShow(helper[dataToShow.chapter - 2]);
  };

  const next = () => {
    if (dataToShow.chapter === helper.length) {
      setShowClaim(true);
      return;
    }
    setShowClaim(false);
    setOptionSelected();
    setShowValidation(true);
    setDataToShow(helper[dataToShow.chapter]);
  };

  return (
    <div className="course-content">
      {isFetching && <Loading />}
      <div className="w-60 ">
        <div className="card-info card-info-padding">
          <p>Chapter {dataToShow.chapter}: </p>
          <h1 className="title-course"> {dataToShow.title} </h1>
          <div className="imgContent">
            <div>
              <img
                src={dataToShow.img}
                className="imgChapter"
                alt="logo-chapter"
              />
            </div>
            <div>
              <div className="commentChapter">{dataToShow.comment}</div>
            </div>
          </div>
          <div className="content-course">{dataToShow.content}</div>
        </div>
      </div>
      <div className="w-40 question-section ">
        <div className="questions">
          <h2> {dataToShow.questions?.title} </h2>
          <div className="options">
            <Radio.Group
              disabled={!showValidation}
              onChange={(e) => setOptionSelected(e.target.value)}
              value={optionSelected}
            >
              <Space direction="vertical">
                {dataToShow.questions?.options.map((option, index) => (
                  <Radio value={index} key={index}>
                    {option.label}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>

        {showValidation && (
          <div className="card-info card-answer-padding">
            <div className="text-center">
              <h1 className="title-validation"> Awaiting validation </h1>
              <div className="comment-validation">
                Provide your solution above and validate your answer
              </div>
              <div className="nav-item-home m-auto" onClick={validateAnswer}>
                <h3>Validate answer</h3>
              </div>
            </div>
          </div>
        )}
        <div className="progress-course">
          {dataToShow.chapter && showValidation && (
            <Progress
              percent={(100 / (helper.length + 1)) * dataToShow.chapter}
            />
          )}
          {dataToShow.chapter && !showValidation && (
            <Progress percent={(100 / helper.length) * dataToShow.chapter} />
          )}
        </div>
        <div className="arrow">
          <div className="w-50">
            {dataToShow.chapter === 1 ? (
              <div className="nav-item-home" onClick={() => navigate("/")}>
                <h3>
                  <LeftOutlined /> Go to Home
                </h3>
              </div>
            ) : (
              <div className="nav-item-home" onClick={previous}>
                <h3>
                  <LeftOutlined /> previous
                </h3>
              </div>
            )}
          </div>

          <div className="w-50 arrow-next">
            {!showValidation && !showClaim && (
              <div className="nav-item-home" onClick={next}>
                <h3>
                  Next <RightOutlined />
                </h3>
              </div>
            )}

            {showClaim && (
              <div className="nav-item-home">
                <h3>
                  Claim NTT <CheckOutlined />
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;

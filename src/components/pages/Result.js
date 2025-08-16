import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import { DataLayer } from "../common/Function";

const Result = () => {
  let history = useNavigate();
  ReactSession.setStoreType("localStorage");

  const [urlPre, setUrlPre] = useState("");

  useEffect(() => {
    if (window.location.pathname.split("/")[1] === "men") {
      setUrlPre("/men");
    } else if (window.location.pathname.split("/")[1] === "women") {
      setUrlPre("/women");
    } else if (window.location.pathname.split("/")[1] === "over40") {
      setUrlPre("/over40");
    } else {
      setUrlPre("");
    }
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "monthlyResultView",
      stage: "Personalized Plan",
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="woman_container">
          <h2 className="woman_title">Your weight</h2>
          <div className="graph-sec">
            <div className="graph_wrp">
              <img
                src={common_icons["grapg"]}
                alt="loading"
                loading="lazy"
                width={347}
                height={257}
              />
              <div className="line_wrp">
                <svg
                  width="286"
                  height="195"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.339 14.323c30.012 71.852 85.75 76.61 129.101 77.086 79.081 0 70.029 77.086 142.441 77.086v25.695H14.339V14.323z"
                    fill="url(#graphDown_svg__paint0_linear)"
                  ></path>
                  <path
                    clipRule="evenodd"
                    d="M14 27c7.18 0 13-5.82 13-13S21.18 1 14 1 1 6.82 1 14s5.82 13 13 13z"
                    stroke="#F1D148"
                    strokeWidth="1.91"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.217 21.71a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                    fill="#F2D148"
                  ></path>
                  <path
                    d="M14.339 14.323c30.012 71.852 85.75 76.61 129.101 77.086 92.42 0 59.549 77.086 131.96 77.086"
                    stroke="url(#graphDown_svg__paint1_linear)"
                    strokeWidth="7.639"
                  ></path>
                  <defs>
                    <linearGradient
                      id="graphDown_svg__paint0_linear"
                      x1="14.339"
                      y1="14.323"
                      x2="14.339"
                      y2="194.19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F7D147" stopOpacity="0.1"></stop>
                      <stop
                        offset="1"
                        stopColor="#fff"
                        stopOpacity="0.01"
                      ></stop>
                    </linearGradient>
                    <linearGradient
                      id="graphDown_svg__paint1_linear"
                      x1="-116.161"
                      y1="91.391"
                      x2="18.816"
                      y2="319.949"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F7D147"></stop>
                      <stop offset="0.524" stopColor="#93D054"></stop>
                      <stop offset="1" stopColor="#69CCBD"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="nowmnwrap">
                <p className="nowClss">Now</p>
              </div>
              <div className="weekedmnwrap">
                <p className="weeked">
                  After <br /> 4 weeks
                </p>{" "}
              </div>
              <img
                className="circle"
                src={common_icons["circle"]}
                alt="loading"
                loading="lazy"
                width={28}
                height={28}
              />
            </div>
            <p>This chart is for illustrative purposes only</p>
            <h3>Your 4-week Keto Dieting Plan is ready!</h3>
          </div>
          <Link to={urlPre + "/email.html"}>
            <div className="sp11" style={{ marginRight: "0px" }}>
              <span className="necxbutton1 necxbuttontex" id="continue">
                Continue
              </span>
            </div>
          </Link>
          <p className="secured-data">
            <img src={common_icons["secure_lock"]} width={10} height={10} />{" "}
            Your information is secure with us
          </p>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Result);

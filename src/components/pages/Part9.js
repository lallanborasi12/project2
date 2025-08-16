import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Header from "../common/Header";
import { common_icons } from "../../config/imagedata/small_icons";
import logo from "../../logo.svg";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Part9 = () => {
  ReactSession.setStoreType("localStorage");
  const history = useNavigate();
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [counts, setCount] = useState(true);
  let [currentSlides, setCurrentSlide] = useState(0);
  const [continueButton, setContinueButton] = useState(false);
  const [defaultAge, setDefaultAge] = useState(0);

  const objectArr = [
    {
      content: `<p>Brilliant plan! | was first sceptical about it but once started, all my doubt has gone away now and the results? OMG! It's unbelievable! All thanks to this keto meal plan!</p>`,
      imgstr: common_icons["star"],
      username: "Carmen Harris",
    },
    {
      content: `<p>I couldn't ever imagine that | could ever restrain my food cravings but this keto never lets me feel deprived of anything | love to eat. Such an awesome and amaz- ingly designed meal plan it is!! </p> `,
      imgstr: common_icons["star"],
      username: "Stephanie Ortego",
    },
    {
      content: `<p>This high fat-low carb thing really worked forme and | got an extraordinary result out of this. Plus my blood sugar and other related ailments are under control now. Wow! </p> `,
      imgstr: common_icons["star"],
      username: "Hamsa Oueity Amin",
    },
    {
      content: `<p>Been doing keto for last a couple of months and it takes care all of my snack and dessert craving as well as helps me shed pounds in such a short period of time. Amazing!</p> `,
      imgstr: common_icons["star"],
      username: "Teresa Coleman",
    },
    {
      content: `<p>Nothing could beat this high fat and low carb combo when you're sincerely looking for weight loss. I'm saying this because | have been doing this.</p> `,
      imgstr: common_icons["star"],
      username: "Allison Gabrielle",
    },
  ];

  useEffect(() => {
    if (ReactSession.get("Get_validation") == undefined) {
      history("/");
    }

    if (window.location.pathname.split("/")[1] === "men") {
      setUrlPre("/men");
    } else if (window.location.pathname.split("/")[1] === "women") {
      setUrlPre("/women");
    } else if (window.location.pathname.split("/")[1] === "over40") {
      setUrlPre("/over40");
    } else {
      setUrlPre("");
    }

    setTimeout(() => {
      setIsLoading(true); // Set loading state to false
    }, 350);

    if (ReactSession.get("age")) {
      setDefaultAge(ReactSession.get("age"));
      ReactSession.set(
        "age_id",
        ReactSession.get("Get_age").categoryItems[0].itemId
      );
      setContinueButton(true);
    } else {
      if (defaultAge > val_ageMax && defaultAge < val_ageMin) {
        ReactSession.set("age", defaultAge);
        setContinueButton(true);
      } else {
        setContinueButton(false);
      }

      ReactSession.set(
        "age_id",
        ReactSession.get("Get_age").categoryItems[0].itemId
      );
    }
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "part9PageView",
      stage: "Age Information",
    });
  }, []);

  if (ReactSession.get("Get_validation") == undefined) {
    return false;
  }

  //-----------------Validation Values---------------------
  const val_session = ReactSession.get("Get_validation");
  const val_recommendationMessage = val_session["recommendationMessage"];
  //-----------------Validation Values--------------------!
  //-----------------Validation Values---------------------
  const val_ageMin = val_session["ageMin"];
  const val_ageMax = val_session["ageMax"];
  //-----------------Validation Values--------------------!

  const handleAGE = (e) => {
    if (e > val_ageMax) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid age.</span>";
      setContinueButton(false);
    } else if (e < val_ageMin) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid age.</span>";
      setContinueButton(false);
    } else {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class=''></span>";
      ReactSession.set(
        "age_id",
        ReactSession.get("Get_age").categoryItems[0].itemId
      );
      ReactSession.set("age", e);
      setContinueButton(true);
    }
  };

  // ------------------------------------------------

  function myFunction(con_e) {
    /* -------------Progress modal part------------------------------*/
    document.getElementById("modalOne").style.display = "block";
    document.getElementById("modalOne").style.backgroundColor = "#fff";

    setTimeout(() => {
      history(urlPre + "/feedback-summary.html");
    }, 10000); //14000

    let number = document.getElementById("number");
    let counter = 0;

    setInterval(() => {
      if (counter == 100) {
        // clearInterval;
      } else {
        counter += 1;
        number.innerHTML = `${counter}%`;
      }
    }, 83); //140

    // Text slider part additionally use

    const slider = document.querySelector(".js-processing-slider");
    let currentIndex = 0;

    /* ---------start slider ----------  */

    const nextSlide = () => {
      // console.log(currentSlides);
      if (counts == true) {
        setCurrentSlide(++currentSlides);
        if (currentSlides == "4") {
          setCount(false);
        }
      }
    };

    const interval = setInterval(() => {
      if (counts == true) {
        nextSlide();
      }
    }, 2100);

    return () => {
      clearInterval(interval);
    };

    /*---------Progress modal part ends------------------*/
  }
  //-----------------------normal javascript-----------------------!

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "81%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>

        <div className="tit">
          <h1>{ReactSession.get("Get_age")["title1"]}</h1>
        </div>

        <div className="content active-content">
          <div>
            <label>
              <input
                type="number"
                onInput={(event) => {
                  event.target.value = event.target.value
                    .replace(/[^0-9]*/g, "")
                    .slice(0, 2);
                }}
                onKeyUp={(e) => {
                  handleAGE(e.target.value);
                }}
                onWheel={(e) => {
                  handleAGE(e.target.value);
                }}
                maxLength="3"
                placeholder={defaultAge == 0 ? defaultAge : "0"}
                defaultValue={defaultAge > 0 ? defaultAge : ""}
                className="hgtft"
              />
              <span className="untft">years</span>
            </label>
            {/* <p className='heightsu'>Enter a value from {val_ageMin} to {val_ageMax} years</p> */}
          </div>
        </div>

        <div className="hgtnote">
          <img
            src={common_icons["point"]}
            alt="Loading"
            width={16}
            height={16}
            loading="lazy"
          />
          <div>
            <p>
              <strong>Your age affects your dieting plan</strong>
            </p>
            <p>
              Older people tend to have more body fat than younger people with
              the same BMI.
            </p>
          </div>
        </div>

        <div className="err_popup2">
          <span></span>
        </div>
        {continueButton == true ? (
          <a
            href={void 0}
            onClick={myFunction}
            className={"sp11"}
            id="continue"
          >
            <div className="necxbutton1">Continue</div>
          </a>
        ) : (
          <a
            href={void 0}
            onClick={() => {
              document.getElementsByClassName("err_popup2")[0].innerHTML =
                "<span class='err_popup'>Please enter valid age.</span>";
            }}
            className={"sp11 "}
            id="continue"
          >
            <div className="necxbutton1 disabled">Continue</div>
          </a>
        )}
        <SecurePolicy common_icons={common_icons} />
      </div>

      {/* <Footer /> */}
      {/* <!-- popup	-->
	        <!-- new modal starts here --> */}
      <div id="modalOne" className="modal">
        <div className="main-content">
          <div className="animated_logo ">
            <img src={logo} alt="KetoBalanced.Com" className="brand-logo" />
          </div>

          <div className="o-section-step">
            <div className="container margin-at">
              <div className="o-section-step__form">
                <div className="m-form-processing new-modal" id="processing">
                  <div className="m-form-processing__block-processing m-block-processing js-block-processing">
                    <div className="skill svgCircle">
                      <div className="outer">
                        <div className="inner">
                          <div id="number"></div>
                        </div>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width="160px"
                        height="160px"
                      >
                        <defs>
                          <linearGradient id="GradientColor">
                            <stop offset="0%" stopColor="#56468f" />
                            <stop offset="100%" stopColor="#ff3464" />
                          </linearGradient>
                        </defs>
                        <circle cx="60" cy="60" r="45" strokeLinecap="round" />
                      </svg>
                    </div>

                    <br />
                    <p>Creating your personalized plan</p>
                    <div className="o-section-head">
                      <div className="o-section-head__block-title m-block-title">
                        {/* <div className="m-block-title__text">Processing meal<br />Plan</div> */}
                        <div className="m-block-title__text">
                          Join 1.25+ Million Users
                        </div>
                      </div>
                    </div>
                    <p>
                      <strong>Have chosen our app</strong>
                    </p>
                    <div className="m-block-processing__container">
                      <div className="m-block-processing__items js-processing-slider">
                        <div className="m-block-processing__item active">
                          <div className="carousels">
                            <div
                              className="carousel-wrappers"
                              style={{
                                transform: `translateX(-${
                                  currentSlides * 100
                                }%)`,
                              }}
                            >
                              {objectArr.map((obj, index) => (
                                <div key={index} className="carousel-slides">
                                  <p>
                                    <b>{obj.username}</b>
                                  </p>
                                  <img
                                    src={obj.imgstr}
                                    alt="Star"
                                    width={93}
                                    height={16}
                                  />
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: obj.content,
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script
        src="/js2/graph.js"
        data-cf-settings="dc3dfd1903b90617f139cdfd-|49"
        defer=""
      ></script>
    </div>
  );
};
export default React.memo(Part9);

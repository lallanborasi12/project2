import React, { useState, useEffect, useMemo } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL, { KETO_IMG_CDN_LIVE } from "../../config/constants";
import Loader from "../common/Loader";
import { common_icons } from "../../config/imagedata/small_icons";
import { feedback_summary_images } from "../../config/imagedata/pages/feedback_summary_images";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const FeedbackSummary = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  const [result_description, setresult_description] = useState();
  const [our_promise_img, setOur_promise_img] = useState();
  const [gender_name, set_gender_name] = useState(null);
  const [familiarity_name, set_familiarity_name] = useState(null);
  const [meal_preparation_name, set_meal_preparation_name] = useState(null);
  const [activity_name, set_activity_name] = useState(null);
  const [typical_day_for_you_name, set_typical_day_for_you_name] =
    useState(null);
  const [what_stands_true_for_you_name, set_what_stands_true_for_you_name] =
    useState([]);
  const [urlPre, setUrlPre] = useState("");
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fs_data, setFsData] = useState({
    feedback_summary_break: {},
    feedback_summary: {},
  });
  const [genderContent, setGenderContent] = useState(""); //Men
  const [bmi_left_percent, setBmiLeftPercent] = useState(0);

  //------------Find the element which should be need to update
  const what_stands_true_for_youArr = [];
  const getSurveyItemsName = async () => {
    const state = JSON.parse(ReactSession.get("ketobalanced_options"));
    // console.log(state.survey);
    if (
      !ReactSession.get("gender") ||
      !ReactSession.get("current_body_type") ||
      !ReactSession.get("howmuchtime") ||
      !ReactSession.get("part1") ||
      !ReactSession.get("part2") ||
      !ReactSession.get("part3") ||
      !ReactSession.get("part4") ||
      !ReactSession.get("part5") ||
      !ReactSession.get("part6") ||
      !ReactSession.get("part7")
    ) {
      history("/");
      return false;
    }

    const familiarityIndex =
      state.survey.surveyItems[19].categoryItems.findIndex(
        (element) => element.itemId == ReactSession.get("current_body_type")
      );
    const familiarity_name =
      state.survey.surveyItems[19].categoryItems[familiarityIndex].name;
    set_familiarity_name(familiarity_name);

    const meal_preparationIndex =
      state.survey.surveyItems[1].categoryItems.findIndex(
        (element) => element.itemId == ReactSession.get("howmuchtime")
      );
    const meal_preparation_name =
      state.survey.surveyItems[1].categoryItems[meal_preparationIndex].name;
    set_meal_preparation_name(meal_preparation_name);

    const activityIndex = state.survey.surveyItems[18].categoryItems.findIndex(
      (element) => element.itemId == ReactSession.get("part5")
    );
    const activity_name =
      state.survey.surveyItems[18].categoryItems[activityIndex].name;
    set_activity_name(activity_name);

    const typical_day_for_youIndex =
      state.survey.surveyItems[24].categoryItems.findIndex(
        (element) => element.itemId == ReactSession.get("part6")
      );
    const typical_day_for_you_name =
      state.survey.surveyItems[24].categoryItems[typical_day_for_youIndex].name;
    set_typical_day_for_you_name(typical_day_for_you_name);

    ReactSession.get("part7")
      .split(",")
      .forEach((element, index) => {
        const what_stands_true_for_youIndex =
          state.survey.surveyItems[5].categoryItems[index].name;
        what_stands_true_for_youArr.push(what_stands_true_for_youIndex);
      });
    set_what_stands_true_for_you_name(what_stands_true_for_youArr);
    /* console.log(what_stands_true_for_you_name);
        return false; */
    const genderIndex = state.survey.surveyItems[0].categoryItems.findIndex(
      (element) => element.itemId == ReactSession.get("gender")
    );
    const gender_name =
      state.survey.surveyItems[0].categoryItems[genderIndex].name;
    set_gender_name(gender_name);

    if (ReactSession.get("weight") == "" || ReactSession.get("target") == "") {
      var weightDataset = ReactSession.get("weight_1");
      var targetDataset = ReactSession.get("target_1");
    } else {
      var weightDataset = ReactSession.get("weight");
      var targetDataset = ReactSession.get("target");
    }

    const requestOption = {
      method: "POST",
      // mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gender: gender_name,
        age: ReactSession.get("age"),
        heightCm: ReactSession.get("cm"),
        heightFeet: ReactSession.get("ft"),
        heightInch: ReactSession.get("inch"),
        heightType: ReactSession.get("htype"),
        weight: weightDataset,
        targetWeight: targetDataset,
        weightType: ReactSession.get("type"),
        // "familiarity": familiarity_name,
        meal_preparation: meal_preparation_name,
        activity: activity_name,
        typical_day_for_you: typical_day_for_you_name,
        what_stands_true_for_you: what_stands_true_for_youArr,
      }),
    };

    // console.log(requestOption); return false;

    const url = API_BASE_URL + "/pre/bmi";
    await fetch(url, requestOption)
      .then((res) => res.json())
      .then((result) => {
        if (result["error"]) {
          console.log(result);
        } else {
          setData(result);
          result.kb_monthly_result.nextMonthTargetWeight =
            result.nextMonthTargetWeight; // Manual Assigned
          result.kb_monthly_result.currentWeight = result.currentWeight; // Manual Assigned

          setFsData(result.feedback_summary);
          ReactSession.set("kb_monthly_result", {
            kbmonthly: result?.kb_monthly_result || null,
            weightCalculator: result?.weightCalculator,
          });
          setBmiLeftPercent(
            determineBodyType(result.feedback_summary.feedback_summary_mbi)
          );
          setTimeout(() => {
            setIsLoading(true);
          }, 1500);
        }
      })
      .catch((err) => {
        setresult_description([]);
        console.log(err);
      });
  };

  //------------Find the element which should be need to update

  const common_icons_array = useMemo(() => common_icons);
  const feedback_summary_array = useMemo(() => feedback_summary_images, []);

  useEffect(() => {
    if (
      !ReactSession.get("age") ||
      !ReactSession.get("htype") ||
      !ReactSession.get("type")
    ) {
      history("/");
    } else {
      getSurveyItemsName();
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

    //----------------- gender filtration------------------------
    if (ReactSession.get("ketobalanced_options")) {
      const genderList = JSON.parse(ReactSession.get("ketobalanced_options"))
        .survey.surveyItems[0].categoryItems;
      const genderName = genderList.filter(
        (genderItem) => genderItem.itemId == ReactSession.get("gender")
      );
      setGenderContent(genderName[0].name);
    }

    //-------------- gender filtration-----------------------------

    setTimeout(() => {
      // setIsLoading(true); // Set loading state to false
    }, 250); // Simulate a 2-second delay
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "feedbackSummaryView",
      stage: "Overall Wellness Summary",
    });
  }, []);

  //-----------BMI range slider----------------------
  function determineBodyType(bmi) {
    if (bmi < 18.5) {
      return 2;
    } else if (bmi < 24.9) {
      return 10;
    } else if (bmi < 29.9) {
      return 47;
    } else if (bmi < 34.9) {
      return 70;
    } else if (bmi < 39.9) {
      return 85;
    } else {
      return 97;
    }
  }
  //-----------BMI range slider----------------------

  if (isLoading === false) {
    return (
      <div className="main-content">
        <div className="animated_logo feedback_logo" align="center">
          <img
            src={common_icons_array["logo"]}
            alt="KetoBalanced.Com"
            className="brand-logo"
          />
        </div>

        <div className="o-section-step">
          <div className="container margin-at">
            <div className="o-section-step__form">
              <div className="m-form-processing new-modal" id="processing">
                <div
                  className="m-form-processing__block-processing m-block-processing js-block-processing"
                  align="center"
                >
                  <div className="skill svgCircle">
                    <div
                      className="outer"
                      style={{ backgroundColor: "#c5868657" }}
                    >
                      <div className="inner">
                        <div id="number">100%</div>
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
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        strokeLinecap="round"
                        style={{ animation: "0s linear forwards anim" }}
                      />
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
                          <div className="carousel-wrappers " align="center">
                            <h1 className="center ovr_summ">
                              Your overall summary has been generated! 🎉
                            </h1>
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
    );
  }

  return (
    <div>
      <Header />

      {fs_data ? (
        <div className="bodly">
          <div className="tit sp11" style={{ marginRight: "0px" }}>
            <h1>Summary of your overall wellness</h1>
          </div>
          <div className="feedinnerwrap">
            <div className="summer ">
              <div className="hed1">
                <div>
                  <b>
                    {fs_data.feedback_summary_title_a
                      ? fs_data.feedback_summary_title_a
                      : "Body Mass Index (BMI)"}
                  </b>
                </div>
                <div>
                  {fs_data.feedback_summary_title_b
                    ? fs_data.feedback_summary_title_b
                    : "Normal - 21.5"}
                </div>
              </div>
              <div className="bmigrfsec">
                <img
                  src={feedback_summary_array["bggraph"]}
                  alt=""
                  className="sume"
                  width={376}
                  height={86}
                />

                <div className="bmibar">
                  <img
                    src={common_icons_array["progress_bar"]}
                    alt=""
                    className="sume"
                  />

                  <div
                    className="wrap-btntip"
                    style={{ left: bmi_left_percent + "%" }}
                  >
                    <div className="bmibtn"></div>
                    <div className="bmitltip">
                      You -{" "}
                      {fs_data.feedback_summary_mbi
                        ? fs_data.feedback_summary_mbi
                        : "00"}
                    </div>
                  </div>
                </div>
                <div className="cern1">
                  <b>NORMAL</b>
                  <b>OVERWEIGHT</b>
                  <b>OBESE</b>
                </div>
              </div>
            </div>

            <div className="bmidescptnwrp">
              <div className="">
                <div className="icntxtwrap">
                  <img
                    src={common_icons_array["lazy_icon"]}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <div>
                    <p>Lifestyle</p>
                    <b>
                      {fs_data.feedback_summary_break.lifestyle
                        ? fs_data.feedback_summary_break.lifestyle
                        : "-------------"}
                    </b>
                  </div>
                </div>
                <div className="icntxtwrap">
                  <img
                    src={common_icons_array["eater"]}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <div>
                    <p>Type of eater</p>
                    <b>
                      {fs_data.feedback_summary_break.typeOfEater
                        ? fs_data.feedback_summary_break.typeOfEater
                        : "-----------"}
                    </b>
                  </div>
                </div>
                <div className="icntxtwrap">
                  <img
                    src={common_icons_array["high"]}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <div>
                    <p>Dieting motivation</p>
                    <b>
                      {fs_data.feedback_summary_break.fastingMotivation
                        ? fs_data.feedback_summary_break.fastingMotivation
                        : "---------"}
                    </b>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <img
                  src={feedback_summary_array[genderContent + "bmiprofile"]}
                  alt=""
                  width={104}
                  height={160}
                />
              </div>
            </div>
            <div className="hgtnote">
              <img src={common_icons_array["summes"]} alt="" />
              <div>
                <p className="tex12">Risks for an unhealthy BMI</p>
                <p className="sutex1">
                  {fs_data.feedback_summary_break.bodyFitness
                    ? fs_data.feedback_summary_break.bodyFitness
                    : "------------------------------------------"}
                </p>
              </div>
            </div>
            <Link to={urlPre + "/kb-occasion.html"}>
              {" "}
              <div className="sp11">
                <div className=" necxbutton1 necxbuttontex">Continue</div>
              </div>
            </Link>
            <SecurePolicy common_icons={common_icons} />
          </div>
        </div>
      ) : (
        <>
          <h1>Something went wrong...</h1>
        </>
      )}
    </div>
  );
};
export default React.memo(FeedbackSummary);

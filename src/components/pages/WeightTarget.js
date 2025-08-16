import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Targetweight = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  const [toggleState, setToggleState] = useState(1);
  const [continueButton, setContinueButton] = useState(false);
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [targetPercentage, setTargetPercentage] = useState(0);
  const [defaultWeight, setDefaultWeight] = useState({ lb: 0, kg: 0 });

  //-----------------Validation Values---------------------
  const val_session = ReactSession.get("Get_validation");
  const val_targetWeightkgMin = val_session["targetWeightkgMin"];
  const val_targetWeightKgMax = val_session["targetWeightKgMax"];
  const val_targetWeightLbMin = val_session["targetWeightLbMin"];
  const val_targetWeightLbMax = val_session["targetWeightLbMax"];
  const val_currentTargetWeightKgDiffMin =
    val_session["currentTargetWeightKgDiffMin"];
  const val_currentTargetWeightLbDiffMin =
    val_session["currentTargetWeightLbDiffMin"];
  const val_recommendationMessage = val_session["recommendationMessage"];

  //-------------------------------------------------------------------------------------------------

  var weight_data = ReactSession.get("Get_weight")["categoryItems"];
  const weightdata = [];
  Object.keys(weight_data).forEach((key) =>
    weightdata.push({ value: weight_data[key] })
  );
  // --------------------------GET DATA FROM ReactSession (localStorage)------------------------------!

  const weighttargetId = weightdata[1].value.itemId;
  const weightkgId = weightdata[2].value.itemId;
  const weightlbId = weightdata[3].value.itemId;
  ReactSession.set("twid", weighttargetId);
  //-----------------Validation Values--------------------!

  //---------------set height if user again visit on this page------------------------
  const defaultWeightFun = () => {
    if (ReactSession.get("type") && ReactSession.get("type") == "kg") {
      setToggleState(2);
      ReactSession.set("ttype", "kg");
    } else {
      setToggleState(1);
      ReactSession.set("ttype", "lb");
    }

    if (ReactSession.get("target_1") && ReactSession.get("target_1") != null) {
      // const weightLossPercentage = ((ReactSession.get('weight_1') - ReactSession.get('target_1')) / ReactSession.get('weight_1')) * 100;
      // setTargetPercentage(Math.round((weightLossPercentage), 2));
      findChallagePercentage(
        ReactSession.get("weight_1"),
        ReactSession.get("target_1")
      );

      //------------------------

      document.getElementById("target_lb").value = ReactSession.get("target_1");
      setContinueButton(true);
    } else if (
      ReactSession.get("target") &&
      ReactSession.get("target") != null
    ) {
      // const weightLossPercentage = ((ReactSession.get('weight') - ReactSession.get('target')) / ReactSession.get('weight')) * 100;
      // setTargetPercentage(Math.round((weightLossPercentage), 2));
      findChallagePercentage(
        ReactSession.get("weight"),
        ReactSession.get("target")
      );

      //------------------------------

      document.getElementById("target_kg").value = ReactSession.get("target");
      setContinueButton(true);
    }
  };

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
    setTimeout(() => {
      setIsLoading(true); // Set loading state to false
    }, 250);

    if (ReactSession.get("type")) {
      if (ReactSession.get("type") === "lb") {
        setToggleState(1);
      } else {
        setToggleState(2);
      }
    }

    defaultWeightFun();
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "targetWeightView",
      stage: "Target Weight",
    });
  }, []);

  const toggleTab = (index) => {
    // setToggleState(index);
    document.getElementsByClassName("err_popup2")[0].innerHTML =
      "<span class='err_popup'>Current weight and target weight should be in same type.</span>";
  };

  const findChallagePercentage = (cWeight, tWeight) => {
    const weightLossPercentage = ((cWeight - tWeight) / cWeight) * 100;
    setTargetPercentage(Math.round(weightLossPercentage, 2));
  };

  const handleKG = (e) => {
    if (e > val_targetWeightKgMax) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid target weight.</span>";
      setContinueButton(false);
    } else if (e < val_targetWeightkgMin) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid target weight.</span>";
      setContinueButton(false);
    } else {
      findChallagePercentage(ReactSession.get("weight"), e);

      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class=''></span>";
      ReactSession.set("target", e);
      ReactSession.set("target_1", "");
      setContinueButton(true);
    }
  };

  const handleLB = (e) => {
    if (e > val_targetWeightLbMax) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid target weight.</span>";
      setContinueButton(false);
    } else if (e < val_targetWeightLbMin) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid target weight.</span>";
      setContinueButton(false);
    } else {
      findChallagePercentage(ReactSession.get("weight_1"), e);

      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class=''></span>";
      ReactSession.set("target", "");
      ReactSession.set("target_1", e);
      setContinueButton(true);
    }
  };

  const handleSubmit = () => {
    if (ReactSession.get("type") === "lb") {
      if (
        ReactSession.get("target_1") >= val_targetWeightLbMin &&
        ReactSession.get("target_1") <= val_targetWeightLbMax &&
        ReactSession.get("target") === ""
      ) {
        if (
          ReactSession.get("weight_1") - ReactSession.get("target_1") >=
          val_currentTargetWeightLbDiffMin
        ) {
          history(urlPre + "/part9.html");
        } else {
          document.getElementsByClassName("err_popup2")[0].innerHTML =
            "<span class='err_popup'>Please enter valid target weight.";
        }
      } else {
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class='err_popup'>Please enter valid target weight.";
      }
    } else if (ReactSession.get("type") === "kg") {
      if (
        ReactSession.get("target") >= val_targetWeightkgMin &&
        ReactSession.get("target") <= val_targetWeightKgMax &&
        ReactSession.get("target_1") === ""
      ) {
        if (
          ReactSession.get("weight") - ReactSession.get("target") >=
          val_currentTargetWeightKgDiffMin
        ) {
          history(urlPre + "/part9.html");
        } else {
          document.getElementsByClassName("err_popup2")[0].innerHTML =
            "<span class='err_popup'>Please enter valid target weight.";
        }
      } else {
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class='err_popup'>Please enter valid target weight.";
      }
    }

    // console.log(ReactSession.get('htype'));
  };

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "76.5%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>

        {/* <div className='tit'><h1>What would you consider your perfect weight?</h1></div> */}
        <div className="tit">
          <h1>
            {ReactSession.get("Get_weight")
              ? ReactSession.get("Get_weight")["title2"]
              : ""}
          </h1>
        </div>
        <div className="heightbk sp11">
          <div
            onClick={() => toggleTab(1)}
            className={
              toggleState === 1 ? "heightbutac" : "heightbut hideClass"
            }
          >
            lbs
          </div>
          <div
            onClick={() => toggleTab(2)}
            className={
              toggleState === 2 ? "heightbutac" : "heightbut hideClass"
            }
          >
            kg
          </div>
        </div>
        <div className="content active-content">
          <div className={toggleState === 1 ? "" : "hideClass"}>
            <label>
              <input
                type="number"
                onInput={(event) => {
                  event.target.value = event.target.value
                    .replace(/^0/, "")
                    .replace(/\D/g, "")
                    .slice(0, 3);
                }}
                onKeyUp={(e) => {
                  handleLB(e.target.value);
                }}
                onWheel={(e) => {
                  handleLB(e.target.value);
                }}
                maxLength="3"
                placeholder={defaultWeight.lb}
                className="hgtft tit"
                id="target_lb"
              />
              <span className="untft">lbs</span>
            </label>
            {/* <p className='heightsu'>Enter a value from {val_targetWeightLbMin} to {val_targetWeightLbMax} lbs</p> */}
          </div>

          <div className={toggleState === 2 ? "" : "hideClass"}>
            <label>
              <input
                type="number"
                onInput={(event) => {
                  event.target.value = event.target.value
                    .replace(/^0/, "")
                    .replace(/\D/g, "")
                    .slice(0, 3);
                }}
                onKeyUp={(e) => {
                  handleKG(e.target.value);
                }}
                onWheel={(e) => {
                  handleKG(e.target.value);
                }}
                maxLength="3"
                placeholder={defaultWeight.kg}
                className="hgtcm"
                id="target_kg"
              />
              <span className="untxt">kg</span>
            </label>
            {/* <p className='heightsu'>Enter a value from {val_targetWeightkgMin} to {val_targetWeightKgMax} kg</p> */}
          </div>
        </div>

        {targetPercentage > 0 && continueButton == true ? (
          <div className="hgtnote">
            <img
              src={common_icons["hrt"]}
              alt="Loading"
              width={16}
              className={targetPercentage > 0 ? "" : "hideClass"}
              height={16}
              loading="lazy"
            />
            <div>
              <p>
                <strong>
                  {targetPercentage > 0
                    ? "YOUR GOAL: Lose " +
                      targetPercentage +
                      "%  of your body weight"
                    : ""}
                </strong>
              </p>
              <p>
                Mayo Clinic’s study reveals that losing weight significantly
                boosts metabolic health.
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="err_popup2">
          <span></span>
        </div>
        {continueButton == true ? (
          <a
            href={void 0}
            onClick={handleSubmit}
            className="sp11"
            id="continue"
          >
            <div className="necxbutton1">Continue</div>
          </a>
        ) : (
          <a
            href={void 0}
            onClick={() => {
              document.getElementsByClassName("err_popup2")[0].innerHTML =
                "<span class='err_popup'>Please enter valid target weight.</span>";
            }}
            className="sp11"
            id="continue"
          >
            <div className="necxbutton1 disabled ">Continue</div>
          </a>
        )}
        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};
export default React.memo(Targetweight);

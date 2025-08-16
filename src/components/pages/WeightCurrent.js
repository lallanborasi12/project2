import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Weigth = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  const [toggleState, setToggleState] = useState(1);
  const [continueButton, setContinueButton] = useState(false);
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [heightIn, setHeightIn] = useState(0);
  const [bmiNum, setBmiNum] = useState(0); //21
  const [heightMeter, setHeightMeter] = useState(0);
  const [bodyType, setBodyType] = useState("Normal");
  const [defaultWeight, setDefaultWeight] = useState({ lb: 0, kg: 0 });

  //---------------set height if user again visit on this page------------------------
  const defaultWeightFun = (heightIn, heightMeter) => {
    if (ReactSession.get("type") && ReactSession.get("type") == "kg") {
      setToggleState(2);
    } else {
      setToggleState(1);
    }

    if (ReactSession.get("weight_1") && ReactSession.get("weight_1") != "") {
      const weight_1 = ReactSession.get("weight_1");
      setContinueButton(true);
      document.getElementById("weight_lb").value = weight_1;

      setBmiNum(Math.round((weight_1 / (heightIn * heightIn)) * 703, 2));
      setBodyType(
        determineBodyType(
          Math.round((weight_1 / (heightIn * heightIn)) * 703, 2)
        )
      );
    } else if (ReactSession.get("weight") && ReactSession.get("weight") != "") {
      const weight = ReactSession.get("weight");

      setBmiNum(Math.round(weight / (heightMeter * heightMeter), 2));
      setBodyType(
        determineBodyType(Math.round(weight / (heightMeter * heightMeter), 2))
      );

      document.getElementById("weight_kg").value = weight;
      setContinueButton(true);
    }
  };

  //-----------------Validation Values---------------------
  const val_session = ReactSession.get("Get_validation");
  const val_currentWeightkgMin = val_session["currentWeightkgMin"];
  const val_currentWeightKgMax = val_session["currentWeightKgMax"];
  const val_currentWeightLbMin = val_session["currentWeightLbMin"];
  const val_currentWeightLbMax = val_session["currentWeightLbMax"];
  const val_recommendationMessage = val_session["recommendationMessage"];

  //-------------------------------------------------------------------------------------------------

  var weight_data = ReactSession.get("Get_weight")["categoryItems"];
  const weightdata = [];
  Object.keys(weight_data).forEach((key) =>
    weightdata.push({ value: weight_data[key] })
  );
  // --------------------------GET DATA FROM ReactSession (localStorage)------------------------------!

  const weightkgId = weightdata[2].value.itemId;
  const weightlbId = weightdata[3].value.itemId;
  const weightcurrentId = weightdata[0].value.itemId;

  if (!ReactSession.get("wtypeid")) {
    ReactSession.set("wtypeid", weightkgId);
    ReactSession.set("cwid", weightcurrentId);
  }

  //-----------------Validation Values--------------------!

  useEffect(() => {
    //------------------convert height--inch and meter---------------------

    var heightininch;
    var heightinmeter;
    if (ReactSession.get("htype") === "feet") {
      heightininch =
        parseInt(ReactSession.get("ft") * 12) +
        parseInt(ReactSession.get("inch"));
    } else {
      heightininch = parseInt(ReactSession.get("cm") * 0.393701);
    }

    heightinmeter = (heightininch * 0.0254).toFixed(2);
    setHeightIn(heightininch);
    setHeightMeter(heightinmeter);
    //------------------convert height--inch and meter---------------------

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

    defaultWeightFun(heightininch, heightinmeter);

    if (!ReactSession.get("type")) {
      if (toggleState === 1) {
        ReactSession.set("type", "lb");
        ReactSession.set("wtypeid", weightlbId);
      } else {
        ReactSession.set("type", "kg");
        ReactSession.set("wtypeid", weightkgId);
      }
    }
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "currentWeightView",
      stage: "Current Weight",
    });
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
    if (index === 1) {
      ReactSession.set("type", "lb");
      ReactSession.set("wtypeid", weightlbId);
    } else {
      ReactSession.set("type", "kg");
      ReactSession.set("wtypeid", weightkgId);
    }
  };

  function determineBodyType(bmi) {
    // console.log(bmi);
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi < 24.9) {
      return "Normal Weight";
    } else if (bmi < 29.9) {
      return "Overweight";
    } else if (bmi < 34.9) {
      return "Obese Class 1 (Moderate)";
    } else if (bmi < 39.9) {
      return "Obese Class 2 (Severe)";
    } else {
      return "Obese Class 3 (Very Severe or Morbidly Obese)";
    }
  }

  const handleKG = (e) => {
    if (e > val_currentWeightKgMax) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid weight.</span>";
      setContinueButton(false);
    } else if (e < val_currentWeightkgMin) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid weight.</span>";
      setContinueButton(false);
    } else {
      setBmiNum(Math.round(e / (heightMeter * heightMeter), 2));
      setBodyType(
        determineBodyType(Math.round(e / (heightMeter * heightMeter), 2))
      );

      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class=''></span>";
      ReactSession.set("weight", e);
      ReactSession.set("weight_1", "");
      document.getElementById("weight_lb").value = ""; // Empty Feild
      setContinueButton(true);
    }
  };

  const handleLB = (e) => {
    if (e > val_currentWeightLbMax) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid weight.</span>";
      setContinueButton(false);
    } else if (e < val_currentWeightLbMin) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid weight.</span>";
      setContinueButton(false);
    } else {
      setBmiNum(Math.round((e / (heightIn * heightIn)) * 703, 2));
      setBodyType(
        determineBodyType(Math.round((e / (heightIn * heightIn)) * 703, 2))
      );

      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class=''></span>";
      ReactSession.set("weight_1", e);
      ReactSession.set("weight", "");
      document.getElementById("weight_kg").value = ""; // Empty feild
      setContinueButton(true);
    }
  };

  const handleSubmit = (e2) => {
    if (ReactSession.get("type") === "lb") {
      if (
        ReactSession.get("weight_1") >= val_currentWeightLbMin &&
        ReactSession.get("weight_1") <= val_currentWeightLbMax &&
        ReactSession.get("weight") === ""
      ) {
        history(urlPre + "/kb-weight-target.html");
      } else {
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class='err_popup'>Please enter valid weight.";
      }
    } else if (ReactSession.get("type") === "kg") {
      if (
        ReactSession.get("weight") >= val_currentWeightkgMin &&
        ReactSession.get("weight") <= val_currentWeightKgMax &&
        ReactSession.get("weight_1") === ""
      ) {
        history(urlPre + "/kb-weight-target.html");
      } else {
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class='err_popup'>Please enter valid weight.";
      }
    }

    // console.log(ReactSession.get('htype'));
  };

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "72%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>

        <div className="tit">
          <h1>{ReactSession.get("Get_weight").title1}</h1>
        </div>
        <div className="heightbk sp11">
          <div
            onClick={() => toggleTab(1)}
            className={toggleState === 1 ? "heightbutac" : "heightbut"}
          >
            lbs
          </div>
          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? "heightbutac" : "heightbut"}
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
                placeholder={defaultWeight.lb}
                className="hgtft tit"
                id="weight_lb"
              />
              <span className="untft">lbs</span>
            </label>
            {/* <p className='heightsu'>Enter a value from {val_currentWeightLbMin} to {val_currentWeightLbMax} lbs</p> */}
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
                placeholder={defaultWeight.kg}
                className="hgtft tit"
                id="weight_kg"
              />
              <span className="untft">kg</span>
            </label>
            {/* <p className='heightsu'>Enter a value from {val_currentWeightkgMin} to {val_currentWeightKgMax} kg</p> */}
          </div>
        </div>

        {bmiNum > 0 && continueButton == true ? (
          <div className="hgtnote">
            <img
              src={common_icons["nticon"]}
              alt="Loading"
              width={16}
              height={16}
              className={bmiNum > 0 ? "" : "hideClass"}
              loading="lazy"
            />
            <div>
              <p>
                <strong>
                  {bmiNum > 0
                    ? "Your BMI is " +
                      bmiNum +
                      ", which is considered  " +
                      bodyType
                    : ""}
                </strong>
              </p>
              <p>
                You should try to focus on your weight. We will use your index
                to tailor a weight loss program.
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
                "<span class='err_popup'>Please enter valid weight.</span>";
            }}
            className="sp11"
            id="continue"
          >
            <div className="necxbutton1  disabled">Continue</div>
          </a>
        )}
        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};
export default React.memo(Weigth);

import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import { common_icons } from "../../config/imagedata/small_icons";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Part8 = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  const [continueButton, setContinueButton] = useState(false);
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [defaultHeight, setDefaultHeight] = useState({
    cm: 0,
    feet: 0,
    inch: 0,
  });

  //---------------set height if user again visit on this page------------------------
  const defaultHeightFun = async () => {
    if (ReactSession.get("htype") && ReactSession.get("htype") == "cm") {
      setToggleState(2);
    } else {
      setToggleState(1);
    }

    if (ReactSession.get("ft") != null && ReactSession.get("inch") != null) {
      setDefaultHeight({
        cm: 0,
        feet: ReactSession.get("ft"),
        inch: ReactSession.get("inch"),
      });
      setContinueButton(true);
      const feetInput = document.getElementById("height_feet_id");
      const inchInput = document.getElementById("height_inch_id");

      if (feetInput) {
        feetInput.value = ReactSession.get("ft");
      }

      if (inchInput) {
        inchInput.value = ReactSession.get("inch");
      }
      if (feetInput && inchInput) {
        setContinueButton(true);
      }
    } else if (ReactSession.get("cm") != null) {
      setDefaultHeight({ cm: ReactSession.get("cm"), feet: 0, inch: 0 });
      setContinueButton(true);
      const cmInput = document.getElementById("height_cm_id");

      if (cmInput) {
        cmInput.value = ReactSession.get("cm");
        setContinueButton(true);
      }
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

    if (!ReactSession.get("htype")) {
      if (toggleState === 1) {
        ReactSession.set("htype", "feet");
      } else {
        ReactSession.set("htype", "cm");
      }
    }

    defaultHeightFun();
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "part8PageView",
      stage: "Height Information",
    });
  }, []);

  //------Validation Variable Initialized------------
  const val_session = ReactSession.get("Get_validation");
  const val_heightCmMin = val_session["heightCmMin"];
  const val_heightCmMax = val_session["heightCmMax"];
  const val_heightFtMin = val_session["heightFtMin"];
  const val_heightftMax = val_session["heightftMax"];
  //------Validation Variable Initialized-----------!

  // --------------------------GET DATA FROM ReactSession (localStorage)------------------------------

  var age_data = ReactSession.get("Get_age")["categoryItems"];
  const data = [];
  Object.keys(age_data).forEach((key) => data.push({ value: age_data[key] }));

  //-------------------------------------------------------------------------------------------------

  var height_data = ReactSession.get("Get_height")["categoryItems"];
  const heightdata = [];
  Object.keys(height_data).forEach((key) =>
    heightdata.push({ value: height_data[key] })
  );
  // --------------------------GET DATA FROM ReactSession (localStorage)------------------------------!

  const htypecmId = heightdata[0].value.itemId;
  const htypefeetId = heightdata[1].value.itemId;
  const htypeinchId = heightdata[2].value.itemId;

  //---------------------------Height Management-----------------------------------------!
  if (
    ReactSession.get("htype") == "" ||
    ReactSession.get("htype") == undefined
  ) {
    var htype = "cm";
    var htypeid = htypecmId;
    ReactSession.set("htype", htype);
    // ReactSession.set("hitypeid", "");
    // ReactSession.set("htypeid", htypeid);

    ReactSession.set("height_itemid_ft", "");
    ReactSession.set("height_itemid_in", "");
    ReactSession.set("height_itemid_cm", htypeid);
  }

  // --------------------------GET DATA FROM ReactSession (localStorage)------------------------------!

  const toggleTab = (index) => {
    setToggleState(index);

    if (index === 1) {
      ReactSession.set("htype", "feet");
      ReactSession.set("height_itemid_ft", "");
      ReactSession.set("height_itemid_in", htypefeetId);
      ReactSession.set("height_itemid_cm", htypeinchId);

      //Enable placeholder
      if (!ReactSession.get("cm") || ReactSession.get("cm") == null) {
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class=''></span>";
      }
    } else {
      ReactSession.set("htype", "cm");
      ReactSession.set("height_itemid_ft", "");
      ReactSession.set("height_itemid_in", "");
      ReactSession.set("height_itemid_cm", htypecmId);

      // Enable placeholder
      if (
        !ReactSession.get("inch") ||
        !ReactSession.get("ft") ||
        ReactSession.get("ft") == null ||
        ReactSession.get("inch") == null
      ) {
        document.getElementById("height_feet_id").value = "";
        document.getElementById("height_inch_id").value = "";
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class=''></span>";
      }
    }
    // tabChangeValidation(index);
    // validateDefaultHeight(index);
  };

  const validateDefaultHeight = () => {
    //Feet
    if (toggleState === 2) {
      if (
        ReactSession.get("cm") &&
        ReactSession.get("cm") >= val_heightCmMin &&
        ReactSession.get("cm") <= val_heightCmMax
      ) {
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class='err_popup'>Please enter valid height.</span>";
        setContinueButton(true);
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class=''></span>";
        let totalInches = ReactSession.get("cm") / 2.54; // Total inches
        let feet = Math.floor(totalInches / 12); // Calculate whole feet
        let inches = Math.floor(totalInches % 12); // Calculate remaining inches
        ReactSession.set("ft", feet);
        ReactSession.set("inch", inches);
        ReactSession.set("cm", null);

        document.getElementById("height_feet_id").value = feet;
        document.getElementById("height_inch_id").value = inches;
        if (
          ReactSession.get("ft") &&
          ReactSession.get("inch") &&
          ReactSession.get("ft") >= val_heightFtMin &&
          ReactSession.get("ft") <= val_heightftMax
        ) {
          setContinueButton(true);
          document.getElementsByClassName("err_popup2")[0].innerHTML = "";
        } else {
          setContinueButton(false);
        }
        // console.log("tre");
      } else {
        document.getElementById("height_feet_id").value = 0;
        document.getElementById("height_inch_id").value = 0;
      }
    } else {
      // Check if converting from feet/inches to cm
      if (
        ReactSession.get("ft") &&
        ReactSession.get("inch") &&
        ReactSession.get("ft") >= val_heightFtMin &&
        ReactSession.get("ft") <= val_heightftMax
      ) {
        let totalCm = Math.floor(
          ReactSession.get("ft") * 30.48 + ReactSession.get("inch") * 2.54
        ); // Convert feet and inches to cm

        // Set ReactSession for cm, clear feet and inches
        ReactSession.set("cm", totalCm);
        ReactSession.set("ft", null);
        ReactSession.set("inch", null);

        // Update input fields or any other UI elements
        document.getElementById("height_cm_id").value = totalCm;
        if (
          ReactSession.get("cm") &&
          ReactSession.get("cm") >= val_heightCmMin &&
          ReactSession.get("cm") <= val_heightCmMax
        ) {
          setContinueButton(true);
          document.getElementsByClassName("err_popup2")[0].innerHTML = "";
        } else {
          setContinueButton(false);
        }

        // console.log("Converted feet and inches to cm successfully.");
      } else {
        document.getElementById("height_cm_id").value = 0;
      }
    }
  };

  const handleFeet = (e) => {
    if (!ReactSession.get("inch")) {
      ReactSession.set("inch", 0);
    }

    if (e > val_heightftMax) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid height.</span>";
      setContinueButton(false);
    } else if (e < val_heightFtMin) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid height.</span>";
      setContinueButton(false);
    } else {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class=''></span>";
      ReactSession.set("ft", e);
      setContinueButton(true);
      ReactSession.set("cm", null);
      document.getElementById("height_cm_id").value = "";
    }
  };

  const handleInch = (e) => {
    if (e > 11) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid height.</span>";
    } else if (e < 0) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid height.</span>";
    } else {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class=''></span>";
      ReactSession.set("inch", e);
      ReactSession.set("cm", null);
      document.getElementById("height_cm_id").value = "";
    }
  };

  const handleCm = (e) => {
    if (e > val_heightCmMax) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid height.</span>";
      setContinueButton(false);
    } else if (e < val_heightCmMin) {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please enter valid height.</span>";
      setContinueButton(false);
    } else {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class=''></span>";
      setContinueButton(true);
      ReactSession.set("inch", null);
      ReactSession.set("ft", null);
      ReactSession.set("cm", e);

      document.getElementById("height_feet_id").value = "";
      document.getElementById("height_inch_id").value = "";
    }
  };

  const tabChangeValidation = (currentTab) => {
    // 1 - for ft
    if (currentTab === 1) {
      if (ReactSession.get("ft")) {
        if (
          ReactSession.get("ft") >= val_heightFtMin &&
          ReactSession.get("ft") <= val_heightftMax &&
          ReactSession.get("inch") != "" &&
          ReactSession.get("inch") <= 11 &&
          ReactSession.get("cm") === null
        ) {
          document.getElementsByClassName("err_popup2")[0].innerHTML =
            "<span class=''></span>";
          setContinueButton(true);
        } else {
          setContinueButton(false);
          document.getElementsByClassName("err_popup2")[0].innerHTML =
            "<span class='err_popup'>Please enter valid height.</span>";
        }
      } else {
        setContinueButton(false);
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class=''></span>";
      }
    }

    if (currentTab === 2) {
      if (ReactSession.get("cm")) {
        if (
          ReactSession.get("cm") >= val_heightCmMin &&
          ReactSession.get("cm") <= val_heightCmMax &&
          ReactSession.get("inch") === null &&
          ReactSession.get("ft") === null
        ) {
          document.getElementsByClassName("err_popup2")[0].innerHTML =
            "<span class=''></span>";
          setContinueButton(true);
        } else {
          setContinueButton(false);
          document.getElementsByClassName("err_popup2")[0].innerHTML =
            "<span class='err_popup'>Please enter valid height.</span>";
        }
      } else {
        setContinueButton(false);
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class=''></span>";
      }
    }

    // 2 - for cm
  };

  const handleSubmit = (e2) => {
    if (ReactSession.get("htype") === "feet") {
      if (
        ReactSession.get("ft") >= val_heightFtMin &&
        ReactSession.get("ft") <= val_heightftMax &&
        ReactSession.get("inch") != "" &&
        ReactSession.get("inch") <= 11 &&
        ReactSession.get("cm") === null
      ) {
        history(urlPre + "/kb-weight-current.html");
      } else {
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class='err_popup'>Please enter valid height.";
      }
    } else if (ReactSession.get("htype") === "cm") {
      if (
        ReactSession.get("cm") >= val_heightCmMin &&
        ReactSession.get("cm") <= val_heightCmMax &&
        ReactSession.get("inch") === null &&
        ReactSession.get("ft") === null
      ) {
        history(urlPre + "/kb-weight-current.html");
      } else {
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class='err_popup'>Please enter valid height.";
      }
    }
    // console.log(ReactSession.get('htype'));
  };

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "67.5%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>
        <div className="tit">
          <h1>{ReactSession.get("Get_height")["title1"]}</h1>
        </div>
        <div className="heightbk sp11">
          <div
            onClick={() => toggleTab(1)}
            className={toggleState === 1 ? "heightbutac" : "heightbut"}
          >
            <div>ft</div>
          </div>
          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? "heightbutac" : "heightbut"}
          >
            <div>cm</div>
          </div>
        </div>
        <div
          className={
            toggleState === 1 ? "content active-content" : "content hideClass"
          }
        >
          <div>
            <label>
              <input
                type="number"
                onInput={(event) => {
                  event.target.value = event.target.value
                    .replace(/[^0-9]*/g, "")
                    .slice(0, 1);
                }}
                onKeyUp={(e) => {
                  handleFeet(e.target.value);
                }}
                onWheel={(e) => {
                  handleFeet(e.target.value);
                }}
                maxLength="1"
                name="ft"
                placeholder={defaultHeight.feet == 0 ? defaultHeight.feet : "0"}
                defaultValue={defaultHeight.feet > 0 ? defaultHeight.feet : ""}
                id="height_feet_id"
                className="hgtft tit"
              />
              <span className="untft">ft</span>
            </label>

            <label>
              <input
                type="number"
                onInput={(event) => {
                  event.target.value =
                    parseInt(event.target.value) <= 9
                      ? parseInt(event.target.value)
                      : parseInt(event.target.value) > 11
                      ? "11"
                      : event.target.value.replace(/[^0-9]*/g, "").slice(0, 2);
                }}
                onKeyUp={(e) => {
                  handleInch(e.target.value == "00" ? 0 : e.target.value);
                }}
                onWheel={(e) => {
                  handleInch(e.target.value);
                }}
                maxLength="2"
                name="in"
                placeholder={defaultHeight.inch == 0 ? defaultHeight.inch : "0"}
                defaultValue={defaultHeight.inch > 0 ? defaultHeight.inch : ""}
                id="height_inch_id"
                className="hgtinch"
              />
              <span className="untinch">in</span>
            </label>
          </div>

          {/* <p className='heightsu'>Enter a value from {val_heightFtMin} ft to {val_heightftMax}ft and  0 inch to 11 inch</p> */}
        </div>

        <div
          className={
            toggleState === 2 ? "content active-content" : "content hideClass"
          }
        >
          <div>
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
                  handleCm(e.target.value);
                }}
                className="hgtcm"
                placeholder={defaultHeight.cm == 0 ? defaultHeight.cm : "0"}
                defaultValue={defaultHeight.cm > 0 ? defaultHeight.cm : ""}
                onWheel={(e) => {
                  handleCm(e.target.value);
                }}
                id="height_cm_id"
              />
              <span className="untxt">cm</span>
            </label>
          </div>
          {/* <p className='heightsu'>Enter a value from {val_heightCmMin} to {val_heightCmMax} cm</p> */}
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
              <strong>Why is your height important to us?</strong>
            </p>
            <p>
              Your height and weight parameters will help us in customising your
              dietplan, as height and weight are positively correlated.
            </p>
          </div>
        </div>

        <div className="err_popup2">
          <span></span>
        </div>
        {continueButton == true ? (
          <div>
            <a
              href={void 0}
              onClick={handleSubmit}
              className="necxbutton1"
              id="continue"
            >
              Continue
            </a>
          </div>
        ) : (
          <div>
            <a
              href={void 0}
              onClick={() => {
                document.getElementsByClassName("err_popup2")[0].innerHTML =
                  "<span class='err_popup'>Please enter valid height.</span>";
              }}
              className="necxbutton1 disabled"
              id="continue"
            >
              Continue
            </a>
          </div>
        )}

        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};
export default React.memo(Part8);

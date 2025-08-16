import React, { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import Header from "../common/Header";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { common_icons } from "../../config/imagedata/small_icons";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Part7 = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  const [active, setActive] = useState(null);
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ReactSession.get("Get_what_stands_true_for_you") == undefined) {
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
    }, 250);
  });

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "part7PageView",
      stage: "Lifestyle Preferences",
    });
  }, []);

  if (ReactSession.get("Get_what_stands_true_for_you") == undefined) {
    return false;
  }

  //==============GET DATA FROM REACTSESSION(localStorage)==============================
  var what_stand_data = ReactSession.get("Get_what_stands_true_for_you")[
    "categoryItems"
  ];
  const data = [];
  Object.keys(what_stand_data).forEach((key) =>
    data.push({ value: what_stand_data[key] })
  );
  const noneoftheabove = data[5].value.itemId;
  //==============GET DATA FROM REACTSESSION(localStorage)==============================!

  const handleClick = (event) => {
    let clicked = event;
    if (ReactSession.get("part7")) {
      let savedArr = ReactSession.get("part7").split(",");
      if (savedArr.includes(clicked)) {
        const indexofSavedArr = savedArr.findIndex(
          (element) => element == clicked
        );
        savedArr.splice(indexofSavedArr, 1);
        ReactSession.set("part7", savedArr.join(","));
      } else if (ReactSession.get("part7").includes(noneoftheabove)) {
        ReactSession.set("part7", clicked);
      } else {
        if (clicked != noneoftheabove) {
          clicked = clicked + "," + ReactSession.get("part7");
        }
        ReactSession.set("part7", clicked);
      }
    } else {
      ReactSession.set("part7", clicked);
    }
    setActive((current) => !current);
    $("#err_popup").html('<div class="" hidden></div>').fadeIn();
  };

  const handleContinue = () => {
    if (ReactSession.get("part7")) {
      // history(urlPre + '/part8.html');
      history(urlPre + "/kb-motivation.html");
    } else {
      $("#err_popup")
        .html('<div class="err_popup">Please select an option</div>')
        .fadeIn();
    }
  };

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "58.5%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>
        <div className="tit">
          <h1>{ReactSession.get("Get_what_stands_true_for_you")["title2"]}</h1>{" "}
        </div>
        <p className="sutex">Please Select at least 1</p>

        {data.map((rows, Keynumber) =>
          ReactSession.get("part7") ? (
            ReactSession.get("part7").includes(rows.value.itemId) ? (
              <div
                key={Keynumber}
                className={`box1ac ${active == rows.value.itemId && "box1ac"}`}
                onClick={() => {
                  handleClick(rows.value.itemId);
                }}
              >
                <div className="subtit1">
                  <span>{rows.value.name}</span>
                </div>
                <div>
                  <img
                    src={common_icons["checked1"]}
                    height={17}
                    width={17}
                    alt="checked"
                  />
                </div>
              </div>
            ) : (
              <div
                key={Keynumber}
                className={`box1 ${active == rows.value.itemId && "box1"}`}
                onClick={() => {
                  handleClick(rows.value.itemId);
                }}
              >
                <div className="subtit1">
                  <span>{rows.value.name}</span>
                </div>
              </div>
            )
          ) : (
            <div
              key={Keynumber}
              className={`box1 ${active == rows.value.itemId && "box1"}`}
              onClick={() => {
                handleClick(rows.value.itemId);
              }}
            >
              <div className="subtit1">
                <span>{rows.value.name}</span>
              </div>
            </div>
          )
        )}
      </div>
      <div className="fxdctabtm">
        <div
          id={"err_popup"}
          style={{ width: "fit-content", margin: "auto" }}
        ></div>
        {ReactSession.get("part7") ? (
          <a href={void 0} onClick={handleContinue}>
            {" "}
            <div className="necxbutton">Continue</div>
          </a>
        ) : (
          <Link to={void 0} onClick={handleContinue}>
            {" "}
            <div className="necxbutton disabled">Continue</div>
          </Link>
        )}
        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};

export default React.memo(Part7);

import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import { part3_images } from "../../config/imagedata/pages/part3_images";
import { DataLayer } from "../common/Function";

const Part3 = () => {
  let history = useNavigate();
  ReactSession.setStoreType("localStorage");
  const [isBroccoli, setIsBroccoli] = useState(false);
  const [isActive, setActive1] = useState(false);
  const [active, setActive] = useState(null);
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ReactSession.get("Get_meal_preparation") == undefined) {
      history("/");
    } else {
      continueBtnStatus();
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
      event: "part3PageView",
      stage: "Meal Preferences - Vegetables",
    });
  }, []);

  if (ReactSession.get("Get_meal_preparation") == undefined) {
    return false;
  }

  const handleClick = (event) => {
    continueBtnStatus();
    let clicked = event;
    // let clicked = event.target.id;
    if (ReactSession.get("part3")) {
      if (clicked === "All") {
        const itemIds = data.map((item) => item.value.itemId);
        // console.log(itemIds)
        ReactSession.set("part3", itemIds.join(","));
      } else {
        let savedArr = ReactSession.get("part3").split(",");
        if (savedArr.includes(clicked)) {
          //console.log(savedArr);
          const indexofSavedArr = savedArr.findIndex(
            (element) => element == clicked
          );
          savedArr.splice(indexofSavedArr, 1);
          ReactSession.set("part3", savedArr.join(","));
          //ReactSession.remove('part3');
        } else {
          clicked = clicked + "," + ReactSession.get("part3");
          ReactSession.set("part3", clicked);
        }
      }
      setActive((current) => !current);
      // setActive(clicked);
    } else {
      if (clicked === "All") {
        const itemIds = data.map((item) => item.value.itemId);
        // console.log(itemIds)
        ReactSession.set("part3", itemIds.join(","));
        setActive((current) => !current);
      } else {
        ReactSession.set("part3", clicked);
        setActive((current) => !current);
      }
    }

    if (event == "Broccoli") {
      setIsBroccoli((current) => !current);
    }
  };

  //==================GET API======================
  var veggies_data = ReactSession.get("Get_veggies")["categoryItems"];
  const data = [];
  Object.keys(veggies_data).forEach((key) =>
    data.push({ value: veggies_data[key] })
  );
  //==================GET API======================
  const handleContinue = () => {
    if (ReactSession.get("part3")) {
      let savedArr = ReactSession.get("part3").split(",");
      if (savedArr.length >= 3) {
        history(urlPre + "/part4.html");
      } else {
        $("#err_popup")
          .html(
            '<div class="err_popup">Please select at least 3 or more items to make a better and effective meal plan .</div>'
          )
          .fadeIn();
      }
    } else {
      $("#err_popup")
        .html('<div class="err_popup">Please select an option</div>')
        .fadeIn();
    }
  };

  //check onload button is active or not
  const continueBtnStatus = () => {
    if (ReactSession.get("part3")) {
      let savedArr = ReactSession.get("part3").split(",");
      if (savedArr.length >= 3) {
        setActive1(true);
        $("#err_popup").html("").fadeIn();
      } else {
        setActive1(false);
      }
    } else {
      setActive1(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "40.5%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>
        <div className="tit">
          <h1>{ReactSession.get("Get_veggies")["title2"]}</h1>
        </div>
        <p className="sutex">Please Select at least 3</p>

        <div
          className={` ${
            ReactSession.get("part3") &&
            data &&
            ReactSession.get("part3").split(",").length === data.length
              ? "box1ac"
              : " box1"
          }`}
          key={"selectAll"}
          style={{
            marginTop: "30px",
          }}
          onClick={() => {
            handleClick("All");
          }}
        >
          <div className="subtit1">
            <img src={part3_images["all"]} alt={"all"} width={40} height={40} />
            <span>I eat all</span>
          </div>
          {ReactSession.get("part3") &&
            data &&
            ReactSession.get("part3").split(",").length === data.length && (
              <div>
                <img
                  src={common_icons["checked1"]}
                  height={17}
                  width={17}
                  alt="checked"
                />
              </div>
            )}
        </div>
        {data.map(
          (rows, Keynumber) =>
            ReactSession.get("part3") ? (
              ReactSession.get("part3").includes(rows.value.itemId) ? (
                <div
                  className={`box1ac ${active == rows.value.itemId && "box1"}`}
                  key={Keynumber}
                  onClick={() => {
                    handleClick(rows.value.itemId);
                  }}
                >
                  <div className="subtit1">
                    {" "}
                    <img
                      src={part3_images["g" + (Keynumber + 1)]}
                      alt={rows.value.name}
                      width={40}
                      height={40}
                    />
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
                  className={`box1 ${active == rows.value.itemId && "box1"}`}
                  key={Keynumber}
                  onClick={() => {
                    handleClick(rows.value.itemId);
                  }}
                >
                  <div className="subtit1">
                    {" "}
                    <img
                      src={part3_images["g" + (Keynumber + 1)]}
                      alt={rows.value.name}
                      width={40}
                      height={40}
                    />
                    <span>{rows.value.name}</span>
                  </div>
                </div>
              )
            ) : (
              <div
                className={`box1 ${active == rows.value.itemId && "box1"}`}
                key={Keynumber}
                onClick={() => {
                  handleClick(rows.value.itemId);
                }}
              >
                <div className="subtit1">
                  {" "}
                  <img
                    src={part3_images["g" + (Keynumber + 1)]}
                    alt={rows.value.name}
                    width={40}
                    height={40}
                  />
                  <span>{rows.value.name}</span>
                </div>
              </div>
            )
          //
        )}
      </div>
      <div className="fxdctabtm">
        <div
          id={"err_popup"}
          style={{ width: "fit-content", margin: "auto" }}
        ></div>
        <a href={void 0} onClick={handleContinue}>
          {" "}
          <div className={isActive ? "necxbutton" : "necxbutton disabled"}>
            Continue
          </div>
        </a>
      </div>
    </div>
  );
};
export default React.memo(Part3);

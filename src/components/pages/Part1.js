import React, { useEffect, useMemo, useState } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import { part1_images } from "../../config/imagedata/pages/part1_images";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Part1 = () => {
  let refresh_redirect = useNavigate();
  ReactSession.setStoreType("localStorage");
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [continueButton, setContinueButton] = useState(false);

  const common_icons_array = useMemo(() => common_icons);
  const part1_array = useMemo(() => part1_images, []);

  useEffect(() => {
    if (ReactSession.get("Get_part1") == undefined) {
      refresh_redirect("/");
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
    }, 250); // Simulate a 2-second delay

    if (ReactSession.get("part1")) {
      setContinueButton(true);
    } else {
      setContinueButton(false);
    }
  });

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "part1PageView",
      stage: "Goal Setting",
    });
  }, []);

  if (ReactSession.get("Get_part1") == undefined) {
    return false;
  }

  const storeClick = (itemName) => {
    // ReactSession.set('part1', itemName);

    if (ReactSession.get("part1")) {
      let savedArr = ReactSession.get("part1").split(",");
      if (savedArr.includes(itemName)) {
        const indexofSavedArr = savedArr.findIndex(
          (element) => element == itemName
        );
        savedArr.splice(indexofSavedArr, 1);
        ReactSession.set("part1", savedArr.join(","));
      } else {
        itemName = itemName + "," + ReactSession.get("part1");
        ReactSession.set("part1", itemName);
      }
      setActive((current) => !current);
    } else {
      ReactSession.set("part1", itemName);
      setActive((current) => !current);
      document.getElementsByClassName("err_popup2")[0].innerHTML = "";
    }
  };

  //---------------Get data from reactSession----------------------
  var part1_data = ReactSession.get("Get_part1")["categoryItems"];
  const arr = [];
  Object.keys(part1_data).forEach((key) =>
    arr.push({ name: key, value: part1_data[key] })
  );

  //---------------Get data from reactSession----------------------

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "18%" }}></div>
          <img src={common_icons_array["checked1"]} />
        </div>
        <div className="tit">
          <h1>{ReactSession.get("Get_part1")["title1"]}</h1>
        </div>
        <p className="sutex">Please Select at least 1</p>

        {part1_data.map((row, index) => (
          <div
            key={index}
            className={
              ReactSession.get("part1") &&
              ReactSession.get("part1").includes(row.itemId)
                ? "box1ac"
                : "box1"
            }
            onClick={() => {
              storeClick(row.itemId);
            }}
          >
            <div className="subtit1">
              {" "}
              {part1_data["g" + (index + 1)]}{" "}
              <img
                src={part1_array["g" + (index + 1)]}
                alt={row.name}
                width={34}
                height={34}
              />
              <span> {row.name}</span>
            </div>
            {/* {"/assets/images/a" + (index + 1) + ".svg"} */}
            <div
              className={
                ReactSession.get("part1") &&
                ReactSession.get("part1").includes(row.itemId)
                  ? ""
                  : "hideClass"
              }
            >
              <img
                src={common_icons["checked1"]}
                height={17}
                width={17}
                alt="checked"
              />
            </div>
          </div>
        ))}

        <p>{ReactSession.get("Get_part1")["description"]}</p>
      </div>

      <div className="fxdctabtm">
        <div className="err_popup2">
          <span></span>
        </div>

        {continueButton === true ? (
          <Link to={urlPre + "/kb-social-proof-mix.html"}>
            <div className="necxbutton">Yes, I Got it</div>
          </Link>
        ) : (
          <>
            {" "}
            <Link
              to="#"
              onClick={() => {
                document.getElementsByClassName("err_popup2")[0].innerHTML =
                  "<span class='err_popup'>Please select atleast one of the above</span>";
              }}
            >
              <div className="necxbutton disabled">Yes, I Got it</div>
            </Link>
          </>
        )}
        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};

export default React.memo(Part1);

import React, { useEffect, useMemo, useState } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import { disease_images } from "../../config/imagedata/pages/disease_images";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Disease = () => {
  let refresh_redirect = useNavigate();
  ReactSession.setStoreType("localStorage");
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [continueButton, setContinueButton] = useState(false);

  const common_icons_array = useMemo(() => common_icons);
  const disease_images_array = useMemo(() => disease_images, []);

  useEffect(() => {
    if (ReactSession.get("Get_disease") == undefined) {
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

    if (ReactSession.get("kb_disease")) {
      setContinueButton(true);
    } else {
      setContinueButton(false);
    }
  });

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "diseaseInfoView",
      stage: "Health Conditions",
    });
  }, []);

  if (ReactSession.get("Get_disease") == undefined) {
    return false;
  }

  //---------------Get data from reactSession----------------------
  var disease_data = ReactSession.get("Get_disease")["categoryItems"];
  const arr = [];
  Object.keys(disease_data).forEach((key) =>
    arr.push({ name: key, value: disease_data[key] })
  );

  const noneoftheabove = arr[9].value.itemId;

  //---------------Get data from reactSession----------------------
  //  console.log(ReactSession.get('Get_disease'));

  const handleClick = (event) => {
    let clicked = event;
    if (ReactSession.get("kb_disease")) {
      let savedArr = ReactSession.get("kb_disease").split(",");
      if (savedArr.includes(clicked)) {
        const indexofSavedArr = savedArr.findIndex(
          (element) => element == clicked
        );
        savedArr.splice(indexofSavedArr, 1);
        ReactSession.set("kb_disease", savedArr.join(","));
      } else if (ReactSession.get("kb_disease").includes(noneoftheabove)) {
        ReactSession.set("kb_disease", clicked);
      } else {
        if (clicked != noneoftheabove) {
          clicked = clicked + "," + ReactSession.get("kb_disease");
        }
        ReactSession.set("kb_disease", clicked);
      }
    } else {
      ReactSession.set("kb_disease", clicked);
    }
    setActive((current) => !current);
    document.getElementsByClassName("err_popup2")[0].innerHTML = "";
  };

  const handleContinue = () => {
    if (ReactSession.get("kb_disease")) {
      refresh_redirect(urlPre + "/part8.html");
    } else {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        '<div class="err_popup">Please select an option</div>';
    }
  };

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "65.5%" }}></div>
          <img src={common_icons_array["checked1"]} />
        </div>
        <div className="tit">
          <h1>{ReactSession.get("Get_disease")["title1"]}</h1>
        </div>
        <p className="sutex">Please Select at least 1</p>

        {disease_data &&
          disease_data
            .slice() // Create a shallow copy to avoid mutating the original array
            .sort((a, b) => disease_data.indexOf(b) - disease_data.indexOf(a)) // Sort by index in descending order
            .map((row, index) => {
              const isNoneOfTheAbove = row.name === "None of the above";
              const isSelected =
                ReactSession.get("kb_disease") &&
                ReactSession.get("kb_disease").includes(row.itemId);
              const boxClass = isSelected ? "box1ac" : "box1";
              const checkedClass = isSelected ? "" : "hideClass";

              return (
                <div
                  key={index}
                  className={boxClass}
                  onClick={() => handleClick(row.itemId)}
                >
                  <div className="subtit1">
                    {disease_data["g" + (index + 1)]}{" "}
                    <img
                      src={
                        disease_images_array[
                          "d" + (disease_data.length - 1 - index)
                        ]
                      }
                      alt={row.name}
                      width={34}
                      height={34}
                    />
                    <span>
                      {" "}
                      {row?.name?.replace("None of the above", "None")}
                    </span>
                  </div>
                  <div className={checkedClass}>
                    <img
                      src={common_icons["checked1"]}
                      height={17}
                      width={17}
                      alt="checked"
                    />
                  </div>
                </div>
              );
            })}

        {/* <p>{ReactSession.get('Get_disease')['description']}</p> */}
      </div>

      <div className="fxdctabtm">
        <div className="err_popup2">
          <span></span>
        </div>

        {ReactSession.get("kb_disease") ? (
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

export default React.memo(Disease);

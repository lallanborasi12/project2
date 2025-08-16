import React, { useEffect, useMemo, useState } from "react";
import { ReactSession } from "react-client-session";
import Header from "../common/Header";
import { Link, useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import { target_zone_images } from "../../config/imagedata/pages/target_zone_images";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const TargetZonesMix = () => {
  let refresh_redirect = useNavigate();
  ReactSession.setStoreType("localStorage");
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [genderContent, setGenderContent] = useState(""); //Men
  const [continueButton, setContinueButton] = useState(false);

  const common_icons_array = useMemo(() => common_icons, []);
  const target_zone_array = useMemo(() => target_zone_images, []);

  useEffect(() => {
    if (ReactSession.get("Get_target_zones_mix") == undefined) {
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

    //----------------- gender filtration------------------------
    if (ReactSession.get("ketobalanced_options")) {
      const genderList = JSON.parse(ReactSession.get("ketobalanced_options"))
        .survey.surveyItems[0].categoryItems;
      const genderName = genderList.filter(
        (genderItem) => genderItem.itemId == ReactSession.get("gender")
      );
      setGenderContent(genderName[0].name);
      // console.log(genderList);
    }

    //-------------- gender filtration-----------------------------
    if (ReactSession.get("kb_target_zones_mix")) {
      setContinueButton(true);
    } else {
      setContinueButton(false);
    }
  });

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "targetZonesView",
      stage: "Choose Your Target Zones",
    });
  }, []);

  if (ReactSession.get("Get_target_zones_mix") == undefined) {
    return false;
  }

  const storeClick = (itemName) => {
    // ReactSession.set('kb_target_zones_mix', itemName);
    if (ReactSession.get("kb_target_zones_mix")) {
      let savedArr = ReactSession.get("kb_target_zones_mix").split(",");
      if (savedArr.includes(itemName)) {
        const indexofSavedArr = savedArr.findIndex(
          (element) => element == itemName
        );
        savedArr.splice(indexofSavedArr, 1);
        ReactSession.set("kb_target_zones_mix", savedArr.join(","));
      } else {
        itemName = itemName + "," + ReactSession.get("kb_target_zones_mix");
        ReactSession.set("kb_target_zones_mix", itemName);
      }
      setActive((current) => !current);
    } else {
      ReactSession.set("kb_target_zones_mix", itemName);
      document.getElementsByClassName("err_popup2")[0].innerHTML = "";
      setActive((current) => !current);
    }
  };

  //---------------Get data from reactSession----------------------
  var kb_target_zones_mix_data = ReactSession.get("Get_target_zones_mix")[
    "categoryItems"
  ];
  const arr = [];
  Object.keys(kb_target_zones_mix_data).forEach((key) =>
    arr.push({ name: key, value: kb_target_zones_mix_data[key] })
  );

  //---------------Get data from reactSession----------------------

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "22.5%" }}></div>
          <img src={common_icons_array["checked1"]} />
        </div>
        <div className="tit">
          <h1>{ReactSession.get("Get_target_zones_mix")["title1"]}</h1>
        </div>
        <p className="sutex">Please Select at least 1</p>

        {arr.map((row, index) =>
          genderContent.toLowerCase() === row.value.subcat ? (
            <div
              key={index}
              className={
                ReactSession.get("kb_target_zones_mix") &&
                ReactSession.get("kb_target_zones_mix").includes(
                  row.value.itemId
                )
                  ? "box1ac"
                  : "box1"
              }
              onClick={() => {
                storeClick(row.value.itemId);
              }}
            >
              <div className="subtit1">
                <img
                  src={
                    target_zone_array[
                      genderContent.toLowerCase() + "_g" + (index + 1)
                    ]
                  }
                  alt={row.value.name}
                  width={110}
                  height={96}
                />
                <span>{row.value.name}</span>
              </div>
              {/* {"/assets/images/" + genderContent + "-target-" + row.value.name + ".svg"} */}
              <div
                className={
                  ReactSession.get("kb_target_zones_mix") &&
                  ReactSession.get("kb_target_zones_mix").includes(
                    row.value.itemId
                  )
                    ? ""
                    : "hideClass"
                }
              >
                <img
                  src={common_icons_array["checked1"]}
                  height={17}
                  width={17}
                  alt="checked"
                />
              </div>
            </div>
          ) : (
            <span key={index}></span>
          )
        )}

        <div className="sp11">
          <div className="err_popup2">
            <span></span>
          </div>
          {continueButton === true ? (
            <Link to={urlPre + "/kb-happy-weight.html"}>
              <div className="necxbutton1">Continue</div>
            </Link>
          ) : (
            <>
              <Link
                to={"#"}
                onClick={() => {
                  document.getElementsByClassName("err_popup2")[0].innerHTML =
                    "<span class='err_popup'>Please select atleast one of the above</span>";
                }}
              >
                <div className="necxbutton1 disabled">Continue</div>
              </Link>{" "}
            </>
          )}
          <SecurePolicy common_icons={common_icons} />
        </div>
      </div>
    </div>
  );
};
export default React.memo(TargetZonesMix);

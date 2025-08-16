import React, { useEffect, useMemo, useState } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import { target_body_type_images } from "../../config/imagedata//pages/target_body_type_images";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const BodyTypeTargetMix = () => {
  ReactSession.setStoreType("localStorage");
  let refresh_redirect = useNavigate();
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [genderContent, setGenderContent] = useState(""); //Men

  const target_body_type_array = useMemo(() => target_body_type_images, []);

  useEffect(() => {
    if (ReactSession.get("Get_body_type_target_mix") == undefined) {
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
  });

  // Datalayer
  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "bodyTypePageView",
      stage: "Targeted Body Type",
    });
  }, []);

  if (ReactSession.get("Get_body_type_target_mix") == undefined) {
    return false;
  }

  const storeClick = (itemName) => {
    // const itemName = item.target.className;
    ReactSession.set("body_type_target_mix", itemName);
  };

  var body_type_target_mix_data = ReactSession.get("Get_body_type_target_mix")[
    "categoryItems"
  ];
  const arr = [];
  Object.keys(body_type_target_mix_data).forEach((key) =>
    arr.push({ name: key, value: body_type_target_mix_data[key] })
  );

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "13.5%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>

        <div className="tit">
          <h1>{ReactSession.get("Get_body_type_target_mix").title1}</h1>
        </div>
        {arr.map((row, index) =>
          genderContent.toLowerCase() === row.value.subcat ? (
            <Link
              key={index}
              to={urlPre + "/part1.html"}
              onClick={() => {
                storeClick(row.value.itemId);
              }}
            >
              {" "}
              <div className="box">
                <div className="subtit1">
                  <span>{row.value.name}</span>
                </div>
                <div>
                  <img
                    src={
                      target_body_type_array[
                        genderContent.toLowerCase() + "_g" + (index + 1)
                      ]
                    }
                    alt={""}
                    width={110}
                    height={96}
                  />
                </div>
                {/* {"/assets/images/" + row.value.subcat + "-bt-" + row.value.name + ".svg"} */}
              </div>
            </Link>
          ) : (
            <span key={index}></span>
          )
        )}
        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};

export default React.memo(BodyTypeTargetMix);

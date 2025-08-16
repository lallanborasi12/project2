import React, { Suspense, useEffect, useState, lazy, useMemo } from "react";
import Header from "../common/Header";
import { Link, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { common_icons } from "../../config/imagedata/small_icons";
import { current_body_type_images } from "../../config/imagedata/pages/current_body_type_images";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

// const current_body_type_images = lazy(() => import('../../config/imagedata/pages/current_body_type_images'));

const HowFamiliar = () => {
  ReactSession.setStoreType("localStorage");
  let refresh_redirect = useNavigate();
  const [urlPre, setUrlPre] = useState("");
  const [genderContent, setGenderContent] = useState(""); //Men

  const current_body_type_array = useMemo(() => current_body_type_images, []);

  useEffect(() => {
    if (ReactSession.get("Get_current_body_type") == undefined) {
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

    //----------------- gender filtration------------------------
    if (ReactSession.get("ketobalanced_options")) {
      const genderList = JSON.parse(ReactSession.get("ketobalanced_options"))
        .survey.surveyItems[0].categoryItems;
      const genderName = genderList.filter(
        (genderItem) => genderItem.itemId == ReactSession.get("gender")
      );
      setGenderContent(genderName[0].name);
    }

    // console.log(genderList);
    //-------------- gender filtration-----------------------------

    // Push the event to the dataLayer
    const dataLayer_res = DataLayer({
      event: "familiarPageView",
      stage: "Current Body Type",
    });
  }, []);

  if (ReactSession.get("Get_current_body_type") == undefined) {
    return false;
  }

  const storeClick = (item) => {
    ReactSession.set("current_body_type", item);
  };

  var familarity_data = ReactSession.get("Get_current_body_type")[
    "categoryItems"
  ];
  const arr = [];
  Object.keys(familarity_data).forEach((key) =>
    arr.push({ name: key, value: familarity_data[key] })
  );

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "9%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>

        {/* <div className='tit'><h1>Choose your current body type</h1></div> */}
        <div className="tit">
          <h1>
            {ReactSession.get("Get_current_body_type")
              ? ReactSession.get("Get_current_body_type")["title2"]
              : ""}
          </h1>
        </div>
        <Suspense fallback={"Loading...."}>
          {arr.map((rows, Keynumber) =>
            genderContent.toLowerCase() === rows.value.subcat ? (
              <Link
                to={urlPre + "/kb-body-type-target-mix.html"}
                key={Keynumber}
                onClick={() => {
                  storeClick(rows.value.itemId);
                }}
              >
                <div className="box">
                  <div className="subtit1">
                    <span>{rows.value.name}</span>
                  </div>
                  <div>
                    <img
                      src={
                        current_body_type_array[
                          genderContent.toLowerCase() +
                            "_current_body" +
                            (Keynumber + 1)
                        ]
                      }
                      alt={""}
                      width={110}
                      height={96}
                    />
                  </div>
                  {/* <div><img src={rows.value.imgname} alt={rows.value.name} width={110} height={96} /></div> */}
                </div>
              </Link>
            ) : (
              <span key={Keynumber}></span>
            )
          )}
        </Suspense>
        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};

//{"/assets/images/" + rows.value.subcat + "_body_type_" + rows.value.name + ".svg"}
export default React.memo(HowFamiliar);

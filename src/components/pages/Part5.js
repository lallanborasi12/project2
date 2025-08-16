import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Part5 = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ReactSession.get("Get_activity") == undefined) {
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
      event: "part4PageView",
      stage: "Activity Level",
    });
  }, []);

  if (ReactSession.get("Get_activity") == undefined) {
    return false;
  }

  const storeClick = (event) => {
    let clicked = event;
    // clicked=clicked+', '+ReactSession.get('part5')
    ReactSession.set("part5", clicked);
  };

  //==================GET API================================

  var activity_data = ReactSession.get("Get_activity")["categoryItems"];
  const data = [];
  Object.keys(activity_data).forEach((key) =>
    data.push({ value: activity_data[key] })
  );
  //=================GET API==================================

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "49.5%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>
        <div className="tit">
          <h1>{ReactSession.get("Get_activity")["title2"]}</h1>
        </div>

        {data.map((rows, Keynumber) =>
          ReactSession.get("part5") ? (
            ReactSession.get("part5").includes(rows.value.itemId) ? (
              <Link
                to={urlPre + "/part6.html"}
                key={Keynumber}
                className={"active"}
                onClick={() => {
                  storeClick(rows.value.itemId);
                }}
              >
                <div className="box1ac">
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
              </Link>
            ) : (
              <Link
                to={urlPre + "/part6.html"}
                key={Keynumber}
                onClick={() => {
                  storeClick(rows.value.itemId);
                }}
              >
                <div className="box1">
                  <div className="subtit1">
                    <span>{rows.value.name}</span>
                  </div>
                </div>
              </Link>
            )
          ) : (
            <Link
              to={urlPre + "/part6.html"}
              key={Keynumber}
              onClick={() => {
                storeClick(rows.value.itemId);
              }}
            >
              <div className="box1">
                <div className="subtit1">
                  <span>{rows.value.name}</span>
                </div>
              </div>
            </Link>
          )
        )}

        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};
export default React.memo(Part5);

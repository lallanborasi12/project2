import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import Header from "../common/Header";
import { useNavigate, Link } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const HowMuchTime = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ReactSession.get("Get_meal_preparation") == undefined) {
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
      event: "timeCommitmentView",
      stage: "Time for Meal Preparation",
    });
  }, []);

  if (ReactSession.get("Get_meal_preparation") == undefined) {
    return false;
  }

  const storeClick = (item) => {
    const itemName = item;
    ReactSession.set("howmuchtime", itemName);
  };

  //---------------Get data from reactSession----------------------
  var meal_preparation_data = ReactSession.get("Get_meal_preparation")[
    "categoryItems"
  ];
  const arr = [];
  Object.keys(meal_preparation_data).forEach((key) =>
    arr.push({ name: key, value: meal_preparation_data[key] })
  );

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "31.5%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>

        <div className="tit">
          <h1>{ReactSession.get("Get_meal_preparation")["title2"]}</h1>
        </div>

        {arr.map((rows, Keynumber) => (
          <Link
            to={urlPre + "/part2.html"}
            onClick={() => {
              storeClick(rows.value.itemId);
            }}
            key={Keynumber}
          >
            <div className="box ">
              <div className="subtit1 ">
                <span>{rows.value.name}</span>
              </div>
            </div>
          </Link>
        ))}

        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};
export default React.memo(HowMuchTime);

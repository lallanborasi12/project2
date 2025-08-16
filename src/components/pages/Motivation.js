import React, { useEffect, useMemo, useState } from "react";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import { common_icons } from "../../config/imagedata/small_icons";
import { motivation_images } from "../../config/imagedata/pages/motivation_images";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Motivation = () => {
  let history = useNavigate();
  ReactSession.setStoreType("localStorage");
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const common_icons_array = useMemo(() => common_icons);
  const motivation_array = useMemo(() => motivation_images, []);

  useEffect(() => {
    if (ReactSession.get("Get_motivation") == undefined) {
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
    }, 250); // Simulate a 2-second delay
  });

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "motivationPageView",
      stage: "Readiness to Transform",
    });
  }, []);

  if (ReactSession.get("Get_motivation") == undefined) {
    return false;
  }

  const storeClick = (itemName) => {
    // const itemName = item.target.id;
    ReactSession.set("motivation", itemName);
    history(urlPre + "/disease.html");
    // history(urlPre + "/part8.html");
  };

  //---------------Get data from reactSession----------------------
  var kb_motivation = ReactSession.get("Get_motivation")["categoryItems"];
  const arr = [];
  Object.keys(kb_motivation).forEach((key) =>
    arr.push({ name: key, value: kb_motivation[key] })
  );

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "63%" }}></div>
          <img src={common_icons_array["checked1"]} />
        </div>

        <div className="tit">
          <h1>{ReactSession.get("Get_motivation").title1}</h1>
        </div>

        {arr.map((row, index) => (
          <div
            className={
              ReactSession.get("part7") &&
              ReactSession.get("part7") == row.value.itemId
                ? "boxac"
                : "box"
            }
            style={{ cursor: "pointer" }}
            key={index}
            onClick={() => {
              storeClick(row.value.itemId);
            }}
          >
            <div className="subtit1">
              <span>{row.value.name}</span>
            </div>
            <div>
              <img
                src={motivation_array["g" + (index + 1)]}
                alt={row.value.name}
                width={32}
                height={32}
              />
            </div>
            {/* {"/assets/images/s" + (index + 1) + ".svg"} */}
          </div>
        ))}

        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};

export default React.memo(Motivation);

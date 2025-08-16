import React, { useEffect, useMemo, useState } from "react";
import { ReactSession } from "react-client-session";
import Header from "../common/Header";
import { Link, useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import { happy_images } from "../../config/imagedata/pages/happy_images";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const HappyWeight = () => {
  let history = useNavigate();
  ReactSession.setStoreType("localStorage");
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const common_icons_array = useMemo(() => common_icons, []);
  const happy_array = useMemo(() => happy_images, []);

  useEffect(() => {
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
      event: "happyWeightView",
      stage: "Last Happy Weight",
    });
  }, []);

  if (ReactSession.get("Get_happy_weight") == undefined) {
    history("/");
    return false;
  }

  const storeClick = (itemName) => {
    // const itemName = item.target.id;
    ReactSession.set("kb_happy_weight", itemName);
  };

  //---------------Get data from reactSession----------------------
  var kb_happy_weight_data =
    ReactSession.get("Get_happy_weight")["categoryItems"];
  const arr = [];
  Object.keys(kb_happy_weight_data).forEach((key) =>
    arr.push({ name: key, value: kb_happy_weight_data[key] })
  );

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "27.5%" }}></div>
          <img src={common_icons_array["checked1"]} />
        </div>

        <div className="tit">
          <h1>{ReactSession.get("Get_happy_weight")["title1"]}</h1>
        </div>
        {arr.map((row, index) => (
          <Link
            to={urlPre + "/how-much-time.html"}
            onClick={() => {
              storeClick(row.value.itemId);
            }}
            key={index}
          >
            <div className="box">
              <div className="subtit1">
                <span>{row.value.name}</span>
              </div>
              <img
                src={happy_array["g" + (index + 1)]}
                alt={""}
                width={32}
                height={32}
              />
              {/* {"/assets/images/h-icon" + (index + 1) + ".svg"} */}
            </div>
          </Link>
        ))}

        <SecurePolicy common_icons={common_icons} />
      </div>
    </div>
  );
};
export default React.memo(HappyWeight);

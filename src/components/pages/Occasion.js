import React, { useEffect, useMemo, useState } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { common_icons } from "../../config/imagedata/small_icons";
import { occasion_images } from "../../config/imagedata/pages/occasion_images";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Occasion = () => {
  let history = useNavigate();
  ReactSession.setStoreType("localStorage");

  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [urlPre, setUrlPre] = useState("");
  const [eventDateSection, setEventDateSection] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [defaultEventDate, setDefaultEventDate] = useState(
    new Date().toJSON().slice(0, 10)
  );

  //---------------Get data from reactSession----------------------
  var part1_data = ReactSession.get("Get_occasion")["categoryItems"];
  const arr = [];
  Object.keys(part1_data).forEach((key) =>
    arr.push({ name: key, value: part1_data[key] })
  );
  // console.log(part1_data);

  const common_icons_array = useMemo(() => common_icons);
  const occasion_array = useMemo(() => occasion_images, []);

  useEffect(() => {
    if (ReactSession.get("Get_occasion") == undefined) {
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

    if (ReactSession.get("event_date")) {
      setDefaultEventDate(ReactSession.get("event_date"));
    }

    setTimeout(() => {
      setIsLoading(true);
    }, 250);
  });

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "occasionPageView",
      stage: "Event Motivation",
    });
  }, []);

  //---------------Get data from reactSession----------------------

  const storeClick = (itemName, value) => {
    if (ReactSession.get("occasion")) {
      ReactSession.set("occasion", itemName);
      setActive((current) => !current);
    } else {
      ReactSession.set("occasion", itemName);
      setActive((current) => !current);
    }

    if (value === "No") {
      setEventDateSection(false);
      history(urlPre + "/kb-monthly-result.html");
    } else {
      setEventDateSection(true);
      setIsDateOpen(true);
    }
  };

  //-----------date popup-------------------------------
  const hideDatePopup = () => {
    setIsDateOpen(false);
  };
  //-----------date popup-------------------------------

  return (
    <div>
      <Header />

      {eventDateSection === false || eventDateSection === true ? (
        <>
          <div className="bodly">
            <div className="prgs-wrp">
              <div className="prgsbar" style={{ width: "90%" }}></div>
              <img src={common_icons_array["checked1"]} />
            </div>

            <div className="tit">
              <h1>
                {ReactSession.get("Get_occasion")
                  ? ReactSession.get("Get_occasion")["title2"]
                  : ""}
              </h1>
            </div>
            <div className="sutex">
              You’re more likely to reach your goal if you have something
              important to aim for
            </div>
            <br />
            <p className="sutex">Please Select at least 1</p>

            {arr.map((row, index) =>
              index === 7 ? (
                <a
                  href={void 0}
                  key={index}
                  onClick={() => {
                    storeClick(row.value.itemId, row.value.name);
                  }}
                >
                  {" "}
                  <div
                    className={
                      ReactSession.get("occasion") &&
                      ReactSession.get("occasion").includes(row.value.itemId)
                        ? "box1ac"
                        : "box1"
                    }
                  >
                    <div className="subtit1">
                      <img
                        src={occasion_array["g" + (index + 1)]}
                        alt="loading"
                        width={32}
                        height={32}
                        loading="lazy"
                      />
                      <span>{row.value.name}</span>
                    </div>

                    {/* <div className={ReactSession.get('occasion') && ReactSession.get('occasion').includes(row.value.itemId) ? "" : "hideClass"}  >
                                            <img src={KETO_IMG_CDN_LIVE + "/checked1.webp"} height={17} width={17} alt="checked" />
                                        </div> */}
                  </div>
                </a>
              ) : (
                <></>
              )
            )}

            {arr.map((row, index) =>
              index !== 7 ? (
                <a
                  href={void 0}
                  key={index}
                  onClick={() => {
                    storeClick(row.value.itemId, row.value.name);
                  }}
                >
                  {" "}
                  <div
                    className={
                      ReactSession.get("occasion") &&
                      ReactSession.get("occasion").includes(row.value.itemId)
                        ? "box1ac"
                        : "box1"
                    }
                  >
                    <div className="subtit1">
                      <img
                        src={occasion_array["g" + (index + 1)]}
                        alt="loading"
                        width={32}
                        height={32}
                        loading="lazy"
                      />
                      <span>{row.value.name}</span>
                    </div>

                    {/* <div className={ReactSession.get('occasion') && ReactSession.get('occasion').includes(row.value.itemId) ? "" : "hideClass"}  >
                                            <img src={KETO_IMG_CDN_LIVE + "/checked1.webp"} height={17} width={17} alt="checked" />
                                        </div> */}
                  </div>
                </a>
              ) : (
                <></>
              )
            )}

            <SecurePolicy common_icons={common_icons} />
          </div>
          <Popup open={isDateOpen} closeOnDocumentClick onClose={hideDatePopup}>
            <div className="bodly">
              <div className="tit">
                <h1>When's your event?</h1>
              </div>
              <div className="sutex">
                Once we know this, we’ll be able to put together a personalized
                plan to help you get in shape. Your data will not be shared with
                any third parties.
              </div>
              <div className="sp11">
                <label className="dt-lable">(Optional)</label>
                <br />
                <span className=" date-container">
                  <input
                    type="date"
                    min={new Date().toJSON().slice(0, 10)}
                    placeholder="dd/mm/yyyy"
                    onChange={(event) => {
                      ReactSession.set("event_date", event.target.value);
                    }}
                    defaultValue={defaultEventDate}
                  />
                </span>
              </div>
              <div className="sp11" style={{ marginRight: "0px" }}>
                <Link to={urlPre + "/kb-monthly-result.html"}>
                  <div className="necxbutton1">Continue</div>
                </Link>
                <br />
                <a
                  href={void 0}
                  className="skip-dt"
                  onClick={() => {
                    history(urlPre + "/kb-monthly-result.html");
                  }}
                >
                  {" "}
                  Skip
                </a>
              </div>
            </div>
          </Popup>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default React.memo(Occasion);

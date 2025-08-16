import React, { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import $ from "jquery";
import Header from "../common/Header";
import { useNavigate, Link } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import { part2_images } from "../../config/imagedata/pages/part2_images";
import { DataLayer } from "../common/Function";

const Part2 = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  const [isActive, setActive1] = useState(false);
  const [list, setList] = useState([]);
  const [active, setActive] = useState(null);
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ReactSession.get("Get_meat") == undefined) {
      history("/");
    } else {
      continueBtnStatus();
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
      event: "part2PageView",
      stage: "Meal Preferences - Meat",
    });
  }, []);

  if (ReactSession.get("Get_meat") == undefined) {
    return false;
  }

  $("#continue").on("click", function () {
    var dataAnswer = $(".selctn-btn.active").length;
    //alert(dataAnswer);
    if (dataAnswer === 0) {
      //$(this).html("Next");
      $("#err_popup")
        .html('<div class="err_popup">Please select an option</div>')
        .fadeIn();
      return false;
    } else if (dataAnswer < 3) {
      $("#err_popup")
        .html(
          '<div class="err_popup">Please select at least 3 or more items to make a better and effective meal plan .</div>'
        )
        .fadeIn();
      return false;
    } else if (dataAnswer >= 3) {
      alert("test");
      return true;
    }
    //$('.err_popup').hide();
    history(urlPre + "/part3.html");
  });

  /* extract noMeat or vegan id */

  var meat_data = ReactSession.get("Get_meat")["categoryItems"];
  const data = [];
  Object.keys(meat_data).forEach((key) =>
    data.push({ name: key, value: meat_data[key] })
  );
  // console.log(data[7].value.name);

  const iamvegetarian = data[6].value.itemId;
  const iamvegon = data[7].value.itemId;
  /* extract noMeat or vegan id */

  const handleClick = (event) => {
    continueBtnStatus();

    if (ReactSession.get("part2")) {
      let clicked = event;
      // let clicked = event.target.id;
      if (clicked === "All") {
        const filteredData = data.filter(
          (item, index) => index !== 6 && index !== 7
        );
        const itemIds = filteredData.map((item) => item.value.itemId);
        // console.log(itemIds)
        ReactSession.set("part2", itemIds.join(","));
      } else {
        //   console.log(clicked)
        let savedArr = ReactSession.get("part2").split(",");
        if (savedArr.includes(clicked)) {
          //console.log(savedArr);
          const indexofSavedArr = savedArr.findIndex(
            (element) => element == clicked
          );
          savedArr.splice(indexofSavedArr, 1);

          if (clicked === iamvegetarian || clicked === iamvegon) {
            //ReactSession.remove("part2");
            ReactSession.set("part2", clicked);
          } else if (
            savedArr.includes(iamvegetarian) ||
            savedArr.includes(iamvegon)
          ) {
            ReactSession.set("part2", clicked);
          } else {
            //console.log(savedArr);
            //console.log(indexofSavedArr);
            ReactSession.set("part2", savedArr.join(","));
          }
        } else {
          if (clicked === iamvegetarian || clicked === iamvegon) {
            //ReactSession.remove("part2");
            ReactSession.set("part2", clicked);
          } else if (
            savedArr.includes(iamvegetarian) ||
            savedArr.includes(iamvegon)
          ) {
            ReactSession.set("part2", clicked);
          } else {
            clicked = clicked + "," + ReactSession.get("part2");
            ReactSession.set("part2", clicked);
          }
        }
      }
      setActive((current) => !current);
    } else {
      let clicked = event;
      if (clicked === "All") {
        const filteredData = data.filter(
          (item, index) => index !== 6 && index !== 7
        );
        const itemIds = filteredData.map((item) => item.value.itemId);
        setActive((current) => !current);
        // console.log(itemIds)
        ReactSession.set("part2", itemIds.join(","));
      } else {
        ReactSession.set("part2", clicked);
        setActive((current) => !current);
      }
    }
    //window.location.reload(false);
  };

  const continueHandle = (e) => {
    let clicked = e.target.id;
    if (ReactSession.get("part2")) {
      let savedArr = ReactSession.get("part2").split(",");
      if (
        savedArr.length >= 3 ||
        savedArr.includes(iamvegetarian) ||
        savedArr.includes(iamvegon)
      ) {
        history(urlPre + "/part3.html");
      } else {
        $("#err_popup")
          .html(
            '<div class="err_popup">Please select at least 3 or more items to make a better and effective meal plan .</div>'
          )
          .fadeIn();
      }
    } else {
      $("#err_popup")
        .html('<div class="err_popup">Please select an option</div>')
        .fadeIn();
    }
  };

  //check onload button is active or not
  const continueBtnStatus = () => {
    if (ReactSession.get("part2")) {
      let savedArr = ReactSession.get("part2").split(",");
      if (
        savedArr.length >= 3 ||
        savedArr.includes(iamvegetarian) ||
        savedArr.includes(iamvegon)
      ) {
        setActive1(true);
        $("#err_popup").html("").fadeIn();
      } else {
        setActive1(false);
      }
    } else {
      setActive1(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "36%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>
        <div className="tit">
          <h1>{ReactSession.get("Get_meat")["title2"]}</h1>
        </div>
        <p className="sutex">Please Select at least 3 / Choose Preferences</p>

        {data.map((rows, Keynumber) => {
          if (ReactSession?.get("part2")) {
            if (Keynumber === 6 || Keynumber === 7) {
              return (
                <div
                  className={` ${
                    ReactSession?.get("part2").includes(rows.value.itemId)
                      ? "box1ac"
                      : " box1"
                  }`}
                  key={Keynumber}
                  onClick={() => {
                    handleClick(rows.value.itemId);
                  }}
                >
                  <div className="subtit1">
                    <img
                      src={part2_images["g" + (Keynumber + 1)]}
                      alt={rows.value.name}
                      width={40}
                      height={40}
                    />
                    <span>{rows.value.name}</span>
                  </div>
                  {ReactSession?.get("part2").includes(rows.value.itemId) && (
                    <div>
                      <img
                        src={common_icons["checked1"]}
                        height={17}
                        width={17}
                        alt="checked"
                      />
                    </div>
                  )}
                </div>
              );
            }
          } else {
            if (Keynumber === 6 || Keynumber === 7) {
              return (
                <div
                  className={` ${
                    ReactSession?.get("part2")?.includes(rows.value.itemId)
                      ? "box1ac"
                      : " box1"
                  }`}
                  key={Keynumber}
                  onClick={() => {
                    handleClick(rows.value.itemId);
                  }}
                >
                  <div className="subtit1">
                    <img
                      src={part2_images["g" + (Keynumber + 1)]}
                      alt={rows.value.name}
                      width={40}
                      height={40}
                    />
                    <span>{rows.value.name}</span>
                  </div>
                  {ReactSession?.get("part2")?.includes(rows.value.itemId) && (
                    <div>
                      <img
                        src={common_icons["checked1"]}
                        height={17}
                        width={17}
                        alt="checked"
                      />
                    </div>
                  )}
                </div>
              );
            }
          }
        })}

        <div
          className={` ${
            ReactSession.get("part2") &&
            data &&
            ReactSession.get("part2").split(",").length === data.length - 2
              ? "box1ac"
              : " box1"
          }`}
          key={"selectAll"}
          style={{
            marginTop: "30px",
          }}
          onClick={() => {
            handleClick("All");
          }}
        >
          <div className="subtit1">
            <img src={part2_images["all"]} alt={"All"} width={40} height={40} />
            <span>I eat all</span>
          </div>
          {ReactSession.get("part2") &&
            data &&
            ReactSession.get("part2").split(",").length === data.length - 2 && (
              <div>
                <img
                  src={common_icons["checked1"]}
                  height={17}
                  width={17}
                  alt="checked"
                />
              </div>
            )}
        </div>

        {/* Render items from index 1 to 5 */}
        {data.slice(0, 6).map((rows, Keynumber) => (
          <div
            className={` ${
              ReactSession?.get("part2")?.includes(rows.value.itemId)
                ? "box1ac"
                : " box1"
            }`}
            key={Keynumber}
            onClick={() => {
              handleClick(rows.value.itemId);
            }}
          >
            <div className="subtit1">
              <img
                src={part2_images["g" + (Keynumber + 1)]}
                alt={rows.value.name}
                width={40}
                height={40}
              />
              <span>{rows.value.name}</span>
            </div>
            {ReactSession.get("part2")?.includes(rows.value.itemId) && (
              <div>
                <img
                  src={common_icons["checked1"]}
                  height={17}
                  width={17}
                  alt="checked"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="fxdctabtm">
        <div
          id={"err_popup"}
          style={{ width: "fit-content", margin: "auto" }}
        ></div>
        <a href={void 0} id="Continue" onClick={continueHandle}>
          {" "}
          <div className={isActive ? "necxbutton" : "necxbutton disabled"}>
            Continue
          </div>
        </a>
      </div>
    </div>
  );
};
export default React.memo(Part2);

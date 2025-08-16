import React, { useState, useEffect } from "react";
import $ from "jquery";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import { common_icons } from "../../config/imagedata/small_icons";
import { part4_images } from "../../config/imagedata/pages/part4_images";
import { DataLayer } from "../common/Function";

const Part4 = () => {
  let history = useNavigate();
  ReactSession.setStoreType("localStorage");
  const [active, setActive] = useState(null);
  const [isActive, setActive1] = useState(false);
  const [veganID, setveganID] = useState("624fe299ac82160af58d95a6");
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ReactSession.get("Get_other_food_items") == undefined) {
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

    if (ReactSession.get("part4") != undefined) {
      delNonVeganfun();
    }

    setTimeout(() => {
      setIsLoading(true); // Set loading state to false
    }, 250);
  });

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "part4PageView",
      stage: "Meal Preferences - Other Items",
    });
  }, []);

  if (ReactSession.get("Get_other_food_items") == undefined) {
    return false;
  }

  const delNonVeganfun = () => {
    let savedArr = ReactSession.get("part4").split(",");
    // let veganID = '624fe299ac82160af58d95a6';
    const searchItem = ofi_data.filter((notVeganItem) =>
      savedArr.includes(notVeganItem.itemId)
    );
    const containsEggOrCheese = searchItem.some((item) =>
      ["Egg", "Cheese"].includes(item.name)
    );
    if (
      ReactSession.get("part2").includes(veganID) &&
      containsEggOrCheese === true
    ) {
      // Remove eggs and cheese
      const only_vegan_product = ofi_data.filter(
        (notVeganItem) =>
          savedArr.includes(notVeganItem.itemId) &&
          notVeganItem.name !== "Egg" &&
          notVeganItem.name !== "Cheese"
      );
      const create_without_vegan = only_vegan_product.map(
        (item) => item.itemId
      );
      ReactSession.set("part4", create_without_vegan.join(","));
    }
  };

  const handleClick = (event) => {
    continueBtnStatus();
    let clicked = event;
    if (ReactSession.get("part4")) {
      if (clicked === "All") {
        let filteredData = data;
        if (ReactSession.get("part2").includes(veganID)) {
          filteredData = data.filter(
            (item) => item.name !== "Egg" && item.name !== "Cheese"
          );
        }
        const itemIds = filteredData.map((item) => item.value.itemId);
        // console.log(itemIds)
        ReactSession.set("part4", itemIds.join(","));
      } else {
        var savedArr = ReactSession.get("part4").split(",");
        if (savedArr.includes(clicked)) {
          var indexofSavedArr = savedArr.findIndex(
            (element) => element == clicked
          );
          savedArr.splice(indexofSavedArr, 1);
          ReactSession.set("part4", savedArr.join(","));
        } else {
          clicked = clicked + "," + ReactSession.get("part4");
          ReactSession.set("part4", clicked);
        }
      }
    } else {
      if (clicked === "All") {
        let filteredData = data;
        if (ReactSession.get("part2").includes(veganID)) {
          filteredData = data.filter(
            (item) => item.name !== "Egg" && item.name !== "Cheese"
          );
        }
        const itemIds = filteredData.map((item) => item.value.itemId);
        // console.log(itemIds)
        ReactSession.set("part4", itemIds.join(","));
      } else {
        ReactSession.set("part4", clicked);
      }
    }
    setActive((current) => !current);
    // $('#err_popup').html('<div class="err_popup" hidden></div>').fadeIn(); // same below
    $("#err_popup").html("").fadeIn();
  };

  //==================GET API========================

  var ofi_data = ReactSession.get("Get_other_food_items")["categoryItems"];
  const data = [];
  Object.keys(ofi_data).forEach((key) => data.push({ value: ofi_data[key] }));
  //==================GET API========================

  const handleContinue = () => {
    if (ReactSession.get("part4")) {
      let savedArr = ReactSession.get("part4").split(",");
      // let veganID = '624fe299ac82160af58d95a6';
      const searchItem = ofi_data.filter((notVeganItem) =>
        savedArr.includes(notVeganItem.itemId)
      );
      const containsEggOrCheese = searchItem.some((item) =>
        ["Egg", "Cheese"].includes(item.name)
      );

      if (
        ReactSession.get("part2").includes(veganID) &&
        containsEggOrCheese === true
      ) {
        $("#err_popup")
          .html(
            '<div class="err_popup">Cheese and Egg are not allowed to vegan user.</div>'
          )
          .fadeIn();
      } else {
        if (savedArr.length >= 3) {
          history(urlPre + "/part5.html");
        } else {
          $("#err_popup")
            .html(
              '<div class="err_popup">Please select at least 3 or more items to make a better and effective meal plan .</div>'
            )
            .fadeIn();
        }
      }
    } else {
      $("#err_popup")
        .html('<div class="err_popup">Please select an option</div>')
        .fadeIn();
    }
  };

  const continueBtnStatus = () => {
    if (ReactSession.get("part4")) {
      let savedArr = ReactSession.get("part4").split(",");
      if (savedArr.length >= 3) {
        setActive1(true);
        $("#err_popup").html("").fadeIn();
      } else {
        setActive1(false);
      }
    } else {
      setActive1(false);
    }
  };

  // if (isLoading === false) {
  //     return (
  //         <>
  //             <Loader />
  //         </>
  //     );
  //     return false;
  // }

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="prgs-wrp">
          <div className="prgsbar" style={{ width: "45%" }}></div>
          <img src={common_icons["checked1"]} />
        </div>
        <div className="tit">
          <h1>{ReactSession.get("Get_other_food_items")["title2"]}</h1>
        </div>
        <p className="sutex">Please Select at least 3</p>

        <div
          className={` ${
            ReactSession.get("part4") &&
            data &&
            (ReactSession.get("part4").split(",").length === data.length ||
              (ReactSession.get("part2").includes(veganID) &&
                ReactSession.get("part4").split(",").length == data.length - 2))
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
            <img src={part4_images["all"]} alt={"all"} width={40} height={40} />
            <span>I eat all</span>
          </div>
          {ReactSession.get("part4") &&
            data &&
            (ReactSession.get("part4").split(",").length === data.length ||
              (ReactSession.get("part2").includes(veganID) &&
                ReactSession.get("part4").split(",").length ==
                  data.length - 2)) && (
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
        {data.map((rows, Keynumber) =>
          ReactSession.get("part2").includes(veganID) &&
          (rows.value.name === "Egg" || rows.value.name === "Cheese") ? (
            <span key={Keynumber}></span>
          ) : ReactSession.get("part4") ? (
            ReactSession.get("part4").includes(rows.value.itemId) ? (
              <div
                key={Keynumber}
                className={`box1ac selctn-btn ${
                  active == rows.value.itemId && "box1ac"
                }`}
                onClick={() => {
                  handleClick(rows.value.itemId);
                }}
              >
                <div className="subtit1">
                  <img
                    src={part4_images["g" + (Keynumber + 1)]}
                    alt={rows.value.name}
                  />
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
            ) : (
              <div
                key={Keynumber}
                className={`box1 selctn-btn ${
                  active == rows.value.itemId && "box1"
                }`}
                onClick={() => {
                  handleClick(rows.value.itemId);
                }}
              >
                <div className="subtit1">
                  <img
                    src={part4_images["g" + (Keynumber + 1)]}
                    alt={rows.value.name}
                  />
                  <span>{rows.value.name}</span>
                </div>
              </div>
            )
          ) : (
            <div
              key={Keynumber}
              className={`box1 selctn-btn ${
                active == rows.value.itemId && "box1"
              }`}
              onClick={() => {
                handleClick(rows.value.itemId);
              }}
            >
              <div className="subtit1">
                <img
                  src={part4_images["g" + (Keynumber + 1)]}
                  alt={rows.value.name}
                />
                <span>{rows.value.name}</span>
              </div>
            </div>
          )
        )}
      </div>
      <div className="fxdctabtm">
        <div
          id={"err_popup"}
          style={{ width: "fit-content", margin: "auto" }}
        ></div>
        <a href={void 0} onClick={handleContinue}>
          <div className={isActive ? "necxbutton" : "necxbutton disabled"}>
            Continue
          </div>
        </a>
      </div>
    </div>
  );
};

export default React.memo(Part4);

import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { Link, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { monthly_result_images } from "../../config/imagedata/pages/monthly_result_images";
import { common_icons } from "../../config/imagedata/small_icons";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const OccasionResult = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  const [nextFiveMonths, setNextFiveMonths] = useState([]);
  const [monthly_result, setmonthly_result] = useState([]);
  const [urlPre, setUrlPre] = useState("");

  useEffect(() => {
    if (ReactSession.get("kb_monthly_result") == undefined) {
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

    getMonthData();
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "monthlyResultView",
      stage: "Personalized Plan",
    });
  }, []);

  const getMonthData = () => {
    setmonthly_result(ReactSession.get("kb_monthly_result"));

    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date();
    const currentMonthIndex = date.getMonth();

    // Calculate the next five months
    const calculatedNextMonths = Array.from({ length: 5 }, (_, index) => {
      const nextMonthIndex = (currentMonthIndex + index) % 12;
      return months[nextMonthIndex];
    });

    setNextFiveMonths(calculatedNextMonths);
  };

  // console.log(monthly_result);

  if (ReactSession.get("kb_monthly_result")) {
    return (
      <div>
        <Header />
        <div className="bodly">
          <div className="tit">
            <h1>{monthly_result?.weightCalculator?.title}</h1>
          </div>
          <div className="sutex">
            {monthly_result?.weightCalculator?.sub_title_a}
          </div>
          <div className="ocsn-rslt">
            <h2>
              <u>{monthly_result?.weightCalculator?.targetMonth}</u>
            </h2>
            <p>{monthly_result?.kbmonthly?.sub_title_b}</p>
            <div className="ocsnresultgrph">
              <div className="grphwrap">
                <div className="ocsngrph">
                  <img
                    src={monthly_result_images["g1"]}
                    alt="Graph"
                    width={300}
                    height={119}
                    loading="lazy"
                  />
                </div>

                {/* level0 */}
                {monthly_result?.weightCalculator?.weight_break_down &&
                monthly_result?.weightCalculator?.weight_break_down[0] ? (
                  <div className="grphtglfst">
                    <div className="grphcntwrap">
                      <span>
                        {monthly_result?.weightCalculator?.weight_break_down[0]?.expectedWeight?.toFixed(
                          1
                        ) || ""}
                      </span>
                      <span>{monthly_result?.kbmonthly?.weightType}</span>
                      <div className="trngl"></div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {/* level1 */}
                {monthly_result?.weightCalculator?.weight_break_down &&
                monthly_result?.weightCalculator?.weight_break_down[1] ? (
                  <div className="grphtglscnd">
                    <p className="grph-2">
                      {monthly_result?.weightCalculator?.weight_break_down
                        ?.length === 2
                        ? "Expected result"
                        : ""}
                    </p>
                    <div className="grphcntwrap">
                      <span>
                        {monthly_result?.weightCalculator?.weight_break_down[1]?.expectedWeight?.toFixed(
                          1
                        ) || ""}
                      </span>
                      <span>{monthly_result?.kbmonthly?.weightType}</span>
                      <div className="trngl"></div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {/* level2 */}
                {monthly_result?.weightCalculator?.weight_break_down &&
                monthly_result?.weightCalculator?.weight_break_down[2] ? (
                  <div className="grphtgl3">
                    <p className="grph-2">
                      {monthly_result?.weightCalculator?.weight_break_down
                        ?.length === 3
                        ? "Expected result"
                        : ""}
                    </p>
                    <div className="grphcntwrap">
                      <span>
                        {monthly_result?.weightCalculator?.weight_break_down[2]?.expectedWeight?.toFixed(
                          1
                        ) || ""}
                      </span>
                      <span>&nbsp;{monthly_result?.kbmonthly?.weightType}</span>
                      <div className="trngl"></div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {/* level3 */}
                {monthly_result?.weightCalculator?.weight_break_down &&
                monthly_result?.weightCalculator?.weight_break_down[3] ? (
                  <div className="grphtgl4">
                    <p className="grph-2">
                      {monthly_result?.weightCalculator?.weight_break_down
                        ?.length === 4
                        ? "Expected result"
                        : ""}
                    </p>
                    <div className="grphcntwrap">
                      <span>
                        {monthly_result?.weightCalculator?.weight_break_down[3]?.expectedWeight?.toFixed(
                          1
                        ) || ""}
                      </span>
                      <span>&nbsp;{monthly_result?.kbmonthly?.weightType}</span>
                      <div className="trngl"></div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {/* level4 */}
                {monthly_result?.weightCalculator?.weight_break_down &&
                monthly_result?.weightCalculator?.weight_break_down[4] ? (
                  <div className="grphtgl5">
                    <p className="grph-2">
                      {monthly_result?.weightCalculator?.weight_break_down
                        ?.length === 5
                        ? "Expected result"
                        : ""}
                    </p>
                    <div className="grphcntwrap">
                      <span>
                        {monthly_result?.weightCalculator?.weight_break_down[4]?.expectedWeight?.toFixed(
                          1
                        ) || ""}
                      </span>
                      <span>&nbsp;{monthly_result?.kbmonthly?.weightType}</span>
                      <div className="trngl"></div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="ocsnmnth">
                {monthly_result?.weightCalculator?.weight_break_down?.map(
                  (mon, index) => {
                    if (index <= 4) {
                      return <p key={index}>{mon?.month}</p>;
                    }
                  }
                )}

                {monthly_result?.weightCalculator?.weight_break_down?.length <
                  4 &&
                  nextFiveMonths?.map((mon, index) => {
                    if (
                      monthly_result?.weightCalculator?.weight_break_down
                        ?.length < 5 &&
                      monthly_result?.weightCalculator?.weight_break_down
                        ?.length <
                        index + 1
                    ) {
                      return <p key={index}>{mon}</p>;
                    }
                  })}
              </div>
              {/* <div className="ocsnmnth">
                {nextFiveMonths.map((mon, index) => (
                  <p key={index}>{mon}</p>
                ))}
              </div> */}
            </div>
          </div>

          <Link to={urlPre + "/email.html"}>
            <div className="sp11">
              <span className="necxbutton1 necxbuttontex" id="continue">
                Continue
              </span>
            </div>
          </Link>
          <SecurePolicy common_icons={common_icons} />
        </div>
      </div>
    );
  } else {
    return <h1 align="center">Data not found...</h1>;
  }
};
export default React.memo(OccasionResult);

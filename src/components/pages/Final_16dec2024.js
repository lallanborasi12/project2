import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../common/Header.js";
import $ from "jquery";
import { ReactSession } from "react-client-session";
import "react-slideshow-image/dist/styles.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from "../../config/constants.js";
import { common_icons } from "../../config/imagedata/small_icons.js";
import { final_images } from "../../config/imagedata/pages/final_images.js";
import DiscountedPlan from "./final/DiscountedPlan.js";
import MainPaymentPlan from "./final/MainPaymentPlan.js";
import { DataLayer } from "../common/Function.js";

const Final = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  let result = useLocation();
  let currentURL = window.location.href;
  var url = new URL(currentURL);

  var baseUrl =
    url.protocol + "//" + url.hostname + (url.port ? ":" + url.port : "");

  const currency_symbols = { us: "$", uk: "£", ca: "$", aus: "$" };

  /* custom timer */
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState({
    hours: "00",
    minutes: "14",
    seconds: "59",
  });
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPgProcessing, setIsPgProcessing] = useState(false);
  const [Bearer, setBearer] = useState("");

  // time runner start--------------------------------

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      const TimerData = {
        hours: hours > 9 ? hours : "0" + hours,
        minutes: minutes > 9 ? minutes : "0" + minutes,
        seconds: seconds > 9 ? seconds : "0" + seconds,
      };
      setTimer(TimerData);
    }
  };

  const clearTimer = (e) => {
    setTimer({
      hours: "00",
      minutes: "25",
      seconds: "00",
    });

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 1500);
    return deadline;
  };

  //----------------time runner----------------------------ends

  const [count, setCount] = useState(true);
  let [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  // const [offerModal, setOfferModal] = useState("modelinfo-wrap");
  const [discountModal, setDiscountModal] = useState("dscntmodelinfo-wrap");
  const [sectionType, setSectionType] = useState("default"); // discountedPlan ,default
  const [genderContent, setGenderContent] = useState(""); // Men
  const [weightContent, setWeightContent] = useState("");
  const [weightContentType, setWeightContentType] = useState("");

  const common_icons_array = useMemo(() => common_icons);
  const final_array = useMemo(() => final_images, []);
  const starObject = [
    common_icons_array["star_5"],
    common_icons_array["star_5"],
    common_icons_array["star_4"],
    common_icons_array["three_point_5"],
    common_icons_array["star_5"],
    common_icons_array["star_4"],
  ];

  //----------testimonial---slide-----ends-------------------

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

    clearTimer(getDeadTime());

    setTimeout(() => {
      setIsLoading(true); // Set loading state to false
    }, 250);

    if (localStorage.getItem("state")) {
      let base64_data = JSON.parse(
        atob(localStorage.getItem("state").slice(6, -4))
      );
      if (result.state === null) {
        history(urlPre + "/final.php", { state: base64_data });
      }
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

    //-------------- gender filtration-----------------------------

    //----------------- weight filtration------------------------
    setWeightContent(
      ReactSession.get("target") == ""
        ? ReactSession.get("target_1")
        : ReactSession.get("target")
    );
    setWeightContentType(ReactSession.get("ttype"));
    //-------------- weight filtration-----------------------------

    const toggleVisibility = () => {
      if (window.pageYOffset > 700) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean-up the event listener on unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* customer timer */

  const [data, setData] = useState([]);
  const [Dplandata, setDplanData] = useState([]);
  const [paymentList, setPaymentList] = useState({
    paypal: false,
    payglocal: false,
    stripe: false,
    squareup: true,
  });
  const [feedBackList, set_feedBackList] = useState([]);
  const [clientid, setClientId] = useState("");
  const [discounted_pcr_before, set_discounted_pcr_before] = useState(null);
  const [discounted_pcr, set_discounted_pcr] = useState(null);

  const [notifyMessage, set_notifyMessage] = useState(null);

  const [isOpen, setIsOpen] = React.useState();
  const [isOpenOffer, setIsOpenOffer] = React.useState();
  const [billedText, setbilledText] = React.useState();
  const [billedPrice, setbilledPrice] = React.useState();
  const [billedCredits, setbilledCredits] = React.useState();
  const [billedDiscount, setbilledDiscount] = React.useState(0);
  const [planIndexId, setPlanIndexId] = React.useState(1);
  const [PlanId, setPlanId] = React.useState(1);

  const GetData = () => {
    try {
      if (result.state.responce && result.state.responce.plan) {
        setClientId(result.state.responce.CLIENT_ID);
        setBearer(result.state.responce.accessToken);
        result.state.responce.plan.forEach((planRow, index) => {
          if (planRow.isTrue === true && index === planIndexId) {
            setbilledText(planRow.name);
            setbilledPrice(planRow.price);
            setbilledDiscount(
              ((planRow.price - planRow.credits) * 100) / planRow.price
            );
            setbilledCredits(planRow.credits);
            setPlanId(planRow.id);
          } else {
            planRow.isTrue = false;
          }
        });

        //Dplan false
        result.state.responce.discountedplan.forEach((DplanRow, index) => {
          if (DplanRow.isTrue === true && index === planIndexId) {
            set_discounted_pcr_before(DplanRow.discounted_pcr_before);
            set_discounted_pcr(DplanRow.discounted_pcr);
          } else {
            DplanRow.isTrue = false;
          }
        });

        // additional code for cookie addition
        document.cookie =
          "encryptEmail=" + result.state.responce.encryptEmail + "; path=/";
        // console.log(result.state.responce.valueAdded);
      } else {
        setbilledPrice(0);
        setbilledDiscount(0);
        setbilledCredits(0);
      }

      if (result.state.responce) {
        set_notifyMessage(result.state.responce.caseStudy.message);
        setData(result.state.responce.plan);
        setDplanData(result.state.responce.discountedplan);
        // result.state.responce.paymentList.square = true;
        setPaymentList(result.state.responce.paymentList);
        var topTitle1 = result.state.responce.caseStudy.topTitle1;
        $("#topTitle1").html(topTitle1);
        set_feedBackList(result.state.responce.caseStudy["feedBack"].list);
      }
    } catch (err) {
      // alert("Please process all steps correctly...");
      history("/email.html"); //static temp on 16-Nov-2023
      console.log(err);
    }
  };

  const PayGlocalHandle = async (event) => {
    setIsPgProcessing(true);

    // var getway_api = "";
    if (event == "stickypaypal") {
      var getway_api =
        API_BASE_URL + "/pro/payment/stk/log/paypaloptioninitiate";
    } else if (event == "squareup") {
      var getway_api = API_BASE_URL + "/pro/p4/psqup/initiate";
    } else {
      var getway_api = API_BASE_URL + "/pro/p3/pg/initiate";
    }

    let planid = PlanId;
    const postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Bearer,
      },
      body: JSON.stringify({
        planId: planid,
        callback: baseUrl + "/callback/pg/" + event,
      }),
    };
    fetch(getway_api, postOption)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          console.log(result.redirectUrl);
          window.location.href = result.redirectUrl;
          // setIsPgProcessing(false);
        } else if (result.error) {
          alert(result.error.message);
          setIsPgProcessing(false);
        }
      })
      .catch((err) => {
        setIsPgProcessing(false);
        console.log(err);
      });
  };

  useEffect(() => {
    GetData();
    setTimeout(() => {
      history(urlPre + "/email.html");
    }, 1000 * 60 * 25);
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "finalStepView",
      stage: "Checkout Final Plan Page",
    });
  }, []);

  // ================== Bootstrap Modal======================

  const showModal = (element) => {
    setPlanIndexId(element);

    if (sectionType === "default") {
      data.forEach((element, indexID2) => {
        data[indexID2].isTrue = false;
      });
      data[element].isTrue = true;
    } else {
      Dplandata.forEach((element, indexID2) => {
        Dplandata[indexID2].isTrue = false;
      });
      Dplandata[element].isTrue = true;
    }

    setIsOpen(true);
  };
  const hideModal = (element2) => {
    setIsOpen(false);
  };

  const hideModalOffer = (element2) => {
    setIsOpenOffer(false);
  };

  if (isLoading === false || isPgProcessing === true) {
    return <>{/* <Loader /> */}</>;
  }
  // console.log(paymentList);
  // ================== Bootstrap Modal======================
  // console.log(result.state);
  return (
    <>
      <div>
        {notifyMessage === "" ? (
          <></>
        ) : (
          <>
            <div className="finaltop">
              <img
                src={final_array["gift_notification_icon"]}
                alt={notifyMessage}
              />
              <div className="finaltoptext">
                {notifyMessage} |{" "}
                <span
                  onClick={() => showModal(planIndexId)}
                  style={{ cursor: "pointer" }}
                >
                  GET MY PLAN NOW →{" "}
                </span>
              </div>
            </div>
          </>
        )}

        {sectionType === "default" ? (
          <>
            <div className="lay">
              <div className="bodly">
                <div className="topsp"></div>
                <Header />
                <div className="befafmnwrap">
                  <img
                    src={final_array["arrow_bg"]}
                    className="bg-arrow-center"
                  />
                  <div className="afbfmn-wrap">
                    <p>
                      <span className="now_goal" style={{ left: "-6px" }}>
                        Now
                      </span>
                    </p>
                    <p>
                      <span className="now_goal">Goal</span>
                    </p>
                  </div>
                  <div className="befafimg-wrap">
                    <div className="bgimgwrap">
                      <div
                        className="imgbfwrp"
                        style={{
                          backgroundImage:
                            "url(" + final_array["bfaf_bg"] + ")",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "15px",
                        }}
                      >
                        <img
                          src={final_array[genderContent + "_bfr"]}
                          alt=""
                          width={184}
                          height={216}
                        />
                      </div>
                      <div
                        className="imgbfwrp"
                        style={{
                          backgroundImage:
                            "url(" + final_array["bfaf_bg"] + ")",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "15px",
                        }}
                      >
                        <img
                          src={final_array[genderContent + "_aftr"]}
                          alt=""
                          width={184}
                          height={216}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="befafcntwrp">
                    <div className="cntlftwrp">
                      <div className="cmncntwrp">
                        <div className="cnttopsecp">Body fat</div>
                        <div className="cntbtmsecp">15-24%</div>
                      </div>
                      <div className="cmncntwrp">
                        <div className="cnttopsecp">Metabolism level</div>
                        <div className="dashwrap">
                          <div className="dash-white dash-colored"></div>
                          <div className="dash-white"></div>
                          <div className="dash-white"></div>
                          <div className="dash-white"></div>
                          <div className="dash-white"></div>
                        </div>
                      </div>
                    </div>
                    <div className="cntrgtwrp">
                      <div className="cmncntwrp">
                        <div className="cnttopsecp">Body fat</div>
                        <div className="cntbtmsecp">6-14%</div>
                      </div>
                      <div className="cmncntwrp">
                        <div className="cnttopsecp">Metabolism level</div>
                        <div className="dashwrap">
                          <div className="dash-white dash-progess"></div>
                          <div className="dash-white dash-progess"></div>
                          <div className="dash-white dash-progess"></div>
                          <div className="dash-white dash-progess"></div>
                          <div className="dash-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="estimated-final-btn">
                    Estimated Results
                  </button>
                </div>

                <div>
                  <p className="dietPlanReady">
                    Your Keto diet
                    <span className="finalmoneybacktop" id="plan1">
                      plan is ready!
                    </span>
                  </p>
                </div>
                <div className="tgft-wrap">
                  <div className="tw-wrap">
                    <div className="twcnt">Target weight</div>
                    <div className="lfticnimg-wrp">
                      <img
                        src={final_array["target_weight_icon"]}
                        alt=""
                        height={47}
                        width={47}
                      />
                      <br />
                      <p>
                        {weightContent} {weightContentType}
                      </p>
                    </div>
                  </div>
                  <div className="tw-wrap">
                    <div className="ftcnt">Keto dieting level</div>
                    <div className="lfticnimg-wrp">
                      {/* rgticnimg-wrp */}
                      <img
                        src={final_array["growth_icon"]}
                        alt=""
                        height={47}
                        width={47}
                      />
                      <br />
                      <p>Intermediate</p>
                    </div>
                  </div>
                </div>
                <div className="finalboxshadow">
                  <div className="finaltesttx1">
                    <span>This offer expires in: </span>{" "}
                    <span id="timer">
                      <span className="hourBox">{timer.hours}</span>:
                      <span className="hourBox">{timer.minutes}</span>:
                      <span className="hourBox">{timer.seconds}</span>
                    </span>
                  </div>
                </div>

                <MainPaymentPlan
                  data={data}
                  setbilledText={setbilledText}
                  setbilledPrice={setbilledPrice}
                  setbilledCredits={setbilledCredits}
                  setbilledDiscount={setbilledDiscount}
                  setPlanIndexId={setPlanIndexId}
                  setPlanId={setPlanId}
                  showModal={showModal}
                  currency_symbols={currency_symbols}
                  billedCredits={billedCredits}
                  planIndexId={planIndexId}
                />

                <div className="bnrstar">
                  <img
                    src={common_icons_array["mobilebotm"]}
                    alt="mobile"
                    className="sp11"
                    width={200}
                    height={132}
                  />
                </div>
                <div className="finaltestco1">6,600,000</div>
                <div className="mobilebtotex">
                  beginners kick-started their keto dieting with us
                </div>
                <div className="sp11">
                  {/* <a href={"#plan1"}><div className=' necxbutton1 necxbuttontex' >Choose Your Plan Now!</div></a> */}
                </div>

                <div className="tit sp11 finalmoneybacktop">What you get</div>
                <div className="sutex1">
                  We use the answers you provided and our unique algorithms to
                  target your
                  <br />
                  program specifically to your individual needs and goals.
                  <br />
                  To achieve your goal you get:
                </div>
                <ul className="gtpntul">
                  <li> Step-by-step keto dieting assistance</li>
                  <li>
                    {" "}
                    Pre-calculated portion sizes based on your habits and
                    preferences
                  </li>
                  <li>
                    {" "}
                    Easy-to-cook delicious recipes with step-by-step preparation
                    guide
                  </li>
                  <li> High quality "How to cook" videos</li>
                  <li> Weekly shopping list with all ingredients</li>
                  <li> 100+ weight-loss insights</li>
                  <li> Hydration and weight tracker</li>
                  <li>
                    {" "}
                    Exclusive guides to help you understand more about nutrition
                    and training to reach your goal
                  </li>
                </ul>
                <div className="sutex1 sp11">
                  Everything in one mobile app on your device (iOS 15.0 or later
                  or Android 8.0 or later)
                </div>
                <img
                  src={final_array["background"]}
                  alt="background"
                  className="sume"
                  width={560}
                  height={560}
                />

                {/* Testimonial sections */}
                <div className="finalmoneybacktop sp11">What people say</div>

                {feedBackList.map((feed_list, index) => (
                  <div
                    className="sutex1"
                    style={{ marginBottom: "35px", position: "relative" }}
                    key={index}
                  >
                    <span
                      className="finaltestco"
                      style={{ position: "absolute", top: "-14px", left: "0" }}
                    >
                      {" "}
                    </span>
                    <div className="tgft-wrap1 tuser">
                      <img src={feed_list.user} alt="ellipse1" />
                      <div className="finaltestname ">
                        {feed_list.name}
                        <br /> <img src={starObject[index]} />
                      </div>
                    </div>
                    <span className="finaltesttx">{feed_list.feedback}</span>
                  </div>
                ))}

                <div className="finalmoneybacktop sp11">
                  Our users meet their goals
                </div>

                <img
                  src={final_array[genderContent + "_befaf"]}
                  alt="Our users meet their goals"
                  className="sume"
                />
                <p className="finaltestname">Wilfred de Guzman, USA.</p>
                <div className="finaltestxt">
                  The displayed results are not representative and depend on
                  various factors such as gender, age, physical condition,
                  adherence to meal and workout plan, etc. This is not an offer
                  or promise of results. Consult your physician to receive any
                  particular recommendations on your specific health conditions.
                </div>

                <div>
                  <p className="dietPlanReady">
                    Your Keto diet
                    <span className="finalmoneybacktop" id="plan1">
                      plan is ready!
                    </span>
                  </p>
                </div>
                <div className="tgft-wrap">
                  <div className="tw-wrap">
                    <div className="twcnt">Target weight</div>
                    <div className="lfticnimg-wrp">
                      <img
                        src={final_array["target_weight_icon"]}
                        alt=""
                        height={47}
                        width={47}
                      />
                      <br />
                      <p>
                        {weightContent} {weightContentType}
                      </p>
                    </div>
                  </div>
                  <div className="tw-wrap">
                    <div className="ftcnt">Keto dieting level</div>
                    <div className="lfticnimg-wrp">
                      {/* rgticnimg-wrp */}
                      <img
                        src={final_array["growth_icon"]}
                        alt=""
                        height={47}
                        width={47}
                      />
                      <br />
                      <p>Intermediate</p>
                    </div>
                  </div>
                </div>
                <div className="finalboxshadow">
                  <div className="finaltesttx1">
                    <span>This offer expires in: </span>{" "}
                    <span id="timer">
                      <span className="hourBox">{timer.hours}</span>:
                      <span className="hourBox">{timer.minutes}</span>:
                      <span className="hourBox">{timer.seconds}</span>
                    </span>
                  </div>
                </div>

                <MainPaymentPlan
                  data={data}
                  setbilledText={setbilledText}
                  setbilledPrice={setbilledPrice}
                  setbilledCredits={setbilledCredits}
                  setbilledDiscount={setbilledDiscount}
                  setPlanIndexId={setPlanIndexId}
                  setPlanId={setPlanId}
                  showModal={showModal}
                  currency_symbols={currency_symbols}
                  billedCredits={billedCredits}
                  planIndexId={planIndexId}
                />

                <img
                  src={common_icons_array["money_back"]}
                  alt="money-back"
                  height={"120px"}
                  width={"120px"}
                />
                <div className="finalmoneybacktop">
                  100% Money-Back Guarantee
                </div>
                <div className="tex">
                  We believe that our plan can work for you and you will get
                  visible results in 4 weeks! We are even willing to return your
                  money if you don’t see visible results and can prove that you
                  followed our plan. Please double-check our Refund Policy to
                  understand all the requirements
                </div>
                <div className="finalmoneyback">
                  <Link to={"/privacy-policy.html"} target="blank">
                    *Pursuant to Money-Back Policy
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* =====================Model for Discount========================= */}
            <DiscountedPlan
              discountModal={discountModal}
              discounted_pcr_before={discounted_pcr_before}
              discounted_pcr={discounted_pcr}
              common_icons={common_icons}
              data={data}
              Dplandata={Dplandata}
              setbilledText={setbilledText}
              setbilledPrice={setbilledPrice}
              setbilledCredits={setbilledCredits}
              setbilledDiscount={setbilledDiscount}
              setPlanIndexId={setPlanIndexId}
              setPlanId={setPlanId}
              showModal={showModal}
              currency_symbols={currency_symbols}
              planIndexId={planIndexId}
              common_icons_array={common_icons_array}
              isVisible={isVisible}
              scrollToTop={scrollToTop}
            />
          </>
        )}
      </div>

      <Popup open={isOpen} closeOnDocumentClick onClose={hideModal}>
        <div className="content">
          <div className="hed1 spallpopam">
            <div className="poptit">Select payment method</div>

            <a
              href={void 0}
              className="backco"
              onClick={() => {
                hideModal();
              }}
            >
              {" "}
              <img src={common_icons_array["backicon"]} alt="discover" /> Back
              to Plans
            </a>
          </div>
          <div className="oplin"></div>
          <div className="prize">
            <table style={{ borderBottom: "1px solid #d1d1d1" }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "left" }} id="ketocntid">
                    {billedText}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <del style={{ color: "#5bb05a" }} id="mrpid">
                      {currency_symbols["us"]}
                      {billedPrice}
                    </del>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }} id="disid">
                    Discount -{Math.round(billedDiscount)}%
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <b style={{ color: "#5bb05a" }} id="idmonth">
                      {currency_symbols["us"]}
                      {parseInt(billedPrice) - parseInt(billedCredits)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>Total</td>
                  <td
                    style={{ textAlign: "right" }}
                    className="amount"
                    id="idprice"
                  >
                    <b>
                      {currency_symbols["us"]}
                      {billedCredits}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pay-btn-wrap">
            {paymentList.paypal === true ? (
              <PayPalScriptProvider
                options={{
                  "client-id": clientid,
                  currency: "USD",
                  vault: true,
                }}
              >
                <PayPalButtons
                  createBillingAgreement={async (data, actions) => {
                    let planId =
                      document.getElementById("ketoplan_4354353").value;
                    let payload = {
                      planId: planId,
                    };
                    let d1 = JSON.stringify(payload);
                    return fetch(API_BASE_URL + "/pro/p1/bagreementtoken", {
                      method: "post",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + Bearer,
                      },
                      body: d1,
                    })
                      .then(function (res) {
                        if (!res.ok) {
                          throw new Error("Network response was not ok");
                        }
                        return res.json();
                      })
                      .then(function (orderData) {
                        return orderData.token_id; // get BA Token here
                      });
                  }}
                  onApprove={(data, actions) => {
                    return fetch(
                      API_BASE_URL + "/pro/p1/billingagreementonapprove",
                      {
                        method: "post",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Bearer " + Bearer,
                        },
                      }
                    )
                      .then(function (res) {
                        return res.json();
                      })
                      .then(function (orderData) {
                        if (orderData.status === "COMPLETED") {
                          localStorage.setItem(
                            "__orderconfirm",
                            orderData.transactionId
                          );
                          // history("/offers/thank-you.php", { state: orderData });
                          history(urlPre + "/register-form.html", {
                            state: orderData,
                          });
                        } else {
                          alert(orderData.status + "Please try again...");
                        }
                      });
                  }}
                />
              </PayPalScriptProvider>
            ) : (
              <></>
            )}
            {paymentList.payglocal === true ? (
              <div className="txt-cntr">
                <a
                  className="mdlbtn pebtngrn smooth-scroll text-white"
                  onClick={() => PayGlocalHandle("payglocal")}
                >
                  {" "}
                  <img
                    style={{ maxWidth: " 95px" }}
                    src={common_icons_array["credit_icon"]}
                    width={24}
                    height={18}
                    alt="loading"
                    loading="lazy"
                  />{" "}
                  Debit or Credit Card{" "}
                </a>
              </div>
            ) : (
              <></>
            )}
            {paymentList.squareup === true ? (
              <div className="txt-cntr">
                <a
                  className="mdlbtn pebtngrn smooth-scroll text-white "
                  onClick={() => PayGlocalHandle("squareup")}
                >
                  {" "}
                  <img
                    style={{ maxWidth: " 95px" }}
                    src={common_icons_array["squarecard"]}
                    width={24}
                    height={18}
                    alt="loading"
                    loading="lazy"
                  />{" "}
                  Debit or Credit card{" "}
                </a>
              </div>
            ) : (
              <></>
            )}
            {paymentList.stickypaypal === true ? (
              <div className="txt-cntr">
                <a
                  className="mdlbtn pay-btmgp text-white"
                  onClick={() => PayGlocalHandle("stickypaypal")}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <img
                    style={{ maxWidth: "25px" }}
                    src={common_icons_array["pay_icon"]}
                    width={25}
                    height={26}
                    alt="loading"
                    loading="lazy"
                  />{" "}
                  <i>
                    <span className="payclr">Pay</span>
                    <span className="palclr">Pal</span>
                  </i>{" "}
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* {console.log(paymentList)} */}

          {/* <p style={{ fontWeight: "bold", textAlign: "center" }}>The safer, easier way to pay</p> */}
          <input type="hidden" id="ketoplan_4354353" value={PlanId} />
          <div className="oplin"></div>
          <div className="tgft-wrap1 sp11">
            <img src={final_array["visa"]} alt="visa" />
            <img src={final_array["master"]} alt="master" />
            <img src={final_array["mestro"]} alt="mestro" />
            <img src={final_array["paypal"]} alt="paypal" />
            <img src={final_array["jcb"]} alt="jcb" />
            <img src={final_array["discover"]} alt="discover" />
          </div>
        </div>
      </Popup>

      <Popup open={isOpenOffer} closeOnDocumentClick onClose={hideModalOffer}>
        <div className="tit sp11">
          <h1>Did you know?</h1>
        </div>
        <div className="popmidcolo1 sp11">
          A Columbia University study showed that{" "}
          <span className="popmidcolo">73%</span> of dieters{" "}
          <span className="popmidcolo">have lost weight </span>and then{" "}
          <span className="popmidcolo">gained it back </span>at least once.
        </div>
        <div className="grpimg">
          <img
            src={final_array["aftergraph"]}
            alt="aftergraph"
            width={380}
            height={190}
          />
        </div>
        <div className="popmidcolo1 ">
          Based on data from users who log their progress in the app
        </div>
        <div className="popmidcolo1 ">
          We want you to reach your goal and maintain it, so we are offering a{" "}
          <span className="popmidcolo">special discount</span> on your{" "}
          <span className="popmidcolo">weight-loss</span> plan
        </div>
        <div className="sp11">
          <a
            onClick={() => {
              setDiscountModal("");
              setSectionType("discountedPlan");
              document.body.classList.remove("custom-modal-overflow");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ display: "block", textAlign: "center" }}
          >
            <div
              className="necxbutton1"
              style={{ textAlign: "center" }}
              onClick={() => {
                setIsOpenOffer(false);
              }}
            >
              Got It!
            </div>
          </a>
        </div>
      </Popup>
    </>
  );
};
export default React.memo(Final);

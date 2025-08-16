import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { ReactSession } from "react-client-session";
import { common_icons } from "../../config/imagedata/small_icons";
import { DataLayer } from "../common/Function";

import layer1 from "../assets/thankyou/image/layer1.png";
import layer2 from "../assets/thankyou/image/layer2.png";
import appstore from "../assets/thankyou/image/app-store.png";
import avocadoruits1 from "../assets/thankyou/image/avocado-fruits-1.png";
import avocadoruits from "../assets/thankyou/image/avocado-fruits.png";
import bg from "../assets/thankyou/image/bg.png";
import item1 from "../assets/thankyou/image/item-1.png";
import item2 from "../assets/thankyou/image/item-2.png";
import mobile from "../assets/thankyou/image/mobile.png";
import playstore from "../assets/thankyou/image/play-store.png";
import introvideo from "../assets/thankyou/image/video.mp4";

import { freeEmails } from "../common/StringData";

const Thankyou = () => {
  let result = useLocation();
  let history = useNavigate();
  ReactSession.setStoreType("localStorage");

  const [credits, setCredits] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [status, setStatus] = useState("");
  const [transactionId, settransactionId] = useState("");
  const [orderconfirm, setorderconfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const freeEmailsVar = freeEmails;

  useEffect(() => {
    setorderconfirm(localStorage.getItem("__orderconfirm"));
    if (result.state && !freeEmailsVar.includes(ReactSession.get("email"))) {
      setCredits(result.state.credits);
      setCurrency(result.state.currency);
      setStatus(result.state.status);
      settransactionId(result.state.transactionId);
      // console.log("tes");
    } else if (freeEmailsVar.includes(ReactSession.get("email"))) {
      // Demo data set for test purpose
      setCredits(14.99);
      setCurrency("USD");
      settransactionId(111000222000);
      console.log("Thank you");
    } else {
      // history("/"); // Temporary
    }
    // localStorage.clear(); // Uncomment before leave the page and complete testing.

    setTimeout(() => {
      setIsLoading(true); // Set loading state to false
    }, 1000); // Simulate a 2-second delay

    // Call the preventBack function to prevent going back
    preventBack();
  }, []);

  const thankDataLayer = () => {
    if (window.dataLayer) {
      let currentTime = new Date().toISOString();
      let siteUrl = window.location.href;
      window.dataLayer.push({
        event: "thankYouView",
        stage: "Thank You Page",
        currentTime: currentTime,
        siteUrl: siteUrl,
        currency: currency || "USD",
        value: credits || 14.99,
        transaction_id: transactionId || 111000222000,
      });
      // console.log(window.dataLayer);
      // console.log(transactionId);
    }

    // Below one is dynamic

    // const dataLayer_res = DataLayer({
    //   event: "thankYouView",
    //   stage: "Thank You Page",
    // });
  };

  useEffect(() => {
    import("../assets/thankyou/thankyou.css");
  }, []);

  useEffect(() => {
    if (transactionId) {
      thankDataLayer();
      // console.log(transactionId);
    }
  }, [transactionId]);

  // Prevent users from going back
  function preventBack() {
    window.history.pushState(null, null, window.location.href);
  }
  // console.log(result);

  if (isLoading === false) {
    return (
      <>
        <Loader />
      </>
    );
    return false;
  }

  return (
    <>
      {orderconfirm != null ? (
        <HelmetProvider>
          <Helmet>
            <script>
              {`window.dataLayer = window.dataLayer || [];
                    dataLayer.push({
                        'transaction-id': Number('` +
                transactionId +
                `'),
                    'transaction-revenue': Number('` +
                credits +
                `')
                     })`}
            </script>
            <script>
              {`dataLayer.push({
                            'currency': '` +
                currency +
                `',
                            'conversionValue': Number('` +
                credits +
                `'),
                            'event': 'orderkb'
                        });`}
            </script>
          </Helmet>
        </HelmetProvider>
      ) : (
        <></>
      )}

      <div className="main_sec">
        <div className="main_wrp">
          <div className="title-wrp">
            <img src={layer1} alt="" />
            <div>
              <h1>Thank You for Joining! </h1>
              <p>Your Journey to Health Starts Here!</p>
            </div>
            <img src={layer2} alt="" />
            <img src={avocadoruits} className="img-2" alt="" />
          </div>
          <div className="row">
            <div className="col_img">
              <div className="video-sec">
                <video width="100%" autoPlay muted loop>
                  <source src={introvideo} type="video/mp4"></source>
                </video>
              </div>
              <img src={avocadoruits1} className="img-1" alt="" />
            </div>
            <div className="title-wrp" id="headr-sec">
              <img src={layer1} alt="" />
              <div>
                <h1>Thank You for Joining! </h1>
                <p>Your Journey to Health Starts Here!</p>
              </div>
              <img src={layer2} alt="" />
              <img src={avocadoruits} className="img-2" alt="" />
            </div>
            <div className="col_content">
              <h2>Why download the app?</h2>
              <ul>
                <li>
                  Access Your Plan Anytime, Anywhere: View your meal plans,
                  shopping lists, and nutrition tips on the go.
                </li>
                <li>
                  Exclusive App Features: Interactive tools to adjust your plan,
                  track your progress, and get tailored recommendations.
                </li>
                <li>
                  Direct Support: Chat with our experts, ask questions, and
                  receive instant feedback—all within the app.
                </li>
                <li>
                  Stay Updated: Receive real-time notifications for meal prep
                  reminders, special offers, and new recipe ideas.
                </li>
              </ul>
            </div>
          </div>
          <div className="app_img">
            <a href="https://apps.apple.com/in/app/ketobalanced/id6473776196">
              <img src={appstore} alt="" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=ketodietplan.carbmanager.ketoapp&hl=en_AU">
              <img src={playstore} alt="" />
            </a>
          </div>

          <p className="ftr-title">
            <img src={item1} className="item-1" alt="" />
            Download now to unlock a free <span>
              "keto sweets e book."
            </span>{" "}
            available only for app users!"
            <img src={item2} className="item-2" alt="" />
          </p>

          <div className="footer_sec">
            <h3>Now, make it even easier with our App!</h3>
            <p>
              Unlock all the best features by downloading our app—where your
              personalized meal plan, progress tracking, and direct support are
              just a tap away.
            </p>
            <h4>
              <b>
                Don't miss out! Your best results are just a download away.
                Click below to get started:
              </b>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(Thankyou);

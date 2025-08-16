import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { common_icons } from "../../config/imagedata/small_icons";
import { DataLayer } from "../common/Function";

const Thankyou = () => {
  let result = useLocation();
  let history = useNavigate();

  const [credits, setCredits] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [status, setStatus] = useState("");
  const [transactionId, settransactionId] = useState("");
  const [orderconfirm, setorderconfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setorderconfirm(localStorage.getItem("__orderconfirm"));
    if (result.state) {
      setCredits(result.state.credits);
      setCurrency(result.state.currency);
      setStatus(result.state.status);
      settransactionId(result.state.transactionId);
    } else {
      history("/");
    }
    localStorage.clear();

    setTimeout(() => {
      setIsLoading(true); // Set loading state to false
    }, 1000); // Simulate a 2-second delay

    // Call the preventBack function to prevent going back
    preventBack();
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "thankYouView",
      stage: "Thank You Page",
    });
  }, []);

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

      <div className="tnx-dsktp-bg">
        <div className="tnkmn">
          <img className="tnkmail" src={common_icons["mail"]} alt="mail-icon" />
          <h1 className="wtcolor">Thank You!</h1>
          <p>
            Welcome to Ketobalanced. We wish you a very healthy weight loss
            journey ahead. We'll soon share the meal plans through the email
            address that you've registered.
          </p>
          <h5>
            <strong>
              Ketobalanced.com - your professional diet coach. Discover how
              healthy dieting can help you lose weight and boost your energy.
            </strong>
          </h5>
          <div className="appimg">
            <a href="https://play.google.com/store/apps/details?id=ketodietplan.carbmanager.ketoapp&hl=en_AU">
              <img
                src={common_icons["google_play"]}
                height={68}
                width={165}
                className="d-none"
              />
            </a>

            <a href="https://apps.apple.com/in/app/ketobalanced/id6473776196">
              <img
                src={common_icons["apple_store"]}
                height={68}
                width={165}
                className="d-none"
              />
            </a>
          </div>
          <div className="appimg">
            {/* <img
              src={common_icons["preusaqrcode"]}
              height={165}
              width={165}
              className="d-none"
            />
            <br />
            <Link to={"/deep/app-pwd-track"}>Click to download</Link> */}
          </div>
          <div class="weblog">
            <a href="https://user.ketobalanced.com/">
              {" "}
              Click here to access on web
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(Thankyou);

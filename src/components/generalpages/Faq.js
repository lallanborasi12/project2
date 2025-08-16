import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { ReactSession } from "react-client-session";
import $ from "jquery";
import API_BASE_URL, { KETO_IMG_CDN_LIVE } from "../../config/constants";
const Faq = () => {
  ReactSession.setStoreType("localStorage");
  const country_code = ReactSession.get("IpAddressData")
    ? ReactSession.get("IpAddressData").country_code
    : "us";
  const [faq_data, set_faq_data] = useState([]);
  const [citationsSite, setCitationsSite] = useState(null);

  useEffect(() => {
    getFaqData();
  }, []);

  const getFaqData = () => {
    const requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: country_code }),
    };
    fetch(API_BASE_URL + "/pre/general/pages", requestBody)
      .then((res) => res.json())
      .then((result) => {
        result.forEach((pages, index) => {
          if (pages?.name == "citationsSite") {
            setCitationsSite(pages);
          }
          if (pages.name == "faq") {
            set_faq_data(pages.description);
            return;
          }
        });
      }, [])
      .catch((err) => {
        $("#data_for_gen_page").html(
          "<h3>Ouch! Something went wrong!<br> It seems you probably need expert's supervision to achieve your dream body. Kindly drop an email at support@ketobalanced.com<h3>"
        );
      });
  };

  const toggleAnswer = () => {
    var acc = document.getElementsByClassName("question");
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        // console.log(panel.style.maxHeight);
        if (panel.style.maxHeight != "0px") {
          panel.style.maxHeight = "0px";
          // console.log("close");
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          // console.log("Open");
        }
      });
    }
  };

  useEffect(() => {
    // toggleAnswer();
  });

  return (
    <span>
      {/* <link rel="stylesheet" href="css2/style.css"></link> */}
      <Header />
      <main className="inner-gap">
        <div className="inner-pages-content inner-pages-content2">
          <h1 className="t-center bottom-gap-2">
            Frequently Asked <strong>Questions</strong>
          </h1>
          <div
            className="white-box"
            style={{
              margin: "auto",
              overflow: "hidden",
              maxHeight: "fit-content",
            }}
            id="faq-data"
          >
            {faq_data.map((questions, index) => (
              <div
                key={index}
                onClick={() => {
                  toggleAnswer();
                }}
              >
                <div className="question">
                  <div className="title">
                    <span className="num">{index + 1}</span>
                    <img
                      className="plsIcon"
                      src={KETO_IMG_CDN_LIVE + "/plus.png"}
                    />
                    <img
                      className="minusIcon"
                      src={KETO_IMG_CDN_LIVE + "/minus.png"}
                    />
                    {questions.q}
                  </div>
                </div>
                <div
                  className="answer"
                  style={{
                    maxHeight: "0",
                    overflow: "hidden",
                    transition:
                      "max-height 0.2s ease-out;padding: 0px 0px 1px 55px",
                  }}
                  dangerouslySetInnerHTML={{ __html: questions.a }}
                ></div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <br />
            <br />
            <strong style={{ fontSize: "11px" }}>
              Citations and study links:
            </strong>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: "0",
                fontSize: "10px",
              }}
            >
              {citationsSite?.description?.map((citation_row, index) => {
                return (
                  <li key={index}>
                    <a href={citation_row} style={{ color: "#FF3464" }}>
                      {citation_row}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <br />
      </main>

      <script src="js/font-awesome.js"></script>
    </span>
  );
};
export default React.memo(Faq);

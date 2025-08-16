import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "./constants";
const PayResponse = () => {
  let history = useNavigate();
  const { pgname, getTranId } = useParams();

  const resObject = {};

  useEffect(() => {
    if (localStorage.getItem("state")) {
      let base64_data = JSON.parse(
        atob(localStorage.getItem("state").slice(6, -4))
      );
      let accessToken = base64_data.responce.accessToken;

      statusValidatior("accessToken", pgname, getTranId);
    } else {
      history("/");
    }
  });

  const statusValidatior = async (aT, pgname, getTranId) => {
    let statusurl;
    if (pgname === "squareup") {
      statusurl =
        API_BASE_URL +
        "/pro/p4/psqup/merchant/statusvalidator/web/" +
        getTranId;
    } else {
      statusurl =
        API_BASE_URL + "/pro/p3/pg/merchant/statusvalidator/web/" + getTranId;
    }
    const get_options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(statusurl, get_options)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "COMPLETED") {
          localStorage.setItem("__orderconfirm", result.transactionId);
          history("/register-form.html", { state: result });
          // history('/offers/thank-you.php', { state: result });
        } else {
          if (localStorage.getItem("state")) {
            let base64_data = JSON.parse(
              atob(localStorage.getItem("state").slice(6, -4))
            );
            base64_data.responce.caseStudy.message = result.message;

            history("/final.php", { state: base64_data });
          } else {
            history("/");
          }
        }
      })
      .catch((error) => {
        if (localStorage.getItem("state")) {
          let base64_data = JSON.parse(
            atob(localStorage.getItem("state").slice(6, -4))
          );
          base64_data.responce.caseStudy.message = "";

          history("/final.php", { state: base64_data });
        } else {
          history("/");
        }
      });
  };
};

export default PayResponse;

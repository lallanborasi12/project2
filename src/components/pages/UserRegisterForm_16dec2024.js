import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import API_BASE_URL from "../../config/constants";
import { common_icons } from "../../config/imagedata/small_icons";
import { DataLayer } from "../common/Function";

const UserRegisterForm = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();
  let result1 = useLocation();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirm_password] = useState();
  const [userPhone, setUserPhone] = useState();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    if (
      localStorage.getItem("state") &&
      localStorage.getItem("__orderconfirm")
    ) {
      let base64_data = JSON.parse(
        atob(localStorage.getItem("state").slice(6, -4))
      );
      setAccessToken(base64_data.responce.accessToken);
    } else {
      history("/");
    }
  });

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "userRegistrationView",
      stage: "Registration Page",
    });
  }, []);

  const sendRegisterDetails = () => {
    if (fname && lname && password && confirm_password && userPhone) {
      if (password != confirm_password) {
        document.getElementsByClassName("err_popup2")[0].innerHTML =
          "<span class='err_popup'>Password and confirm password not matched...</span>";
        return false;
      } else {
        const requestOption = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            fname: fname,
            lname: lname,
            password: password,
            confirm_password: confirm_password,
            userPhone: userPhone,
          }),
        };

        const url = API_BASE_URL + "/pro/log/register/profile";
        fetch(url, requestOption)
          .then((res) => res.json())
          .then((result) => {
            if (result.error) {
              document.getElementsByClassName("err_popup2")[0].innerHTML =
                "<span class='err_popup'>" + result.error.message + "</span>";
              // history("/offers/thank-you.php", { state: result1.state });
            } else {
              document.getElementsByClassName("err_popup2")[0].innerHTML =
                "<span class='err_popup'>" + result.message + "</span>";
              history("/offers/thank-you.php", { state: result1.state });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        document.getElementsByClassName("err_popup2")[0].innerHTML = "";
      }
    } else {
      document.getElementsByClassName("err_popup2")[0].innerHTML =
        "<span class='err_popup'>Please check all field...</span>";
    }
  };

  return (
    <div>
      <Header />

      <div id="regist">
        <div className="scsfltnk">
          <img src={common_icons["hooray"]} width={35} /> &nbsp; Payment
          Successful Thank you!
        </div>
        <div className="tit">
          <h1>Registration</h1>
        </div>
        <div className="registprgs">
          <div className="registprgsbar"></div>
          <div className="registprgscnt">
            <div className="registcntwrap">
              <div className="registcrcl registok">&#x2714;</div>
              <p>Purchase</p>
            </div>
            <div className="registcntwrap">
              <div className="registcrcl">2</div>
              <p>Register</p>
            </div>
            <div className="registcntwrap">
              <div className="registcrcl">3</div>
              <p>Download</p>
            </div>
            <div className="registcntwrap">
              <div className="registcrcl">4</div>
              <p>Login</p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="registersub mb-10">Login Information</div>
        <div className="mb-10">
          <label className="registelab">Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            defaultValue={ReactSession.get("email")}
            readOnly
            className="bk"
          />
        </div>
        <div className="mb-10">
          <label className="registelab">Create Your Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            onKeyUp={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-10">
          <label className="registelab">Confirm Password</label>
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            onKeyUp={(e) => {
              setConfirm_password(e.target.value);
            }}
          />
        </div>

        <div className="registersub sp11">Personal Information</div>
        <br />
        <div className="mb-10">
          <label className="registelab">First Name</label>
          <input
            type="text"
            name="name"
            onKeyUp={(e) => {
              setFname(e.target.value);
            }}
          />
        </div>
        <div className="mb-10">
          <label className="registelab">Last Name</label>
          <input
            type="text"
            name="name"
            onKeyUp={(e) => {
              setLname(e.target.value);
            }}
          />
        </div>
        <div className="mb-10">
          <label className="registelab">Your Country</label>
          <input
            type="text"
            placeholder={ReactSession.get("IpAddressData").country_code}
            disabled
            readOnly
          />
        </div>
        <div className="mb-10">
          <label className="registelab">Phone Number</label>
          <input
            type="tel"
            placeholder="Phone Number"
            name="phonenumber"
            onKeyUp={(e) => {
              setUserPhone(e.target.value);
            }}
          />
        </div>
        <div className="sp11">
          <div className="err_popup2">
            <span></span>
          </div>
          <br />
          <div
            className=" necxbutton necxbuttontex"
            onClick={() => {
              sendRegisterDetails();
            }}
          >
            Continue
          </div>
          <p style={{ margin: "20px 0", textAlign: "center" }}>
            <Link to={"/faq.html"} style={{ color: "#222" }}>
              FAQ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default React.memo(UserRegisterForm);

import React, { useEffect, useMemo, useState } from "react";
import Header from "../common/Header";
import { Link, json, useNavigate } from "react-router-dom";
import $ from "jquery";
import { ReactSession } from "react-client-session";
import Final from "./Final";
import API_BASE_URL from "../../config/constants";
import { common_icons } from "../../config/imagedata/small_icons";
import Result_email_section from "./Result_email_section";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const Email = () => {
  ReactSession.setStoreType("localStorage");
  let history = useNavigate();

  const [emailRegSts, setEmailRegSts] = useState(false); // false
  const [resultData, setResultData] = useState(false);
  const [conBtnDisabled, setConBtnDisabled] = useState(false);
  const [dataStatus, setDataStatus] = useState(true);
  const [urlPre, setUrlPre] = useState("");
  const [isTheme, setIsTheme] = useState("whitev3");
  const [isLoading, setIsLoading] = useState(false);

  const common_icons_array = useMemo(() => common_icons, []);

  useEffect(() => {
    if (
      !ReactSession.get("gender") ||
      !ReactSession.get("current_body_type") ||
      !ReactSession.get("howmuchtime") ||
      !ReactSession.get("part1") ||
      !ReactSession.get("part2") ||
      !ReactSession.get("part3") ||
      !ReactSession.get("part4") ||
      !ReactSession.get("part5") ||
      !ReactSession.get("part6") ||
      !ReactSession.get("part7")
    ) {
      history("/");
      setDataStatus(false);
    }

    if (
      !ReactSession.get("age") ||
      !ReactSession.get("type") ||
      !ReactSession.get("htype")
    ) {
      history("/");
      setDataStatus(false);
    }

    if (window.location.pathname.split("/")[1] === "men") {
      setUrlPre("/men");
      setIsTheme("whitemenv3");
    } else if (window.location.pathname.split("/")[1] === "women") {
      setUrlPre("/women");
      setIsTheme("whitewomenv3");
    } else if (window.location.pathname.split("/")[1] === "over40") {
      setUrlPre("/over40");
      setIsTheme("whiteover40v3");
    } else {
      setUrlPre("");
      setIsTheme("whitev3");
    }

    setTimeout(() => {
      setIsLoading(true); // Set loading state to false
    }, 250); // Simulate a 2-second delay
  });

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "emailEntryView",
      stage: "Email Entry",
    });
  }, []);

  if (dataStatus == false) {
    return false;
  }

  const emailValidation = (e) => {
    var mail_value = $("#mail-value").val();
    if (mail_value == "") {
      $("#text").html("Please enter valid email id");
    } else if (!mail_value.includes("@")) {
      $("#text").html("Please enter valid email");
    } else {
      setConBtnDisabled(false);
      ReactSession.set("email", mail_value);

      var gender_data = ReactSession.get("Get_gender").categoryItems;
      var current_body_type_data = ReactSession.get(
        "Get_current_body_type"
      ).categoryItems;
      var meal_preparation_data = ReactSession.get(
        "Get_meal_preparation"
      ).categoryItems;
      var meat_data = ReactSession.get("Get_meat").categoryItems;
      var veggies_data = ReactSession.get("Get_veggies").categoryItems;
      var veggies_data = ReactSession.get("Get_veggies").categoryItems;
      var other_food_items_data = ReactSession.get(
        "Get_other_food_items"
      ).categoryItems;
      var activity_data = ReactSession.get("Get_activity").categoryItems;
      var typical_day_for_you_data = ReactSession.get(
        "Get_typical_day_for_you"
      ).categoryItems;
      var what_stands_true_for_you_data = ReactSession.get(
        "Get_what_stands_true_for_you"
      ).categoryItems;
      var age_data = ReactSession.get("Get_age").categoryItems;
      var height_data = ReactSession.get("Get_height").categoryItems;
      var weight_data = ReactSession.get("Get_weight").categoryItems;
      var easy_weight_loss_with_keto =
        ReactSession.get("Get_part1").categoryItems;
      var body_type_target = ReactSession.get(
        "Get_body_type_target_mix"
      ).categoryItems;
      var target_zones = ReactSession.get("Get_target_zones_mix").categoryItems;
      var happy_weight = ReactSession.get("Get_happy_weight").categoryItems;
      var motivation = ReactSession.get("Get_motivation").categoryItems;
      var occasion = ReactSession.get("Get_occasion").categoryItems;
      // var ingredients_allergy = ReactSession.get('Get_ingredients_allergy').categoryItems;
      var disease = ReactSession.get("Get_disease").categoryItems;

      gender_data.forEach((element, index) => {
        if (element.itemId == ReactSession.get("gender")) {
          var gender_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var gender_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        gender_data[index] = gender_payload;
      });

      current_body_type_data.forEach((element, index) => {
        if (element.itemId == ReactSession.get("current_body_type")) {
          var current_body_type_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var current_body_type_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        current_body_type_data[index] = current_body_type_payload;
      });

      meal_preparation_data.forEach((element, index) => {
        if (element.itemId == ReactSession.get("howmuchtime")) {
          var meal_preparation_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var meal_preparation_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        meal_preparation_data[index] = meal_preparation_payload;
      });
      meat_data.forEach((element, index) => {
        if (ReactSession.get("part2").includes(element.itemId)) {
          var meat_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var meat_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        meat_data[index] = meat_payload;
      });
      veggies_data.forEach((element, index) => {
        if (ReactSession.get("part3").includes(element.itemId)) {
          var veggies_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var veggies_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        veggies_data[index] = veggies_payload;
      });
      other_food_items_data.forEach((element, index) => {
        if (ReactSession.get("part4").includes(element.itemId)) {
          var other_food_items_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var other_food_items_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        other_food_items_data[index] = other_food_items_payload;
      });
      activity_data.forEach((element, index) => {
        if (ReactSession.get("part5").includes(element.itemId)) {
          var activity_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var activity_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        activity_data[index] = activity_payload;
      });
      typical_day_for_you_data.forEach((element, index) => {
        if (ReactSession.get("part6").includes(element.itemId)) {
          var typical_day_for_you_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var typical_day_for_you_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        typical_day_for_you_data[index] = typical_day_for_you_payload;
      });
      what_stands_true_for_you_data.forEach((element, index) => {
        if (ReactSession.get("part7").includes(element.itemId)) {
          var what_stands_true_for_you_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var what_stands_true_for_you_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        what_stands_true_for_you_data[index] = what_stands_true_for_you_payload;
      });

      age_data.forEach((element, index) => {
        if (ReactSession.get("age_id").includes(element.itemId)) {
          var age_payload =
            '{"itemId": "' +
            element.itemId +
            '","isVal": ' +
            ReactSession.get("age") +
            ',"isTrue": 1}';
        } else {
          var age_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}'; //null
        }
        age_data[index] = age_payload;
      });

      height_data.forEach((element, index) => {
        if (
          ReactSession.get("height_itemid_ft").includes(element.itemId) ||
          ReactSession.get("height_itemid_in").includes(element.itemId) ||
          ReactSession.get("height_itemid_cm").includes(element.itemId)
        ) {
          if (element.name == "cm") {
            var heigh_value = ReactSession.get("cm");
          } else if (element.name == "feet") {
            var heigh_value = ReactSession.get("ft");
          } else if (element.name == "inch") {
            var heigh_value = ReactSession.get("inch");
          }
          var height_payload =
            '{"itemId": "' +
            element.itemId +
            '","isVal": ' +
            heigh_value +
            ',"isTrue": 1}';
        } else {
          var height_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        height_data[index] = height_payload;
        var category_height =
          '{"category": "height","categoryItems": [' + height_payload + "]}";
      });

      // console.log(height_data);

      weight_data.forEach((element, index) => {
        if (
          ReactSession.get("wtypeid").includes(element.itemId) ||
          ReactSession.get("cwid").includes(element.itemId) ||
          ReactSession.get("twid").includes(element.itemId)
        ) {
          if (element.name == "weight" && ReactSession.get("type") == "kg") {
            var weight_value = ReactSession.get("weight");
          } else if (
            element.name == "target weight" &&
            ReactSession.get("type") == "kg"
          ) {
            var weight_value = ReactSession.get("target");
          } else if (
            element.name == "weight" &&
            ReactSession.get("type") == "lb"
          ) {
            var weight_value = ReactSession.get("weight_1");
          } else if (
            element.name == "target weight" &&
            ReactSession.get("type") == "lb"
          ) {
            var weight_value = ReactSession.get("target_1");
          } else if (element.name == "kg") {
            var weight_value = null;
          } else if (element.name == "lb") {
            var weight_value = null;
          }
          var weight_payload =
            '{"itemId": "' +
            element.itemId +
            '","isVal": ' +
            weight_value +
            ',"isTrue": 1}';
        } else {
          var weight_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        weight_data[index] = weight_payload;
      });

      //-----------------
      easy_weight_loss_with_keto.forEach((element, index) => {
        if (ReactSession.get("part1").includes(element.itemId)) {
          var easy_weight_loss_with_keto_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var easy_weight_loss_with_keto_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        easy_weight_loss_with_keto[index] = easy_weight_loss_with_keto_payload;
      });

      body_type_target.forEach((element, index) => {
        if (ReactSession.get("body_type_target_mix").includes(element.itemId)) {
          var body_type_target_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var body_type_target_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        body_type_target[index] = body_type_target_payload;
      });

      target_zones.forEach((element, index) => {
        if (ReactSession.get("kb_target_zones_mix").includes(element.itemId)) {
          var target_zones_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var target_zones_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        target_zones[index] = target_zones_payload;
      });

      happy_weight.forEach((element, index) => {
        if (ReactSession.get("kb_happy_weight").includes(element.itemId)) {
          var happy_weight_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var happy_weight_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        happy_weight[index] = happy_weight_payload;
      });

      motivation.forEach((element, index) => {
        if (ReactSession.get("motivation").includes(element.itemId)) {
          var motivation_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var motivation_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        motivation[index] = motivation_payload;
      });

      occasion.forEach((element, index) => {
        if (ReactSession.get("occasion").includes(element.itemId)) {
          var occasion_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var occasion_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        occasion[index] = occasion_payload;
      });

      // ingredients_allergy.forEach((element, index) => {
      //   if (ReactSession.get('ingredients_allergy').includes(element.itemId)) {
      //     var ingredients_allergy_payload = '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
      //   }
      //   else {
      //     var ingredients_allergy_payload = '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
      //   }
      //   ingredients_allergy[index] = ingredients_allergy_payload;

      // });

      disease.forEach((element, index) => {
        if (ReactSession.get("kb_disease").includes(element.itemId)) {
          var disease_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": 1}';
        } else {
          var disease_payload =
            '{"itemId": "' + element.itemId + '","isVal": null,"isTrue": null}';
        }
        disease[index] = disease_payload;
      });

      var surveyItemsDetails = {
        surveyItems: [
          { category: "gender", categoryItems: gender_data.map(JSON.parse) },
          {
            category: "current_body_type",
            categoryItems: current_body_type_data.map(JSON.parse),
          },
          {
            category: "meal_preparation",
            categoryItems: meal_preparation_data.map(JSON.parse),
          },
          { category: "meat", categoryItems: meat_data.map(JSON.parse) },
          { category: "veggies", categoryItems: veggies_data.map(JSON.parse) },
          {
            category: "other_food_items",
            categoryItems: other_food_items_data.map(JSON.parse),
          },
          {
            category: "activity",
            categoryItems: activity_data.map(JSON.parse),
          },
          {
            category: "typical_day_for_you",
            categoryItems: typical_day_for_you_data.map(JSON.parse),
          },
          {
            category: "what_stands_true_for_you",
            categoryItems: what_stands_true_for_you_data.map(JSON.parse),
          },
          { category: "age", categoryItems: age_data.map(JSON.parse) },
          { category: "height", categoryItems: height_data.map(JSON.parse) },
          { category: "weight", categoryItems: weight_data.map(JSON.parse) },
          {
            category: "body_type_target",
            categoryItems: body_type_target.map(JSON.parse),
          },
          {
            category: "easy_weight_loss_with_keto",
            categoryItems: easy_weight_loss_with_keto.map(JSON.parse),
          },
          {
            category: "target_zones",
            categoryItems: target_zones.map(JSON.parse),
          },
          {
            category: "happy_weight",
            categoryItems: happy_weight.map(JSON.parse),
          },
          { category: "motivation", categoryItems: motivation.map(JSON.parse) },
          { category: "occasion", categoryItems: occasion.map(JSON.parse) },
          // { "category": "ingredients_allergy", "categoryItems": ingredients_allergy.map(JSON.parse) },
          { category: "disease", categoryItems: disease.map(JSON.parse) },
        ],
      };

      //-------------------------------------------------------

      var general_data = {
        email: mail_value,
        phone: "",
        isTheme: isTheme,
        country: ReactSession.get("IpAddressData").country_code,
        ip: "2001:0db8:3c4d:0015:0000:0000:1a2f:1a2b",
        location: "",
        device: "web",
        deviceVer: "3.4",
        deviceToken: "123456",
        utmData: ReactSession.get("utmData"),
        surveyItems: surveyItemsDetails.surveyItems,
      };

      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(general_data),
      };

      const url = API_BASE_URL + "/pre/preregister/v3";
      fetch(url, requestOption)
        .then((res) => res.json())
        .then((result) => {
          if (result.responce) {
            setResultData(result);
            const encoder = new TextEncoder();
            const data = encoder.encode(JSON.stringify(result));
            const base64 = btoa(String.fromCharCode.apply(null, data));
            localStorage.setItem(
              "state",
              Math.random().toString(36).slice(2, 8) +
                base64 +
                Math.random().toString(36).slice(2, 6)
            );
            history(urlPre + "/final.php", { state: result });
            setEmailRegSts(true);
          } else if (result.error) {
            $("#text").html(result.error.message);
          }
          setConBtnDisabled(false);
        })
        .catch((err) => {
          $("#text").html(
            ReactSession.get("Get_validation")["recommendationMessage"]
          );
        });
      setConBtnDisabled(false);
    }
  };

  const removeError = () => {
    $("#text").html("");
  };

  return (
    <div>
      <Header />

      {emailRegSts === false ? (
        <>
          <div className="bodly">
            <div className="prgs-wrp">
              <div className="prgsbar" style={{ width: "100%" }}></div>
              <img
                src={common_icons_array["checked1"]}
                style={{ filter: "none", opacity: "1", background: "#fff" }}
              />
            </div>

            <Result_email_section />
            <div className="woman_container">
              <div className="tit">
                <h1 className="email_title">
                  Enter your email to see your personalized Keto Diet for your
                  target weight
                </h1>
              </div>
            </div>

            <div className="email-wrap">
              <div className="sp11">
                <input
                  id="mail-value"
                  type="email"
                  name="keto-plan"
                  placeholder="Email Address"
                  className="form-control"
                  minLength="5"
                  maxLength="100"
                  list="email-options"
                  onKeyUp={removeError}
                />
                <div id="text" style={{ color: "red" }}></div>
              </div>
              <p className="tex1">
                KetoBalanced does not share any personal information. We'll
                email you a copy of your results for convenient access
              </p>
              <br />
              <div className="tex1">
                By clicking "Continue" below you agree to Ketobalanced’s Terms
                and Conditions and Privacy Policy. You may also receive email
                offers from us on Keto Diet products and services. You may
                unsubscribe at any time.
              </div>

              {conBtnDisabled == false ? (
                <Link
                  to={void 0}
                  onClick={emailValidation}
                  style={{ maxWidth: "400px", width: "100%" }}
                >
                  <div className="sp11" style={{ marginRight: "0px" }}>
                    <div
                      className="necxbutton1"
                      style={{ maxWidth: "400px", width: "100%" }}
                    >
                      Continue
                    </div>
                  </div>
                </Link>
              ) : (
                <a href={void 0} disabled>
                  Data submitting..... <i className="fa fa-user"></i>
                </a>
              )}
              <SecurePolicy common_icons={common_icons} />
            </div>
          </div>
        </>
      ) : (
        <Final result={resultData} />
      )}
    </div>
  );
};
export default React.memo(Email);

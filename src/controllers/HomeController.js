import React, { useEffect, useMemo, useState } from "react";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import LazyLoad from "react-lazyload";
import API_BASE_URL, { KETO_IMG_CDN_LIVE } from "../config/constants";
import Loader from "../components/common/Loader";
import { gender_images } from "../config/imagedata/pages/gender_images";
import { common_icons } from "../config/imagedata/small_icons";
import SecurePolicy from "../components/common/SecurePolicy";

const HomeController = () => {
  ReactSession.setStoreType("localStorage");
  ReactSession.set(
    "head_title",
    "Personalized keto diet meal plan that is easy to follow"
  );
  const [pageErr, setPageErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const currentURL = "https://preuk.ketobalanced.com/";
  const currentURL = window.location.href;

  let storeRedirect = useNavigate();

  const storeClick = (itemName1) => {
    const itemName = itemName1;
    ReactSession.set("gender", itemName);
  };
  //=================Get IP Address==================================
  const [ip, setIP] = useState(false);

  const params = window.location.search;
  if (params) {
    ReactSession.set("utmData", params);
  }

  //=================Get IP Address==================================!

  //=================Get Data from server by API======================
  const [data, setData] = useState([]);
  const [dataImg, setDataImg] = useState({});

  const gender_array = useMemo(() => gender_images, []);

  useEffect(() => {
    // GET CURRENT COUNTRY FROM URL____________________________

    const hostname = new URL(currentURL).hostname;
    let country_host = hostname.split(".")[0];

    // Check if country is not in ['usa', 'uk', 'aus','ca']
    if (!["usa", "uk", "aus", "ca"].includes(country_host)) {
      country_host = "usa";
    }

    if (country_host === "usa") {
      country_host = "us";
    }

    // END GETTING CURRENT COUNTRY FROM URL______________________________

    if (
      !ReactSession.get("ketobalanced_options") ||
      JSON.parse(ReactSession.get("ketobalanced_options")).error ||
      JSON.parse(ReactSession.get("ketobalanced_options")).survey.country !==
        country_host
    ) {
      getData();
    } else {
      versionCheckFunc();
    }

    setTimeout(() => {
      setIsLoading(true); // Set loading state to false
    }, 200); // Simulate a 2-second delay
  }, []);

  // get country from url.
  const getData = async () => {
    // GET CURRENT COUNTRY FROM URL____________________________

    const hostname = new URL(currentURL).hostname;
    let country_host = hostname.split(".")[0];

    if (!["usa", "uk", "aus", "ca"].includes(country_host)) {
      country_host = "usa";
    }

    if (country_host === "usa") {
      country_host = "us";
    }

    // END GETTING CURRENT COUNTRY FROM URL______________________________

    await ReactSession.set("IpAddressData", {
      country_code: country_host,
      country_name: "India",
      city: "Delhi",
      postal: "110007",
      latitude: 28.6667,
      longitude: 77.2167,
      IPv4: "122.176.113.48",
      state: "National Capital Territory of Delhi",
    });

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: ReactSession.get("IpAddressData").country_code,
        ip: ReactSession.get("IpAddressData").IPv4,
        location: "",
        device: "web",
        deviceVer: "",
        deviceToken: "",
      }),
    };
    fetch(API_BASE_URL + "/pre/survey", requestOption)
      .then((res) => res.json())
      .then((result) => {
        if (result["error"]) {
          setPageErr(true);
        } else {
          setData(result);
          ReactSession.set("ketobalanced_options", JSON.stringify(result));
        }
        // console.log("GETDATA");
      })
      .catch((err) => {
        setPageErr(true);
      });
  };

  // Pre survey api version check and clear localStorage
  const versionCheckFunc = async () => {
    const ver_body = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(API_BASE_URL + "/pre/opt/products/version", ver_body)
      .then((res) => res.json())
      .then((result) => {
        if (!result["error"]) {
          if ("ketoWeb_vc" in localStorage) {
            if (localStorage.getItem("ketoWeb_vc") != result._vc) {
              localStorage.clear();
              localStorage.setItem("ketoWeb_vc", result._vc);
              getData();
            } else {
            }
          } else {
            getData();
            localStorage.setItem("ketoWeb_vc", result._vc);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //=================Get Data from server by API======================
  if (
    ReactSession.get("ketobalanced_options") &&
    JSON.parse(ReactSession.get("ketobalanced_options")).survey &&
    pageErr === false
  ) {
    var api_data = JSON.parse(ReactSession.get("ketobalanced_options"));
    var surveyItems = api_data.survey.surveyItems[0];
    //============get seperate data session for each page=================

    var surveyCategory = api_data.survey.surveyCategory;
    var validation = api_data.survey.validation;
    //----------------------------------------------------------
    var gender = api_data.survey.surveyItems[0];
    var meal_preparation = api_data.survey.surveyItems[1];
    var familiarity = api_data.survey.surveyItems[2];
    var other_food_items = api_data.survey.surveyItems[3];
    var height = api_data.survey.surveyItems[4];
    var what_stands_true_for_you = api_data.survey.surveyItems[5];
    var kb_motivation = api_data.survey.surveyItems[6];
    var email = api_data.survey.surveyItems[7];
    var veggies = api_data.survey.surveyItems[8];
    var part1 = api_data.survey.surveyItems[9];
    var kb_social_proof_mix = api_data.survey.surveyItems[10];
    var upsel2 = api_data.survey.surveyItems[11];
    var upsel3 = api_data.survey.surveyItems[12];
    var kb_body_type_target_mix = api_data.survey.surveyItems[13];
    var payment_validation = api_data.survey.surveyItems[14];
    var kb_target_zones_mix = api_data.survey.surveyItems[15];
    var weight = api_data.survey.surveyItems[16];
    var target_weight = api_data.survey.surveyItems[16];
    var upsel4 = api_data.survey.surveyItems[17];
    var activity = api_data.survey.surveyItems[18];
    var kb_current_body_type = api_data.survey.surveyItems[19];
    var upsel1 = api_data.survey.surveyItems[20];
    var your_profile_summary = api_data.survey.surveyItems[21];
    var kb_happy_weight = api_data.survey.surveyItems[22];
    var thank_you = api_data.survey.surveyItems[23];
    var typical_day_for_you = api_data.survey.surveyItems[24];
    var kb_occasion = api_data.survey.surveyItems[25];
    var age = api_data.survey.surveyItems[26];
    var meat = api_data.survey.surveyItems[27];
    var kb_register_form = api_data.survey.surveyItems[28];

    var kb_ingredients_allergy = {
      description: "",
      metaDescription: "",
      metaKeyword: "ketobalanced",
      metaTitle:
        "Lose Extra Weight with Keto Diet Now - Your Path to Healthier Living",
      pageSeq: 3,
      title1: "Do you have any ingredients allergy?",
      title2: "Do you have any ingredients allergy?",
      category: "allergy",
      categoryItems: [
        {
          itemId: "kb_IA_1",
          name: "Nope",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363964865lqz2arwh865.svg",
        },
        {
          itemId: "kb_IA_2",
          name: "Egg",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363967750lqz2au4m750.svg",
        },
        {
          itemId: "kb_IA_3",
          name: "Milk",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363970252lqz2aw24252.svg",
        },
        {
          itemId: "kb_IA_4",
          name: "Nut",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363973015lqz2ay6v15.svg",
        },
        {
          itemId: "kb_IA_5",
          name: "Soybean",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363975823lqz2b0cv823.svg",
        },
        {
          itemId: "kb_IA_6",
          name: "Fish",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363980275lqz2b3sj275.svg",
        },
        {
          itemId: "kb_IA_7",
          name: "Wheat",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363983524lqz2b6as524.svg",
        },
        {
          itemId: "kb_IA_8",
          name: "Celery",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363986772lqz2b8t0772.svg",
        },
        {
          itemId: "kb_IA_9",
          name: "Crustacean",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363986772lqz2b8t0772.svg",
        },
        {
          itemId: "kb_IA_10",
          name: "Mustard",
          dark_icon: "",
          light_icon: "",
          isVal: null,
          isTrue: null,
          subcat: "",
          imgname:
            "https://kbcdn22.ketobalanced.com/1704363986772lqz2b8t0772.svg",
        },
      ],
      id: "62305f39896cc388cb8272db",
    };
    var kb_disease = api_data.survey.surveyItems[29];

    // console.log(api_data.survey);

    ReactSession.set("Get_gender", gender);
    ReactSession.set("Get_familiarity", familiarity);
    ReactSession.set("Get_body_type_target_mix", kb_body_type_target_mix);
    ReactSession.set("Get_part1", part1);
    ReactSession.set("Get_social_proof_mix", kb_social_proof_mix);
    ReactSession.set("Get_target_zones_mix", kb_target_zones_mix);
    ReactSession.set("Get_happy_weight", kb_happy_weight);
    ReactSession.set("Get_meal_preparation", meal_preparation);
    ReactSession.set("Get_meat", meat);
    ReactSession.set("Get_veggies", veggies);
    ReactSession.set("Get_other_food_items", other_food_items);
    ReactSession.set("Get_activity", activity);
    ReactSession.set("Get_typical_day_for_you", typical_day_for_you);
    ReactSession.set("Get_what_stands_true_for_you", what_stands_true_for_you);
    ReactSession.set("Get_motivation", kb_motivation);
    ReactSession.set("Get_age", age);
    ReactSession.set("Get_weight", weight);
    ReactSession.set("Get_target_weight", target_weight);
    ReactSession.set("Get_your_profile_summary", your_profile_summary);
    ReactSession.set("Get_email", email);
    ReactSession.set("Get_payment_validation", payment_validation);
    ReactSession.set("Get_upsel1", upsel1);
    ReactSession.set("Get_upsel2", upsel2);
    ReactSession.set("Get_upsel3", upsel3);
    ReactSession.set("Get_upsel4", upsel4);
    ReactSession.set("Get_thank_you", thank_you);
    ReactSession.set("Get_height", height);
    ReactSession.set("Get_surveyCategory", surveyCategory);
    ReactSession.set("Get_validation", validation);
    ReactSession.set("Get_occasion", kb_occasion);
    ReactSession.set("Get_register_form", kb_register_form);
    ReactSession.set("Get_current_body_type", kb_current_body_type);
    // ReactSession.set('Get_ingredients_allergy', kb_ingredients_allergy);
    ReactSession.set("Get_disease", kb_disease);

    //============get seperate data session for each page=================
  } else if (pageErr === true) {
    return (
      <main className="inner-pages">
        <h3 align="center">
          Ouch! Something went wrong!
          <br /> It seems you probably need expert's supervision to achieve your
          dream body.
          <br /> Kindly drop an email at support@ketobalanced.com
        </h3>
      </main>
    );
    return false;
  } else {
  }

  return (
    <LazyLoad>
      {ReactSession.get("ketobalanced_options") &&
      ReactSession.get("Get_gender") &&
      pageErr === false ? (
        <>
          <div className="min-ht">
            <div className="hed1">
              <img
                className="logo"
                src={KETO_IMG_CDN_LIVE + "/logo.svg"}
                alt="logo"
                width={55}
                height={26}
              />
              {/* <div className='tex'>LOG IN</div> */}
            </div>
            <div className="bodly">
              <div className="prgs-wrp">
                <div className="prgsbar" style={{ width: "4.5%" }}></div>
                <img src={common_icons["checked1"]} alt="Target Progress Icon" />
              </div>
              <LazyLoad height={68} once>
                <div className="tit">
                  <h1>
                    {ReactSession.get("Get_gender")
                      ? ReactSession.get("Get_gender").title1
                      : ""}
                  </h1>
                </div>
              </LazyLoad>

              <div className="subtit">
                {ReactSession.get("Get_gender")
                  ? ReactSession.get("Get_gender").title2
                  : ""}
              </div>

              <div className="slctndv-wrap">
                {/* men */}
                <Link
                  className={"male-btn"}
                  onClick={() => {
                    storeClick(
                      ReactSession.get("Get_gender").categoryItems[0].itemId
                    );
                  }}
                  to={"/how-familiar.html"}
                >
                  <div className="slctndv">
                    <div className="ml-slctn">
                      <LazyLoad height={139} offset={139} once>
                        <img
                          src={gender_array["gender1"]}
                          alt="Man Image"
                          className="genderimg"
                          width={149}
                          height={139}
                        />
                      </LazyLoad>
                    </div>
                    <div className="mlslctn-btn">
                      <p>Man</p>
                    </div>
                  </div>
                </Link>

                {/* women */}

                <Link
                  onClick={() => {
                    storeClick(
                      ReactSession.get("Get_gender").categoryItems[1].itemId
                    );
                  }}
                  to={"/how-familiar.html"}
                >
                  <div className="slctndv">
                    <div className="wmn-slctn">
                      <LazyLoad height={139} offset={139} once>
                        <img
                          src={gender_array["gender2"]}
                          alt="Woman Image"
                          className="genderimg"
                          width={149}
                          height={139}
                        />
                      </LazyLoad>
                    </div>
                    <div className="mlslctn-btn wmn-btn">
                      <p>Woman</p>
                    </div>
                  </div>
                </Link>
              </div>
              <p className="tex1" loading="lazy">
                By continuing, you confirm and guarantee that you have read,
                understood, and agreed to our{" "}
                <Link to="/general-conditions.html" className="aaa">
                  Terms of Use
                </Link>{" "}
                ,{" "}
                <Link to="/privacy-policy.html" className="aaa">
                  {" "}
                  Privacy Policy{" "}
                </Link>{" "}
                . For more information, please see our{" "}
                <Link to="/faq.html" className="aaa">
                  FAQ
                </Link>{" "}
              </p>

              <SecurePolicy common_icons={common_icons} />
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </LazyLoad>
  );
};

export default React.memo(HomeController);

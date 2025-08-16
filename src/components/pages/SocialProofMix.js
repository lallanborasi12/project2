import React, { useEffect, useMemo, useState } from "react";
import { ReactSession } from "react-client-session";
import { Link, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import { social_images } from "../../config/imagedata/pages/social_images";
import { common_icons } from "../../config/imagedata/small_icons";
import SecurePolicy from "../common/SecurePolicy";
import { DataLayer } from "../common/Function";

const SocialProofMix = () => {
  let refresh_redirect = useNavigate();
  ReactSession.setStoreType("localStorage");
  const [urlPre, setUrlPre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [genderContent, setGenderContent] = useState(""); //Men

  const social_array = useMemo(() => social_images, []);

  useEffect(() => {
    if (ReactSession.get("Get_social_proof_mix") == undefined) {
      refresh_redirect("/");
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

    //----------------- gender filtration------------------------

    if (ReactSession.get("Get_social_proof_mix") == undefined) {
      refresh_redirect("/");
      return false;
    }

    if (ReactSession.get("ketobalanced_options")) {
      const genderList = JSON.parse(ReactSession.get("ketobalanced_options"))
        .survey.surveyItems[0].categoryItems;
      const genderName = genderList.filter(
        (genderItem) => genderItem.itemId == ReactSession.get("gender")
      );
      setGenderContent(genderName[0].name);
    }

    // console.log(genderList);
    //-------------- gender filtration-----------------------------

    setTimeout(() => {
      setIsLoading(true); // Set loading state to false
    }, 250); // Simulate a 2-second delay
  }, []);

  useEffect(() => {
    const dataLayer_res = DataLayer({
      event: "socialProofView",
      stage: "Social Proof",
    });
  }, []);

  const storeClick = (item) => {
    const itemName = item.target.id;
    ReactSession.set("kb_social_proof_mix", itemName);
  };

  //---------------Get data from reactSession----------------------
  var spm_data = ReactSession.get("Get_social_proof_mix");

  return (
    <div>
      <Header />
      <div className="bodly">
        <div className="tit sclprf">
          <h1>{spm_data.title1}</h1>
        </div>
        <div className="sutex">
          <strong>{spm_data.title2}</strong>
        </div>
        {spm_data.categoryItems.map((row, index) =>
          genderContent.toLowerCase() === row.subcat ? (
            <div className="sp scl-prf-img" key={index}>
              <img
                src={
                  social_array[genderContent.toLowerCase() + "_g" + (index + 1)]
                }
                alt="Loading.."
                width={400}
                height={372}
              />
            </div>
          ) : (
            <span key={index}></span>
          )
        )}

        {/* {"/assets/images/" + genderContent + "-track-hrs.svg"} */}
        <div className={genderContent !== "" ? "sp11" : "hideClass"}>
          <Link to={urlPre + "/kb-target-zones-mix.html"}>
            {" "}
            <div className="necxbutton1">Continue</div>
          </Link>
          <SecurePolicy common_icons={common_icons} />
        </div>
      </div>
    </div>
  );
};
export default React.memo(SocialProofMix);

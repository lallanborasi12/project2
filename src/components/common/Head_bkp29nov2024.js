import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import { Helmet, HelmetProvider } from "react-helmet-async";
import moengage from "@moengage/web-sdk"; //npm install --save @moengage/web-sdk
import TagManager from "react-gtm-module";

export default function Head() {
  const [country_c, setCountryC] = useState("aus");
  const [gtm_tag_ids, setGTMIds] = useState({
    us: "GTM-KHDHLVW",
    ca: "GTM-KHDHLVW",
    aus: "GTM-KHDHLVW",
    uk: "GTM-KHDHLVW",
  });
  ReactSession.setStoreType("localStorage");
  moengage.initialize({ app_id: "32IDOHIC6T5MUQWXILK1LZGE", debug_logs: 0 });

  useEffect(() => {
    const currentURL = window.location.href;
    const hostname = new URL(currentURL).hostname;
    let country_host = hostname.split(".")[0];

    if (!["usa", "uk", "aus", "ca"].includes(country_host)) {
      country_host = "usa";
    }

    if (country_host === "usa") {
      country_host = "us";
    }
    setCountryC(country_host);

    if (!ReactSession.get("head_title")) {
      ReactSession.set("head_title", "Ketobalanced");
    }

    let currentPage = new URL(window.location.href).pathname;
    if (
      currentPage === "/offers/thank-you.php" &&
      localStorage.getItem("__orderconfirm") === null
    ) {
      // console.log("refreshed");
    } else {
      const tagManagerArgs = {
        gtmId: gtm_tag_ids[country_c], // Replace 'GTM-abc' with your actual Google Tag Manager container ID
      };
      if (gtm_tag_ids[country_c] != null) {
        TagManager.initialize(tagManagerArgs);
      }
    }
  }, [country_c]);

  return (
    <>
      {ReactSession.get("head_title") && (
        <HelmetProvider>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{ReactSession.get("head_title")} </title>
            <script
              type="text/javascript"
              src="//cdn-4.convertexperiments.com/js/10041529-10046792.js"
            ></script>
            {country_c == "us" ? (
              <></>
            ) : country_c == "ca" ? (
              <meta
                name="facebook-domain-verification"
                content="ktpxfhmo9n0bs3vfks15rb9h9gpu8e"
              />
            ) : country_c == "aus" ? (
              <></>
            ) : country_c == "uk" ? (
              <></>
            ) : (
              <></>
            )}
          </Helmet>
        </HelmetProvider>
      )}
    </>
  );
}

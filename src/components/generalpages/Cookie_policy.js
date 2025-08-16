import React, { useEffect } from "react";
import Header from "../common/Header";
import $ from 'jquery';
import { ReactSession } from 'react-client-session';
import API_BASE_URL from "../../config/constants";

const Cookie_policy = () => {
    ReactSession.setStoreType('localStorage');

    useEffect(() => {
        getCookiePolicy();
    }, []);

    const getCookiePolicy = () => {
        const country_code = ReactSession.get('IpAddressData') ? ReactSession.get('IpAddressData').country_code : "us";
        const requestBody = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "country": country_code })
        }
        // console.log(requestBody);
        fetch(API_BASE_URL + '/pre/general/pages', requestBody)
            .then(res => res.json())
            .then((result) => {
                if (!result['error']) {
                    result.forEach((pages, index) => {

                        if (pages.name == "cookie_policy") {
                            $('#cookie-policy-data').html(pages.description);
                            return;
                        }
                    });
                }
            }).catch((err) => {
                $('#data_for_gen_page').html("<h3>Ouch! Something went wrong!<br> It seems you probably need expert's supervision to achieve your dream body. Kindly drop an email at support@ketobalanced.com<h3>");
            })
    }

    return (
        <span>
            {/* <link rel="stylesheet" href="css2/style.css"></link> */}
            <Header />
            <main className="inner-gap">
                <div className="inner-pages-content">
                    <div className="white-box dpp" style={{ margin: 'auto', overflow: 'hidden', maxHeight: 'fit-content' }} id="cookie-policy-data">
                        <strong>Loading....</strong>
                    </div>
                </div>
                <br />
            </main>
            <script src="js/font-awesome.js"></script>
        </span>
    )
}
export default React.memo(Cookie_policy);

import React, { useEffect } from "react";
import Header from "../common/Header";
import $ from 'jquery';
import { ReactSession } from 'react-client-session';
import API_BASE_URL from "../../config/constants";

const Privacy_policy = () => {

    ReactSession.setStoreType('localStorage');
    const country_code = ReactSession.get('IpAddressData') ? ReactSession.get('IpAddressData').country_code : "us";

    useEffect(() => {
        getPPData();
    }, []);

    const getPPData = () => {
        const requestBody = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "country": country_code })
        }
        fetch(API_BASE_URL + '/pre/general/pages', requestBody)
            .then(res => res.json())
            .then((result) => {
                result.forEach((pages, index) => {

                    if (pages.name == "privacy_policy") {
                        $('#pp-data').html(pages.description);
                        return;
                    }
                });

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
                    {/* <h1 className="t-center"><strong>Privacy Policy</strong></h1> */}
                    <div className="white-box dpp" style={{ margin: 'auto', overflow: 'hidden', maxHeight: 'fit-content' }} id="pp-data">
                        <strong>Loading....</strong>
                    </div>
                </div>
                <br />
            </main>

            <script src="js/font-awesome.js"></script>
        </span>
    )
}
export default React.memo(Privacy_policy);

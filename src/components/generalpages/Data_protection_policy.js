import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import { ReactSession } from 'react-client-session';
import $ from 'jquery';
import API_BASE_URL from "../../config/constants";

const Data_protection_policy = () => {

    ReactSession.setStoreType('localStorage');

    useEffect(() => {
        getDPPData();
    }, []);

    const getDPPData = () => {
        const country_code = ReactSession.get('IpAddressData') ? ReactSession.get('IpAddressData').country_code : "us";
        const requestBody = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 'country': country_code })
        }

        fetch(API_BASE_URL + '/pre/general/pages', requestBody)
            .then(res => res.json())
            .then((result) => {

                result.forEach((pages, index) => {

                    if (pages.name == "data_protection_policy") {
                        $('#dpp_desc').html(pages.description);
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
                    <div className="white-box dpp" style={{ margin: 'auto', overflow: 'hidden', maxHeight: 'fit-content' }} id="dpp_desc">

                        <strong>Loading....</strong>

                    </div>
                </div>
                <br />
            </main>

            <script src="js/font-awesome.js"></script>
        </span>
    )
}
export default React.memo(Data_protection_policy);

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import { ReactSession } from 'react-client-session';
import $ from "jquery";
import API_BASE_URL from "../../config/constants";
const General_condtions = () => {

    ReactSession.setStoreType('localStorage');
    const country_code = ReactSession.get('IpAddressData') ? ReactSession.get('IpAddressData').country_code : "us";
    const [genPages, setGenPages] = useState([]);

    useEffect(() => {
        getGenPages();
    }, []);
    const getGenPages = async () => {
        const requestBody = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "country": country_code
            })
        }

        // console.log(requestBody);
        // return false;
        await fetch(API_BASE_URL + '/pre/general/pages', requestBody)
            .then(res => res.json())
            .then((result) => {


                result.forEach((pages, index) => {

                    if (pages.name == "general_conditions") {
                        $('#data_for_gen_page').html(pages.description);
                        return;
                    }
                });

            }).catch((err) => {
                $('#data_for_gen_page').html("<h3>Ouch! Something went wrong!<br> It seems you probably need expert's supervision to achieve your dream body. Kindly drop an email at support@ketobalanced.com<h3>");
            })
    }
    return (
        <span className="text-center">
            <Header></Header>
            <main className="inner-gap">
                <div className="inner-pages-content">

                    <div className="white-box p-content" style={{ margin: 'auto', overflow: 'hidden', maxHeight: 'fit-content' }} id="data_for_gen_page"><strong>Loading....</strong>
                    </div>

                </div>
                <br />
            </main>

            <script src="js/font-awesome.js"></script>
        </span >
    )
}
export default React.memo(General_condtions);

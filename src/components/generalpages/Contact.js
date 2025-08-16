import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../config/constants";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import { ReactSession } from 'react-client-session';
import $ from 'jquery';
import Footer from "../common/Footer";


const Contact = () => {

    ReactSession.setStoreType('localStorage');
    const country_code = ReactSession.get('IpAddressData') ? ReactSession.get('IpAddressData').country_code : "us";
    const [getContactDescription, setContactDescription] = useState([]);
    useEffect(() => {
        getContactData();
    });
    const getContactData = () => {
        const requestBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'country': country_code })
        }
        fetch(API_BASE_URL + '/pre/general/pages', requestBody)
            .then(res => res.json())
            .then((result) => {

                result.forEach((pages, index) => {

                    if (pages.name == "contacts") {
                        $('#con_page_desc').html(pages.description);
                        return;
                    }
                });


            }).catch((err) => {
                $('#data_for_gen_page').html("<h3>Ouch! Something went wrong!<br> It seems you probably need expert's supervision to achieve your dream body. Kindly drop an email at support@ketobalanced.com<h3>");
            })
    }

    const postContactForm = (form) => {
        const name_value = $('#name').val();
        const email_value = $('#email').val();
        const message_value = $('#message').val();
        if (name_value == "" || email_value == "" || !email_value.includes("@") || message_value == "") {
            $('#error').html('<p className="text-danger">All fields are required**</p>');
        }
        else {
            const postBody = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "name": name_value, "email": email_value, "message": message_value, "country": country_code })
            }
            // console.log(postBody);
            // return false;
            fetch(API_BASE_URL + "/pre/general/pages/contact", postBody)
                .then(res => res.json())
                .then((result) => {
                    if (result.message == undefined) {
                        $('#error').html('<p className="alert alert-danger">' + result.error.message + '</p>');
                    } else {
                        $('#error').html('<p className="alert alert-success">' + result.message + '</p>');
                    }

                }).catch((err) => {
                    $('#data_for_gen_page').html("Ouch! Something went wrong!<br> It seems you probably need expert's supervision to achieve your dream body. Kindly drop an email at support@ketobalanced.com");
                    // console.log('error');
                })
        }
    }

    return (
        <span>

            <Header />
            <main className="inner-gap">
                <div className="inner-pages-content inner-pages-content2">
                    <h1 className="t-center">Get in <strong>Touch</strong></h1>
                    <div className="" style={{ margin: 'auto' }} >{/* white-box */}


                        <div className="flx jc-sb contact-box gap">
                            <ul id="con_page_desc">

                            </ul>

                            <div className="contact-form" style={{ width: "100%" }}>
                                <div className="form-group">
                                    <div id="contact_error"></div>
                                </div>

                                {/* <form id="user_contact_form"> */}
                                <input className="form-control" type="text" placeholder="Your full name*" id="name" required />
                                <input className="form-control" type="email" placeholder="Email Address*" id="email" required />
                                <textarea className="form-control" placeholder="Message*" id="message" required></textarea>
                                <strong id="error"></strong>
                                <button className="main3" style={{ border: "1px solid #ff3464" }} onClick={postContactForm}>Submit</button>

                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </main>
            <Footer />
            <script src="js/font-awesome.js"></script>
        </span>
    )

}
export default React.memo(Contact);

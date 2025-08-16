import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "./constants";
const PayResponse = () => {

    let history = useNavigate();
    const { getTranId } = useParams();
    // const pg_res = new URLSearchParams(document.location.search);
    // const decode_res = '?' + atob(pg_res.get('res'));
    // const res_data = new URLSearchParams(decode_res);
    const resObject = {};





    useEffect(() => {

        if (localStorage.getItem('state')) {
            let base64_data = JSON.parse(atob(localStorage.getItem('state').slice(6, -4)));
            let accessToken = base64_data.responce.accessToken;

            statusValidatior("accessToken", getTranId);

            // for (const [key, value] of res_data.entries()) {resObject[key] = value;// }

        } else {
            history('/');
        }




    });

    const statusValidatior = async (aT, getTranId) => {

        const get_options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(API_BASE_URL + '/pro/p3/pg/merchant/statusvalidator/web/' + getTranId, get_options)
            .then(res => res.json())
            .then((result) => {

                if (result.status === "COMPLETED") {
                    localStorage.setItem('__orderconfirm', result.transactionId);
                    history('/register-form.html', { state: result });
                    // history('/offers/thank-you.php', { state: result });
                } else {
                    if (localStorage.getItem('state')) {
                        let base64_data = JSON.parse(atob(localStorage.getItem('state').slice(6, -4)));
                        base64_data.responce.caseStudy.message = result.message;

                        history('/final.php', { state: base64_data });
                    } else {
                        history('/');
                    }
                }
            }).catch((error) => {
                history('/');
            })
    }

}

export default PayResponse;
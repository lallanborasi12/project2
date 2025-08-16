import React, { useEffect, useMemo, useState } from "react";
import Header from '../common/Header'
import { ReactSession } from 'react-client-session';
import { Link, useNavigate } from 'react-router-dom';
import { common_icons } from "../../config/imagedata/small_icons";
import { ingredients_allergy_images } from "../../config/imagedata/pages/ingredients_allergy_images";
import SecurePolicy from "../common/SecurePolicy";

const IngredientsAllergy = () => {


    let refresh_redirect = useNavigate();
    ReactSession.setStoreType('localStorage');
    const [urlPre, setUrlPre] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState(null);
    const [continueButton, setContinueButton] = useState(false);


    const common_icons_array = useMemo(() => common_icons);
    const ingredients_allergy_array = useMemo(() => ingredients_allergy_images, []);

    useEffect(() => {
        if (ReactSession.get('Get_ingredients_allergy') == undefined) {
            refresh_redirect('/');
        }
        if (window.location.pathname.split('/')[1] === "men") {
            setUrlPre("/men");
        }
        else if (window.location.pathname.split('/')[1] === "women") {
            setUrlPre("/women");
        }
        else if (window.location.pathname.split('/')[1] === "over40") {
            setUrlPre("/over40");
        }
        else {
            setUrlPre("");
        }


        setTimeout(() => {
            setIsLoading(true); // Set loading state to false
        }, 250); // Simulate a 2-second delay

        if (ReactSession.get('ingredients_allergy')) {
            setContinueButton(true);
        } else {
            setContinueButton(false);
        }


    });

    if (ReactSession.get('Get_ingredients_allergy') == undefined) {
        return false;
    }


    const storeClick = (itemName) => {
        // ReactSession.set('ingredients_allergy', itemName);

        if (ReactSession.get('ingredients_allergy')) {
            let savedArr = ReactSession.get('ingredients_allergy').split(',');
            if (savedArr.includes(itemName)) {
                const indexofSavedArr = savedArr.findIndex((element) => element == itemName);
                savedArr.splice(indexofSavedArr, 1);
                ReactSession.set('ingredients_allergy', savedArr.join(','));
            }
            else {
                itemName = itemName + "," + ReactSession.get('ingredients_allergy');
                ReactSession.set('ingredients_allergy', itemName);

            }
            setActive(current => !current);
        }
        else {
            ReactSession.set('ingredients_allergy', itemName)
            setActive(current => !current);
            document.getElementsByClassName("err_popup2")[0].innerHTML = "";
        }
    }

    //---------------Get data from reactSession----------------------
    var ingredients_allergy_data = ReactSession.get('Get_ingredients_allergy')['categoryItems'];
    const arr = []
    Object.keys(ingredients_allergy_data).forEach(key => arr.push({ name: key, value: ingredients_allergy_data[key] }))

    //---------------Get data from reactSession----------------------
    // console.log(ReactSession.get('Get_ingredients_allergy'));

    return (
        <div>

            <Header />
            <div className='bodly'>
                <div className="prgs-wrp">
                    <div className="prgsbar" style={{ width: "18%" }}></div>
                    <img src={common_icons_array["checked1"]} />
                </div>
                <div className='tit'><h1>{ReactSession.get('Get_ingredients_allergy')['title1']}</h1></div>
                <p className='sutex'>Please Select at least 1</p>

                {
                    ingredients_allergy_data.map((row, index) => (
                        <div key={index} className={ReactSession.get('ingredients_allergy') && ReactSession.get('ingredients_allergy').includes(row.itemId) ? "box1ac" : "box1"} onClick={() => { storeClick(row.itemId) }} >
                            <div className='subtit1'> {ingredients_allergy_data['g' + (index + 1)]}  <img src={ingredients_allergy_array['ia_' + (index)]} alt={row.name} width={34} height={34} /><span> {row.name}</span></div>
                            {/* {"/assets/images/a" + (index + 1) + ".svg"} */}
                            <div className={ReactSession.get('ingredients_allergy') && ReactSession.get('ingredients_allergy').includes(row.itemId) ? "" : "hideClass"}  ><img src={common_icons["checked1"]} height={17} width={17} alt="checked" /></div>
                        </div>
                    ))
                }

                {/* <p>{ReactSession.get('Get_ingredients_allergy')['description']}</p> */}


            </div>

            <div className='fxdctabtm'>

                <div className="err_popup2"><span></span></div>

                {
                    continueButton === true ? (
                        <Link to={urlPre + "/kb-social-proof-mix.html"}><div className='necxbutton'>Continue</div></Link>
                    ) : (
                        <> <Link to='#' onClick={() => { document.getElementsByClassName("err_popup2")[0].innerHTML = "<span class='err_popup'>Please select atleast one of the above</span>" }}><div className='necxbutton disabled'>Continue</div></Link></>

                    )
                }
                <SecurePolicy common_icons={common_icons} />
            </div>

        </div>
    )
}

export default React.memo(IngredientsAllergy);
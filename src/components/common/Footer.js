import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import logo from "../../logo.svg";

export default function Footer() {

  const [isRouteName, setRouteName] = useState(null);
  const [footerShowRoute, setFooterShowRoute] = useState(['/', '/over40', '/men', '/women', "/contact.html", "/final.php"]);
  const [footerHideRoute, setFooterHideRoute] = useState(["/final.php"]);
  const location = useLocation();

  const today = new Date();
  const year = today.getFullYear();


  ReactSession.setStoreType('localStorage');

  useEffect(() => {
    getRouteName();
  })
  const getRouteName = () => {
    const routeName = location.pathname;
    setRouteName(routeName);
  }


  return (
    <>

      {

        footerShowRoute.includes(isRouteName) ? (
          ReactSession.get('ketobalanced_options') && JSON.parse(ReactSession.get('ketobalanced_options')).survey.company_address !== undefined ? (
            <>
              {/* common_icons["logo"] */}
              <div className='footer ftr-menu'>
                <img src={logo} alt='logo' width={55} height={26} />
                <p className='tex1'><a href="https://user.ketobalanced.com/">Access My Plan,</a>  | <Link to={"/general-conditions.html"}>General Conditions</Link> | <Link to={"/data-protection-policy.html"}>Data Policy</Link> | <Link to={"/faq.html"}>FAQ</Link> | <Link to={"/contact.html"}>Contact Us</Link> | <Link to={"/privacy-policy.html"}>Privacy Policy</Link> |<Link to={"/cookie-policy.html"}>Cookie Policy</Link> </p>


                {
                  JSON.parse(ReactSession.get('ketobalanced_options')).survey.company_address.map((address, index) => (
                    <p key={index} className="ftr-mob">
                      <b>{address.company},</b> {address.address}
                    </p>
                  ))
                }
                < p className="ftr-mob">
                  {year} @ All rights reserved<br />
                  Disclaimer: Results are subject to individuals so it may vary.
                </p>
              </div>
            </>

          ) : (
            <></>
          )
        ) : (
          <></>
        )

      }
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KHDHLVW" height="80" width="80" style="display:none;visibility:hidden"></iframe></noscript>
    </>
  )
}

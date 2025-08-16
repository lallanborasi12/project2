import React from "react";

const AppPwdTrackThank = () => {

    const encryptEmail = document.cookie.match(/(?:(?:^|.*;\s*)encryptEmail\s*=\s*([^;]*).*$)|^.*$/)[1];
    // const BaseDeepUrl = "https://ketobalanced.onelink.me/6pYf?af_xp=custom&pid=registration&email=";
    // const BaseDeepUrl = "https://ketobalanced.onelink.me/6pYf?af_xp=custom&pid=registration&deep_link_value=registration&is_retargeting=true&af_reengagement_window=lifetime&af_dp=ketobalanced://&email=";
    const BaseDeepUrl = "https://ketobalanced.onelink.me/6pYf?af_xp=custom&pid=registration&deep_link_value=registration&is_retargeting=true&af_reengagement_window=lifetime&af_dp=ketobalanced://&email=";
    const CompleteDeepUrl = BaseDeepUrl + encryptEmail + "&deep_link_sub1=" + encryptEmail;
    window.location.href = CompleteDeepUrl;
    // console.log(CompleteDeepUrl);
    return (<>
        <h1 align="center">Redirecting....</h1>
    </>);
}

export default React.memo(AppPwdTrackThank);

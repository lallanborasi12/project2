import React from "react";
// import { common_icons } from "../../config/imagedata/small_icons";
import logo from "../../logo.svg";
import "../../loader.css"

const Loader = () => {

    return (
        <div className="loaderbg">
            <span className="loader2"></span>
            {/* <img className='w-28 py-3 px-2 mx-auto absolute' src={`/logo.png`} alt='logo' width={85} height={58} /> */}
        </div>
    );

    // return (
    //     <div className="fulldiv">
    //         {/* <img src={common_icons['loader']} /> */}
    //         <img src={logo} />
    //         {/* <p className="center">Loading...</p> */}
    //     </div>
    // );
}
export default React.memo(Loader);
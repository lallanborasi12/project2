import React from "react";

const SecurePolicy = ({ common_icons }) => {
    return (
        <p className="secured-data"><img src={common_icons['secure_lock']} width={10} height={10} alt="Secure lock" /> Your information is secure with us</p>
    )
}

export default React.memo(SecurePolicy);
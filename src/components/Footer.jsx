import React from "react";
const date = new Date();


function Footer(){
    return <div className="footer">
    <center>
        <h1 className="footer-font">Copyright &#169; {date.getFullYear()}</h1>
    </center>
    </div>
}

export default Footer;
import React from "react";

function Logout() {
    localStorage.removeItem("user");
    window.open("/Main", "_self");
}

export default Logout;
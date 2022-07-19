import React from "react";

function Logout() {
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
    window.open("/Main", "_self");
}

export default Logout;
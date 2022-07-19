import React from "react";
import axios from "axios";

function CheckID({id}) {
    const checkid = id;

    const idcheck = () => {
        axios.get("http://localhost:3001/api/idcheck", {params : { checkid : checkid,}})
        .then(response => {
            alert(response.data)
        }).catch (error => {
            console.log(error)
        })
    }

    return(
        <button onClick={idcheck}>아이디 중복확인</button>
    )
}

export default CheckID;
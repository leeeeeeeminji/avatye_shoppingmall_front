import React from "react";
import axios from "axios";
import "./css/App.css";

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
        <button className="idcheckbutton" onClick={idcheck} type="submit" variant="contained" size="large">
            ✓
        </button>
    )
}

export default CheckID;
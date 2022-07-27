import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import CheckID from "./CheckID";
import "./css/App.css";

function Join() {
    const [inputs, setInputs] = useState({
        cusID : '',
        cusPassword : '',
        cusName : '',
        cusEmail : ''
    });

    const {cusID, cusPassword, cusName, cusEmail} = inputs;

    const onChange = e => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name] : value
        })
    };

    const navigate = useNavigate();

    const joinCus = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/join", 
            {cusID : cusID,
             cusPassword : cusPassword,
             cusName: cusName,
             cusEmail : cusEmail,})
        .then(
            alert("🎉회원 가입 성공🎉"),
            navigate('/Main')
        )
    };

    return(
        <form className="joinForm" onSubmit={joinCus}>
            <div className="idcheckbox">
                <TextField className="idcheck"id="standard-basic" name="cusID" label="ID" variant="standard" onChange={onChange} value={cusID} autoFocus required inputProps={{minLength : 1}}/><CheckID id={cusID} />
            </div>
            <TextField id="standard-basic" type="password" name="cusPassword" label="Password" variant="standard" onChange={onChange} value={cusPassword} required placeholder="최대 10자리" inputProps={{maxLength : 10}} />
            <TextField id="standard-basic" name="cusName" label="Name" variant="standard" onChange={onChange} value={cusName} required/>
            <TextField id="standard-basic" type="email" name="cusEmail" label="email" variant="standard" onChange={onChange} value={cusEmail} placeholder="a@a.com" required/>
            <Button type="submit" variant="contained" size="large">
                회원가입
            </Button>
        </form>
    )
}

export default Join; 
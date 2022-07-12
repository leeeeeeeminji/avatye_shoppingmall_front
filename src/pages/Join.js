import React, { useState } from "react";
import axios from "axios";
import CheckID from "./CheckID";

function Join() {
    //const [checknull, setChecknull] = useState(true)
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

    const joinCus = () => {
        axios.post("http://localhost:3001/api/join", 
            {cusID : cusID,
             cusPassword : cusPassword,
             cusName: cusName,
             cusEmail : cusEmail,})
        .then(
            alert("🎉회원 가입 성공🎉"),
            window.open('http://localhost:3000/')
        )
    };

    return(
        <div>
            <hr/>
            <p>ID</p>
            <input type="text" name="cusID" placeholder="아이디 입력란" onChange={onChange} value={cusID}/><CheckID/>
            <p>PW</p>
            <input type="text" name="cusPassword" placeholder="패스워드 입력란" onChange={onChange} value={cusPassword}/>
            <p>Name</p>
            <input type="text" name="cusName" placeholder="이름 입력란" onChange={onChange} value={cusName}/>
            <p>Email</p>
            <input type="text" name="cusEmail" placeholder="이메일 입력란" onChange={onChange} value={cusEmail}/>
            <button onClick={joinCus}>회원가입</button>
        </div>
    )
}

export default Join; 
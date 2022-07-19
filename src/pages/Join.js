import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import CheckID from "./CheckID";
import "./App.css";

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
        <form onSubmit={joinCus}>
            <hr/>
            <p>* ID</p>
            <input type="text" name="cusID" placeholder="아이디 입력란" onChange={onChange} value={cusID} required autoFocus/><CheckID id={cusID} />
            <p>* PW</p>
            <input type="password" name="cusPassword" placeholder="비밀번호 입력란" onChange={onChange} value={cusPassword} pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,10}$" 
                   title="최소 5자리에서 최대 10자리 까지, 숫자, 영문, 특수문자 1개 이상 포함" required/> <span className="pattern">(최소 5자리에서 최대 10자리, 숫자, 영문, 특수문자 1개 이상 포함)</span>
            <p>* Name</p>
            <input type="text" name="cusName" placeholder="이름 입력란" onChange={onChange} value={cusName} required/>
            <p>* Email</p>
            <input type="email" name="cusEmail" placeholder="a@a.com" onChange={onChange} value={cusEmail} required/>
            <button>회원가입</button>
        </form>
    )
}

export default Join; 
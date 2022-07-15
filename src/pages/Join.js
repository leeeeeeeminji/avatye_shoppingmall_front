import React, { useState } from "react";
import axios from "axios";
import CheckID from "./CheckID";

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

    const joinCus = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/join", 
            {cusID : cusID,
             cusPassword : cusPassword,
             cusName: cusName,
             cusEmail : cusEmail,})
        .then(
            alert("🎉회원 가입 성공🎉"),
            window.open("http://localhost:3000/", "_self")
        )
    };

    return(
        <form onSubmit={joinCus}>
            <hr/>
            <p>ID</p>
            <input type="text" name="cusID" placeholder="아이디 입력란" onChange={onChange} value={cusID} required autoFocus/><CheckID id={cusID} />
            <p>PW</p>
            <input type="password" name="cusPassword" placeholder="비밀번호 입력란" onChange={onChange} value={cusPassword} pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,10}$" 
                   title="최소 5자리에서 최대 10자리 까지, 숫자, 영문, 특수문자 1개 이상 포함" required/>
            <p>Name</p>
            <input type="text" name="cusName" placeholder="이름 입력란" onChange={onChange} value={cusName} required/>
            <p>Email</p>
            <input type="email" name="cusEmail" placeholder="이메일 입력란" onChange={onChange} value={cusEmail} required/>
            <button>회원가입</button>
        </form>
    )
}

export default Join; 
import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [login, setLogin] = useState({
        cusID : '',
        cusPW : ''
    });

    const {cusID, cusPW} = login;

    const onChange = (e) => {
        const {name, value} = e.target
        setLogin({
            ...login,
            [name] : value
        })
    };

    const cusLogin = () => {
        axios.post("http://localhost:3001/api/login", 
            {cusID : cusID,
             cusPW : cusPW, })
        .then(
            alert("🎉로그인 성공🎉")
        )

    };

    return(
        <div>
            <hr/>
            <p>ID</p>
            <input type="text" name="cusID" placeholder="아이디 입력" onChange={onChange} value={cusID}/>
            <p>PW</p>
            <input type="password" name="cusPW" placeholder="비밀번호 입력" onChange={onChange} value={cusPW}/>
            <button onClick={cusLogin}>로그인</button>
        </div>
    )
}

export default Login; 
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

    const cusLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/login", 
            {cusID : cusID,
             cusPW : cusPW, })
        .then(response => {
            alert(response.data)
        }).catch (error => {
            console.log(error)
        })
    };

    return(
        <form onSubmit={cusLogin}> 
            <hr/>
            <p>ID</p>
            <input type="text" name="cusID" placeholder="아이디 입력" onChange={onChange} value={cusID} autoFocus required/>
            <p>PW</p>
            <input type="password" name="cusPW" placeholder="비밀번호 입력" onChange={onChange} value={cusPW} required/>
            <button>로그인</button>
        </form>
    )
}

export default Login; 
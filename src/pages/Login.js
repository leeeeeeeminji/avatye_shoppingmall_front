import React, { useState } from "react";
import { useNavigate } from "react-router";
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

    //const navigate = useNavigate();

    const cusLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/login", 
            {cusID : cusID,
             cusPW : cusPW, })
        .then(response => {
            if (response.data == 'wrongPW') {
                alert("비밀번호가 올바르지 않습니다.");
            } else if (response.data == 'noID') {
                alert("아이디가 존재하지 않습니다.");
            } else {
                localStorage.setItem("user", JSON.stringify(response.data));
                alert("로그인 성공!");
                window.open("/Main", "_self");
            }
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
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
        <>
            <form className="loginForm" onSubmit={cusLogin}> 
                <TextField id="standard-basic" name="cusID" label="ID" variant="standard" onChange={onChange} value={cusID} autoFocus required/><br/>
                <TextField id="standard-basic" type="password" name="cusPW" label="PW" variant="standard" onChange={onChange} value={cusPW} required/><br/>
                <Button type="submit" variant="contained" size="large">
                    로그인
                </Button>
            </form>
        </>
    )
}

export default Login; 
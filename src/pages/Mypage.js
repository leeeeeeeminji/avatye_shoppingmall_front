import React,{useState, useEffect} from "react";
import axios from "axios";

function Mypage() {
    const currentUser = JSON.parse(localStorage.getItem("user")).userid
    const [userImage, setUserImage] = useState("/imgs/user.jpeg");
    const [userinfo, setUserInfo] = useState(null);
    const [updateInputs, setUpdateInputs] = useState({
        cusName : '',
        cusEmail : ''
    });

    const {cusName, cusEmail} = updateInputs

    useEffect(() => {
        axios.get("http://localhost:3001/api/mypage", {params : {userid : currentUser }})
        .then((response) => {
            setUserInfo(response.data)
            setUpdateInputs({
                cusName : response.data[0].cusName,
                cusEmail : response.data[0].cusEmail
            })
        })
    }, []);

    const onChange = e => {
        const {name, value} = e.target
        setUpdateInputs({
            ...updateInputs,
            [name] : value
        })
    };

    const updateInfo = () => {
        alert("수정되었습니다.")
        //axios.put("http://localhost:3001/api/updateInfo", {cusID : currentUser, })
    }

    return (
        <div>
            <hr/>
            <div className="mypagediv">
                <img src={userImage} alt="이미지"/>
                <div>
                <table className="mypagetable">
                    <caption>내 정보</caption>
                    <tbody>
                        <tr><td>ID</td><td>{currentUser}</td></tr>
                        <tr><td>이름</td><td><input type="text" name="cusName" value={cusName} onChange={onChange}/> <input type="button" name="updatename" onClick={updateInfo} value="수정"/></td></tr>
                        <tr><td>E-mail</td><td><input type="email" name="cusEmail" value={cusEmail} onChange={onChange}/> <input  type="button" name="updateEmail" onClick={updateInfo} value="수정"/></td></tr>
                    </tbody>
                </table>
                <br/>
                
                <table className="mypagetable">
                    <caption>주문 정보</caption>
                    <tbody>
                        <tr></tr>
                    </tbody>
                </table>
                </div>    
            </div>
        </div>
    )
}

export default Mypage;
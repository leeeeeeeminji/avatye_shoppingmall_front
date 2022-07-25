import React,{useState, useEffect} from "react";
import "./App.css";
import axios from "axios";
import NumFormat from "./NumFormat";

function Mypage() {
    const currentUser = JSON.parse(localStorage.getItem("user")).userid
    const [userImage, setUserImage] = useState("/imgs/user.jpeg");
    const [userOrder, setUserOrder] = useState(null);
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
        axios.get("http://localhost:3001/api/getOrderList", {params : {userid : currentUser}})
        .then((response) => {
            setUserOrder(response.data)
        })
    }, []);

    const onChange = e => {
        const {name, value} = e.target
        setUpdateInputs({
            ...updateInputs,
            [name] : value
        })
    };

    const updateName = () => {
        axios.put("http://localhost:3001/api/updateInfo", {cusID : currentUser, cusName : cusName})
        alert("이름이 수정되었습니다.")
        window.location.reload();
    }

    const updateEmail = () => {
        axios.put("http://localhost:3001/api/updateInfo", {cusID : currentUser, cusEmail : cusEmail})
        alert("이메일이 수정되었습니다.")
        window.location.reload();
    }

    const detailList = (data) => {
        alert(`${data}에 해당하는 디테일 값을 보여줍니다.`);
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
                        <tr><td>이름</td><td><input type="text" name="cusName" value={cusName} onChange={onChange}/> <input type="button" name="updatename" onClick={updateName} value="수정"/></td></tr>
                        <tr><td>E-mail</td><td><input type="email" name="cusEmail" value={cusEmail} onChange={onChange}/> <input  type="button" name="updateEmail" onClick={updateEmail} value="수정"/></td></tr>
                    </tbody>
                </table>
                
                <div className="container">
                    <table className="mypagetable2">
                        <caption>주문 정보</caption>
                        <thead>
                            <tr><th>주문 번호</th><th>주문 날짜</th><th>주소</th><th>전화번호</th><th>최종 결제 금액</th></tr>
                        </thead>
                        <tbody>
                            {userOrder && userOrder.map((val) => {
                                return(
                                    <tr onClick={detailList(val.orderID)}>
                                        <td>{val.orderID}</td>
                                        <td>{val.orderDate}</td>
                                        <td>{val.address}</td>
                                        <td>{val.phonenumber}</td>
                                        <td><NumFormat num={val.finalPrice} />원</td>
                                    </tr>
                                );
                            })}     
                        </tbody>
                    </table>
                </div>

                </div>    
            </div>
        </div>
    )
}

export default Mypage;
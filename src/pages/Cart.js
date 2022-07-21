import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./App.css";

function Cart() {
    const [cartlist, setCartList] = useState([]);
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user")).userid

     useEffect(() => {
         axios.get("http://localhost:3001/api/getCart", {params : {userid : currentUser }})
         .then((response) => {
         setCartList(response.data)
         })
    }, [currentUser]);

    //회원일 경우 장바구니 기능 사용 가능
        return (
            <>
                <hr/>
                {console.log(cartlist)}
                <div className="info">{currentUser}님의 장바구니 입니다.</div>
                <table className="ordertable">
                    <thead>
                        <tr>
                            <th>IMGAE</th><th>INFO</th><th>PRICE</th><th>QTY</th><th>SUM</th>
                        </tr>
                    </thead>
                        {cartlist.map((val) => {
                            return(
                                <tbody key={val.productID}>
                                    <tr> 
                                        <td><img width="100px" src={val.productIMG} alt="이미지" /></td>
                                        <td>{val.productName}</td>
                                        <td>{val.productPrice} 원</td>
                                        <td>{val.quantity} 개</td>
                                        <td>{val.finalprice} 원</td>
                                    </tr>
                                </tbody>
                            );
                        })}
                </table>
                <button className="buybtn2" onClick={()=> {navigate("/Order")}}>주문</button>
            </>
        )
}

export default Cart; 
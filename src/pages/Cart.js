import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NumFormat from "./NumFormat";
import { Container } from "@mui/system";
import "./css/App.css";

function Cart() {
    const [cartlist, setCartList] = useState([]);
    const [isChecked, setisChecked] =useState(false);
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user")).userid

     useEffect(() => {
         axios.get("http://localhost:3001/api/getCart", {params : {userid : currentUser }})
         .then((response) => {
         setCartList(response.data)
         })
    }, [currentUser]);

    return (
        <>
        <Container fixed>
            <div className="info">{currentUser}님의 장바구니 입니다.</div>
            <table className="carttable">
                <thead>
                    <tr>
                        <th><input type="checkbox"/></th><th>IMAGE</th><th>INFO</th><th>PRICE</th><th>QTY</th><th>SUM</th>
                    </tr>
                </thead>
                    {cartlist.map((val) => {
                        return(
                            <tbody key={val.productID}>
                                <tr>
                                    <td><input type="checkbox" /></td>
                                    <td><img width="100px" src={val.productIMG} alt="이미지" onClick={()=>{navigate(`/ProductDetail/${val.productID}`)}}/></td>
                                    <td>{val.productName}</td>
                                    <td><NumFormat num={val.productPrice} />원</td>
                                    <td>{val.quantity} 개</td>
                                    <td><NumFormat num={val.finalprice} />원</td>
                                </tr>
                            </tbody>
                        );
                    })}
            </table>

            <div className="cartbtndiv">
                <button className="buybtn2" onClick={()=> {navigate("/Order", {state : {details : cartlist}})}}>주문</button>
            </div>
        </Container>
        </>
    )
}

export default Cart; 
import React, { useState, useEffect} from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import './App.css';

function Order() {
    const [orderDatail, setOrderDetails] = useState([]);
    let [quantity, setQuantity] = useState(1);

    const location = useLocation();
    let productID2 = location.state.productID;

    useEffect(() => {
        axios.get("http://localhost:3001/api/detail", {params : {productID : productID2 }})
        .then((response) => {
           setOrderDetails(response.data)
           console.log(orderDatail)
        })
    }, [productID2]);

    const checkQuantity = (e) => {
        switch (e.target.value) {
            case "+" : 
                setQuantity(quantity += 1);
                break;
            case "-" :
                if (quantity <= 1){
                    alert('수량은 1 이하로 선택할 수 없습니다.')
                } else {
                    setQuantity(quantity -= 1); 
                }
            }
        };

    return(
        <>
            <hr/>
            <table className="ordertable">
                <thead>
                    <tr>
                        <th>IMGAE</th><th>INFO</th><th>PRICE</th><th>QTY</th><th>SUM</th>
                    </tr>
                </thead>
                    {orderDatail.map((val) => {
                        return(
                            <tbody key={val.productID}>
                                <tr> 
                                    <td><img width="100px" src={val.productIMG} alt="이미지" /></td>
                                    <td>{val.productName}</td>
                                    <td>{val.productPrice} 원</td>
                                    <td>{quantity} <br/><button value="+" onClick={checkQuantity}>+</button><button value="-" onClick={checkQuantity}>-</button></td>
                                    <td>{(val.productPrice * quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</td>
                                </tr>
                            </tbody>
                        );
                    })}
            </table>

            <table className="orderdetail">
                <tbody>
                    <tr><td>주소</td><td><input placeholder="주소"/></td></tr>
                    <tr><td>휴대폰 번호</td><td><input placeholder="010-0000-0000" pattern="(010)-\d{3,4}-\d{4}" /></td></tr>
                </tbody>
            </table>

            <button className="paymentbtn" onClick={()=> {alert("결제되었습니다.")}}>결제하기</button>

        </>
    );
}

export default Order;
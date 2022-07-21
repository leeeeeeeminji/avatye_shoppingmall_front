import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './App.css';

function Order() {
    const [orderDatail, setOrderDetails] = useState([]);
    const currentUser = localStorage.getItem("user").userid

    //detail에서 들어온 경우
    const location = useLocation();
    let quantity = location.state.quantity;
    let finalPrice = location.state.finalPrice;
    let detailProduct = location.state.details;
    //let detailProductId = detailProduct.map(item => item.productID);

    useEffect(() => {
        axios.get("http://localhost:3001/api/detailorder", {params : {productID : detailProduct[0].productID }})
        .then((response) => {
            setOrderDetails(response.data)
        })
    }, []);

    //cart에서 들어온 경우 이렇게...해줘야됨...
    // axios.get("http://localhost:3001/api/cartorder", {params : {userid : currentUser }})
    // .then((response) => {
    //     setOrderDetails(response.data)

    return(
        <>
            <hr/>
            <table className="ordertable">
                <caption>상품 정보</caption>
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
                                    <td>{quantity} </td>
                                    <td>{finalPrice}원</td>
                                </tr>
                            </tbody>
                        );
                    })}
            </table>

            <div className="tablediv">
                <table className="orderdetail">
                    <caption>주문자 정보</caption>
                    <tbody>
                        <tr><td>이름</td><td>{JSON.parse(localStorage.getItem("user")).userid}</td></tr>
                        <tr><td>주소</td><td><input placeholder="주소"/></td></tr>
                        <tr><td>휴대폰 번호</td><td><input placeholder="010-0000-0000" pattern="(010)-\d{3,4}-\d{4}" /></td></tr>
                    </tbody>
                </table>

                <table className="orderdetail">
                    <caption>결제 정보</caption>
                    <tbody>
                        <tr><td>총 상품 금액</td><td>3000 원</td></tr>
                        <tr><td>배송비</td><td>3000 원</td></tr>
                        <hr/>
                        <tr><td>총 결제 금액</td><td>3000원</td></tr>
                    </tbody>
                </table>
            </div>

            <button className="paymentbtn" onClick={()=> {alert("결제되었습니다.")}}>결제하기</button>

        </>
    );
}

export default Order;
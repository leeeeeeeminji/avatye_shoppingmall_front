import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NumFormat from "./NumFormat";
import axios from "axios";
import './App.css';

function Order() {
    const currentUser = JSON.parse(localStorage.getItem("user")).userid
    const [inputs, setInputs] = useState({
        phone : '',
        address : ''
    });

    const {phone, address} = inputs

    const onChange = e => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name] : value
        })
    };

    const location = useLocation();
    let quantity = location.state.quantity || location.state.details.map(item => (item.quantity))
    let finalPrice = location.state.finalPrice || location.state.details.map(item => (item.finalprice))
    let detailProduct = location.state.details
    let productID = detailProduct.length > 1 ? location.state.details.map(item => (item.productID)) : detailProduct[0].productID;

    let sumPrice = 0;
    if (Array.isArray(finalPrice)) {
        finalPrice.forEach(element => {
            sumPrice += element;
        });
    }

    const payment = () => {
        const data = {
            cusID: currentUser,
            address: address,
            phone : phone,
            finalPrice : Array.isArray(finalPrice) ? (sumPrice+3000) : (finalPrice+3000),
            productID : productID,
            quantity : quantity,
        }
        axios.post("http://localhost:3001/api/orders", data)
        .then(
            alert("주문되었습니다.")
        ).catch(error => {
            console.log(error)
        })
        
    }

    return(
        <>
            <hr/>
            <table className="ordertable">
                <caption>상품 정보</caption>
                <thead>
                    <tr>
                        <th>IMAGE</th><th>INFO</th><th>PRICE</th><th>QTY</th><th>SUM</th>
                    </tr>
                </thead>
                {detailProduct &&
                detailProduct.map((val) => {
                    return(
                        <tbody key={val.productID}>
                            <tr> 
                                <td><img width="100px" src={val.productIMG} alt="이미지" /></td>
                                <td>{val.productName}</td>
                                <td><NumFormat num={val.productPrice} />원</td>
                                <td>{Array.isArray(quantity) ? val.quantity : quantity} 개</td>
                                <td>{Array.isArray(finalPrice) ? <NumFormat num={val.finalprice} /> : <NumFormat num={finalPrice} />} 원</td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>

            <div className="tablediv">
                <table className="orderdetail">
                    <caption>주문자 정보</caption>
                    <tbody>
                        <tr><td>ID</td><td>{JSON.parse(localStorage.getItem("user")).userid}</td></tr>
                        <tr><td>주소</td><td><input type="text" name="address" value={address} onChange={onChange} placeholder="주소" required /></td></tr>
                        <tr><td>휴대폰 번호</td><td><input type="text" name="phone" value={phone} onChange={onChange} placeholder="010-0000-0000" required /></td></tr>
                    </tbody>
                </table>

                <table className="orderdetail">
                    <caption>결제 정보</caption>
                    <tbody>
                        <tr><td>총 상품 금액</td><td>{Array.isArray(finalPrice) ? <NumFormat num={sumPrice} />: <NumFormat num={finalPrice} />} 원</td></tr>
                        <tr><td>배송비</td><td>3000 원</td></tr>
                        <hr/>
                        <tr><td>총 결제 금액</td><td>{Array.isArray(finalPrice) ? (sumPrice+3000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : (finalPrice+3000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div className="mypagediv">
                <button className="paymentbtn" onClick={payment}>결제하기</button>
            </div>
        </>
    );
}

export default Order;
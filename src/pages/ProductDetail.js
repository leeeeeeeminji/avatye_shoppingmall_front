import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router";

import axios from "axios";
import './App.css';

function ProductDetail() {
    const [details, setDetails] = useState(null);

    let params = useParams();
    const productID = params.id;
    let currentUser = ""

    if (JSON.parse(localStorage.getItem("user"))) {
        currentUser = JSON.parse(localStorage.getItem("user")).userid
    } else {
        currentUser = ''
    }

    //const currentUser = JSON.parse(localStorage.getItem("user")).userid 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/api/detail", {params : {productID : productID}})
        .then((response) => {
           setDetails(response.data)
        })
    }, [productID]);

    const goOrder = () => {
        if (currentUser) {
            navigate("/order", {state : {details : [details]}});
        } else {
            alert("로그인 하세요");
            navigate("/Login");
        }

    }

    const insertCart = () => {
        if (currentUser) {
            axios.post("http://localhost:3001/api/insertCart", 
                {productID : productID, userID : currentUser })
            .then((response) => {
                alert("장바구니에 상품이 담겼습니다.");
                if (window.confirm("장바구니로 이동하시겠습니까?")) {
                    navigate("/Cart");
                } 
                })
        }
        else {
            alert("로그인 하세요");
            navigate('/Login');
        }
    };

    return(
        <div>
            <hr/>
            {details && 
                <div>
                    <img className="productIMG" src={details[0].productIMG} alt="이미지" />
                    <div className="product">
                        <h2>{details[0].productName}</h2>
                        {details[0].productPrice}원
                        <div className="productContent">" {details[0].productContent} "</div> 
                    </div>
                    <button className="buybtn" onClick={goOrder}>주문</button>
                    <button className="cartbtn" onClick={insertCart}>🛒</button>
                </div>
            }
        </div>
    );
}
export default ProductDetail;
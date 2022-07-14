import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../App.css';

function ProductDetail() {
    const [details, setDetails] = useState([]);

    let params = useParams();
    const productID = params.id;

    useEffect(() => {
        axios.post("http://localhost:3001/api/detail", {productID : productID, })
        .then((response) => {
           setDetails(response.data)
        })
    }, []);

    const goToOrder= () => {
        window.open("/Order", "_self")
    };

    return(
        <div>
            <hr/>
            {details.map((val) => {
                return(
                    <div key={val.productID}> 
                        <img className="productIMG" src={val.productIMG} alt="이미지" />
                        <div className="product"><h2>{val.productName}</h2>{val.productPrice}원 
                            <div className="productContent">" {val.productContent} "</div> 
                        </div>
                        {/* 추가해야되는 기능 : 수량 선택, 수량 선택하면 금액 자동으로 증가 */}
                        <button className="buybtn" onClick={goToOrder}>주문</button>
                    </div>
                )
            })}
        </div>
    )
}
export default ProductDetail;
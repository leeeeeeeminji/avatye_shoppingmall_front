import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './App.css';

function ProductDetail() {
    const [details, setDetails] = useState(null);

    let params = useParams();
    const productID = params.id;

    useEffect(() => {
        axios.get("http://localhost:3001/api/detail", {params : {productID : productID, }})
        .then((response) => {
           setDetails(response.data)
        })
    }, [productID]);

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
                    <Link to="/order" state={{productID : productID}}><button className="buybtn">주문</button></Link> 
                </div>
            }
        </div>
    )
}
export default ProductDetail;
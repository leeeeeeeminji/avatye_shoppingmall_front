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
                        <Link to={`/order/${productID}`}><button className="buybtn">주문</button></Link>
                    </div>
                )
            })}
        </div>
    )
}
export default ProductDetail;
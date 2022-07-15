import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../App.css';

function Order() {
    const [orderDatail, setOrderDetails] = useState([]);
    const [quantity, setQuantity] = useState(1);

    let params = useParams();
    const productID = params.id;

    useEffect(() => {
        axios.post("http://localhost:3001/api/detail", {productID : productID, })
        .then((response) => {
           setOrderDetails(response.data)
        })
    }, [productID]);

    const up = () => {
        setQuantity(quantity + 1);
    }

    const down = () => {
        setQuantity(quantity - 1);
    }

    return(
        <>
            <hr/>
            <table className="ordertable">
                <tr>
                   <th>IMGAE</th><th>INFO</th><th>PRICE</th><th>QTY</th><th>SUM</th>
                </tr>
                    {orderDatail.map((val) => {
                        return(
                            <tr key={val.productID}> 
                                <td><img width="100px" src={val.productIMG} alt="이미지" /></td>
                                <td>{val.productName}</td>
                                <td>{val.productPrice} 원</td>
                                <td>{quantity} <br/><button onClick={up}>+</button><button onClick={down}>-</button></td>
                                <td>{val.productPrice * quantity} 원</td>
                            </tr>
                        );
                    })}
            </table>

            <table className="orderdetail">
                <tr><td>주소</td><td><input placeholder="주소"/></td></tr>
                <tr><td>휴대폰 번호</td><td><input placeholder="010-0000-0000" pattern="(010)-\d{3,4}-\d{4}" /></td></tr>
            </table>

            <button className="paymentbtn" onClick={()=> {alert("결제되었습니다.")}}>결제하기</button>

        </>
    );
}

export default Order;
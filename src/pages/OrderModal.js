import React, {useEffect, useState} from "react";
import axios from "axios";
import NumFormat from "./NumFormat";
import "./css/Modal.css";

function OrderModal({data}) {
    const [detailList, setDetailList] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:3001/api/orderDetailList", {params : {orderID : data }})
        .then((response) => {
            setDetailList(response.data)
        })
    },[])


    return(
        <div>
            <header className="modal_header"><b>주문 내역</b></header>

            <div className="divcenter">
                <table className="orderDetailsTable">
                    <thead>
                        <tr><th>IMAGE</th><th>NAME</th><th>QTY</th><th>PRICE</th></tr>
                    </thead>
                    <tbody>
                    {detailList && 
                    detailList.map((val, key) => {
                            return(
                                <tr key={key}> 
                                    <td><img width="50px" src={val.productIMG} alt="이미지" /></td> 
                                    <td>{val.productName}</td>
                                    <td>{val.orderQuantity}</td>
                                    <td><NumFormat num={val.productPrice} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderModal;
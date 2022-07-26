import React, { useState} from "react";
import "./Modal.css";

function OrderModal({data}) {
    return(
        <div>
            <header className="modal_header"><b>주문 내역</b></header>

            <div className="divcenter">
                <table className="orderDetailsTable">
                    <thead>
                        <tr><th>IMAGE</th><th>NAME</th><th>QTY</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>이미지</td><td>주문상품</td><td>주문수량</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderModal;
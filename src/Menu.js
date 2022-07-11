import React from "react";
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import ProductList from "./ProductList";

function Menu() {
    return(
        <BrowserRouter>
            <ul>
                <li><Link to="/ProductList">상품 목록</Link></li>
                <li><Link to="/ProductList">로그인</Link></li>
                <li><Link to="/ProductList">회원가입</Link></li>
                <li><Link to="/ProductList">장바구니</Link></li>
            </ul>
        </BrowserRouter>
    )
}

export default Menu;
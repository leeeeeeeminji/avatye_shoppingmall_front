import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from "styled-components";
import ProductList from './ProductList';
import Login from './Login';
import Join from './Join';
import Cart from './Cart';
import SearchProduct from './SearchProduct';
import ProductDetail from './ProductDetail';
import Order from './Order';
import SearchResult from './SearchResult';
import "./Router.css"

//메뉴
function Router() {
    //HOME 스타일
    const Shoptitle = styled.h2 `
    color : black;
    font-size : 50px;
    padding : 30px 0;
    textDecoration : none;
    text-align : center;
    background-color : #e9f7e4;
    margin : 0;

    &:hover, &:active {
        opacity : 0.5;
    }
`;  

 


    return (
        <div>
            <div className='head'>
                <Link style={{textDecoration : 'none'}} to="/"><Shoptitle>SHOP</Shoptitle></Link>
            </div>
            <div className='menu'>
                <Link to="/ProductList">상품 목록</Link>
                <Link to="/Login">로그인</Link>
                <Link to="/Join">회원 가입</Link>
                <Link to="/Cart">장바구니</Link>
               
                <SearchProduct />
            </div>

            <Routes>
                <Route path="/ProductList/" element={<ProductList />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Join" element={<Join />} />
                <Route path="/Cart" element={<Cart />} />
                <Route exact="true" path="/ProductDetail/:id" element={<ProductDetail />} />
                <Route exact="true" path="/Order/:id" element={<Order />} />
                <Route exact="true" path="/SearchResult/:item" element={<SearchResult />} />
            </Routes>
        </div>
    )
}

export default Router;
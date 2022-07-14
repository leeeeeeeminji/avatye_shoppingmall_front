import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import styled from "styled-components";
import ProductList from './ProductList';
import Login from './Login';
import Join from './Join';
import Cart from './Cart';
import SearchProduct from './SearchProduct';
import ProductDetail from './ProductDetail';
import Order from './Order';

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
            <nav>
                <NavLink style={{textDecoration : 'none'}} className={({isActive }) => "nav-link" + (isActive ? "click" : "")} to="/"><Shoptitle>SHOP</Shoptitle></NavLink>
            </nav>
            <nav>
                <NavLink className={({isActive }) => "nav-link" + (isActive ? "click" : "")} to="/ProductList">상품 목록</NavLink>
                <NavLink className={({isActive }) => "nav-link" + (isActive ? "click" : "")} to="/Login">로그인</NavLink>
                <NavLink className={({isActive }) => "nav-link" + (isActive ? "click" : "")} to="/Join">회원 가입</NavLink>
                <NavLink className={({isActive }) => "nav-link" + (isActive ? "click" : "")} to="/Cart">장바구니</NavLink>
               
                <SearchProduct />
            </nav>

            <Routes>
                <Route path="/ProductList/" element={<ProductList />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Join" element={<Join />} />
                <Route path="/Cart" element={<Cart />} />
                <Route exact="true" path="/ProductDetail/:id" element={<ProductDetail />} />
                <Route path="/Order" element={<Order />} />
            </Routes>
        </div>
    )
}

export default Router;
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navigate } from "react-router";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Main from './Main';
import ProductList from './ProductList';
import Login from './Login';
import Logout from './Logout';
import Join from './Join';
import Cart from './Cart';
import SearchProduct from './SearchProduct';
import ProductDetail from './ProductDetail';
import Order from './Order';
import SearchResult from './SearchResult';
import "./css/Router.css"
import Mypage from './Mypage';

//메뉴
function Router() {
    return (
        <div>
            <div className='head'>
                <Link to="/Main"><b>SHOP</b></Link>
            </div>
            <div className='menu'>
                <SearchProduct />
            </div>
            {/* 상품목록 */}
            <div className="menu2">
                <Link to="/ProductList">
                    <IconButton sx={{ p: '3px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </Link>
            </div>
            <div className='menu3'>
                {localStorage.getItem("user") ? <Link to="/Logout">로그아웃</Link> : <Link to="/Login">로그인</Link>}
                {localStorage.getItem("user") ? <Link to="/Mypage">마이페이지</Link> : <Link to="/Join">회원가입</Link>}
                <Link to="/Cart">장바구니</Link>
            </div>

            <Routes>
                <Route path="/Main" element={<Main />} />
                <Route path="/ProductList/" element={<ProductList />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="/Join" element={<Join />} />
                <Route path="/Cart" element={localStorage.getItem("user") ? <Cart/> : <Navigate to="/Login" />} />
                <Route path="/ProductDetail/:id" element={<ProductDetail />} />
                <Route exact="true" path="/Order" element={<Order />} />
                <Route exact="true" path="/SearchResult/:item" element={<SearchResult />} />
            </Routes>
        </div>
    )
}

export default Router;
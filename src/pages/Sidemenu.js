import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { push as Menu } from "react-burger-menu";
import { Navigate } from "react-router";
import "./css/Sidebar.css";
import Main from "./Main";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Login from './Login';
import Logout from './Logout';
import Join from './Join';
import Mypage from './Mypage';
import SearchResult from './SearchResult';
import Cart from './Cart';
import Order from "./Order";

function Testmenu(props) {
    return(
        <>
            <Menu className="Sidemenu">
                <Link to="/Main"><b>Home</b></Link>
                <Link to="/ProductList">List</Link>
                {localStorage.getItem("user") ? <Link to="/Logout">Logout</Link> : <Link to="/Login">Login</Link>}
                {localStorage.getItem("user") ? <Link to="/Mypage">Mypage</Link> : <Link to="/Join">Join</Link>}
                <Link to="/Cart">Cart</Link>
            </Menu>

            <Routes>
                <Route path="/Main" element={<Main />} />
                <Route path="/ProductList/" element={<ProductList />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="/Join" element={<Join />} />
                <Route path="/ProductDetail/:id" element={<ProductDetail />} />
                <Route path="/Cart" element={localStorage.getItem("user") ? <Cart/> : <Navigate to="/Login" />} />
                <Route exact="true" path="/SearchResult/:item" element={<SearchResult />} />
                <Route exact="true" path="/Order" element={<Order />} />
            </Routes>
        </>
    )
}

export default Testmenu;
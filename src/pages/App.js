import React from "react";
import Router from "./Router";
import Sidemenu from "./Sidemenu";
import { Link } from 'react-router-dom';
import SearchProduct from "./SearchProduct";
import "./css/Product.css";

function App() {
  return (
      <div className="wrap">
        <header>
          <div className='head'>
            <Link to="/Main"><b>SHOP</b></Link>
          </div>
          <div className='searchProduct'>
                <SearchProduct />
          </div>
        </header>

        <div id="page-wrap">
          <Sidemenu pageWrapID={'page-wrap'} outerContainerId={'wrap'}/>
        </div>
      </div>
  );
}

export default App;
import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import NumFormat from "./NumFormat";
import Grid from '@mui/material/Grid';
import "./App.css";

function ProductList(){
    const [searchList, setSearchList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/list")
        .then((response) => {
            setSearchList(response.data)
        })
    }, [])

    return(
        <div>
            <hr/>
            <nav>
                {searchList.map((val) => {
                    return(
                        <Link key={val.productID} className="linklist" to={`/ProductDetail/${val.productID}`}>
                            <h2 className="prList" key={val.productID}>
                                <img src={val.productIMG} width="200px" alt="이미지"/>
                                {val.productName} <span style={{fontSize : "15px"}}><NumFormat num={val.productPrice} />원</span>
                            </h2>
                        </Link>
                    );
                })}
            </nav>
        </div>
    )
}

export default ProductList;
import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import NumFormat from "./NumFormat";
import { Container } from "@mui/system";
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
        <Container fixed>
            <div className="listdiv">
            {searchList.map((val) => {
                return(
                    <div className="item">
                        <Link key={val.productID} className="linklist" to={`/ProductDetail/${val.productID}`}>
                            <div key={val.productID}>
                                <img src={val.productIMG} width="200px" height="200px" alt="이미지"/><br/>
                                <span>{val.productName} <NumFormat num={val.productPrice} />원</span>
                            </div>
                        </Link>
                    </div>
                );
            })}
            </div>
        </Container>
    )
}

export default ProductList;
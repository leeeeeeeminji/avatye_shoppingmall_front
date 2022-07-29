import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import NumFormat from "./NumFormat";
import { Container } from "@mui/system";
import "./css/Product.css";
import "./css/App.css";

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
            {searchList.map((val, key) => {
                return(
                    <div className="item" key={key}>
                        <Link className="linklist" to={`/ProductDetail/${val.productID}`}>
                            <div>
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
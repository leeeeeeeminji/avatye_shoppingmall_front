import axios from "axios";
import "./css/App.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import { Container } from "@mui/system";

function SearchResult() {
    const [resultItem, setResultItem] = useState([]);

    const params = useParams();
    const item = params.item;

    useEffect(() => {
        axios.get("http://localhost:3001/api/search", {params : {item : item }})
        .then((response) => {
           setResultItem(response.data)
        })
    }, [item]);

    //검색한 상품명이 존재하지 않는 경우
    if (resultItem.length === 0) {
        return (
            <Container fixed>
                <div>
                    <h2 className="searchresult">"{item}"에 해당하는 상품을 찾을 수 없습니다.</h2>
                </div>
            </Container>
        )
        
    }

    //검색한 상품명이 존재하는 경우
    return(
        <Container fixed>
            <div className="listdiv2">
                <br/>
                <h2 className="searchresult">"{item}" 검색 결과입니다.</h2>
                {resultItem.map((val, key) => {
                        return(
                            <div className="item2" key={key}>
                                <Link className="linklist" to={`/ProductDetail/${val.productID}`}>
                                    <div>
                                        <img width="200px" height="200px" src={val.productIMG} alt="이미지" /><br/>
                                        <b>{val.productName} </b>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </Container>
    )
}

export default SearchResult;
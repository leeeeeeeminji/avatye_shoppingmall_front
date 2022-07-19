import axios from "axios";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

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
            <div>
                <hr/>
                <h2 className="searchresult">"{item}"에 해당하는 상품을 찾을 수 없습니다.</h2>
            </div>
        )
        
    }

    //검색한 상품명이 존재하는 경우
    return(
        <div>
            <hr/>
            <h2 className="searchresult">"{item}" 검색 결과입니다.</h2>
            {resultItem.map((val) => {
                    return(
                    <Link key={val.productID} to={`/ProductDetail/${val.productID}`}>
                        <div>
                            <img width="200px" src={val.productIMG} alt="이미지" />
                            <div className="product"><h2>{val.productName}</h2>{val.productPrice}원 
                            </div>
                        </div>
                    </Link>
                    );
                })}
        </div>
    )
}

export default SearchResult;
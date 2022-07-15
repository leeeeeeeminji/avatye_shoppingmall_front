import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

function SearchResult() {
    const [resultItem, setResultItem] = useState([]);

    const params = useParams();
    const item = params.item;

    useEffect(() => {
        axios.post("http://localhost:3001/api/search", {item : item, })
        .then((response) => {
           setResultItem(response.data)
        })
    }, [item]);


    return(
        <div>
            <hr/>
            <h2>"{item}" 검색 결과입니다.</h2>
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
import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

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
                    <Link key={val.productID} to={`/ProductDetail/${val.productID}`}>
                        <h2 className="prList" key={val.productID}>
                            <img src={val.productIMG} width="200px" alt="이미지"/>
                            {val.productName}, {val.productPrice}원
                        </h2>
                    </Link>
                    );
                })}
            </nav>
        </div>


    )
}

export default ProductList;
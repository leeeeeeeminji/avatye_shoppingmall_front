import React, {useEffect, useState} from "react";
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
            {searchList.map((val) => {
                return(
                    <h2 key={val.productID}>
                        {val.productName}, 가격 : {val.productPrice}, {val.productContent},<img src={val.productIMG} width="200px"/>
                    </h2>
                );
            })}
        </div>
    )
}

export default ProductList;
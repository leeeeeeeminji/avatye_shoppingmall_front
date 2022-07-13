import React, {useState} from "react";
import axios from "axios";

function SearchProduct(){
    const [searchItem, setSearchItem] = useState();
    const [searchList, setSearchList] = useState([]);

    const onChange = e => {
        setSearchItem(e.target.value);
    };

    const seachItem = () => {
        axios.post("http://localhost:3001/api/search", {searchItem : searchItem, })
        .then((response) => {
            setSearchList(response.data)
        })
    };

    return(
        <>
            <input className={searchItem} type="text" name="searchItem" placeholder="상품명을 입력하세요 " onChange={onChange}/>
            <button onClick={seachItem} style={{backgroundColor : 'white', borderStyle : 'none'}}>🔍</button>
            {searchList.map((val) => {
                return(
                    <div key={val.productID}>
                        {val.productName}, 가격 : {val.productPrice}, {val.productContent}
                    </div>
                );
            })}
        </>
    )
}

export default SearchProduct;

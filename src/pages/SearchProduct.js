import React, {useState} from "react";
import { useNavigate } from "react-router";

function SearchProduct(){
    const [searchItem, setSearchItem] = useState();
    const [searchList, setSearchList] = useState([]);

    const onChange = e => {
        setSearchItem(e.target.value);
    };

    const navigate = useNavigate();

    const seachItem = (e) => {
        e.preventDefault();
        if(searchItem !== undefined){
            navigate(`/SearchResult/${searchItem}`);
        } else {
            alert("입력하세요");
        }
    };

    return(
        <form onSubmit={seachItem}>
            <input className={searchItem} type="text" minLength="1" value={searchItem} placeholder="상품명을 입력하세요 " onChange={onChange}/>
            <button style={{backgroundColor : 'white', borderStyle : 'none'}}>🔍</button>
            {searchList.map((val) => {
                return(
                    <div key={val.productID}>
                        {val.productName}, 가격 : {val.productPrice}, {val.productContent}
                    </div>
                );
            })}
        </form>
    )
}

export default SearchProduct;

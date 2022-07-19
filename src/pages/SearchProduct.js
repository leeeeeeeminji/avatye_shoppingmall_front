import React, {useState} from "react";
import { useNavigate } from "react-router";
import "./App.css";

function SearchProduct(){
    const [searchItem, setSearchItem] = useState();

    const onChange = e => {
        setSearchItem(e.target.value);
    };

    const navigate = useNavigate();

    const seachItem = (e) => {
        e.preventDefault();
        if(searchItem !== undefined){
            navigate(`/SearchResult/${searchItem}`);
        } else {
            alert("상품명을 입력해주세요");
        }
    };

    return(
        <form onSubmit={seachItem}>
            <input className="searchItem" type="text" minLength="1" value={searchItem} placeholder="상품명을 입력하세요 " onChange={onChange}/>
            <button style={{backgroundColor : 'white', borderStyle : 'none'}}>🔍</button>
        </form>
    )
}

export default SearchProduct;

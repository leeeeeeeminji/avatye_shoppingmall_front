import React, {useState} from "react";
import { useNavigate } from "react-router";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import "./css/App.css";

function SearchProduct(){
    const [searchItem, setSearchItem] = useState();

    const onChange = e => {
        setSearchItem(e.target.value);
    };

    const navigate = useNavigate();

    const itemSearch = (e) => {
        e.preventDefault();
        if((searchItem !== undefined) && (searchItem !== "")){
            navigate(`/SearchResult/${searchItem}`);
        } else {
            alert("상품명을 입력해주세요");
        }
    };

    return(
        <Paper component="form" onSubmit={itemSearch} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>

            <InputBase type="text" value={searchItem} onChange={onChange} sx={{ ml: 1, flex: 1 }} placeholder="상품명을 입력하세요" />

            <IconButton onClick={itemSearch} sx={{ p: '8px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchProduct;

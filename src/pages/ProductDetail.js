import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import NumFormat from "./NumFormat";
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import Divider from '@mui/material/Divider';
import './css/App.css';

function ProductDetail() {
    const [details, setDetails] = useState(null);
    let [quantity, setQuantity] = useState(1);
    let [finalPrice, setFinalPrice] = useState(0);

    let params = useParams();
    const productID = params.id;
    let currentUser = ""

    if (JSON.parse(localStorage.getItem("user"))) {
        currentUser = JSON.parse(localStorage.getItem("user")).userid
    } else {
        currentUser = ''
    }

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/api/detail", {params : {productID : productID}})
        .then((response) => {
           setDetails(response.data)
           setFinalPrice(response.data[0].productPrice)
        })
    }, [productID]);

    //주문하기 눌렀을 때
    const goOrder = () => {
        if (currentUser) {
            navigate("/Order", {state : {details : details, quantity : quantity, finalPrice : finalPrice }});
        } else {
            if (window.confirm("로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?")) {
                navigate('/Login');
            }
        }

    }

    //장바구니 버튼 눌렀을 때
    const insertCart = () => {
        if (currentUser) {
            axios.post("http://localhost:3001/api/insertCart", 
                {productID : productID, userID : currentUser, quantity : quantity, finalPrice : finalPrice })
            .then((response) => {
                if (response.data) {
                    alert("장바구니에 상품이 담겼습니다.");
                    if (window.confirm("장바구니로 이동하시겠습니까?")) {
                        navigate("/Cart");
                } 
                    
                } else {
                    alert("장바구니에 이미 상품이 담겨있습니다.");
                }
                })
        }
        else {
            if (window.confirm("로그인이 필요한 서비스 입니다. 로그인 하시겠습니까?")) {
                navigate('/Login');
            }
        }
    };

    //수량 조절 + 금액 조정
    const checkQuantity = (e) => {
        switch (e.target.value) {
            case "+" : 
                setQuantity(quantity += 1);
                break;
            case "-" :
                if (quantity <= 1){
                    alert('수량은 1 이하로 선택할 수 없습니다.')
                } else {
                    setQuantity(quantity -= 1); 
                }
            }

        setFinalPrice(details[0].productPrice * quantity);

        };

    return(
        <div>
            {details && 
                <div className="detaildiv">
                    <img className="productIMG" src={details[0].productIMG} alt="이미지" />
                    <div className="product">
                        <h2>{details[0].productName}</h2>
                        <NumFormat num={details[0].productPrice} />원
                        {/* <hr style={{border : "solid 1px #919191"}}/> */}
                        <div className="productContent">" {details[0].productContent} "</div> 
                        <div className="selectOption">
                            {/* <Paper sx={{display: 'flex', alignItems: 'center', width: '120px' }}>

                                <IconButton onClick={checkQuantity} value="+" sx={{ p: '5px' }}>
                                    <AddIcon />
                                </IconButton>

                                <Divider sx={{ height: 28}} orientation="vertical" />

                                <InputBase type="text" value={quantity} sx={{ ml: 1, flex: 1 }} />

                                <Divider sx={{ height: 28}} orientation="vertical" />

                                <IconButton onClick={checkQuantity} value="-" sx={{ p: '5px' }}>
                                    <RemoveIcon />
                                </IconButton>

                            </Paper> */}

                            수량 : <button className="qtybutton" value="-" onClick={checkQuantity}>-</button><input type="text" className="qty" value={quantity}></input><button className="qtybutton" value="+" onClick={checkQuantity}>+</button><br/>
                            최종 금액 : <NumFormat num={finalPrice} />원
                        </div>
                    <button className="buybtn" onClick={goOrder}>주문</button>
                    <button className="cartbtn" onClick={insertCart}>🛒</button>
                    </div>
                </div>
            }
        </div>
    );
}
export default ProductDetail;
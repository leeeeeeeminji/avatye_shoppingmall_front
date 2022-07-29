import React,{useState, useEffect} from "react";
import "./css/App.css";
import axios from "axios";
import NumFormat from "./NumFormat";
import ReactModal from "react-modal";
import OrderModal from "./OrderModal";
import "./css/Modal.css";
import { Api } from "@mui/icons-material";

function Mypage() {
    const currentUser = JSON.parse(localStorage.getItem("user")).userid
    const [userImage, setUserImage] = useState("/imgs/user.jpeg");
    const [imagePreview, setImagePreview] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [userOrder, setUserOrder] = useState(null);
    const [userinfo, setUserInfo] = useState(null);
    const [orderNumber, setOrderNumber] = useState(0);
    const [updateInputs, setUpdateInputs] = useState({
        cusName : '',
        cusEmail : ''
    });

    const {cusName, cusEmail} = updateInputs

    useEffect(() => {
        axios.get("http://localhost:3001/api/mypage", {params : {userid : currentUser }})
        .then((response) => {
            setUserInfo(response.data)
            setUpdateInputs({
                cusName : response.data[0].cusName,
                cusEmail : response.data[0].cusEmail
            })
        })
        axios.get("http://localhost:3001/api/getOrderList", {params : {userid : currentUser}})
        .then((response) => {
            setUserOrder(response.data)
        })
    }, [currentUser]);

    const onChange = e => {
        const {name, value} = e.target
        setUpdateInputs({
            ...updateInputs,
            [name] : value
        })
    };

    const updateName = () => {
        axios.put("http://localhost:3001/api/updateInfo", {cusID : currentUser, cusName : cusName})
        alert("이름이 수정되었습니다.")
    }

    const updateEmail = () => {
        axios.put("http://localhost:3001/api/updateInfo", {cusID : currentUser, cusEmail : cusEmail})
        alert("이메일이 수정되었습니다.")
    }

    const openModal = (data) => {
        setOrderNumber(data);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImagePreview(reader.result);
                resolve();
            }
        })
    }


    const saveImage = (event) => {
        encodeFileToBase64(event.target.files[0]);

        const formdata = new FormData();
        formdata.append('img', event.target.files[0]);

        const config = {
            Headers: {
                'content-type' : 'multipart/form-data',
            },
        };

        //서버 저장.
        axios.post("http://localhost:3001/api/saveImage", formdata, config)
        .then((res)=> {
            console.log(res);
        })

    }

    return (
        <div className="modal_background">
            <div className="mypagediv">
                <img src={userImage} alt="이미지"/> <br/>
                <input 
                type="file" 
                id="fileUpload"
                accept="image/*" 
                onChange={saveImage}
                />
                <div>
                <table className="mypagetable">
                    <caption>내 정보</caption>
                    <tbody>
                        <tr><td>ID</td><td>{currentUser}</td></tr>
                        <tr><td>이름</td><td><input className="mypageInputs" type="text" name="cusName" value={cusName} onChange={onChange}/> <input className="mypageInputButton" type="button" name="updatename" onClick={updateName} value="수정"/></td></tr>
                        <tr><td>E-mail</td><td><input className="mypageInputs" type="email" name="cusEmail" value={cusEmail} onChange={onChange}/> <input  className="mypageInputButton" type="button" name="updateEmail" onClick={updateEmail} value="수정"/></td></tr>
                    </tbody>
                </table>
                
                <div className="container">
                    <table className="mypagetable2">
                        <caption>주문 정보</caption>
                        <thead>
                            <tr><th>주문 번호</th><th>주문 날짜</th><th>주소</th><th>전화번호</th><th>최종 결제 금액</th></tr>
                        </thead> 
                        <tbody>
                            {userOrder && userOrder.map((val) => {
                                return(
                                    <>
                                        <tr onClick={() => openModal(val.orderID)}>
                                            <td>{val.orderID}</td>
                                            <td>{val.orderDate}</td>
                                            <td>{val.address}</td>
                                            <td>{val.phonenumber}</td>
                                            <td><NumFormat num={val.finalPrice} />원</td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <ReactModal className="modal" isOpen={modalOpen} onRequstClose={closeModal} ariaHideApp={false}>
                    <OrderModal data={orderNumber}/>
                    <footer className="modal_footer">
                      <button onClick={closeModal}>닫기</button>   
                    </footer>
                </ReactModal>
            </div>
            </div>
        </div>
    )
}

export default Mypage;
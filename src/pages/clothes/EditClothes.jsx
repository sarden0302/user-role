import {useEffect, useState} from "react";
import apiClothesService from "./apiClothesService";
import {useNavigate, useParams} from "react-router-dom";

const EditClothes = () => {

    const [cName, setCName] = useState("");
    const [cCategory, setCCategory] = useState("");
    const [cBrand, setCBrand] = useState("");
    const [cColor, setCColor] = useState("");
    const [cSize, setCSize] = useState("");
    const [cMaterial, setCMaterial] = useState("");
    const [cPrice, setCPrice] = useState("");
    const [cStock, setCStock] = useState("");
    const [cGender, setCGender] = useState("");
    const [cSeason, setCSeason] = useState("");

    const [cloth, setCloth] = useState(null);

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        apiClothesService.getClothesById(id,
            (newCloth) => {
                setCName(newCloth.cname);
                setCCategory(newCloth.ccategory);
                setCBrand(newCloth.cbrand);
                setCColor(newCloth.ccolor);
                setCSize(newCloth.csize);
                setCMaterial(newCloth.cmaterial);
                setCPrice(newCloth.cprice);
                setCStock(newCloth.cstock);
                setCGender(newCloth.cgender);
                setCSeason(newCloth.cseason);
            });
    }, [id]);

    const handleEditCloth = () => {
        apiClothesService.updateClothes(id, cName, cCategory, cBrand, cColor, cSize, cMaterial, cPrice, cStock, cGender, cSeason);

        navigate(`/clothes/${id}`);
    }

    return (
        <div className="-container">
            <h1>새로운 옷 추가</h1>
            <label htmlFor="cName">옷 이름</label>
            <input type="text"
                   placeholder="옷 이름"
                   id="cName"
                   name="cName"
                   value={cName}
                   onChange={(e) => {setCName(e.target.value)}}/>

            <label htmlFor="cCategory">옷 카테고리</label>
            <input type="text"
                   placeholder="옷 카테고리"
                   id="cCategory"
                   name="cCategory"
                   value={cCategory}
                   onChange={(e) => {setCCategory(e.target.value)}}/>

            <label htmlFor="cBrand">옷 브랜드</label>
            <input type="text"
                   placeholder="옷 브랜드"
                   id="cBrand"
                   name="cBrand"
                   value={cBrand}
                   onChange={(e) => {setCBrand(e.target.value)}}/>

            <label htmlFor="cColor">옷 색상</label>
            <input type="text"
                   placeholder="옷 색상"
                   id="cColor"
                   name="cColor"
                   value={cColor}
                   onChange={(e) => {setCColor(e.target.value)}}/>

            <label htmlFor="cSize">옷 사이즈</label>
            <input type="text"
                   placeholder="옷 사이즈"
                   id="cSize"
                   name="cSize"
                   value={cSize}
                   onChange={(e) => {setCSize(e.target.value)}}/>

            <label htmlFor="cMaterial">옷 재질</label>
            <input type="text"
                   placeholder="옷 재질"
                   id="cMaterial"
                   name="cMaterial"
                   value={cMaterial}
                   onChange={(e) => {setCMaterial(e.target.value)}}/>

            <label htmlFor="cPrice">옷 가격</label>
            <input type="number"
                   placeholder="옷 가격"
                   id="cPrice"
                   name="cPrice"
                   value={cPrice}
                   onChange={(e) => {setCPrice(e.target.value)}}/>

            <label htmlFor="cStock">옷 재고</label>
            <input type="number"
                   placeholder="옷 재고"
                   id="cStock"
                   name="cStock"
                   value={cStock}
                   onChange={(e) => {setCStock(e.target.value)}}/>

            <label htmlFor="cGender">옷 성별</label>
            <input type="text"
                   placeholder="옷 성별"
                   id="cGender"
                   name="cGender"
                   value={cGender}
                   onChange={(e) => {setCGender(e.target.value)}}/>

            <label htmlFor="cSeason">옷 시즌</label>
            <input type="text"
                   placeholder="옷 시즌"
                   id="cSeason"
                   name="cSeason"
                   value={cSeason}
                   onChange={(e) => {setCSeason(e.target.value)}}/>

            <button type={"button"} onClick={handleEditCloth}>수정하기</button>
        </div>
    )
};

export default EditClothes;
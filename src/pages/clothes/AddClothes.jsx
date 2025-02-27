import {useState} from "react";
import apiClothesService from "./apiClothesService";
import {useNavigate} from "react-router-dom";

const AddClothes = () => {

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

    const navigate = useNavigate();

    const handleChangeValue = (e) => {
        /* name 은 target 에서 가져올 key 값으로 default
           name  = input 내 name 에 작성된 값 key 로 받기
           value = input 내 value 의 value 값
         */
        const {name, value} = e.target;

        if (name === "cName") setCName(value);
        else if (name === "cCategory") setCCategory(value);
        else if (name === "cBrand") setCBrand(value);
        else if (name === "cColor") setCColor(value);
        else if (name === "cSize") setCSize(value);
        else if (name === "cMaterial") setCMaterial(value);
        else if (name === "cPrice") setCPrice(value);
        else if (name === "cStock") setCStock(value);
        else if (name === "cGender") setCGender(value);
        else if (name === "cSeason") setCSeason(value);
    }

    const handleAddCloth = () => {
        if (!cName || !cCategory || !cBrand || !cColor || !cSize || !cMaterial || !cPrice || !cStock || !cGender || !cSeason) {
            let msg = "필수 입력 : \n";
            if (!cName) msg += " - 옷 이름을 입력하세요.\n";
            if (!cCategory) msg += " - 옷 카테고리를 입력하세요.\n";
            if (!cBrand) msg += " - 옷 브랜드를 입력하세요.\n";
            if (!cColor) msg += " - 옷 색상을 입력하세요.\n";
            if (!cSize) msg += " - 옷 사이즈를 입력하세요.\n";
            if (!cMaterial) msg += " - 옷 재질을 입력하세요.\n";
            if (!cPrice) msg += " - 옷 가격을 입력하세요.\n";
            if (!cStock) msg += " - 옷 재고를 입력하세요.\n";
            if (!cGender) msg += " - 옷 성별을 입력하세요.\n";
            if (!cSeason) msg += " - 옷 시즌을 입력하세요.\n";

            alert(msg);
            return; // axios 에서 DB 저장하지 못하게 돌려보내기
        }

        apiClothesService.insertClothes(cName, cCategory, cBrand, cColor, cSize,  cMaterial, cPrice, cStock, cGender, cSeason);
        navigate("/clothes");
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
                   onChange={handleChangeValue}/>

            <label htmlFor="cCategory">옷 카테고리</label>
            <input type="text"
                   placeholder="옷 카테고리"
                   id="cCategory"
                   name="cCategory"
                   value={cCategory}
                   onChange={handleChangeValue}/>

            <label htmlFor="cBrand">옷 브랜드</label>
            <input type="text"
                   placeholder="옷 브랜드"
                   id="cBrand"
                   name="cBrand"
                   value={cBrand}
                   onChange={handleChangeValue}/>

            <label htmlFor="cColor">옷 색상</label>
            <input type="text"
                   placeholder="옷 색상"
                   id="cColor"
                   name="cColor"
                   value={cColor}
                   onChange={handleChangeValue}/>

            <label htmlFor="cSize">옷 사이즈</label>
            <input type="text"
                   placeholder="옷 사이즈"
                   id="cSize"
                   name="cSize"
                   value={cSize}
                   onChange={handleChangeValue}/>

            <label htmlFor="cMaterial">옷 재질</label>
            <input type="text"
                   placeholder="옷 재질"
                   id="cMaterial"
                   name="cMaterial"
                   value={cMaterial}
                   onChange={handleChangeValue}/>

            <label htmlFor="cPrice">옷 가격</label>
            <input type="number"
                   placeholder="옷 가격"
                   id="cPrice"
                   name="cPrice"
                   value={cPrice}
                   onChange={handleChangeValue}/>

            <label htmlFor="cStock">옷 재고</label>
            <input type="number"
                   placeholder="옷 재고"
                   id="cStock"
                   name="cStock"
                   value={cStock}
                   onChange={handleChangeValue}/>

            <label htmlFor="cGender">옷 성별</label>
            <input type="text"
                   placeholder="옷 성별"
                   id="cGender"
                   name="cGender"
                   value={cGender}
                   onChange={handleChangeValue}/>

            <label htmlFor="cSeason">옷 시즌</label>
            <input type="text"
                   placeholder="옷 시즌"
                   id="cSeason"
                   name="cSeason"
                   value={cSeason}
                   onChange={handleChangeValue}/>

            <button type={"button"} onClick={handleAddCloth}>추가하기</button>
        </div>
    )
};

export default AddClothes;
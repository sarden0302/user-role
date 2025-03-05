import {useState} from "react";
import apiClothesService from "./apiClothesService";
import {Link, useNavigate} from "react-router-dom";
import FormInput from "./FormInput";

/*
    <FormInput key={field.id} {...field} /> 로 inputFields 를 가져와서 활용하는 방법

    1. React 가 각 값을 구별할 수 있도록 index 대신 key 라는 명칭으로 숫자를 가져올 수 있도록 설정
    각 키에 해당하는 id 를 가져오고 가져온 아이디에 해당하는 모든 속성을 FormInput 전달

    {...field} -> inputFields 에서 key 순서에서 해당하는 id, label, placeholder 값을 FormInput 으로 전달

    onChange 이벤트 핸들러를 사용하지 않아도 되는가 ?!
    FormInput 내부에  onChange 를 추가해서 상태 관리를 해야합니다

    onChange 가 없으면 사용자가 입력한 값을 저장할 수 없음
            하는 역할 : 사용자가 입력한 값을 임시저장 -> 저장해놓은 값을 백엔드로 전달
*/

const AddClothes = () => {
    // 의류 정보 상태 관리
    const [formData, setFormData] = useState({
        cName:"",
        cCategory:"",
        cBrand:"",
        cColor:"",
        cSize:"",
        cMaterial:"",
        cPrice:"",
        cStock:"",
        cGender:"",
        cSeason:"",
    });
    /*
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
    */

    /* 입력 값 변경 시 상태 업데이트
        e.target = 사용자가 값을 작성했고, 사용자가 값을 작성함으로 인해 input 값이 변경된 곳을 가리킴
        {name, value} = e.target
        e.target.name  : 현재 입력 필드의 name 속성 값을 가져옴
        e.target.value : 현재 입력 필드의 value 속성 값을 가져옴

        구조 분해 할당 방식
        e.target 이벤트가 발생한 input 에서 name 과 value 값을 가져오는 과정

        예를 들어
        <input type="text" name="cName" value={formData.cName} onChange={handleChange} />

        -> 사용자가 input 내부에 "아름다운 티셔츠" 를 입력
        1. onChange 함수 실행 -> handleChange 기능을 호출
        2. 호출된 handleChange 내부에는 e.target 이벤트가 발생한 target 의 name 과 value 값 가져오기 실행
        e.target = {
            name:"cName",
            value:"아름다운 티셔츠",
            type:"text",
        }
        와 같은 형태로 이루어져 있음

        const [name,value] = e.target
        -> e.target 내부에 들어있는 값들 중에서 name 과 value 값만 꺼내서 사용하겠다는 의미

        const name 변수와 value 변수 이름에 해당하는 값을 e.target 에서 꺼내오기
        제대로 해당 변수이름과 일치하는 것을 꺼내왔다면
        name = "cName" 이 담기고
        value = "아름다운 티셔츠" -> 사용자가 입력한 값이 담겨지게 된다.
     */

    const handleChange = (e) => {
        const {name, value} = e.target()
        setFormData({
            ...formData, // update(기존에 작성 값 수정) 시 기존에 작성한 다른 값들은 유지
            [name]:value,
        });
    }

    const inputFields = [
        {id: "cName", label:"의류 명칭", placeholder:"상품명을 입력하세요"},
        {id: "cCategory", label:"카테고리", placeholder:"카테고리(예:티셔츠, 바지, 자켓)을 입력하세요"},
        {id: "cBrand", label:"브랜드", placeholder:"브랜드명을 입력하세요"},
        {id: "cColor", label:"색상", placeholder:"색상을 입력하세요"},
        {id: "cSize", label:"사이즈", placeholder:"사이즈(예:S, M, L, XL)을 입력하세요"},
        {id: "cMaterial", label:"소재", placeholder:"소재를 입력하세요"},
        {id: "cPrice", label:"가격", placeholder:"가격을 입력하세요"},
        {id: "cStock", label:"재고 수량", placeholder:"재고 수량을 입력하세요"},
        {id: "cGender", label:"성별", placeholder:"성별(예:공용, 남성, 여성)을 입력하세요"},
        {id: "cSeason", label:"시즌", placeholder:"계절(예:봄, 여름, 가을, 겨울, 사계절)을 입력하세요"}
    ]

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
        <div className="container px-5">
            {/* bg-light : 배경 light && rounded : 둥글게 && px : x 축 padding && py : y 축 padding */}
            <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                <div className="text-center mb-5">
                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i
                        className="bi bi-envelope"></i></div>
                    <h1 className="fw-bolder">의류 등록하기</h1>
                    <p className="lead fw-normal text-muted mb-0">판매할 옷을 등록해주세요!</p>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <form id="contactForm">
                            {inputFields.map(
                                (field) => (
                                    <FormInput key={field.id}
                                               {...field}
                                               value={formData[field.id]}
                                               onChange={handleChange}
                                    />
                                )
                            )}

                            <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">
                                        등록 성공했습니다.
                                    </div>
                                    등록 제품 확인하기
                                    <br/>
                                    <Link to={"/clothes"}>의류 목록 페이지 이동하기</Link>
                                </div>
                            </div>

                            <div className="d-none" id="submitErrorMessage">
                                <div className="text-center text-danger mb-3">
                                    의류를 등록하는데 문제가 발생했습니다.
                                </div>
                            </div>

                            <div className="d-grid">
                                <button className="btn btn-primary btn-lg" id="submitButton"
                                        type="button" onClick={handleAddCloth}>
                                    등록하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        /* <div className="-container">
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
         </div>*/
    )
};

export default AddClothes;
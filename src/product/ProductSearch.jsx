// import 변수명 from '파일명 파일위치 js기능명칭' => 사용할 때는 변수명으로 기능을 사용해야 할 때
// import 'css 파일 위치'                      => 가져오기만 진행할 때 사용
import React, { useState } from "react";
import axios from "axios";
import './ProductSearch.css';
import {matchPath} from "react-router-dom";

const ProductSearch = () => {
    // 검색 변수 이름
    const [keyword, setKeyword] = useState("");
    // 검색 결과 조회 목록 변수 이름
    const [products, setProducts] = useState([]);
    // 추천 검색어를 제안 리스트
    const [sugs, setSugs] = useState([]); // suggestions -> sugs
    // 빈 값일 경우 제안 x but 빈 값 아닐 경우 제안 o
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value.trim(); // input 창에서 event 발생시 공백 제거하고 value 에 저장
        /* if (!value.trim()) {
              alert("추천할 검색어가 없습니다.");
           }
        alert 사용 x
        */
        setKeyword(value);

        // value 값이 존재한다면 추천 검색어 제공
        if (value) {
            axios
                .get(`http://localhost:8080/api/products/search?keyword=${value}`)
                .then(
                    (res) => {
                        /*
                        const 제안리스트 = Array.isArray(res.data)
                            ?
                            res.data.map(
                                (p) => (
                                    p.productName
                                )
                            )
                            :
                            [];
                         */
                        // res.data 는 배열 형식으로 데이터를 가져올 수 없기 때문에 사용 불가
                        const 제안리스트 = res.data ?.map(p => p.productName) || [];
                        setSugs(제안리스트); // 백엔드에서 가져온 제안리스트에서 이름만 sugs 변수이름으로 전달
                        setShow(true); // 제안 리스트를 sugs 변수이름으로 담을 시 true;
                    }
                )
                .catch(
                    (error) => {
                        console.error("추천 검색어 동작 실행 실패 : ", error);
                        setSugs([]);    // 새로운 input 값이 들어왔을 때 문제가 발생하면 기존에 추천한 리스트를 모두 비우기
                    }
                )
        } else { // 추천할 검색어가 없다면
            setSugs([]);
            setShow(false);

        }
    }

    const handleSug = (sugs) => {
        setKeyword(sugs);
        setShow(false);
    }

    const searchProducts = () => {
        // input 비어있는지 확인 후 비어있다면
        if (!keyword.trim()) {
            alert("검색어를 입력하세요.");
            return;
        }
        // "검색어를 입력하세요." 보여준 후 리턴
        axios
            .get(`http://localhost:8080/api/products/search?keyword=${keyword}`)
            .then(
                (response) => {
                    if (response.data) {
                        setProducts(response.data);
                    } else {
                        alert("검색어에 해당하는 데이터를 찾을 수 없습니다. 다시 입력해주세요.");
                        setKeyword("");
                        setProducts([]);
                    }
                }
            )
            .catch(
                (error) => {
                    console.log("error 발생 " + error);
                    setProducts([]);
                }
            )
    }


    return (
        <div className="productsearch-container">
            <h2>상품 검색</h2>
            {/* input onChange 없음 */}
            <div>
                <input
                    type="text"
                    value={keyword}
                    onFocus={() => setShow(true)}
                    onChange={handleChange}
                    onBlur={() => setTimeout(() => setShow(false), 200)}
                />
                {
                    show && sugs.length > 0 && (
                        <ul>
                            {
                                sugs.map(
                                    (sugs, index) => (
                                        <li key={index} onMouseDown={() => handleSug(sugs)}>
                                            {sugs}
                                        </li>
                                    )
                                )
                            }
                        </ul>)
                }
            </div>
            <button onClick={searchProducts}>검색</button>

            <ul>
                {
                    products.length > 0 ? (
                        products.map((product)=> {
                            return (
                                <li key={product.productId}>
                                    이름 : {product.productName}<br/>
                                    카테고리: {product.productCategory}<br/>
                                    가격: {product.productPrice}원<br/>
                                    재고: {product.productStock}개<br/>
                                    설명: {product.productDescription}<br/>
                                </li>
                            )
                        })
                    ) : (
                        <p>검색 결과가 없습니다.</p>
                    )
                }
            </ul>
        </div>
    );
};

export default ProductSearch;
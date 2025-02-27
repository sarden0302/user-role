import axios from "axios";

// API_BASE_URL = http://localhost:8080

const API_PRODUCT_URL = "http://localhost:8080/api/products";

const apiProductService = {
    getProducts : function (callback) {
        axios
            .get(API_PRODUCT_URL)
            .then(  // success
                (res) => {
                    console.log("data : ", res.data);
                    callback(res.data)
                }
            )
            .catch( // fail
                (err) => {
                    alert("제품 목록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 발생한 문제 : " + err)
                }
            )

    },

    getSuggestions : function (value, setSugs, setShow) {
        axios
            .get(`${API_PRODUCT_URL}/search?keyword=${value}`)
            .then(  // success
                (res) => {
                    const 제안리스트 = res.data ?.map(p => p.productName) || [];
                    setSugs(제안리스트); // 백엔드에서 가져온 제안리스트에서 이름만 sugs 변수이름으로 전달
                    setShow(true); // 제안 리스트를 sugs 변수이름으로 담을 시 true;
                }
            )
            .catch( // fail
                (error) => {
                    /*
                        console.log 일 경우에는
                        -> function() 소 괄호 내부에 err 작성해야하지만

                        console.error
                        -> function() 소 괄호 내부에 err 작성 필요 x
                     */

                    console.error("추천 검색어 동작 실행 실패 : ", error);
                    setSugs([]);    // 새로운 input 값이 들어왔을 때 문제가 발생하면 기존에 추천한 리스트를 모두 비우기
                }
            )
    },

    getProductsById : function (productId, setProduct) {
        axios
            .get(`${API_PRODUCT_URL}/${productId}`)
            .then(  // success
                (response) => {
                    if (response.data) {    // 데이터가 1개 이상 존재할 때
                        // 데이터 setProduct 로 전달
                        setProduct(response.data);
                    } else {
                        alert("찾으시는 상품 목록이 없습니다.");
                        setProduct(null);
                    }
                }
            )
            .catch( // fail
                (error) => {
                    console.error("error code : " + error);
                    alert("상품 조회 중 예기치 못한 에러가 발생했습니다.");
                    setProduct(null);
                }
            )
    },

    getSearchProduct : function (keyword, setProducts, setKeyword) {
        axios
            .get(`${API_PRODUCT_URL}/search?keyword=${keyword}`)
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
    },

    deleteProduct : function (productId) {
        axios
            .delete(API_PRODUCT_URL)
            .then(
                (response) => {
                    console.log(response.data + "개 삭제되었습니다.");
                }
            )
            .catch(
                (error) => {
                    console.log("error 발생 " + error);
                }
            )
    }

    // 불러올기능명칭 : function () {}
}

export  default  apiProductService;
import axios, {get} from 'axios';

// API_URL 이름 사용 금지
const API_CLOTHES_URL = "http://localhost:8080/api/clothes";

/*
    const 기능명칭 = {
        1번 기능 : function () {
        },
        2번 기능 : function () {
        },
        3번 기능 : function () {
        },
    }
    export default 기능명칭;
    외부 파일에서 기능명칭 안에 들어있는 기능을 사용하기 위해서는
    기능명칭.1번기능(); 와 같이 사용
*/
const apiClothesService = {
    getAllClothes : function (callBack) {
        axios
            .get(API_CLOTHES_URL)
            // async 와 await 을 통해 .then 을 여러가지 상황에 맞게 세부적으로 나눌 수 있다.
            .then(
                (res) => {
                    callBack(res.data);
                    console.log(res.data);
                }
            )
            .catch(
                // error 발생 시 err 는 자동으로 err 변수이름에 선언
                (err) => {
                    alert("옷 목록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 발생한 문제 : " + err)
                }
            )
    },

    getClothesById : function (id, callBack) {
        axios
            .get(`${API_CLOTHES_URL}/${id}`)
            .then(
                (res) => {
                    callBack(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("해당 옷을 불러오는 중 오류가 발생했습니다.");
                    console.error("detail err 발생한 문제 : " + err)
                }
            );
    },

    insertClothes : function (cName, cCategory, cBrand, cColor, cSize, cMaterial, cPrice, cStock, cGender, cSeason) {
        const formData = new FormData();
        formData.append("cName", cName);
        formData.append("cCategory", cCategory);
        formData.append("cBrand", cBrand);
        formData.append("cColor", cColor);
        formData.append("cSize",  cSize);
        formData.append("cMaterial", cMaterial);
        formData.append("cPrice", cPrice);
        formData.append("cStock", cStock);
        formData.append("cGender", cGender);
        formData.append("cSeason", cSeason);

        axios
            .post(`${API_CLOTHES_URL}`,
                formData,
                {
                    headers: {"Content-Type" : "multipart/form-data"}
                }
            )
            .then(
                (response) => {
                    console.log("데이터 추가 : " + response.data)
                    alert(cName + "가 추가되었습니다.");
                }
            )
            .catch(
                (err) => {
                    alert("옷 데이터를 저장하던 중 문제가 발생했습니다.");
                    console.log("Clothes Form Error : ", err);
                }
            );
    },

    updateClothes : function (cid, cName, cCategory, cBrand, cColor, cSize, cMaterial, cPrice, cStock, cGender, cSeason) {
        const formData = new FormData();
        formData.append("cId", cid);
        formData.append("cName", cName);
        formData.append("cCategory", cCategory);
        formData.append("cBrand", cBrand);
        formData.append("cColor", cColor);
        formData.append("cSize",  cSize);
        formData.append("cMaterial", cMaterial);
        formData.append("cPrice", cPrice);
        formData.append("cStock", cStock);
        formData.append("cGender", cGender);
        formData.append("cSeason", cSeason);

        axios
            .put(`${API_CLOTHES_URL}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(  // 백엔드와 연결을 성공했습니다.
                (res) => {
                    console.log("updatePost res.data : ", res.data);
                    alert(cName + "가 변경되었습니다.");
                }
            )
            .catch( // 백엔드와 연결을 실패했습니다.
                (err) => {
                    alert(err);
                }
            );
    },

    deleteClothes : function (id) {
        axios
            .delete(`${API_CLOTHES_URL}/${id}`)
            .then(
                () => {
                    // callback(response.data)
                    alert("삭제 성공");
                })
            .catch(
                // 백엔드에서 삭제가 불가능할 때
                // 알람으로 백엔드에서 컨트롤러 연결에 실패하였습니다.
                error => {
                    alert("삭제 실패");
                    console.error("프론트엔드에서 확인할 에러 메세지 : " + error);
                });
    },

}

export default apiClothesService;
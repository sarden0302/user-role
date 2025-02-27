import axios, {get} from 'axios';
// API_URL 이름 사용 금지
const API_URL = "http://localhost:8080/api/clothes";

const apiClothesService = {
    getAllClothes : function (callBack) {
        axios
            .get(API_URL)
            .then(
                (res) => {
                    callBack(res.data);
                    console.log(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("옷 목록을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 발생한 문제 : " + err)
                }
            )
    },

    getClothesById : function (id, callBack) {
        axios
            .get(`${API_URL}/${id}`)
            .then(
                (res) => {
                    callBack(res.data);
                }
            )
            .catch(
                (err) => {
                    alert("해당 옷을 불러오는 중 오류가 발생했습니다.");
                    console.error("err 발생한 문제 : " + err)
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
            .post(`${API_URL}`,
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
            .put(`${API_URL}`, formData, {
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
            .delete(`${API_URL}/${id}`)
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
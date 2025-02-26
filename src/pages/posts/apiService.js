// axios. 작성했던 기능을 모아서 설정한 다음 각 jsx 파일로 전달
// 기능이랑 view 는 다름

// port 환경변수 설정
//                          스프링부트 실행 포트 RestController 에서 RequestMapping 에 작성한 api 를 그대로 작성

import axios from "axios";

const API_POST_URL = "http://localhost:8080/api/posts";

const apiService = {
    // 외부에서 사용할 메서드 명칭 :
    // 파일명 소문자인 이유 -> 기능설정 (파라미터 값) {기능작성}
    // 파일명 대문자       -> view (component)
    //                   -> jsx 파일인 이유 : js 기능 + html 기능
    // callback : 전달받은 값
    /* 데이터를 백엔드에서 가지고 왔을 때 왜 res.data 로 작성하는가 ?!
        : 백엔드 RestController 에 작성된 해당 함수의 return 문
    */
    getAllPosts : function (callback, errCallback) {
            axios
                .get(API_POST_URL)
                .then(
                    (res) => {
                        if (res.data.length > 0) {
                            callback(res.data);
                        } else {
                            alert("백엔드에서 가져올 수 있는 데이터가 없습니다.");
                        }
                    }
                )
                .catch(
                    (err) => {
                        alert("게시물을 불러오는 중 오류가 발생했습니다.");
                        errCallback("게시판 목록 보기 실패");
                        console.log("err 문제 개발자가 확인하기 : " + err)
                    }
                );
    },

    // , 로 기능 구분
    getPostById : function (postId, setPost, setErr) {
            axios
                // .get(API_POST_URL + postId) // http://localhost:8080/api/posts1
                // .get(API_POST_URL + "/" + postId)
                .get(`${API_POST_URL}/${postId}`)
                .then(
                    res => setPost(res.data)
                )
                .catch(
                    err => {
                        alert("백엔드에서 데이터를 가져올 수 없습니다.");
                        console.log("개발자만 무슨 문제인지 확인할 수 있도록 설정 : ", setErr(err));
                    }
                )
        },

    searchPost : function (keyword, callback, errorCallback) {
            // encodeURIComponent -> 영어, 숫자 이외 값이 왔을 때 문제가 생길 경우 UTF-8
            axios.get(`${API_POST_URL}/search?keyword=${encodeURIComponent(keyword)}`)
                .then(response => callback(response.data))
                .catch(error => errorCallback(error));
        },

    suggestedPosts : function (value, callback, errorCallback) {
            axios
                .get(`${API_POST_URL}/search?keyword=${value}`)
                .then(
                    res => {
                        const sugsLists = res.data?.map(p => p.postTitle) || [];
                        callback(sugsLists);
                        errorCallback(true);
                    }
                )
                .catch(
                    err => {
                        callback([]);
                        errorCallback(false);
                        console.log("개발자만 무슨 문제인지 확인할 수 있도록 설정 : ", errorCallback(err));
                    }
                )
        },

    createPost: function (postData, callback, errorCallback) {
        axios.post(API_POST_URL, postData, {
            headers: { "Content-Type": "application/json" }
        })
            .then(response => callback(response.data))
            .catch(error => errorCallback(error));
    },

    updatePost: function (postId, postData, callback, errorCallback) {
        axios.put(`${API_POST_URL}/${postId}`, postData, {
            headers: { "Content-Type": "application/json" }
        })
            .then(  // 백엔드와 연결을 성공했습니다.
                (res) => {
                    alert(callback);
                    console.log("updatePost res.data : ", res.data);
                    if (res.data && res.data.updatedAt) {
                        alert(callback);    // 게시물이 수정되었다. 표기
                    } else {
                        alert("변경된 내용이 없습니다.");
                    }
                }
            )
            .catch( // 백엔드와 연결을 실패했습니다.
                (err) => {
                    alert(errorCallback);
                }
            );
    },

    // PostDetail 에서 전달받은 매개변수 자리
    //             매 개 변 수 는 전달 받은 값을 기능 내에서 사용할 수 있돌고 설정한 이름일 뿐이기 때문에
    //             postId 가 아니라 abc, apple, xyz 와 같은 이름으로 작성 후 {} 내부에서 작성한 변수 이름 활용
    // deletePost: function (PostDetail 에서 apiService 를 호출하여 deletePost 기능을 실행했을 때 가져온 postId,
    //                       PostDetail 에서 apiService 를 호출하여 deletePost 기능을 실행했을 때 가져온 callback,
    //                       PostDetail 에서 apiService 를 호출하여 deletePost 기능을 실행했을 때 가져온 errorCallback) {
    deletePost: function (postId) {
        axios.delete(`${API_POST_URL}/${postId}`)
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
    }

    /*
        자바스크립트는 , 뒤에 다른 값이 존재하지 않아도 문제가 발생하지 않으므로
        문제가 발생하지 않으므로 기능이나 목록을 작성할 때 , 를 작성해주는 것이 좋음!
     */
}

// export default {apiService}
export default apiService;
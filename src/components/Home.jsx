import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Home = () => {
    const navigate = useNavigate(); // window.location.href; 처럼 JS 에서 이동 경로 설정

    const [user, setUser] = useState(null);

    // 메인에서 로그인한 정보가 존재할 경우 Session 에서 가져온 로그인 정보로 메인 설정

    /* Java Spring Boot 에서 저장한 Session 은 자바 내에만 저장이 되는 것이 아니라 자신의 컴퓨터 Web 에 임시 저장
         임시로 저장된 session 정보에 user 라는 변수 이름으로 저장된 유저가 존재한다면
          -> user 라는 명칭으로 저장된 유저 정보를 getItem 으로 가져오기
         가져온 데이터가 JSON 형식이 아니라 객체나 배열 or 다른 형태로 존재한다면
          -> JSON 형식으로 parse(변환)하여 유저정보를 확인
    */
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div>
            <h1>홈페이지</h1>
            {
                user ? (
                    <div>
                        <p>환영합니다. {user.useName}님!</p>
                        <button>로그아웃</button>
                        {/* 역할에 따라 다른 컴포넌트 랜더링 */}
                    </div>)
                : (
                    <div>
                        <button onClick={() => navigate("/login")}>로그인</button>
                        <button onClick={() => navigate("/")}>회원가입</button>
                    </div>)
            }
        </div>
    )
}

export default Home;
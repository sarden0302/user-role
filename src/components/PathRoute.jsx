// Header 와 Footer 사용
// 로그인 정보에 따라 보여줄 페이지 설정
// 이외 전체 페이지 경로 설정
// ViewController 와 같은 역할
import {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";

function PathRoute () {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter >
            {/* 경로와 관계 없는 jsx 파일은
                Routes 외부에 작성
            */}
            <Routes>
                {/* 0. 관리자, 회사, 유저에 관계 없이 전체 접근 가능 Components */}
                <Route  path="/" element={<Home />} />
                {/* 1. 관리자만 접근 가능 Components */}

                {/* 2.  회사만 접근 가능 Components */}

                {/* 3.  유저만 접근 가능 Components */}


            </Routes>

        </BrowserRouter>
    )

}

export default PathRoute;
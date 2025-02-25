import {post} from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import apiService from "./apiService";

const PostDetail = () => {
    /*
        기본 자바 스크립트에서 페이지를 이동할 때
            -> window.location.href("이동할 경로") 로 페이지 이동
        리엑트 자바스크립트에서 페이지를 이동할 때
            -> useNavigate("") hook 을 사용해서 페이지 이동
            Link 의 경우 a 태그 대신 활용

            useNavigate = html 형식이 아니라 자바스크립트 내에서 특정 행동을 진행한 후
            페이지를 이동하거나 페이지 이동 후 특정 기능을 수행해야할 때 사용

            const navigate = useNavigate(); 선언 후 사용
            navigate(-1) : 뒤 페이지로 이동하기
            navigate(+1) : 앞 페이지로 이동하기
     */
    const navigate = useNavigate();
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        apiService.getPostById(postId, setPost, setErr);
    }, [postId]);

    if (!post) {
        return <p>게시물 불러오는 중입니다.</p>
    }

    /*
        alert(message)
            : 간단한 알림 메세지 표시
            - 확인 버튼 누르기만 가능
            - (사용자가 입력한 문자열) 입력 or 반환   불가
        prompt(message, defaultValue)
            : 사용자로부터 입력을 받을 때 사용
            - 확인, 취소 버튼 존재 (※ 취소버튼을 누르면 null 값 반환)
            - (사용자가 입력한 문자열) 문자열 입력    가능
            defaultValue = 입력하는 기본 값을 제공할 수 있음 (보통 사용 x) default : null
        confirm(message)
            : 사용자의 확인 또는 취소 여부 물어볼 때 사용
            - (사용자가 입력한 문자열) 입력          불가
            - 확인, 취소 버튼 존재
            - 확인 : true       취소 : false      반환
            window.confirm("") -> window 객체 내부에 들어있는 메서드이기 때문에
            ※ confirm 도 JS 에서 window 생략 가능 but, 리액트의 경우에는 생략 불가능!!!
     */
    const handleDelete = () => {
        alert("알람 메세지");
        prompt("프롬포트 메세지", "기본값");
        window.confirm("확인 취소 메세지");

        if (window.confirm("정말 삭제하시겠습니까?")) {
            // apiService 에서 deletePost 메서드 호출
            apiService.deletePost(postId);
            // 게시물이 삭제된 상태
            navigate("/"); // main 으로 이동하기
        }
    }

    return (
        <div className="-container">
            <h2>{post.postTitle}</h2>
            <p>{post.postContent}</p>
            {/* ✅ 수정 버튼 */}
            {/* JS 간 이동 */}
            {/* Route 에 작성한 path 와 to 경로를 맞춰서 작성 */}
            <Link to={`/posts/edit/${postId}`}>
                <button>수정</button>
            </Link>
            {/* ✅ 수정 버튼 */}
            <button onClick={handleDelete}>삭제</button>
        </div>
    )
};

export default PostDetail;
import {useState} from "react";
import axios from "axios";
import './UserSearch.css';

const UserSearch = () => {
    const [userName, setUserName] = useState("");
    // 검색 결과의 경우 -> 배열 형태 Cuz 검색 결과는 1개 이상
    // Therefore, []
    const [users, setUsers] = useState([]);

    const searchUser = () => {

        if (!userName.trim()) {
            alert("검색할 이름을 입력하세요.")
            return;
        }

        axios
            .get(`http://localhost:8080/api/user/search?userName=` + userName)
            .then(
                (res) => {
                    setUsers(res.data);
                }
            )
            .catch(
                (error) => {
                    console.log("error : ", error);
                    alert("백엔드 주소와 연결할 수 없는 상태입니다.");
                }
            );
    }

    const getUserRoleText = (role) => {
        switch (role) {
            case "1":
                return "관리자";
            case "2":
                return "업체";
            case "3":
                return "사용자";
            default:
                return "알 수 없음";
        }
    }

    return (
        <div className="usersearch-container">
            <h2>사용자 검색</h2>
            <div className="input-container">
                <input type="text"
                       value={userName}
                       onChange={(e) => {setUserName(e.target.value)}}
                       placeholder="검색할 이름을 입력하세요."
                />
                <button onClick={searchUser}>검색</button>
            </div>
            <ul className="user-list">
                {
                    users.length > 0
                    ?
                    (
                        users.map((user) => (
                                <li key={user.userId}>
                                    <strong>{user.userName}</strong> ({user.userEmail}) - 역할 {getUserRoleText(user.userRole)}
                                </li>
                            )
                        )
                    )
                    :
                    (
                        <div className="no-results">
                            검색결과가 존재하지 않습니다.
                        </div>
                    )
                }

            </ul>
        </div>
    )
}

export default UserSearch;
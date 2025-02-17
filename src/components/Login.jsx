import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios, {post} from "axios";

const Login = () => {

    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        axios
            .post("/api/user/login",
                {userId,  userPassword}
                )
            .then( // backend 와 연결 성공 했을 때
                (response) => {

            })
            .catch( // backend 와 연결 실패 했을 때

            );
    }

    return (
        <div>

        </div>
    )
}

export default Login;
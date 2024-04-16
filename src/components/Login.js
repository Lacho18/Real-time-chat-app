import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginStyle.css";

export default function Login(props) {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [responseMessage, setResponseMessage] = useState("");

    function changeHandler(e) {
        setLoginData(oldData => {
            return { ...oldData, [e.target.name]: e.target.value };
        })
    }

    async function submitHandler(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/user/?data=" + encodeURIComponent(JSON.stringify(loginData)), {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });

        const responseData = await response.json();

        if (responseData.user) {
            props.onLogIn(responseData.user);
            setResponseMessage(() => responseData.message + " You will be navigate to chat app in a second");

            setTimeout(() => {
                navigate("/messages")
            }, 3000);
        }
        else {
            setResponseMessage(responseData.message);
        }
    }

    return (
        <div className="page-div login-div">
            {responseMessage !== "" && <p id="responseLogIn">{responseMessage}</p>}
            <form className="form-style" onSubmit={submitHandler}>
                <label htmlFor="username">Enter your username</label>
                <input type="text" name="username" onChange={changeHandler} />
                <label htmlFor="password">Enter your password</label>
                <input type="password" name="password" onChange={changeHandler} />
                <input type="submit" />
                <Link to="/user/signUp">No account? Create one!</Link>
            </form>
        </div>
    );
}
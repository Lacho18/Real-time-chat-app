import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignUp() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        confPassword: ""
    });
    const [responseMessage, setResponseMessage] = useState("");

    function changeHandle(e) {
        setUserData(oldData => {
            return { ...oldData, [e.target.name]: e.target.value }
        })
    }

    async function submitHandler(e) {
        e.preventDefault();

        let response = await fetch("http://localhost:8000/user", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        let responseData = await response.json();
        if (responseData) {
            console.log(responseData.message);
            setResponseMessage(responseData.message);

            setTimeout(() => {
                if (responseData.message === "User created!") {
                    navigate('/');
                }
            }, 3000);
        }
    }

    return (
        <div className="page-div">
            {responseMessage !== "" && <p className="error-message">{responseMessage}</p>}
            <form className="form-style" onSubmit={submitHandler}>
                <label htmlFor="username">Enter username</label>
                <input onChange={changeHandle} type="text" name="username" />
                <label htmlFor="password">Enter password</label>
                <input onChange={changeHandle} type="password" name="password" />
                <label htmlFor="confPassword">Confirm password</label>
                <input onChange={changeHandle} type="password" name="confPassword" />
                <input type="submit" />
            </form>
        </div>
    );
}
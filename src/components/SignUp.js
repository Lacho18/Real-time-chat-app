import { useState } from "react";

export default function SignUp() {
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
        }
    }

    return (
        <div className="page-div">
            {responseMessage !== "" && <p>{responseMessage}</p>}
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
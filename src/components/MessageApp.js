import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/messageApp.css";

import MessagesWindow from "./MessagesWindow";

export default function MessageApp(props) {
    const [allUsers, setAllUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState("");

    useEffect(() => {
        //Function that sends request to get all users in the database
        async function getAllUsers() {
            const response = await fetch("http://localhost:8000/getAllUsers/?notUser=" + props.user.username, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData) {
                setAllUsers(responseData.allUsers);
            }
        }

        //Checks if the user has logged in
        if (props.user.username) {
            getAllUsers();
        }
    }, [])

    if (props.user.username) {

        //function that updates the view in the Messages window by changing the selected user to chat with
        function selectUserHandler(selectedUser) {
            setCurrentChat(selectedUser);
        }

        //Structure that renders if the user has logged in
        return (
            <div className="page-div">
                <p>Welcome {props.user.username}</p>

                <div className="main-app-div">
                    {currentChat !== "" ? <MessagesWindow currentUser={props.user.username} chatWith={currentChat} /> : <p>Select user to chat with</p>}
                </div>

                <div className="all-users-div">
                    {allUsers.map(indexValue => {
                        return (<div className="single-user" onClick={() => { selectUserHandler(indexValue.username) }}>
                            <img src="https://www.svgrepo.com/show/46297/male-user-shadow.svg" alt="User image" />
                            <p>{indexValue ? indexValue.username : ""}</p>
                        </div>)
                    })}
                </div>
            </div>
        );
    }
    else {

        return (
            <div className="page-div">
                <div>
                    <p>Please log in to your account</p>
                    <Link to="/user/login">Log in</Link>
                </div>
            </div>
        );
    }
}
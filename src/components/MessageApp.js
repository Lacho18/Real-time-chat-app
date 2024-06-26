import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/messageApp.css";

import MessagesWindow from "./MessagesWindow";

export default function MessageApp(props) {
    const [allUsers, setAllUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState("");
    const socket = useRef(null);

    useEffect(() => {
        //Function that sends request to get all users in the database. This is the data displayed on the right side
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

            //Creates a web socket in order to receive data from the server in real time. The socket is inside useRef() variable
            socket.current = new WebSocket('ws://localhost:8080');
            socket.current.onopen = () => {
                console.log('Websocket connection established');
                const dataToSendWebSocket = {
                    data: props.user.username
                }
                socket.current.send(JSON.stringify(dataToSendWebSocket));
            }
        }

        //Checks if the user has logged in
        if (props.user.username) {
            getAllUsers()
        }

        return () => {
            if (props.user.username) {
                socket.current.close();
            }
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
                <p id="welcomeText">Welcome {props.user.username}</p>

                <div className="main-app-div">
                    {currentChat !== "" ? <MessagesWindow currentUser={props.user.username} chatWith={currentChat} webSocket={socket.current} />
                        : <div className="not-selected-user-window"><p>Select user to chat with</p></div>}
                </div>

                <div className="all-users-div">
                    {allUsers.map(indexValue => {
                        return (<div key={indexValue.username} className="single-user" onClick={() => { selectUserHandler(indexValue.username) }}>
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
                <div className="not-login-div">
                    <p>Please log in to your account</p>
                    <Link to="/user/login">Log in</Link>
                </div>
            </div>
        );
    }
}
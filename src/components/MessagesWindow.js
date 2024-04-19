import { useState } from "react";

export default function MessagesWindow(props) {
    const [message, setMessage] = useState("");

    function sendMessage(e) {
        //let messageToSend = e.target.value;
        let messageData = {
            sendFrom: props.currentUser,
            sendTo: props.chatWith,
            message: e.target.value,
            timeOfSending: new Date()
        }
        //Sending the data to the server and updating the interface
    }

    return (
        <div className="messages-app-div" style={{ display: "flex", flexDirection: "column" }}>
            <div className="messages-header">
                <img src="https://www.svgrepo.com/show/46297/male-user-shadow.svg" alt="user image" />
                <p>{props.chatWith}</p>
            </div>

            <div className="main-section">
                <p>Text</p>
            </div>

            <div className="messages-footer">
                <input type="text" />
                <button>👍</button>
                <button onClick={sendMessage}>📩</button>
            </div>
        </div>
    );
}
import { useRef, useState } from "react";

export default function MessagesWindow(props) {
    //const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const message = useRef("");

    async function sendMessage(e) {
        //let messageToSend = e.target.value;
        let messageData = {
            sendFrom: props.currentUser,
            sendTo: props.chatWith,
            message: message.current,
            timeOfSending: new Date()
        }

        //Sending the data to the server and updating the interface
        let response = await fetch(`http://localhost:8000/messages`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        let responseData = await response.json();

        if (responseData.message !== "Success") {
            setErrorMessage(responseData.message);
        }
    }

    return (
        <div className="messages-app-div" style={{ display: "flex", flexDirection: "column" }}>
            <div className="messages-header">
                <img src="https://www.svgrepo.com/show/46297/male-user-shadow.svg" alt="user image" />
                <p>{props.chatWith}</p>
            </div>

            <div className="main-section">
                {errorMessage !== "" && <p>{errorMessage}</p>}
                <p>Text</p>
            </div>

            <div className="messages-footer">
                <input type="text" id="messageInput" onChange={(e) => { message.current = e.target.value }} />
                <button>👍</button>
                <button onClick={() => {
                    sendMessage();
                    document.getElementById("messageInput").value = "";
                }}>📩</button>
            </div>
        </div>
    );
}
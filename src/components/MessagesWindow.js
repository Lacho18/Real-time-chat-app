import { useEffect, useRef, useState } from "react";
import "../styles/messageWindowStyle.css";
import ChatComponent from "./ChatComponent";

export default function MessagesWindow(props) {
    //const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState([]);
    const [loading, setIsLoading] = useState(true);

    const message = useRef("");
    const divRef = useRef("");

    useEffect(() => {
        async function fetchData() {
            try {
                //Sets the sender and receiver of the messages in JSON object
                let chatDuo = {
                    currentUser: props.currentUser,
                    chatWith: props.chatWith
                }
                //Sends http get request to get the last 20 or more messages between the two users
                const response = await fetch(`http://localhost:8000/messages/?chatDuo=${encodeURIComponent(JSON.stringify(chatDuo))}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const responseData = await response.json();
                setIsLoading(false);
                //Checks if the received data is an array 
                if (Array.isArray(responseData)) {
                    setData(responseData);
                } else {
                    setErrorMessage(responseData.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMessage('Failed to fetch data');
            }
        }

        fetchData();
        //Creates a web socket in order to receive data from the server in real time
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            console.log('Websocket connection established');
        }

        //function that is called when data is send with this web socket
        socket.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            console.log('Received new data from WebSocket:', newData);
            //Adds the new data to already existing array that visualize the messages
            setData(oldData => {
                let newArrayData = [...oldData];
                newArrayData.push(newData);
                return newArrayData;
            });
        };

        return () => {
            // Clean up WebSocket connection on component unmount
            socket.close();
        };
    }, [props.chatWith])

    async function sendMessage() {
        //Set up the object that will be inserted in the database
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

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }

        message.current = "";
    }

    if (loading) {
        <div>
            <p>Loading. Please wait!</p>
        </div>
    }
    else {
        return (
            <div className="messages-app-div" style={{ display: "flex", flexDirection: "column" }}>
                <div className="messages-header">
                    <img src="https://www.svgrepo.com/show/46297/male-user-shadow.svg" alt="user image" />
                    <p>{props.chatWith}</p>
                </div>

                <div className="main-section">
                    {errorMessage !== "" && <p className="error-message" style={{}}>{errorMessage}</p>}
                    {/*Component that visualize all the messages*/}
                    <ChatComponent messageData={data} currentUser={props.currentUser} />
                </div>

                <div className="messages-footer">
                    <input type="text" id="messageInput"
                        onChange={(e) => { message.current = e.target.value }}
                        onKeyDown={(e) => {
                            //Triggers if the Enter key is pressed
                            if (e.key === 'Enter') {
                                sendMessage();
                                document.getElementById("messageInput").value = "";
                            }
                        }}
                    />
                    <button onClick={() => {
                        message.current = "👍";
                        sendMessage();
                    }}>👍</button>
                    <button onClick={() => {
                        sendMessage();
                        //Clears the text in the input field after sending the message
                        document.getElementById("messageInput").value = "";
                    }}
                    >📩</button>
                </div>
            </div>
        );
    }
}
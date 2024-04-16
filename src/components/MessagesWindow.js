export default function MessagesWindow(props) {

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
            </div>
        </div>
    );
}
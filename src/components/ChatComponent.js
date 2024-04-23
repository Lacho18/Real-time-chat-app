import { useEffect, useRef } from "react";

export default function ChatComponent(props) {
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [divRef])

    return (
        <div ref={divRef} className="chatMainDiv">
            {props.messageData.map(indexValue => {
                return (
                    <div key={indexValue.id} className={`chatDivs ${indexValue.sendFrom === props.currentUser ? "SenderDiv" : "chatWithDiv"}`}>
                        <p id="fromMessageTitle">from {indexValue.sendFrom}</p>
                        <p style={{ marginTop: "0px" }}>{indexValue.message}</p>
                    </div>
                );
            })}
        </div>
    )
}
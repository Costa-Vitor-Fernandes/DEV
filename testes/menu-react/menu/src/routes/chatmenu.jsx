import ChatMenuBar from "../mini-components/ChatMenuBar";

export default function Chatmenu(){
    document.title ="JF Freelancer Chat"
    return(
        <div className="main-section">
            <h4>Chat-menu</h4>
            <ChatMenuBar />
            <ChatMenuBar />
        </div>

    )
}
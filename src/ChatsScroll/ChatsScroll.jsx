import ChatsModalElement from "../ChatsModal/ChatsModelElement";
import "./ChatsScroll.css";

export default function ChatsScroll({ chats, onChatClicked }) {
  return (
    <div className="chatsScrollWrapper">
      <div className="chatsScroll">
        {chats.map((chat) => (
          <ChatsModalElement
            onSelect={onChatClicked}
            key={chat.id}
            chatData={chat}
          ></ChatsModalElement>
        ))}
      </div>
    </div>
  );
}

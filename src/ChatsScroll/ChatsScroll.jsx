import ChatsModalElement from "../ChatsModal/ChatsModelElement";
import ChatsModalElementSharing from "../ChatsModal/ChatsModalElementSharing";
import "./ChatsScroll.css";

export default function ChatsScroll({
  chats,
  onChatClicked,
  height,
  sharing,
  onShareAction,
}) {
  return (
    <div className="chatsScrollWrapper">
      <div
        className="chatsScroll"
        style={{
          height: `${height}px`,
        }}
      >
        {chats &&
          !sharing &&
          chats.map((chat) => (
            <ChatsModalElement
              onSelect={onChatClicked}
              key={chat.id}
              chatData={chat}
            ></ChatsModalElement>
          ))}
        {chats &&
          sharing &&
          chats.map((chat) => (
            <ChatsModalElementSharing
              onSelect={onChatClicked}
              key={chat.id}
              chatData={chat}
              onSendAction={onShareAction}
            ></ChatsModalElementSharing>
          ))}
      </div>
    </div>
  );
}

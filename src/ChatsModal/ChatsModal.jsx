import "./ChatsModal.css";
import ChatsModalElement from "./ChatsModelElement";

export default function ChatsModal({ chats }) {
  return (
    <div className="chatModalBlock">
      <div className="chatModalContainer">
        <div className="chatModalBlockHeader">Сообщения</div>
        {chats.map((chat) => (
          <ChatsModalElement key={chat.id} chatData={chat}></ChatsModalElement>
        ))}
      </div>
    </div>
  );
}

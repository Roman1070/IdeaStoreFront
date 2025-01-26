import { useState } from "react";
import "./ChatsModal.css";
import ChatsModalElement from "./ChatsModelElement";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";

export default function ChatsModal({ chats }) {
  const [selectedChat, setSelectedChat] = useState();
  function onChatClicked(chatData) {
    setSelectedChat(chatData);
  }

  return (
    <div className="chatModalBlock">
      <div className="chatModalContainer">
        {!selectedChat && <div className="chatModalBlockHeader">Сообщения</div>}
        {selectedChat && (
          <div className="selectedChatHeader">
            <SmallRoundButton
              marginRight={20}
              size={48}
              imgSrc={GetLocalImageSrc("leftArrow.png")}
            ></SmallRoundButton>

            <img
              className="selectedChatHeaderImage"
              src={
                selectedChat.avatar
                  ? GetImageSrc(selectedChat.avatar)
                  : GetLocalImageSrc("user.png")
              }
            ></img>
          </div>
        )}
        {!selectedChat &&
          chats.map((chat) => (
            <ChatsModalElement
              onSelect={onChatClicked}
              key={chat.id}
              chatData={chat}
            ></ChatsModalElement>
          ))}
        {selectedChat && <div className="selectedChatWrapper"></div>}
      </div>
    </div>
  );
}

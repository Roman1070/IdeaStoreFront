import { useState } from "react";
import "./ChatsModal.css";
import ChatsModalElement from "./ChatsModelElement";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import { GetMessages, SendMessage } from "../requests";
import MessagesScroll from "../MessagesScroll/MessagesScroll";
import InputField from "../InputField/InputField";
import ChatsModalSelectedChat from "./ChatsModalSelectedChat";
export default function ChatsModal({
  chats,
  currentProfile,
  chatsWS,
  closeFunc,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [searching, setSearching] = useState();
  const [searchText, setSearchText] = useState();

  function onChatClicked(chatData) {
    setSelectedChat(chatData);
  }

  return (
    <div className="chatModalBlock">
      <div className="chatModalContainer">
        {!selectedChat && (
          <div className="chatModalBlockHeader">
            <SmallRoundButton
              marginRight={50}
              size={48}
              imgSrc={GetLocalImageSrc("leftArrow.png")}
              onClick={() => closeFunc()}
            ></SmallRoundButton>
            <span>Сообщения</span>
          </div>
        )}
        {selectedChat && (
          <ChatsModalSelectedChat
            chatsWS={chatsWS}
            selectedChat={selectedChat}
            currentProfile={currentProfile}
            setSelectedChatFunc={setSelectedChat}
          ></ChatsModalSelectedChat>
        )}
        {!selectedChat && (
          <div className="chatsModalElement">
            <img
              className="chatsModalNewMessageIcon"
              src={GetLocalImageSrc("write.png")}
            ></img>
            <div className="chatsModalElementName">Новое сообщение</div>
          </div>
        )}
        {!selectedChat && chats && (
          <div
            style={{
              margin: "0 0 10px 24px",
            }}
          >
            Ваши чаты
          </div>
        )}
        {!selectedChat &&
          chats &&
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

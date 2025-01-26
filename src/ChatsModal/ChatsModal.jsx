import { useState } from "react";
import "./ChatsModal.css";
import ChatsModalElement from "./ChatsModelElement";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import { GetMessages } from "../requests";
import MessagesScroll from "../MessagesScroll/MessagesScroll";

export default function ChatsModal({ chats, currentProfile }) {
  const [selectedChat, setSelectedChat] = useState();
  const [currentMessages, setCurrentMessages] = useState();
  function onChatClicked(chatData) {
    setSelectedChat(chatData);
    GetMessages(chatData.id, (msgs) => {
      setCurrentMessages(msgs);
    });
  }

  return (
    <div className="chatModalBlock">
      <div className="chatModalContainer">
        {!selectedChat && <div className="chatModalBlockHeader">Сообщения</div>}
        {selectedChat && (
          <>
            <div className="selectedChatHeader">
              <SmallRoundButton
                onClick={() => setSelectedChat(null)}
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
              <div className="selectedChatHeaderName">{selectedChat.name}</div>
            </div>
            {currentMessages && (
              <MessagesScroll
                theirProfile={selectedChat}
                messages={currentMessages}
                currentProfile={currentProfile}
              ></MessagesScroll>
            )}
          </>
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

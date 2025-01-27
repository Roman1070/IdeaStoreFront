import { useState } from "react";
import "./ChatsModal.css";
import ChatsModalElement from "./ChatsModelElement";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import { GetMessages, SendMessage } from "../requests";
import MessagesScroll from "../MessagesScroll/MessagesScroll";
import InputField from "../InputField/InputField";
export default function ChatsModal({ chats, currentProfile }) {
  const [selectedChat, setSelectedChat] = useState();
  const [currentMessages, setCurrentMessages] = useState();
  const [message, setMessage] = useState();
  const [messageError, setMessageError] = useState();
  const chatMessagesScroll = document.getElementById("chatMessagesScroll");

  if (chatMessagesScroll) {
    chatMessagesScroll.scrollTop = chatMessagesScroll.scrollHeight;
  }

  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }
  function onChatClicked(chatData) {
    setSelectedChat(chatData);
    GetMessages(chatData.id, (msgs) => {
      setCurrentMessages(msgs);
    });
  }

  function trySendMessage() {
    if (!message) {
      setMessageError("Message can't be empty");
      return;
    }

    SendMessage(selectedChat.id, message, "", (respJson) => {
      var currentdate = new Date();
      const datetime =
        pad(currentdate.getDate()) +
        "." +
        pad(currentdate.getMonth() + 1) +
        "." +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      const msg = {
        id: respJson.id,
        sender_id: currentProfile.id,
        reciever_id: selectedChat.id,
        text: message,
        sending_date: datetime,
      };
      currentMessages.push(msg);
      setCurrentMessages(currentMessages);
      setMessage("");
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
                id="chatMessagesScroll"
                theirProfile={selectedChat}
                messages={currentMessages}
                currentProfile={currentProfile}
              ></MessagesScroll>
            )}
            <div className="inputMessageBlock">
              <div className="inputMessageWrapper">
                <InputField
                  id="inputMessageInChatInputField"
                  error={messageError}
                  isCorrect={!messageError}
                  value={message}
                  onChangeAction={(value) => {
                    setMessage(value);
                    setMessageError("");
                  }}
                  placeholder="Введите сообщение..."
                ></InputField>
              </div>
              <div className="sendMessageInChatButton">
                <SmallRoundButton
                  size={40}
                  marginRight={10}
                  imgSrc={GetLocalImageSrc("sendMessage.png")}
                  onClick={() => trySendMessage()}
                ></SmallRoundButton>
              </div>
            </div>
          </>
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

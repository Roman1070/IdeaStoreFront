import { useState } from "react";
import MessagesScroll from "../MessagesScroll/MessagesScroll";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import "./ChatsModal.css";
import { GetMessages, SendMessage } from "../requests";
import InputField from "../InputField/InputField";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import { Link } from "react-router-dom";
export default function ChatsModalSelectedChat({
  chatsWS,
  selectedChat,
  currentProfile,
  setSelectedChatFunc,
  updateChatsFunc,
}) {
  const [message, setMessage] = useState();
  const [messageError, setMessageError] = useState();
  const [currentMessages, setCurrentMessages] = useState();

  setTimeout(() => {
    const chatMessagesScroll = document.getElementById("chatMessagesScroll");

    if (chatMessagesScroll) {
      chatMessagesScroll.scrollTop = chatMessagesScroll.scrollHeight;
    }
  }, 20);

  if (!currentMessages) {
    GetMessages(selectedChat.id, (msgs) => {
      setCurrentMessages(msgs);
    });
  }
  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }
  function trySendMessage() {
    if (!message) {
      setMessageError("Message can't be empty");
      return;
    }

    SendMessage(selectedChat.id, message, "", !currentMessages, (respJson) => {
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
      if (currentMessages) {
        currentMessages.push(msg);
        setCurrentMessages(currentMessages);
      } else {
        setCurrentMessages([].concat(msg));
        updateChatsFunc();
      }
      setMessage("");

      if (chatsWS) {
        chatsWS.send(JSON.stringify(msg));
      }
    });
  }

  chatsWS.onmessage = function (event) {
    const msg = JSON.parse(event.data);

    if (
      msg.reciever_id == currentProfile.id &&
      msg.sender_id == selectedChat.id
    ) {
      console.log(msg);
      setCurrentMessages(currentMessages.concat(msg));
    }
  };
  return (
    <>
      <div className="selectedChatHeader">
        <SmallRoundButton
          onClick={() => setSelectedChatFunc(null)}
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
        <a
          href={`/profile/${selectedChat.id}`}
          className="selectedChatHeaderLink"
        ></a>
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
  );
}

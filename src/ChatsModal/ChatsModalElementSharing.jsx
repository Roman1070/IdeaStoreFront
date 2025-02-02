import { useState } from "react";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import "./ChatsModal.css";

export default function ChatsModalElementSharing({
  chatData,
  onSelect,
  currentProfileId,
  onSendAction,
}) {
  const [sent, setSent] = useState();
  function onSendClicked() {
    if (!sent && onSendAction) {
      onSendAction(chatData.id);
      setSent(true);
    }
  }
  if (currentProfileId != chatData.id)
    return (
      <div
        className="chatsModalElementSharing"
        onClick={onSelect ? () => onSelect(chatData) : () => {}}
      >
        <img
          className="chatsModalElementImage"
          src={
            chatData.avatar
              ? GetImageSrc(chatData.avatar)
              : GetLocalImageSrc("user.png")
          }
        ></img>
        <div className="chatsModalElementName">{chatData.name}</div>
        <div
          onClick={onSendClicked}
          className={
            sent
              ? "chatsModalElementSendButtonLocked"
              : "chatsModalElementSendButton"
          }
        >
          <div
            style={{
              margin: "auto",
              paddingBottom: "2px",
            }}
          >
            {sent ? "Отправлено" : "Отправить"}
          </div>
        </div>
      </div>
    );
}

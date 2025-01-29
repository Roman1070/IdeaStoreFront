import { GetImageSrc, GetLocalImageSrc } from "../utils";
import "./ChatsModal.css";

export default function ChatsModalElement({
  chatData,
  onSelect,
  currentProfileId,
}) {
  if (currentProfileId != chatData.id)
    return (
      <div className="chatsModalElement" onClick={() => onSelect(chatData)}>
        <img
          className="chatsModalElementImage"
          src={
            chatData.avatar
              ? GetImageSrc(chatData.avatar)
              : GetLocalImageSrc("user.png")
          }
        ></img>
        <div className="chatsModalElementName">{chatData.name}</div>
      </div>
    );
}

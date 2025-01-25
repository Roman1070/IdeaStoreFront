import { GetImageSrc, GetLocalImageSrc } from "../utils";
import "./ChatsModal.css";

export default function ChatsModalElement({ chatData }) {
  return (
    <div className="chatsModalElement">
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

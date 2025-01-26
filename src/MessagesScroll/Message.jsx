import { GetImageSrc, GetLocalImageSrc } from "../utils";
import "./MessagesScroll.css";

export default function Message({ message, theirProfile, currentProfile }) {
  return (
    <div
      className={
        currentProfile.id == message.sender_id
          ? "myMessageBlock"
          : "theirMessageBlock"
      }
    >
      {currentProfile.id != message.sender_id && (
        <img
          className="messageSenderAvatarLeft"
          src={
            theirProfile.avatar
              ? GetImageSrc(theirProfile.avatar)
              : GetLocalImageSrc("user.png")
          }
        ></img>
      )}
      <div
        className={
          currentProfile.id == message.sender_id
            ? "messageBlockMyContent"
            : "messageBlockTheirContent"
        }
      >
        <div className="messageText">{message.text}</div>
      </div>
      {currentProfile.id == message.sender_id && (
        <img
          className="messageSenderAvatarRight"
          src={
            currentProfile.avatarImage
              ? GetImageSrc(currentProfile.avatarImage)
              : GetLocalImageSrc("user.png")
          }
        ></img>
      )}
    </div>
  );
}

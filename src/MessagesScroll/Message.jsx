import { Link } from "react-router-dom";
import { GetImageSrc, GetLocalImageSrc, IsVideo } from "../utils";
import "./MessagesScroll.css";

export default function Message({ message, theirProfile, currentProfile }) {
  console.log(message);
  var isVideo = false;
  if (message.file_name) {
    isVideo = IsVideo(message.file_name);
  }
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
        {message.file_name && !isVideo && (
          <div className="messageImageContainer">
            <img
              src={GetImageSrc(message.file_name)}
              className="messageImage"
            ></img>
            {message.idea_id && (
              <Link
                to={`/idea/${message.idea_id}`}
                className="messageImageLink"
              ></Link>
            )}
          </div>
        )}
        {message.file_name && isVideo && (
          <div className="messageImageContainer">
            <video
              muted
              loop
              autoPlay
              src={GetImageSrc(message.file_name)}
              className="messageVideo"
            ></video>
            {message.idea_id && (
              <Link
                to={`/idea/${message.idea_id}`}
                className="messageImageLink"
              ></Link>
            )}
          </div>
        )}
        {message.text && <div className="messageText">{message.text}</div>}
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

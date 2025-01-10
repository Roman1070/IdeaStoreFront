import { GetLocalImageSrc, JoinReactHostAddress } from "../utils";
import "./IdeaPreviewPage.css";
export default function IdeaComment({ comment }) {
  return (
    <div className="ideaComment">
      <img
        className="ideaCommentAvatar"
        src={GetLocalImageSrc("profileTemp.jpg")}
      ></img>
      <div className="ideaCommentContent">
        <div className="ideaCommentUpperContent">
          <a
            href={JoinReactHostAddress(`profile/${comment.userId}`)}
            className="ideaCommentAuthorName"
          >
            {comment.username}
          </a>
          <span className="ideaCommentText">{comment.text}</span>
        </div>
        <div className="ideaCommentLowerContent"></div>
      </div>
    </div>
  );
}

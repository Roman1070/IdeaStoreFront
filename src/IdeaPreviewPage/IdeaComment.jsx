import { GetLocalImageSrc } from "../utils";
import "./IdeaPreviewPage.css";
export default function IdeaComment() {
  return (
    <div className="ideaComment">
      <img
        className="ideaCommentAvatar"
        src={GetLocalImageSrc("profileTemp.jpg")}
      ></img>
      <div className="ideaCommentContent">
        <div className="ideaCommentUpperContent">
          <span className="ideaCommentAuthorName">Author (yaro probably)</span>
          <span className="ideaCommentText">
            TextTextTextTextTextTextTextText Text Text Text Text
          </span>
        </div>
        <div className="ideaCommentLowerContent"></div>
      </div>
    </div>
  );
}

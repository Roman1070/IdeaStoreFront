import IdeaPreviewContentHolder from "../IdeaPreviewPage/IdeaPreviewContentHolder";
import { IsVideo } from "../utils";
import "./CreatePage.css";

export default function СreateIdeaPreviewImage({ src }) {
  console.log(IsVideo(src));
  if (!IsVideo(src)) {
    return (
      <div className="createPageImageWrapper">
        <img id="createIdeaPreviewImage" src={src}></img>
      </div>
    );
  } else {
    return (
      <div className="createPageImageWrapper">
        <video
          controls
          autoPlay
          llop
          muted
          id="createIdeaPreviewImage"
          src={src}
          style={{
            width: "100%",
          }}
        ></video>
      </div>
    );
  }
}

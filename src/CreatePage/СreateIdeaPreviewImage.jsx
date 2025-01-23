import IdeaPreviewContentHolder from "../IdeaPreviewPage/IdeaPreviewContentHolder";
import "./CreatePage.css";

export default function СreateIdeaPreviewImage({ src }) {
  return (
    <div className="createPageImageWrapper">
      <IdeaPreviewContentHolder
        image={src}
        id="createIdeaPreviewImage"
      ></IdeaPreviewContentHolder>
    </div>
  );
}

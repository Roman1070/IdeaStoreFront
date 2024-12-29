import { useState } from "react";
import { GetIdea, GetIdeaSrc } from "../utils";
import "./IdeaPreviewPage.css";

export default function IdeaPreviewPage() {
  const index = window.location.pathname.substring(6);
  const previewBlockH = window.innerHeight * 0.6;
  const [idea, setIdea] = useState([]);
  const [ideaEmpty, setIdeaEmpty] = useState(true);
  if (ideaEmpty) {
    GetIdea(index, (idea) => {
      setIdea(idea);
      setIdeaEmpty(false);
    });
  }
  return (
    <>
      <div className="previewIdeaBlock">
        <div
          className="previewIdeaImageHolder"
          style={{
            height: `${previewBlockH}px`,
          }}
        >
          <img
            className="previewIdeaBlockImage"
            src={GetIdeaSrc(idea.image)}
          ></img>
        </div>
        <div className="previewIdeaDataBlock">
          <div className="previewIdeaDataHeader"></div>
        </div>
      </div>
    </>
  );
}

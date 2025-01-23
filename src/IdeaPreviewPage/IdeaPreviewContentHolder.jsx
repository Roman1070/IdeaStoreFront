import { GetImageSrc } from "../utils";
import "./IdeaPreviewPage.css";

export default function IdeaPreviewContentHolder({ image }) {
  const videos = [".mp4", ".mkv", ".webm"];
  var isVideo = false;
  videos.forEach(function (ext) {
    if (image.includes(ext)) {
      isVideo = true;
    }
  });
  if (!isVideo)
    return (
      <img className="previewIdeaBlockImage" src={GetImageSrc(image)}></img>
    );
  else
    return (
      <video autoPlay muted loop controls className="previewIdeaBlockVideo">
        <source src={GetImageSrc(image)}></source>
      </video>
    );
}

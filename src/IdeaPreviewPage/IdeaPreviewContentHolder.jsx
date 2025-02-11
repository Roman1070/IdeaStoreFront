import { GetImageSrc, IsVideo } from "../utils";
import "./IdeaPreviewPage.css";

export default function IdeaPreviewContentHolder({ image, expandY, ...props }) {
  const isVideo = IsVideo(image);
  if (!isVideo)
    return (
      <img
        className="previewIdeaBlockImage"
        src={GetImageSrc(image)}
        style={{
          height: `${expandY ? "100%" : ""}`,
        }}
        {...props}
      ></img>
    );
  else
    return (
      <video autoPlay loop className="previewIdeaBlockVideo" {...props}>
        <source src={GetImageSrc(image)}></source>
      </video>
    );
}

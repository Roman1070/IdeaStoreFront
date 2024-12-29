import "./CreatePage.css";

export default function СreateIdeaPreviewImage({ src }) {
  return (
    <div className="createPageImageWrapper">
      <img src={src} id="createIdeaPreviewImage"></img>
    </div>
  );
}

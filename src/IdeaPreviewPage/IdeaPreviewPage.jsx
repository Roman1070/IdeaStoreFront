import "./IdeaPreviewPage.css";

export default function IdeaPreviewPage() {
  const index = window.location.pathname.substring(6);
  return <h1>Previwing idea {index}</h1>;
}

import "./IdeaCard.css";

export default function SaveIdeaButton({ idea }) {
  function toggleSave() {}
  return (
    <div className="saveButtonHolder">
      <button onClick={toggleSave} className="saveButton">
        Сохранить
      </button>
    </div>
  );
}

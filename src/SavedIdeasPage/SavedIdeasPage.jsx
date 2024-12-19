import "./SavedIdeasPage.css";

export default function SavedIdeasPage() {
  return (
    <>
      <div className="upperHeader">
        <span className="savedIdeasHeader">Ваши сохраненные идеи</span>
        <div className="profileBlockOnSavedIdeas">
          <img
            className="profilePictureOnSavedIdeas"
            src="profileTemp.jpg"
            alt=""
          />
          <div>
            <div>Username</div>
            <div>0 subscriptions</div>
          </div>
          <button>Open profile</button>
        </div>
      </div>
    </>
  );
}

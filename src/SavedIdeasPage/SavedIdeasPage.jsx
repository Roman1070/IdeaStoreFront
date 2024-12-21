import "./SavedIdeasPage.css";
import ButtonLight from "../ButtonLight/ButtonLight";
import IdeasScroll from "../IdeasScroll";
import { useState } from "react";
export default function SavedIdeasPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  let savedImages = [];
  for (let i = 0; i < 40; i++) {
    if (i % 2 == 0) {
      savedImages.push({
        src: `images/image${i + 1}.jpg`,
        index: i,
      });
    }
  }
  return (
    <>
      <div className="upperModalBlock">
        <div className="upperHeader">
          <span className="savedIdeasHeader">Ваши сохраненные идеи</span>
          <div className="profileBlockOnSavedIdeas">
            <img
              className="profilePictureOnSavedIdeas"
              src="profileTemp.jpg"
              alt=""
            />
            <div className="usernameBlockInSavedIdeas">
              <div className="usernameInSavedIdeas">Имя пользователя</div>
              <div>0 подписок</div>
            </div>
            <button className="openProfileButtonInSavedIdeas">
              Открыть профиль
            </button>
          </div>
        </div>
        <div>
          <span
            style={{
              marginRight: "30px",
            }}
          >
            <ButtonLight
              onClick={() => setSelectedTab(0)}
              isSelected={selectedTab == 0}
            >
              Пины
            </ButtonLight>
          </span>

          <ButtonLight
            onClick={() => setSelectedTab(1)}
            isSelected={selectedTab == 1}
          >
            Доски
          </ButtonLight>
        </div>
      </div>

      {selectedTab == 0 && <IdeasScroll images={savedImages}></IdeasScroll>}
    </>
  );
}

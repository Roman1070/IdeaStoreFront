import "./SavedIdeasPage.css";
import ButtonLight from "../ButtonLight/ButtonLight";
import IdeasScroll from "../IdeasScroll";
import { useState } from "react";
import { GetSavedIdeas } from "../requests";

export default function SavedIdeasPage() {
  const [ideas, setIdeas] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  if (ideas == null) {
    GetSavedIdeas((ideas) => {
      console.log(ideas);
      setIdeas(ideas);
    });
  }
  if (ideas != null)
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <span
              style={{
                marginRight: "30px",
              }}
            >
              <ButtonLight
                onClick={() => setSelectedTab(0)}
                isSelected={selectedTab === 0}
              >
                Пины
              </ButtonLight>
            </span>

            <ButtonLight
              onClick={() => setSelectedTab(1)}
              isSelected={selectedTab === 1}
            >
              Доски
            </ButtonLight>
          </div>
        </div>

        {selectedTab === 0 && <IdeasScroll ideas={ideas}></IdeasScroll>}
      </>
    );
}

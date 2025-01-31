import IdeaCard from "./IdeaCard/IdeaCard";
import { useState } from "react";
import { distributeIdeas, GetCookie } from "./utils";
import "./IdeasScroll.css";
export default function IdeasScroll({
  ideas,
  saved,
  availableBoards,
  startBoardId,
  disableSave,
}) {
  var loggedIn = GetCookie("token");

  const [currentCard, setCurrentCard] = useState(null);
  var ideaWidth = Math.floor(window.innerWidth / 6);
  const marginHor = 10;
  const minIdeaWidth = 284;
  var colsCount = Math.floor(window.innerWidth / (ideaWidth + 2 * marginHor));

  while (ideaWidth < minIdeaWidth) {
    ideaWidth += 5;
    colsCount = Math.floor(window.innerWidth / (ideaWidth + 2 * marginHor));
  }
  const freeSpace =
    window.innerWidth - colsCount * (ideaWidth + 2 * marginHor) - 2 * marginHor;
  const widthIncrease = Math.floor(freeSpace / colsCount);
  ideaWidth += widthIncrease;

  function onMouseEnter(index) {
    if (loggedIn != null) setCurrentCard(index);
  }

  function onMouseExit(index) {
    if (loggedIn != null) setCurrentCard(null);
  }
  const distributionMap = distributeIdeas(colsCount, ideas);

  if (distributionMap)
    return (
      <>
        <div className="ideaScrollHorizontalGroup">
          {[...Array(colsCount)].map((e, i) => (
            <div
              className="ideaScrollVerticalGroup"
              key={i}
              style={{
                width: `${ideaWidth + 2 * marginHor}px`,
              }}
            >
              {ideas &&
                distributionMap.get(i).map((idea) => {
                  return (
                    <IdeaCard
                      key={idea.id}
                      disableSave={disableSave}
                      idea={idea}
                      onMouseEnter={onMouseEnter}
                      onMouseExit={onMouseExit}
                      index={idea.id}
                      availableBoards={availableBoards}
                      savedDefault={idea.saved || saved}
                      isSelected={currentCard == idea.id}
                      board={idea.board || startBoardId}
                      margin={`0 ${marginHor}px 20px ${marginHor}px`}
                      width={ideaWidth}
                    />
                  );
                })}
            </div>
          ))}
        </div>
      </>
    );
}

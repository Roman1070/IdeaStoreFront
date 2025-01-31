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
  var colWidth = Math.floor(window.innerWidth / 6);

  const minColumnWidth = 284;
  var colsCount = Math.floor(window.innerWidth / colWidth);
  var freeSpaceHor = window.innerWidth - colsCount * colWidth;
  var marginHor = Math.max(freeSpaceHor / (colsCount - 1) / 2, 10);

  while (colWidth < minColumnWidth) {
    colWidth += 10;
    colsCount = Math.floor(window.innerWidth / colWidth);
    freeSpaceHor = window.innerWidth - colsCount * colWidth;
    marginHor = Math.max(freeSpaceHor / (colsCount - 1) / 2, 10);
  }

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
                width: `${colWidth + 2 * marginHor}px`,
              }}
            >
              {ideas &&
                distributionMap.get(i).map((idea) => {
                  console.log(idea.id);
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
                    />
                  );
                })}
            </div>
          ))}
        </div>
      </>
    );
}

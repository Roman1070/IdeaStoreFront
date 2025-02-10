import IdeaCard from "./IdeaCard/IdeaCard";
import { useState } from "react";
import { AspectRatio, distributeIdeas, GetCookie, Throttle } from "./utils";
import "./IdeasScroll.css";
export default function IdeasScroll({
  ideas,
  saved,
  availableBoards,
  startBoardId,
  disableSave,
  loadNewIdeasFunc,
  visibleScrollSize,
}) {
  function scrollHandler() {
    if (scrollView) {
      if (
        scrollView.children[0].offsetHeight - scrollView.scrollTop <
        window.innerHeight * 2
      ) {
        loadNewIdeasFunc(colsCount);
      }
    } else {
      scrollView = document.getElementById("ideasScrollView");
    }
  }

  const [currentCard, setCurrentCard] = useState(null);
  var ideaWidth = Math.floor(
    AspectRatio() > 1 ? window.innerWidth / 7 : window.innerWidth / 3
  );
  const marginHor = 10;
  const minIdeaWidth = AspectRatio() > 1 ? 284 : 160;
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
    setCurrentCard(index);
  }

  function onMouseExit(index) {
    setCurrentCard(null);
  }
  const distributionMap = distributeIdeas(colsCount, ideas);
  if (ideas) {
  }
  const lastIdea = ideas[ideas.legth - 1];
  var scrollView = document.getElementById("ideasScrollView");

  if (distributionMap)
    return (
      <div
        id="ideasScrollView"
        onScroll={scrollHandler}
        style={{
          height: `${visibleScrollSize}px`,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
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
                  if (idea.id)
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
      </div>
    );
}

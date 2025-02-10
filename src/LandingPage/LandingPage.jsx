import { useSearchParams } from "react-router-dom";
import IdeasScroll from "../IdeasScroll";
import "./LandingPage.css";
import { useState } from "react";
import { GetAllIdeas } from "../requests";
import { GetAllIdeasThrottled, UpdateIdeasSessionStorage } from "../utils";

export default function LandingPage() {
  const [ideas, setIdeas] = useState();
  var loadedIdeasCount = 30;

  function onScrolledDown(colsCount) {
    let ideasToLoad = colsCount * 6;
    GetAllIdeasThrottled(ideasToLoad, (newIdeas) => {
      if (newIdeas.length > 0) {
        let totalIdeas;
        if (!sessionStorage.getItem("ideas")) {
          totalIdeas = newIdeas;
        } else {
          totalIdeas = JSON.parse(sessionStorage.getItem("ideas")).concat(
            newIdeas
          );
        }
        setIdeas(totalIdeas);
        UpdateIdeasSessionStorage(
          totalIdeas,
          ideasToLoad + parseInt(sessionStorage.getItem("ideasOffset"))
        );
      }
    });
  }

  if (!ideas) {
    GetAllIdeas(false, loadedIdeasCount, 0, (ideas) => {
      setIdeas(ideas);
      UpdateIdeasSessionStorage(ideas, loadedIdeasCount);
    });
  }
  if (ideas)
    return (
      <div className="landingScroll">
        <IdeasScroll
          disableSave={true}
          loadNewIdeasFunc={(colsCount) => onScrolledDown(colsCount)}
          ideas={ideas}
          visibleScrollSize={window.innerHeight - 80}
        ></IdeasScroll>
      </div>
    );
}

import { useSearchParams } from "react-router-dom";
import IdeasScroll from "../IdeasScroll";
import "./LandingPage.css";
import { useState } from "react";
import { GetAllIdeas } from "../requests";
import { ResetThrottledFetchDataTimer, ThrottledFetchData } from "../utils";
import { FetchData } from "../Homepage/Homepage";

export default function LandingPage() {
  const [ideas, setIdeas] = useState();
  const throttleDelay = 20000;
  var loadedIdeasCount = 50;

  function onScrolledDown(colsCount) {
    let ideasToLoad = colsCount * 10;
    ThrottledFetchData(FetchData, ideasToLoad, throttleDelay, (newIdeas) => {
      console.log(newIdeas);
      if (newIdeas.length > 0) {
        setIdeas(ideas.concat(newIdeas));
        sessionStorage.setItem(
          "ideasOffset",
          parseInt(sessionStorage.getItem("ideasOffset")) + ideasToLoad
        );
        ResetThrottledFetchDataTimer();
      }
    });
  }

  if (!ideas) {
    GetAllIdeas(false, loadedIdeasCount, 0, (ideas) => {
      setIdeas(ideas);
      sessionStorage.setItem("ideasOffset", loadedIdeasCount);
    });
  }
  if (ideas)
    return (
      <div className="landingScroll">
        <IdeasScroll
          disableSave={true}
          loadNewIdeasFunc={(colsCount) => onScrolledDown(colsCount)}
          ideas={ideas}
        ></IdeasScroll>
      </div>
    );
}

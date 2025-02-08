import { useSearchParams } from "react-router-dom";
import IdeasScroll from "../IdeasScroll";
import "./LandingPage.css";
import { useState } from "react";
import { GetAllIdeas } from "../requests";
import { ThrottledFetchData } from "../utils";
import { FetchData } from "../Homepage/Homepage";

export default function LandingPage() {
  const [ideas, setIdeas] = useState();
  const throttleDelay = 1000;
  var loadedIdeasCount = 50;
  if (!ideas) {
    GetAllIdeas(false, loadedIdeasCount, 0, (ideas) => {
      setIdeas(ideas);
      sessionStorage.setItem("ideasOffset", loadedIdeasCount);
    });
  }

  function onScrolledDown(colsCount) {
    let ideasToLoad = colsCount * 7;
    ThrottledFetchData(FetchData, ideasToLoad, throttleDelay, (newIdeas) => {
      console.log(newIdeas);
      if (newIdeas.length > 0) {
        setIdeas(ideas.concat(newIdeas));
        sessionStorage.setItem(
          "ideasOffset",
          parseInt(sessionStorage.getItem("ideasOffset")) + ideasToLoad
        );
      }
    });
  }
  if (ideas)
    return (
      <div className="landingScroll">
        <IdeasScroll
          onScrolledDown={(colsCount) => onScrolledDown(colsCount)}
          ideas={ideas}
        ></IdeasScroll>
      </div>
    );
}

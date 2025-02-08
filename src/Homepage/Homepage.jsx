import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import { Morph, ThrottledFetchData } from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

function fetchData(ideasToLoad, onComplete) {
  var ideas = sessionStorage.getItem("ideas");
  console.log(ideas);
  ideasToLoad = 35;
  GetAllIdeas(false, ideasToLoad, ideas.length, (newIdeas) => {
    let result = ideas.concat(newIdeas);
    onComplete(result);
  });
}

export default function Homepage({ foundIdeas, searchInput }) {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);

  var loadedIdeasCount = 50;
  if (ideas.length == 0 && boards.length == 0) {
    GetAllIdeas(false, loadedIdeasCount, 0, (ideas) => {
      GetCurrentUsersBoards((json) => {
        setBoards(json);
        setIdeas(ideas);
        sessionStorage.setItem("ideas", ideas);
      });
    });
  }

  function onScrolledDown() {
    ThrottledFetchData(fetchData, 35, 2000, (result) => {
      setIdeas(result);
      sessionStorage.setItem("ideas", result);
    });
  }
  if (ideas && boards)
    return (
      <>
        {foundIdeas && searchInput && (
          <div className="foundIdeasHeader">{`По запросу "${searchInput}" найдено ${
            foundIdeas.length
          } ${Morph(foundIdeas.length)}`}</div>
        )}
        {ideas.length > 0 && (
          <IdeasScroll
            loadNewIdeasFunc={onScrolledDown}
            availableBoards={boards}
            ideas={foundIdeas && searchInput ? foundIdeas : ideas}
          ></IdeasScroll>
        )}
      </>
    );
}

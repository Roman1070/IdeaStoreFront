import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import { Morph, Throttle } from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

var throttleTimer;

export default function Homepage({ foundIdeas, searchInput }) {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);

  function fetchData(colsCount, ideasLength) {
    loadedIdeasCount = colsCount * 7;
    GetAllIdeas(false, loadedIdeasCount, ideasLength, (newIdeas) => {
      console.log(
        `ideas.length = ${ideas.length}, newIdeasCount=${newIdeas.length}`
      );
      var result = ideas.concat(newIdeas);
      console.log(`result length = ${result.length}`);
      setIdeas(result);
    });
  }

  var loadedIdeasCount = 50;
  if (ideas.length == 0 && boards.length == 0) {
    GetAllIdeas(false, loadedIdeasCount, 0, (ideas) => {
      GetCurrentUsersBoards((json) => {
        setBoards(json);
        setIdeas(ideas);
      });
    });
  }

  function onScrolledDown(colsCount) {
    if (throttleTimer == null) {
      fetchData(colsCount, ideas.length);
      throttleTimer = setTimeout(() => {
        // Set a timer to clear the timerFlag after the specified delay
        throttleTimer = null; // Clear the timerFlag to allow the main function to be executed again
      }, 2000);
    }
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
            loadNewIdeasFunc={(cols) => onScrolledDown(cols)}
            availableBoards={boards}
            ideas={foundIdeas && searchInput ? foundIdeas : ideas}
          ></IdeasScroll>
        )}
      </>
    );
}

import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import { Morph, ThrottleFetchData } from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

function fetchData(ideasToLoad, ideas) {
  ideasToLoad = 35;
  GetAllIdeas(false, ideasToLoad, ideas.length, (newIdeas) => {
    let result = ideas.concat(newIdeas);
    console.log(result);
  });
}

// Throttle the fetchData function with a delay of 5000 ms
const throttledFetchData = (limit, ideas) =>
  ThrottleFetchData(fetchData, limit, ideas, 2000);

export default function Homepage({ foundIdeas, searchInput }) {
  const [ideas, setIdeas] = useState([]);
  const [boards, setBoards] = useState([]);

  console.log(ideas);

  function tryFetchData() {
    throttledFetchData(35, ideas.length);
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

  function onScrolledDown() {
    tryFetchData();
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
            loadNewIdeasFunc={() => {
              onScrolledDown();
            }}
            availableBoards={boards}
            ideas={foundIdeas && searchInput ? foundIdeas : ideas}
          ></IdeasScroll>
        )}
      </>
    );
}

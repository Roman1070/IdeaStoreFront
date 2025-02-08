import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas, GetCurrentUsersBoards } from "../requests.js";
import { Morph, ThrottledFetchData } from "../utils.js";

import "./Homepage.css";
import { useState } from "react";

function fetchData(ideasToLoad, ideas) {
  ideasToLoad = 35;
  GetAllIdeas(false, ideasToLoad, ideas.length, (newIdeas) => {
    let result = ideas.concat(newIdeas);
    console.log(`fetchData result :${result}`);
    return result;
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
      });
    });
  }

  function onScrolledDown() {
    var result = ThrottledFetchData(fetchData, 35, ideas, 2000);
    console.log(result);
    if (result.valid) {
      setIdeas(result.ideas);
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
            loadNewIdeasFunc={onScrolledDown}
            availableBoards={boards}
            ideas={foundIdeas && searchInput ? foundIdeas : ideas}
          ></IdeasScroll>
        )}
      </>
    );
}

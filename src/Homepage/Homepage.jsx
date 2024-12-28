import { GetAllIdeas } from "../utils.js";
import IdeasScroll from "../IdeasScroll.jsx";

import "./Homepage.css";
import { useState } from "react";

export default function Homepage() {
  const [ideas, setIdeas] = useState([]);
  const [ideasEmpty, setIdeasEmpty] = useState(true);
  if (ideasEmpty) {
    GetAllIdeas((ideas) => {
      setIdeas(ideas);
      setIdeasEmpty(false);
    });
  }
  return (
    <>
      <IdeasScroll ideas={ideas}></IdeasScroll>
    </>
  );
}

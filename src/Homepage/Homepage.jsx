import IdeasScroll from "../IdeasScroll.jsx";
import { GetAllIdeas } from "../requests.js";

import "./Homepage.css";
import { useState } from "react";

export default function Homepage() {
  const [ideas, setIdeas] = useState([]);

  if (ideas.length == 0)
    GetAllIdeas(false, (ideas) => {
      setIdeas(ideas);
    });
  return <>{ideas && <IdeasScroll ideas={ideas}></IdeasScroll>}</>;
}

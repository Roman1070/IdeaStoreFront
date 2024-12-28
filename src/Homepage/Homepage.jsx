import IdeasScroll from "../IdeasScroll.jsx";

import "./Homepage.css";
import { useState } from "react";

export default function Homepage() {
  const [ideas, setIdeas] = useState([]);
  const [ideasEmpty, setIdeasEmpty] = useState(true);
  if (ideasEmpty) {
    var tempIdeas = [];
    fetch("http://localhost:8182/get-ideas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        for (var i in json) {
          tempIdeas.push({
            id: json[i].idea_id,
            image: json[i].image,
            name: json[i].name,
            description: json[i].description,
            link: json[i].link,
            tags: json[i].tags,
          });
        }
      })
      .then(() => {
        setIdeas(tempIdeas);
        setIdeasEmpty(false);
      });
  }
  return (
    <>
      <IdeasScroll ideas={ideas}></IdeasScroll>
    </>
  );
}

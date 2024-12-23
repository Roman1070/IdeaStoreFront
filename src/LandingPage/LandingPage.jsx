import GetIdeas from "../db";
import IdeasScroll from "../IdeasScroll";
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export default function LandingPage() {
  var ideas = GetIdeas();
  var selectedIdeas = [];
  const ideasToDisplay = 15;
  for (var i = 0; i < ideas.length; i++) {
    if (getRandomInt(ideas.length / ideasToDisplay) == 0) {
      selectedIdeas.push(ideas[i]);
    }
  }
  return (
    <>
      <IdeasScroll ideas={selectedIdeas}></IdeasScroll>
    </>
  );
}

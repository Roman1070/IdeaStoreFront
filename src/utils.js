export function GetAllIdeas(onComplete) {
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
      onComplete(tempIdeas);
    });
}

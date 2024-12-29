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

export function GetIdea(index, onComplete) {
  fetch(`http://localhost:8182/get-idea?id=${index}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}

const HostName = "http://localhost:8182/images/";
export function GetIdeaSrc(name) {
  return HostName + name;
}

const ReactHostName = "http://localhost:3000/images/";
export function GetLocalImageSrc(name) {
  return ReactHostName + name;
}

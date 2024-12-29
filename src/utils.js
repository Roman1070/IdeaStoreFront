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

export function GetCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}

export function DeleteCookie(name, path, domain) {
  if (GetCookie(name)) {
    document.cookie =
      name + "=; Path=" + path + "; Domain=" + domain + "; Max-Age=-1;";
  } else console.log("cant find cookie " + name);
}

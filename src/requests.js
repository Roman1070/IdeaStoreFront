import { JoinClientAddress } from "./utils";

export function GetAllIdeas(onComplete) {
  var tempIdeas = [];
  fetch(JoinClientAddress("ideas"), {
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
  fetch(JoinClientAddress(`idea?id=${index}`), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}

export function ToggleSaveIdea(ideaId, boardId, onComplete) {
  fetch(
    JoinClientAddress(`toggle-save-idea?idea_id=${ideaId}&board_id=${boardId}`)
  )
    .then((response) => response.json())
    .then((json) => {
      if (Object.hasOwn(json, "err")) {
        alert("internal error: " + json.err);
      } else {
        onComplete(json);
      }
    });
}

export function Login(email, password, onComplete) {
  fetch(JoinClientAddress("login"), {
    method: "POST",
    headers: {
      /** Заголовок, указывающий, что клиент ожидает получить данные в формате JSON */
      Accept: "application/json",

      /** Заголовок, указывающий, что тело запроса отправляется в формате JSON */
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}

export function Register(req, onComplete) {
  fetch(JoinClientAddress("register"), {
    method: "POST",
    headers: {
      /** Заголовок, указывающий, что клиент ожидает получить данные в формате JSON */
      Accept: "application/json",

      /** Заголовок, указывающий, что тело запроса отправляется в формате JSON */
      "Content-Type": "application/json",
    },
    body: req,
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}

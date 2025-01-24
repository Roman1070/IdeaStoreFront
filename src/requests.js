import { GetCookie, JoinClientAddress } from "./utils";

export function GetAllIdeas(includeSaved, onComplete) {
  var tempIdeas = [];
  fetch(JoinClientAddress("ideas"), {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      for (var i in json) {
        if (includeSaved || !json[i].saved)
          tempIdeas.push({
            id: json[i].id,
            image: json[i].image,
            name: json[i].name,
            description: json[i].description,
            link: json[i].link,
            tags: json[i].tags,
            saved: json[i].saved,
          });
      }
    })
    .then(() => {
      onComplete(tempIdeas);
    });
}

export function GetCurrentUsersBoards(onComplete) {
  fetch(JoinClientAddress("my-boards"), {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json.boards));
}
export function GetBoards(id, onComplete) {
  fetch(JoinClientAddress(`boards?id=${id}`), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json.boards));
}

export function GetIdea(index, onComplete) {
  fetch(JoinClientAddress(`idea?id=${index}`), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}

export function IsIdeaSaved(index, onComplete) {
  fetch(JoinClientAddress(`is-idea-saved?id=${index}`), {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
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

export function Register(req, email, name, onComplete) {
  console.log(req);
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
    .then((json) => {
      console.log(json);
      if (Object.hasOwn(json, "err")) {
        onComplete(json);
      } else {
        console.log(json);
        createProfile(json, email, name, onComplete);
      }
    });
}
function createProfile(jsonFromReg, email, name, onCompleteFromReg) {
  const id = jsonFromReg.user_id;

  fetch(JoinClientAddress("profile"), {
    method: "POST",
    headers: {
      /** Заголовок, указывающий, что клиент ожидает получить данные в формате JSON */
      Accept: "application/json",

      /** Заголовок, указывающий, что тело запроса отправляется в формате JSON */
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      email: email,
      name: name,
    }),
  }).then((response) => {
    onCompleteFromReg(jsonFromReg);
  });
}
export function GetCurrentProfile(onComplete) {
  fetch(JoinClientAddress("my-profile"), {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json.data));
}
export function GetProfile(id, onComplete) {
  fetch(JoinClientAddress(`profile?id=${id}`), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json.data));
}
export function CreateIdea(data, onComplete) {
  fetch(JoinClientAddress("idea"), {
    method: "POST",
    body: data,
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}
export function CreateBoard(name, onComplete) {
  fetch(JoinClientAddress("board"), {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      name: name,
    }),
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}
export function GetSavedIdeas(onComplete) {
  var tempIdeas = [];
  fetch(JoinClientAddress("get-saved-ideas"), {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      var ideas = json.ideas;
      for (var i in ideas) {
        tempIdeas.push({
          id: ideas[i].id,
          board: ideas[i].board_id,
          image: ideas[i].image,
          name: ideas[i].name,
        });
      }
    })
    .then(() => {
      onComplete(tempIdeas);
    });
}

export function ToggleSaveIdea(ideaId, boardId, onComplete) {
  fetch(
    JoinClientAddress(`toggle-save-idea?idea_id=${ideaId}&board_id=${boardId}`),
    {
      method: "GET",
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((json) => onComplete(json));
}

export function GetIdeasInBoard(boardId, onComplete) {
  fetch(JoinClientAddress(`ideas-in-board?id=${boardId}`), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}

export function GetBoard(id, onComplete) {
  fetch(JoinClientAddress(`board?id=${id}`), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}

export function GetIdeas(ids, onComplete) {
  const idsJson = JSON.stringify({
    ids: ids,
  });
  console.log(idsJson);
  fetch(JoinClientAddress("ideas"), {
    method: "POST",
    body: idsJson,
  })
    .then((response) => response.json())
    .then((json) => onComplete(json.ideas));
}

export function DeleteBoard(id, onComplete) {
  fetch(JoinClientAddress("board"), {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
    credentials: "include",
  }).then((response) => onComplete());
}

export function GetComments(ideaId, onComplete) {
  fetch(JoinClientAddress(`comments?idea=${ideaId}`), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => onComplete(json.comments));
}

export function CreateComment(ideaId, text, onComplete) {
  fetch(JoinClientAddress("comment"), {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      idea_id: ideaId,
      text: text,
    }),
  }).then((response) => onComplete());
}

export function UpdateProfile(data, onComplete) {
  fetch(JoinClientAddress("profile"), {
    method: "PUT",
    credentials: "include",
    body: data,
  })
    .then((response) => response.json())
    .then((json) => onComplete(json));
}

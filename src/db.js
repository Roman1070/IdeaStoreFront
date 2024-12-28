class Idea {
  constructor(id, image, name, desc, link, tags) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.desc = desc;
    this.link = link;
    this.tags = tags;
  }
}

let ideas = [];
let savedIdeas = [];
function User(id, email, nickname, password, savedIdeas) {
  this.id = id;
  this.email = email;
  this.nicknam = nickname;
  this.password = password;
  this.savedIdeas = savedIdeas;
}
const users = [
  new User(1, "yaro@mail.ru", "yaro", "123123", [1, 4, 7, 11, 19, 34, 39]),
  new User(
    2,
    "gas@mail.ru",
    "gas",
    "123123",
    [2, 3, 4, 5, 8, 10, 22, 32, 33, 34]
  ),
  new User(
    3,
    "kgi@mail.ru",
    "kgi",
    "123123",
    [1, 2, 3, 5, 6, 7, 10, 13, 16, 19, 23, 26, 29]
  ),
  new User(
    4,
    "kav@mail.ru",
    "kav",
    "123123",
    [1, 4, 3, 5, 6, 7, 11, 14, 15, 19, 22, 26, 29]
  ),
];

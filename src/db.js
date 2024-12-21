const imagesCount = 40;
let images = [];
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

export default function GetIdeas() {
  images = [];
  for (let i = 0; i < imagesCount; i++) {
    images.push({
      src: `images/image${i + 1}.jpg`,
      index: i,
    });
  }
  return images;
}
export function GetSavedIdeas(user) {
  let ideas = GetIdeas();
  savedIdeas = [];
  console.log(user);
  for (var i = 0; i < user.savedIdeas.length; i++) {
    savedIdeas.push(ideas[i]);
  }
  return savedIdeas;
}

export function GetUserByEmail(email) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i];
    }
  }
}

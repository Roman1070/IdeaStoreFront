export function GetImageSrc(name) {
  return "http://ideastore.space/app/files/" + name;
}

const ImagesFolderName = "http://ideastore.space/images/";
export function GetLocalImageSrc(name) {
  return ImagesFolderName + name;
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
export function JoinReactHostAddress(endpoint) {
  const ClientAddress = "http://ideastore.space/";
  return ClientAddress + endpoint;
}
export function JoinClientAddress(endpoint) {
  const ClientAddress = "http://ideastore.space/api/";
  return ClientAddress + endpoint;
}
export function GetChatWebSocketAddress() {
  return "ws://ideastore.space/api/chat_ws/";
}

export function Morph(int, array) {
  array = array || ["идея", "идеи", "идей"];
  return array[
    int % 100 > 4 && int % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]
  ];
}

export function IsVideo(src) {
  const videos = ["mp4", "mkv", "webm"];
  var isVideo = false;

  if (!src.includes("base64")) {
    videos.forEach(function (ext) {
      if (src.includes("." + ext)) {
        isVideo = true;
      }
    });
  } else {
    const str = src.substring(0, 50);
    videos.forEach(function (ext) {
      if (str.includes("/" + ext)) {
        isVideo = true;
      }
    });
  }

  return isVideo;
}
// Declare a variable called 'timer' to store the timer ID
let timer;
export const debounce = (mainFunction, delay) => {
  // Return an anonymous function that takes in any number of arguments
  return function (...args) {
    // Clear the previous timer to prevent the execution of 'mainFunction'
    clearTimeout(timer);

    // Set a new timer that will execute 'mainFunction' after the specified delay
    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};

export function distributeIdeas(columnsCount, ideas) {
  var result = new Map();
  for (var i = 0; i < columnsCount; i++) {
    result.set(i, new Array());
  }
  var currentIndex = 0;
  for (var i = 0; i < ideas.length; i++) {
    result.get(currentIndex).push(ideas[i]);
    currentIndex = (currentIndex + 1) % columnsCount;
  }
  return result;
}

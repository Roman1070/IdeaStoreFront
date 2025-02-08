export function GetImageSrc(name) {
  return "https://ideastore.space/app/files/" + name;
}

const ImagesFolderName = "https://ideastore.space/images/";
export function GetLocalImageSrc(name) {
  return ImagesFolderName + name;
}

export function AspectRatio() {
  return window.innerWidth / window.innerHeight;
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
  const ClientAddress = "https://ideastore.space/";
  return ClientAddress + endpoint;
}
export function JoinClientAddress(endpoint) {
  const ClientAddress = "https://ideastore.space/api/";
  return ClientAddress + endpoint;
}
export function GetChatWebSocketAddress() {
  return "wss://ideastore.space/api/chat_ws";
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
let debounceTimer;
export const debounce = (mainFunction, delay) => {
  // Return an anonymous function that takes in any number of arguments
  return function (...args) {
    // Clear the previous timer to prevent the execution of 'mainFunction'
    clearTimeout(debounceTimer);

    // Set a new timer that will execute 'mainFunction' after the specified delay
    debounceTimer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};
export const cancelDebounce = () => {
  clearTimeout(debounceTimer);
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

let throttleTimeFlag = null; // Variable to keep track of the timer
export function ThrottleFetchData(mainFunction, limit, ideas, delay) {
  // Returning a throttled version
  return () => {
    if (throttleTimeFlag === null) {
      // If there is no timer currently running
      mainFunction(limit, ideas); // Execute the main function
      throttleTimeFlag = setTimeout(() => {
        // Set a timer to clear the timerFlag after the specified delay
        throttleTimeFlag = null; // Clear the timerFlag to allow the main function to be executed again
      }, delay);
    }
  };
}

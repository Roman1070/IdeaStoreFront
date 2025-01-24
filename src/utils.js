const HostName = JoinClientAddress("images/");
export function GetImageSrc(name) {
  return HostName + name;
}

const ImagesFolderName = "http://localhost:3000/images/";
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
  const ClientAddress = "http://localhost:3000/";
  return ClientAddress + endpoint;
}
export function JoinClientAddress(endpoint) {
  const ClientAddress = "http://localhost:8000/";
  return ClientAddress + endpoint;
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
  videos.forEach(function (ext) {
    if (src.includes("." + ext) || src.includes("/" + ext)) {
      isVideo = true;
    }
  });
  return isVideo;
}

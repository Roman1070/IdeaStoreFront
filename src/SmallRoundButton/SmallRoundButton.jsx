import "./SmallRoundButton.css";

export default function SmallRoundButton({ imgSrc, isLink, href, onClick }) {
  if (isLink)
    return (
      <a href={href} className="smallRoundButton">
        <img src={imgSrc} className="imgInSmallRoundButton" />
      </a>
    );
  return (
    <button className="smallRoundButton" onClick={onClick}>
      <img src={imgSrc} className="imgInSmallRoundButton" />
    </button>
  );
}

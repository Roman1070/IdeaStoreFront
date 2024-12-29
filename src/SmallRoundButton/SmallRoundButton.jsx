import "./SmallRoundButton.css";

export default function SmallRoundButton({
  imgSrc,
  isLink,
  href,
  onClick,
  size,
}) {
  if (isLink)
    return (
      <a
        href={href}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        className="smallRoundButton"
      >
        <img src={imgSrc} className="imgInSmallRoundButton" />
      </a>
    );
  return (
    <button
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className="smallRoundButton"
      onClick={onClick}
    >
      <img src={imgSrc} className="imgInSmallRoundButton" />
    </button>
  );
}

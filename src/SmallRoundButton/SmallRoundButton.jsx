import { Link } from "react-router-dom";
import "./SmallRoundButton.css";

export default function SmallRoundButton({
  imgSrc,
  isLink,
  href,
  onClick,
  size,
  marginRight,
  forceRound,
}) {
  if (isLink)
    return (
      <Link
        replace
        to={href}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          marginRight: `${marginRight}px`,
        }}
        className="smallRoundButton"
      >
        {forceRound && (
          <img
            style={{
              borderRadius: "999px",
            }}
            src={imgSrc}
            className="imgInSmallRoundButton"
          />
        )}
        {!forceRound && <img src={imgSrc} className="imgInSmallRoundButton" />}
      </Link>
    );
  return (
    <button
      style={{
        width: `${size}px`,
        height: `${size}px`,
        marginRight: `${marginRight}px`,
      }}
      className="smallRoundButton"
      onClick={onClick}
    >
      {" "}
      {forceRound && (
        <img
          style={{
            borderRadius: "999px",
          }}
          src={imgSrc}
          className="imgInSmallRoundButton"
        />
      )}
      {!forceRound && <img src={imgSrc} className="imgInSmallRoundButton" />}
    </button>
  );
}

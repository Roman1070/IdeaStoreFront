import { useState } from "react";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import { GetLocalImageSrc } from "../utils";
import "./IdeaSharingModal.css";

export default function IdeaSharingModal() {
  const [copyClicked, setCopyClicked] = useState();
  return (
    <div className="ideaSharingModalWrapper">
      <div className="ideaSharingModal">
        <div className="ideaSharingModalCopyWrapper">
          <SmallRoundButton
            imgSrc={GetLocalImageSrc("copy.png")}
            size={48}
            onClick={() => {
              setCopyClicked(true);
              navigator.clipboard.writeText(window.location.href);
            }}
          ></SmallRoundButton>
          <div
            style={{
              margin: "auto 10px",
            }}
          >
            {copyClicked ? "Ссылка скопирована" : "Копировать ссылку"}
          </div>
        </div>
      </div>
    </div>
  );
}

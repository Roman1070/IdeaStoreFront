import { useState } from "react";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import { debounce, GetLocalImageSrc } from "../utils";
import "./IdeaSharingModal.css";
import InputField from "../InputField/InputField";
import { SearchProfiles, SendMessage, ShareIdea } from "../requests";
import ChatsScroll from "../ChatsScroll/ChatsScroll";

export default function IdeaSharingModal({ chats, idea, ideaId }) {
  const [copyClicked, setCopyClicked] = useState();
  const [searchInput, setSearchInput] = useState();
  const [foundProfiles, setFoundProfiles] = useState();

  const debouncedSearch = debounce((value) => search(value), 700);
  function search(value) {
    SearchProfiles(value, (profiles) => {
      setFoundProfiles(profiles);
    });
  }
  function onSearchChanged(value) {
    setSearchInput(value);
    if (value) {
      debouncedSearch(value);
    } else {
      setFoundProfiles([]);
    }
  }

  function shareIdea(recieverId) {
    console.log("sent");
    ShareIdea(recieverId, idea.image, ideaId, (respJson) => {
      console.log(respJson);
    });
  }

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

        <InputField
          isCorrect={true}
          error={""}
          value={searchInput}
          isCommonInput={true}
          placeholder="Поиск по имени/эл. адресу"
          onChangeAction={(value) => onSearchChanged(value)}
          height={"24px"}
        ></InputField>
        <ChatsScroll
          onShareAction={shareIdea}
          chats={searchInput ? foundProfiles : chats}
          height={260}
          sharing={true}
        ></ChatsScroll>
      </div>
    </div>
  );
}

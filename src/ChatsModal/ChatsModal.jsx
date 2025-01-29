import { useState } from "react";
import "./ChatsModal.css";
import ChatsModalElement from "./ChatsModelElement";
import { debounce, GetImageSrc, GetLocalImageSrc, throttle } from "../utils";
import SmallRoundButton from "../SmallRoundButton/SmallRoundButton";
import { GetMessages, SearchProfiles, SendMessage } from "../requests";
import MessagesScroll from "../MessagesScroll/MessagesScroll";
import InputField from "../InputField/InputField";
import ChatsModalSelectedChat from "./ChatsModalSelectedChat";
export default function ChatsModal({
  chats,
  currentProfile,
  chatsWS,
  closeFunc,
  updateChatsFunc,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [searching, setSearching] = useState();
  const [searchText, setSearchText] = useState();
  const [foundProfiles, setFoundProfiles] = useState();

  function onChatClicked(chatData) {
    setSearching(false);
    setSelectedChat(chatData);
  }
  const debouncedSearch = debounce((value) => search(value), 700);
  function search(value) {
    SearchProfiles(value, (profiles) => {
      console.log(profiles);
      setFoundProfiles(profiles);
    });
  }
  function onSearchChanged(value) {
    setSearchText(value);
    if (value) {
      debouncedSearch(value);
    } else {
      setFoundProfiles([]);
    }
  }

  return (
    <div className="chatModalBlock">
      <div className="chatModalContainer">
        {!selectedChat && (
          <div className="chatModalBlockHeader">
            <SmallRoundButton
              marginRight={searching ? 20 : 50}
              size={48}
              imgSrc={GetLocalImageSrc("leftArrow.png")}
              onClick={() => {
                searching ? setSearching(false) : closeFunc();
              }}
            ></SmallRoundButton>
            <span
              style={{
                paddingTop: "3px",
              }}
            >
              {searching ? "Новое сообщение" : "Сообщения"}
            </span>
          </div>
        )}
        {selectedChat && (
          <ChatsModalSelectedChat
            chatsWS={chatsWS}
            selectedChat={selectedChat}
            currentProfile={currentProfile}
            setSelectedChatFunc={setSelectedChat}
            updateChatsFunc={updateChatsFunc}
          ></ChatsModalSelectedChat>
        )}
        {!selectedChat && !searching && (
          <div className="chatsModalElement" onClick={() => setSearching(true)}>
            <img
              className="chatsModalNewMessageIcon"
              src={GetLocalImageSrc("write.png")}
            ></img>
            <div className="chatsModalElementName">Новое сообщение</div>
          </div>
        )}
        {!selectedChat && !searching && chats && (
          <div
            style={{
              margin: "0 0 10px 24px",
            }}
          >
            Ваши чаты
          </div>
        )}
        {!selectedChat &&
          !searching &&
          chats &&
          chats.map((chat) => (
            <ChatsModalElement
              onSelect={onChatClicked}
              key={chat.id}
              chatData={chat}
            ></ChatsModalElement>
          ))}
        {searching && (
          <div className="chatsModalInputHolder">
            <div className="chatsModalInputWrapper">
              <InputField
                placeholder={"Поиск по имени/эд.адресу"}
                isCorrect={true}
                error={""}
                onChangeAction={(value) => onSearchChanged(value)}
                value={searchText}
                isCommonInput={true}
                height={"24px"}
              ></InputField>
            </div>
          </div>
        )}
        {searching &&
          foundProfiles &&
          foundProfiles.map((profile) => (
            <ChatsModalElement
              key={profile.id}
              chatData={profile}
              onSelect={onChatClicked}
            ></ChatsModalElement>
          ))}
      </div>
    </div>
  );
}

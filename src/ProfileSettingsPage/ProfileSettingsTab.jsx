import { useState } from "react";
import ButtonLight from "../ButtonLight/ButtonLight";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import { GetCurrentProfile, UpdateProfile } from "../requests";
import InputField from "../InputField/InputField";
import "./ProfileSettingsPage.css";
import "../IdeaCard/IdeaCard.css";

export default function ProfileSettingsTab({ profile }) {
  const ProfileSettingsTabNameInputId = "profileSettingsTabNameInput";
  const ProfileSettingsTabImageInputId = "profileSettingsTabImageInput";
  function onUpdated() {}
  function validateName() {
    const input = document.getElementById(ProfileSettingsTabNameInputId);
    const name = input.value;

    if (name.length == 0) {
      setUsernameError("Please input name");
      return false;
    }
    if (name.length < 5) {
      setUsernameError("Name must be at least 5 characters long");
      return false;
    }
    return true;
  }
  function saveChanges() {
    if (!validateName()) return;

    var data = new FormData();
    var imageData = document.getElementById(ProfileSettingsTabImageInputId)
      .files[0];
    if (previewSrc) data.append("image", imageData);

    console.log(imageData);
    data.append("name", username);
    data.append("description", description);
    data.append("link", link);
    UpdateProfile(data, onUpdated);
  }
  const [previewSrc, setPreviewSrc] = useState();
  const [username, setUsername] = useState(profile.name);
  const [description, setDescription] = useState(profile.description);
  const [link, setLink] = useState(profile.link);
  const [usernameError, setUsernameError] = useState();
  function changeHandler(event) {
    if (!event.target.files.length) {
      return;
    }
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewSrc(ev.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
  if (profile)
    return (
      <div className="profileSettingsTab">
        <form className="profileSettingsTabForm" encType="multipart/form-data">
          <div className="profileSettingsTabHeader">Изменение профиля</div>
          <div className="profileSettingsTabSubheader">
            Позаботьтесь о конфиденциальности личных данных. Добавляемая вами
            информация видна всем, кто может просматривать ваш профиль.
          </div>
          <div>Фотография</div>
          <div className="profileSettingsTabImageBlock">
            <div className="profileSettingsTabImageWrapper">
              <img
                className="profileSettingsTabImage"
                src={
                  previewSrc
                    ? previewSrc
                    : profile.avatarImage
                    ? GetImageSrc(profile.avatarImage)
                    : GetLocalImageSrc("user.png")
                }
              ></img>
            </div>

            <div id="profileSettingsTabImageInputWrapper">
              <label
                htmlFor="profileSettingsTabImageInput"
                className="profileSettingsTabImageInputLabel"
              >
                Изменить
              </label>
              <input
                id="profileSettingsTabImageInput"
                accept="image/bmp,image/jpeg,image/png,image/tiff,image/webp"
                aria-label="Загрузка файлов"
                multiple=""
                type="file"
                onChange={(event) => changeHandler(event)}
              ></input>
            </div>
          </div>
          <InputField
            defaultValue={profile.name}
            error={usernameError}
            isCorrect={!usernameError}
            id="profileSettingsTabNameInput"
            onChangeAction={(event) => setUsername(event.target.value)}
          >
            Имя пользователя
          </InputField>
          <InputField
            defaultValue={profile.description}
            error={usernameError}
            isCorrect={!usernameError}
            placeholder="Расскажите свою историю"
            height="80px"
            onChangeAction={(event) => setDescription(event.target.value)}
          >
            Описание
          </InputField>

          <InputField
            defaultValue={profile.link}
            error={usernameError}
            isCorrect={!usernameError}
            placeholder="https://"
            onChangeAction={(event) => setLink(event.target.value)}
          >
            Веб-сайт
          </InputField>
        </form>
        <div className="profileSettingsTabButtons">
          <button onClick={saveChanges} className="saveProfileChangesButton">
            Сохранить
          </button>
          <div
            style={{
              width: "30px",
            }}
          ></div>
          <button className="resetProfileChangesButton">Сбросить</button>
        </div>
      </div>
    );
}

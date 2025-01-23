import { useState } from "react";
import ButtonLight from "../ButtonLight/ButtonLight";
import { GetImageSrc, GetLocalImageSrc } from "../utils";
import { UpdateProfile } from "../requests";
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
    data.append("image", imageData);
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
      <form className="profileSettingsTab" encType="multipart/form-data">
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
          onChangeAction={(val) => setUsername(val)}
        >
          Имя пользователя
        </InputField>
        <InputField
          error={usernameError}
          isCorrect={!usernameError}
          placeholder="Расскажите свою историю"
          height="80px"
          onChangeAction={(val) => setDescription(val)}
        >
          Описание
        </InputField>

        <InputField
          error={usernameError}
          isCorrect={!usernameError}
          placeholder="https://"
          onChangeAction={(val) => setLink(val)}
        >
          Веб-сайт
        </InputField>
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
      </form>
    );
}

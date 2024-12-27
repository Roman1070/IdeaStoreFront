import { useState } from "react";
import InputField from "../InputField/InputField";
import "./CreatePage.css";
import СreateIdeaPreviewImage from "./СreateIdeaPreviewImage";
const CreatePageNameInputId = "createPageNameInput";
const CreatePageDescriptionInputId = "createPageDescriptionInput";
const CreatePageLinkInputId = "createPageLinkInput";
const CreatePageTagsInputId = "createPageTagsInput";

export default function CreatePage() {
  const [previewSrc, setPreviewSrc] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  function validateName() {
    const input = document.getElementById(CreatePageNameInputId);
    const name = input.value;
    if (name.length < 4) {
      setNameError("Name must be at least 4 characters long");
      return false;
    }
    return true;
  }
  function onPublishClick() {
    if (!validateName()) return;
  }
  const changeHandler = (event) => {
    console.log(event);
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
  };

  return (
    <>
      <div className="createPageUpperText">
        <span
          style={{
            fontSize: "22px",
            fontWeight: "500",
            margin: "auto 0px",
          }}
        >
          Поделиться идеей
        </span>
        <button onClick={onPublishClick} className="createIdeaButton">
          Опубликовать
        </button>
      </div>
      <div className="createPageMainElement">
        <div
          className={
            previewSrc
              ? "createPageImageInputWrapper hideBG"
              : "createPageImageInputWrapper"
          }
        >
          <div className="createPageImageInputContent">
            <img
              src="uploadIcon.png"
              alt=""
              style={{
                height: "40px",
                width: "40px",
                marginBottom: "10px",
              }}
              className={previewSrc ? "hide" : ""}
            />
            <span className={previewSrc ? "hide" : ""}>
              Выберите файл или
              <br /> перетащите его сюда
            </span>
          </div>
          <СreateIdeaPreviewImage src={previewSrc}></СreateIdeaPreviewImage>
          <input
            id="createPageImageInput"
            accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp,video/mp4,video/x-m4v,video/quicktime"
            aria-label="Загрузка файлов"
            multiple=""
            type="file"
            onChange={(event) => changeHandler(event)}
          ></input>
        </div>
        <div className="createPageInputFieldsBlock">
          <InputField
            onChange={() => setNameError("")}
            error={nameError}
            isCorrect={!nameError}
            id={CreatePageNameInputId}
          >
            Название
          </InputField>
          <InputField id={CreatePageDescriptionInputId} isCorrect={true}>
            Описание
          </InputField>
          <InputField id={CreatePageLinkInputId} isCorrect={true}>
            Ссылка при нажатии
          </InputField>
          <InputField id={CreatePageTagsInputId} isCorrect={true}>
            Теги
          </InputField>
        </div>
      </div>
    </>
  );
}

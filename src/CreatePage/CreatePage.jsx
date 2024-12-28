import { useState } from "react";
import InputField from "../InputField/InputField";
import "./CreatePage.css";
import "../InputField/InputField.css";
import СreateIdeaPreviewImage from "./СreateIdeaPreviewImage";
const CreatePageNameInputId = "createPageNameInput";
const CreatePageDescriptionInputId = "createPageDescriptionInput";
const CreatePageLinkInputId = "createPageLinkInput";
const CreatePageTagsInputId = "createPageTagsInput";
const CreatePageResponseId = "createPageResponse";

export default function CreatePage() {
  const [previewSrc, setPreviewSrc] = useState("");
  const [previewSrcError, setPreviewSrcError] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [createResponseCorrect, setCreateResponseCorrent] = useState(true);
  const [createResponse, setCreateResponse] = useState("");
  function onNameChanged(event) {
    setNameError("");
    setName(event.target.value);
  }
  function onDescChanged(event) {
    setDescriptionError("");
    setDescription(event.target.value);
  }
  function onLinkChanged(event) {
    setLink(event.target.value);
  }
  function onTagsChanged(event) {
    setTags(event.target.value);
  }
  function validateName() {
    const input = document.getElementById(CreatePageNameInputId);
    const name = input.value;
    if (name.length < 4) {
      setNameError("Name must be at least 4 characters long");
      return false;
    }
    return true;
  }
  function validateInputImage() {
    if (previewSrc === "") {
      setPreviewSrcError("Please load an image");
      return false;
    }
    return true;
  }
  function validateDescription() {
    const input = document.getElementById(CreatePageDescriptionInputId);
    const desc = input.value;
    if (desc.length < 12) {
      setDescriptionError("Description must be at least 12 characters long");
      return false;
    }
    return true;
  }
  function handleAfterSend(json) {
    if (Object.hasOwn(json, "err")) {
      setCreateResponse(json.err);
      setCreateResponseCorrent(false);
    } else {
      setCreateResponse("Идея успешно опубликована");
      setCreateResponseCorrent(true);
      setPreviewSrc("");
    }
    document
      .getElementById(CreatePageResponseId)
      .classList.remove("fadeAnimation");
    setTimeout(() => {
      document
        .getElementById(CreatePageResponseId)
        .classList.add("fadeAnimation");
    }, 2000);
    setTimeout(() => {
      setCreateResponse("");
    }, 3000);
  }
  function onPublishClick() {
    if (!validateInputImage()) return;
    if (!validateName()) return;
    if (!validateDescription()) return;

    const req = JSON.stringify({
      image: previewSrc,
      name: name,
      description: description,
      link: link,
      tags: tags,
    });
    fetch(`http://localhost:8182/create-pin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: req,
    })
      .then((response) => response.json())
      .then((json) => handleAfterSend(json));
  }
  const changeHandler = (event) => {
    if (!event.target.files.length) {
      return;
    }
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewSrc(ev.target.result);
        setPreviewSrcError("");
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
        <span
          id={CreatePageResponseId}
          className={
            createResponseCorrect
              ? "createResponseCorrect"
              : "createResponseError"
          }
        >
          {createResponse ? createResponse : ""}
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
              : previewSrcError
              ? "createPageImageInputWrapper wrapperError"
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
          {previewSrc && (
            <СreateIdeaPreviewImage src={previewSrc}></СreateIdeaPreviewImage>
          )}
          <input
            id="createPageImageInput"
            accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp,video/mp4,video/x-m4v,video/quicktime"
            aria-label="Загрузка файлов"
            multiple=""
            type="file"
            onChange={(event) => changeHandler(event)}
          ></input>
          <span
            style={{
              color: "rgba(202, 18, 18, 1)",
              fontSize: "18px",
              fontWeight: "500",
              width: "100%",
              display: "inline-block",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {" "}
            {previewSrcError}
          </span>
        </div>
        <div className="createPageInputFieldsBlock">
          <InputField
            onChange={onNameChanged}
            error={nameError}
            isCorrect={!nameError}
            id={CreatePageNameInputId}
            reset={!name}
          >
            Название
          </InputField>
          <InputField
            id={CreatePageDescriptionInputId}
            isCorrect={!descriptionError}
            error={descriptionError}
            onChange={onDescChanged}
            reset={!description}
          >
            Описание
          </InputField>
          <InputField
            id={CreatePageLinkInputId}
            isCorrect={true}
            onChange={onLinkChanged}
            reset={!link}
          >
            Ссылка при нажатии
          </InputField>
          <InputField
            id={CreatePageTagsInputId}
            isCorrect={true}
            onChange={onTagsChanged}
            reset={!tags}
          >
            Теги
          </InputField>
        </div>
      </div>
    </>
  );
}

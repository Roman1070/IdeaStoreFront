import { useState } from "react";
import InputField from "../InputField/InputField";
import "./CreatePage.css";
import "../InputField/InputField.css";
import СreateIdeaPreviewImage from "./СreateIdeaPreviewImage";
import { GetCookie, JoinClientAddress } from "../utils";
const CreatePageNameInputId = "createPageNameInput";
const CreatePageDescriptionInputId = "createPageDescriptionInput";
const CreatePageLinkInputId = "createPageLinkInput";
const CreatePageTagsInputId = "createPageTagsInput";
const CreatePageResponseId = "createPageResponse";
const CreatePageImageInputId = "createPageImageInput";
const HostName = "http://localhost:3000/";
export default function CreatePage() {
  const [previewSrc, setPreviewSrc] = useState("");
  const [previewSrcError, setPreviewSrcError] = useState("");
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [createResponseError, setCreateResponseError] = useState("");

  function onNameChanged(event) {
    setNameError("");
    setName(event.target.value);
  }

  function onLinkChanged(event) {
    setLink(event.target.value);
  }
  function onTagsChanged(event) {
    setTags(event.target.value);
  }
  function onDescriptionChanged(event) {
    setDescription(event.target.value);
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
  function handleAfterSend(json) {
    console.log(json);
    if (Object.hasOwn(json, "err")) {
      setCreateResponseError(json.err);
    } else {
      setCreateResponseError("");
      window.location.assign(`/idea/${json.idea_id}`);
    }
  }
  function onPublishClick() {
    if (!validateInputImage()) return;
    if (!validateName()) return;

    var data = new FormData();
    var imageData = document.getElementById(CreatePageImageInputId).files[0];
    data.append("image", imageData);
    data.append("name", name);
    data.append("description", description);
    data.append("link", link);
    data.append("tags", tags);
    console.log(GetCookie("token"));
    fetch(JoinClientAddress("idea"), {
      method: "POST",
      body: data,
      credentials: "include",
      headers: {
        cookie: `token=${GetCookie("token")};`,
      },
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
        <span id={CreatePageResponseId} className="createResponseError">
          {createResponseError}
        </span>
        <button onClick={onPublishClick} className="createIdeaButton">
          Опубликовать
        </button>
      </div>
      <form className="createPageMainElement" encType="multipart/form-data">
        <div
          className={
            previewSrc
              ? "createPageImageInputWrapper hideBG"
              : previewSrcError
              ? "createPageImageInputWrapper wrapperError"
              : "createPageImageInputWrapper"
          }
        >
          {!previewSrc && (
            <div className="createPageImageInputContent">
              <img
                src={HostName + "images/uploadIcon.png"}
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
          )}
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
            onChangeAction={onNameChanged}
            error={nameError}
            isCorrect={!nameError}
            id={CreatePageNameInputId}
          >
            Название
          </InputField>
          <InputField
            id={CreatePageDescriptionInputId}
            isCorrect={true}
            onChangeAction={onDescriptionChanged}
          >
            Описание
          </InputField>
          <InputField
            id={CreatePageLinkInputId}
            isCorrect={true}
            onChangeAction={onLinkChanged}
          >
            Ссылка при нажатии
          </InputField>
          <InputField
            id={CreatePageTagsInputId}
            isCorrect={true}
            onChangeAction={onTagsChanged}
          >
            Теги
          </InputField>
        </div>
      </form>
    </>
  );
}

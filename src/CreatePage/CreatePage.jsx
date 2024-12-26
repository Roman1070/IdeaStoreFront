import InputField from "../InputField/InputField";
import "./CreatePage.css";
export default function CreatePage() {
  return (
    <>
      <div className="createPageUpperText">
        <span
          style={{
            fontSize: "22px",
            fontWeight: "500",
          }}
        >
          Опубликовать идею
        </span>
      </div>
      <div className="createPageMainElement">
        <div className="createPageImageInputWrapper">
          <div className="createPageImageInputContent">
            <img
              src="uploadIcon.png"
              alt=""
              style={{
                height: "40px",
                width: "40px",
                marginBottom: "10px",
              }}
            />
            <span>
              Выберите файл или
              <br /> перетащите его сюда
            </span>
          </div>
          <input
            className="createPageImageInput"
            accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp,video/mp4,video/x-m4v,video/quicktime"
            aria-label="Загрузка файлов"
            id="storyboard-upload-input"
            multiple=""
            tabindex="0"
            type="file"
          ></input>
        </div>
        <div className="createPageInputFieldsBlock">
          <InputField isCorrect={true}>Название</InputField>
        </div>
      </div>
    </>
  );
}

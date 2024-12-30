import "./RegisterModal.css";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import InputField from "../InputField/InputField";
import { JoinClientAddress } from "../utils";
import { Login, Register } from "../requests";
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
function validatePassword(pass, confirm) {
  if (pass != confirm)
    return {
      field: "confirm",
      msg: "Пароли должны совпадать",
    };
  if (pass.length < 6)
    return {
      field: "password",
      msg: "Минимальная длина пароля - 6 символов",
    };
  return {
    field: "password",
    msg: "ok",
  };
}
function validateBirthDate(birthDate) {
  return birthDate != undefined && birthDate.length > 0;
}
export default function RegisterForm() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  var email = "";
  var password = "";

  function handleRegister(json) {
    if (Object.hasOwn(json, "err")) {
      console.log(json.err);
      setEmailError(json.err);
    } else if (Object.hasOwn(json, "user_id")) {
      Login(email, password, (json) => {
        if (Object.hasOwn(json, "err")) {
          console.log(json.err);
          setEmailError(json.err);
        } else if (Object.hasOwn(json, "token")) {
          document.cookie = `token=${json.token}; path=/;`;
          window.location.assign("/");
        }
      });
    }
  }
  var handleSubmit = (event) => {
    event.preventDefault();
    email = event.target.elements.email.value;
    password = event.target.password.value;
    const confirmPassword = event.target.passwordConfirm.value;
    const birthDate = event.target.birthDate.value;
    if (!validateEmail(email)) {
      setEmailError("Неправильный формат email");
      return;
    }
    const validatePasswordResult = validatePassword(password, confirmPassword);
    if (validatePasswordResult.msg != "ok") {
      if (validatePasswordResult.field == "confirm") {
        setConfirmPasswordError(validatePasswordResult.msg);
      }
      if (validatePasswordResult.field == "password") {
        setPasswordError(validatePasswordResult.msg);
      }
      return;
    }
    if (!validateBirthDate(birthDate)) {
      setBirthDateError("Пожалуйста, введите дату вашего рождения");
      return;
    }
    const req = JSON.stringify({
      email: email,
      password: password,
      birthDate: birthDate,
    });

    Register(req, handleRegister);
  };
  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <InputField
        name="email"
        type="email"
        onChangeAction={() => setEmailError("")}
        isCorrect={emailError == ""}
        error={emailError}
        placeholder={"Введите адрес эл.почты"}
      >
        Адрес электронной почты
      </InputField>
      <InputField
        name="password"
        type="password"
        isCorrect={passwordError == ""}
        error={passwordError}
        onChangeAction={() => setPasswordError("")}
        placeholder={"Создайте пароль"}
      >
        Пароль
      </InputField>
      <InputField
        name="passwordConfirm"
        type="password"
        isCorrect={confirmPasswordError == ""}
        error={confirmPasswordError}
        onChangeAction={() => setConfirmPasswordError("")}
        placeholder={"Введите пароль еще раз"}
      >
        Подтверждение пароля
      </InputField>
      <InputField
        name="birthDate"
        type="date"
        isCorrect={birthDateError == ""}
        error={birthDateError}
        placeholder={"дд.мм.гггг"}
        onChangeAction={() => setBirthDateError("")}
      >
        Дата рождения
      </InputField>
      <div className="registerInputDiv">
        <input
          type="submit"
          className="registerSubmitButton"
          value="Продолжить"
        />
      </div>
    </form>
  );
}

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
function validateName(name) {
  return name && name.length >= 5;
}
export default function RegisterForm() {
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [birthDate, setBirthDate] = useState();

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
          window.location.pathname("/");
        }
      });
    }
  }
  var handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Неправильный формат email");
      return;
    }
    if (!validateName(name)) {
      setNameError("Минимальная длина имени пользователя - 5 символов");
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

    Register(req, email, name, handleRegister);
  };
  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <InputField
        isCommonInput={true}
        height={"30px"}
        name="email"
        type="email"
        onChangeAction={(val) => {
          setEmailError("");
          setEmail(val);
        }}
        isCorrect={emailError == ""}
        error={emailError}
        value={email}
        placeholder={"Введите адрес эл.почты"}
      >
        Адрес электронной почты
      </InputField>
      <InputField
        isCommonInput={true}
        height={"30px"}
        name="name"
        type="text"
        value={name}
        onChangeAction={(val) => {
          setNameError("");
          setName(val);
        }}
        isCorrect={nameError == ""}
        error={nameError}
        placeholder={"Введите имя пользователя"}
      >
        Имя пользователя
      </InputField>
      <InputField
        isCommonInput={true}
        height={"30px"}
        name="password"
        type="password"
        value={password}
        isCorrect={passwordError == ""}
        error={passwordError}
        onChangeAction={(val) => {
          setPasswordError("");
          setPassword(val);
        }}
        placeholder={"Создайте пароль"}
      >
        Пароль
      </InputField>
      <InputField
        isCommonInput={true}
        height={"30px"}
        name="passwordConfirm"
        type="password"
        value={confirmPassword}
        isCorrect={confirmPasswordError == ""}
        error={confirmPasswordError}
        onChangeAction={(val) => {
          setConfirmPasswordError("");
          setConfirmPassword(val);
        }}
        placeholder={"Введите пароль еще раз"}
      >
        Подтверждение пароля
      </InputField>
      <InputField
        isCommonInput={true}
        height={"30px"}
        name="birthDate"
        type="date"
        value={birthDate}
        isCorrect={birthDateError == ""}
        error={birthDateError}
        placeholder={"дд.мм.гггг"}
        onChangeAction={(val) => {
          setBirthDateError("");
          setBirthDate(val);
        }}
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

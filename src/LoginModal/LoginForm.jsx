import "./LoginModal.css";
import InputField from "../InputField/InputField";
import { useState } from "react";
import { JoinClientAddress } from "../utils";
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export default function LoginForm() {
  const [emailError, setEmailError] = useState("");

  function handleLogin(json) {
    if (Object.hasOwn(json, "err")) {
      console.log(json.err);
      setEmailError(json.err);
    } else if (Object.hasOwn(json, "token")) {
      let date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();
      document.cookie = `token=${json.token}; path=/; expires=${date}`;
      window.location.assign("/");
    }
  }
  var handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.password.value;

    if (!validateEmail(email)) {
      setEmailError("Wrong email format");
      return;
    }
    fetch(JoinClientAddress("login"), {
      method: "POST",
      headers: {
        /** Заголовок, указывающий, что клиент ожидает получить данные в формате JSON */
        Accept: "application/json",

        /** Заголовок, указывающий, что тело запроса отправляется в формате JSON */
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => handleLogin(json));
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
        isCorrect={true}
        placeholder={"Создайте пароль"}
      >
        Пароль
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

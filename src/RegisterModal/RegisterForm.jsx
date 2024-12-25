import "./RegisterModal.css";
import RegisterInputField from "./RegisterInputField";

export default function RegisterForm() {
  var handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.password.value;
    fetch(
      `http://localhost:8181/register?email=${email}&password=${password}`,
      {
        mode: "no-cors",
        method: "POST",
      }
    ).then((response) => console.log(response.json()));
  };
  return (
    <form className="registerForm" onSubmit={handleSubmit}>
      <RegisterInputField
        name="email"
        type="email"
        placeholder={"Введите адрес эл.почты"}
      >
        Адрес электронной почты
      </RegisterInputField>
      <RegisterInputField
        name="password"
        type="password"
        placeholder={"Создайте пароль"}
      >
        Пароль
      </RegisterInputField>
      <RegisterInputField
        name="password_confirm"
        type="password"
        placeholder={"Введите пароль еще раз"}
      >
        Подтверждение пароля
      </RegisterInputField>
      <RegisterInputField
        name="birth_date"
        type="date"
        placeholder={"дд.мм.гггг"}
      >
        Дата рождения
      </RegisterInputField>
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

import { DeleteCookie } from "../utils";
import "./ProfileModal.css";
function signOut() {
  DeleteCookie("token", "/", "");
  window.location.replace("/");
}
export default function ProfileModal() {
  return (
    <>
      <div className="profileModalBlock">
        <div className="profileModalContainer">
          <button onClick={signOut} className="profileModalButton">
            Выйти
          </button>
        </div>
      </div>
    </>
  );
}

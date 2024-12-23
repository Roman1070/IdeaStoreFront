import "./ProfileModal.css";
function signOut() {
  localStorage.setItem("loggedIn", false);
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

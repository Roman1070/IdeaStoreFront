import { createPortal } from "react-dom";
import "./CreateBoardPopup.css";

export default function CreateBoardPopup({ onClose }) {
  return createPortal(
    <div onClick={onClose} className="createBoardPopupWrapper">
      <div className="createBoardPopup"></div>
    </div>,
    document.getElementById("modal")
  );
}

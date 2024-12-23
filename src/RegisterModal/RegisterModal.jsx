import { useRef } from "react";
import "./RegisterModal.css";

export default function RegisterModal({ open }) {
  const dialog = useRef();
  return (
    <>
      <div className="registerModalBlockFade">
        <div className="registerModalBlock">
          <div className="registerModalContainer">
            <div className="registerModalIconContainer">
              <img src="logo.png" alt="" className="registerModalIcon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

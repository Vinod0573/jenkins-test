import { useRef } from "react";
import useOnClickOutside from "../../../utilities/useOnClickOutside";
import "./Modal.css";
export default function Modal({
  children,
  shown,
  close,
  extraClassStyleModalBackDrop,
  extraClassStyleModalContent,
}) {
  const ref = useRef();
  useOnClickOutside(ref, () => close());
  return shown ? (
    <div
      className={` ${
        extraClassStyleModalBackDrop
          ? extraClassStyleModalBackDrop
          : "modal-backdrop"
      }`}
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
      ref={ref}
    >
      <div
        className={` ${
          extraClassStyleModalContent
            ? extraClassStyleModalContent
            : "modal-content"
        }`}
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        {/* <button onClick={close}>Close</button> */}
        {children}
      </div>
    </div>
  ) : null;
}

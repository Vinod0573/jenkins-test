import { Children, useEffect, useRef } from "react";

interface props {
  children?: React.ReactNode;
  onClose: CallableFunction;
}
export default function CloseOnClickOutside(props: props) {
  const ref: any = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      setTimeout(() => {
        if (ref && ref.current) {
          if (!ref.current?.contains(event.target)) {
            props.onClose();
          }
        }
      }, 300);
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  });
  return <span ref={ref}>{props.children}</span>;
}

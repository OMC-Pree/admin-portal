import { useEffect } from "react";
import { NAV_MENU_TOGGLE_BTN_ID } from "../components/AppHeader";

function useOutsideClick(ref: React.RefObject<Element>, callback: () => void) {
  useEffect(() => {
    const handleClickOutside = createOutsideClickHandler({ ref, callback });
    const handleKeyup = createKeyupHandler(callback);
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keyup", handleKeyup, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keyup", handleKeyup, true);
    };
  }, [ref, callback]);
}

export default useOutsideClick;

interface IEventHandlerProps {
  ref: React.RefObject<Element>;
  callback: () => void;
}

const createOutsideClickHandler =
  ({ ref, callback }: IEventHandlerProps) =>
  (event: Event) => {
    const target = event.target as Element;
    const isNavMenuBtn = target.id === NAV_MENU_TOGGLE_BTN_ID;
    if (ref.current && !ref.current.contains(target) && !isNavMenuBtn) {
      callback && callback();
    }
  };

const createKeyupHandler = (callback: () => void) => (event: KeyboardEvent) => {
  if (event.key === "Escape") callback && callback();
};

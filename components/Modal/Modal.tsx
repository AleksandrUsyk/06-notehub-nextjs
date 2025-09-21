import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Создаем или находим modal-root только на клиенте
    let el = document.getElementById("modal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
    }
    setModalRoot(el);

    // Обработчик клавиши Escape
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Очистка при размонтировании
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      // Не удаляем modal-root, чтобы он оставался для других модалок
    };
  }, [onClose]);

  // Если modalRoot еще не готов, ничего не рендерим
  if (!modalRoot) return null;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

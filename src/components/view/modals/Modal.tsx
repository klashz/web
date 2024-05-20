import React, { ReactNode } from "react";
import cl from "./Modal.module.css";

interface MyModalProps {
  children: ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const MyModal: React.FC<MyModalProps> = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.Modal];

  if (visible) {
    rootClasses.push(cl.active);
  }

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div className={rootClasses.join(" ")} onClick={closeModal}>
      <div className={cl.ModalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;

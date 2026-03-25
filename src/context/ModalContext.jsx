import { createContext, useContext, useState } from "react";
import Modal from "../Components/Modal"; // ← shu yerda

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} closeModal={closeModal} /> {/* ← shu yerda */}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

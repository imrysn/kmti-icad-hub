import React, { createContext, useContext } from 'react';

interface ModalContextType {
  notify: (msg: string, type?: string) => void;
  confirm: (msg: string) => Promise<boolean>;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  notify: () => {},
  confirm: async () => true,
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const notify = (msg: string, type?: string) => {
    if (type === 'error') {
      console.error(msg);
      alert('Error: ' + msg);
    } else {
      console.log(msg);
      alert(msg);
    }
  };
  
  const confirmAction = async (msg: string) => {
    return window.confirm(msg);
  };
  
  const openModal = (content: React.ReactNode) => {
    console.log("Modal opened", content);
  };
  
  const closeModal = () => {
    console.log("Modal closed");
  };
  
  return (
    <ModalContext.Provider value={{ notify, confirm: confirmAction, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

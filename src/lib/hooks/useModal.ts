import { useState } from 'react';

interface ModalState {
  isShowing: boolean;
  toggle: () => void;
}

const useModal = (): ModalState => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => setIsShowing((prev) => !prev);

  return {
    isShowing,
    toggle,
  };
};

export default useModal;

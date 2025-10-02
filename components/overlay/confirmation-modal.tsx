import { useConfirmationModalProps } from "@/types/component-types";
import { useState } from "react";

export const ConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] =
    useState<useConfirmationModalProps | null>(null);

  const openModal = (props: useConfirmationModalProps) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalProps(null);
  };

  const handleConfirm = () => {
    if (modalProps?.onConfirm) {
      modalProps.onConfirm();
    }
    closeModal();
  };

  return {
    isOpen,
    modalProps,
    openModal,
    closeModal,
    handleConfirm,
  };
};

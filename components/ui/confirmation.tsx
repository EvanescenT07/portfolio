import { ConfirmationModalProps } from "@/types/component-types";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export const ModalConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default",
  icon,
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          confirmButton: "bg-red-600 hover:bg-red-700 text-white",
          iconColor: "text-red-500",
        };
      default:
        return {
          confirmButton:
            "bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground",
          iconColor: "text-sidebar-primary",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-background border border-foreground rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  {icon || (
                    <div
                      className={`p-2 rounded-full bg-muted ${styles.iconColor}`}
                    >
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold font-work-sans text-foreground">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-foreground/40 cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-foreground font-work-sans leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 p-6 pt-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-sm font-medium text-foreground bg-background hover:bg-foreground/60 rounded-lg transition-colors"
                >
                  {cancelText}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${styles.confirmButton}`}
                >
                  {confirmText}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

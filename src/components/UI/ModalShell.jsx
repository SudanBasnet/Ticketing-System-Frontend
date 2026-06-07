import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const ModalShell = ({ children, eyebrow, title, description, onClose }) => {
  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          as={motion.section}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-white/20 bg-white shadow-2xl shadow-slate-950/30"
        >
        <header className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              {eyebrow && (
                <p className="text-sm font-semibold uppercase text-cyan-300">
                  {eyebrow}
                </p>
              )}
              <DialogTitle className="mt-1 text-2xl font-bold">
                {title}
              </DialogTitle>
              {description && (
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  {description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              <FiX size={20} />
            </button>
          </div>
        </header>

        <div className="overflow-y-auto p-6">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalShell;

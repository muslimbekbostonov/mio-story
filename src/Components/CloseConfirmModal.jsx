export default function CloseConfirmModal({ isOpen, onCancel, onConfirm }) {
  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300
        ${isOpen ? "bg-black/40 pointer-events-auto" : "bg-black/0 pointer-events-none"}`}
    >
      <div
        className={`bg-white rounded-2xl w-113 p-6 flex flex-col gap-0.5 items-center text-center transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="w-10 h-10">
          <img
            className="w-full h-full object-contain"
            src="/src/assets/img/warring.svg"
            alt="!"
          />
        </div>

        <h2 className="text-[#0B0B0B] text-[20px] font-semibold">
          Close without saving?
        </h2>
        <p className="text-[#757575] text-[16px]">
          You have unsaved changes. If you close now, all entered data will be
          lost.
        </p>

        <div className="flex pt-3 gap-2 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl cursor-pointer border border-transparent text-sm font-medium text-[#757575] hover:border-[#CCCCCC] transition-colors duration-200"
          >
            Stay
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[#E73C50] hover:bg-[#EC6373] active:bg-[#B93040] text-white text-sm font-medium cursor-pointer transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

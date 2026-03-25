import { CircleEllipsis, SquarePen, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { IoMdEye } from "react-icons/io";
import DeleteModal from "../DeleteModal";

export default function StoryCard({ story, onDelete, onCancelDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const dropdownRef = useRef(null);

  const thumbnailUrl = story?.thumbnailUrl || null;

  // Dropdown tashqarisiga click qilinsa yopiladi
  useEffect(() => {
    if (!open) return;
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return (
    <>
      <div className="w-44.75 h-44.75 rounded-2xl overflow-hidden relative">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="card"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#F0F0F0]" />
        )}

        <div className="absolute inset-0 p-2">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-1 text-sm">
              <IoMdEye size={20} />
              <p>0</p>
            </div>
            <div className="relative" ref={dropdownRef}>
              <CircleEllipsis
                size={18}
                className="cursor-pointer"
                onClick={() => setOpen((o) => !o)}
              />
              <div
                className={`absolute right-0 mt-2 p-2 w-40 flex flex-col rounded-xl shadow-lg bg-white border border-[#CCCCCC] z-10
                  transition-all duration-200 origin-top-right
                  ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    onEdit();
                  }}
                  className="flex items-center gap-2 text-[#0B0B0B] text-sm px-2 py-1.5 rounded-lg hover:bg-[#F0F0F0] w-full cursor-pointer"
                >
                  <SquarePen size={16} /> Edit story
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    setDeleteOpen(true);
                  }}
                  className="flex items-center gap-2 text-[#E73C50] text-sm px-2 py-1.5 rounded-lg hover:bg-[#F0F0F0] w-full cursor-pointer"
                >
                  <Trash2 size={16} /> Delete story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteOpen}
        onCancel={() => {
          setDeleteOpen(false);
          onCancelDelete();
        }}
        onDelete={() => {
          setDeleteOpen(false);
          onDelete();
        }}
      />
    </>
  );
}

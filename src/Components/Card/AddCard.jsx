import { Plus } from "lucide-react";

export default function AddCard({ openModal }) {
  return (
    <div
      onClick={openModal}
      className="w-44.75 h-44.75  rounded-2xl border-dashed border-2 border-[#CCCCCC] flex justify-center items-center cursor-pointer"
    >
      <Plus className="text-[#757575]" />
    </div>
  );
}

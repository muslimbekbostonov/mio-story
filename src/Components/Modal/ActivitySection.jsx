import { useRef, useEffect } from "react";
import DatePicker from "../DatePicker";
import { Calendar } from "lucide-react";

export default function ActivitySection({
  activeUntil,
  unlimited,
  onActiveUntilChange,
  onUnlimitedChange,
  trySubmit,
}) {
  const hasDate = !!activeUntil;
  const showError = trySubmit && !hasDate;
  const errorRef = useRef(null);

  useEffect(() => {
    if (showError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showError]);

  return (
    <div className="flex flex-col gap-4 border-b-2 border-[#EDEDED] pb-4">
      <h2 className="text-[#0B0B0B] text-[20px] font-semibold">Activity</h2>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-[#757575]">
          <span className="text-[#E73C50]">*</span> Active until
        </p>

        {unlimited && !hasDate ? (
          <div
            ref={errorRef}
            onClick={() => onUnlimitedChange(false)}
            className={`flex justify-between items-center py-2.5 px-3 border rounded-lg bg-[#F0F0F0] cursor-pointer
              ${showError ? "border-[#E73C50]" : "border-[#CCCCCC]"}`}
          >
            <span className="text-sm text-[#0B0B0B]">
              Title<span className="text-[#E73C50]">*</span>
            </span>
            <Calendar size={16} className="text-[#757575] shrink-0" />
          </div>
        ) : (
          <div ref={errorRef}>
            <DatePicker
              value={activeUntil}
              onChange={onActiveUntilChange}
              placeholder="Choose date"
              showError={showError && !hasDate}
            />
          </div>
        )}

        {showError && (
          <p className="text-xs text-[#E73C50]">This field is required</p>
        )}

        <div className="flex justify-between items-center gap-2">
          <p className="text-[#000000] text-sm">Unlimited time setting</p>

          <div
            onClick={() => onUnlimitedChange(!unlimited)}
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200
              ${unlimited ? "bg-[#933DFF] active:bg-[#00000033]" : "bg-[#0000000D] active:bg-[#00000033]"}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transform transition-transform duration-200
                ${unlimited ? "translate-x-4.5" : "translate-x-0"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

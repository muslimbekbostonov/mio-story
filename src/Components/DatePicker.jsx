import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function DatePicker({
  value,
  onChange,
  placeholder = "Choose date",
  showError = false,
}) {
  const [open, setOpen] = useState(false);
  const [pendingDate, setPendingDate] = useState("");
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const ref = useRef(null);

  // Dropdown ochilganda pendingDate ni value ga tenglashtir
  useEffect(() => {
    if (open) {
      setPendingDate(value || "");
    }
  }, [open]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const firstDay = () => {
    return (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  };

  const cells = Array(firstDay())
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const pendingDateObj = pendingDate ? new Date(pendingDate) : null;

  const isSelected = (day) =>
    pendingDateObj &&
    pendingDateObj.getFullYear() === viewYear &&
    pendingDateObj.getMonth() === viewMonth &&
    pendingDateObj.getDate() === day;

  const displayValue = value
    ? new Date(value)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, ".")
    : "";

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  }

  function handleSelect(day) {
    const date = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setPendingDate(date);
  }

  function handleApply() {
    onChange(pendingDate);
    setOpen(false);
  }

  function handleClear() {
    setPendingDate("");
    onChange("");
    setOpen(false);
  }

  const hasPending = !!pendingDate;
  const hasValue = !!value;

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpen((o) => !o)}
        className={`flex justify-between items-center py-2.5 px-3 border rounded-lg cursor-pointer transition
          ${
            showError
              ? "border-[#E73C50]"
              : open
                ? "border-[#1D1D1E]"
                : "border-[#CCCCCC] hover:border-[#1D1D1E]"
          }`}
      >
        <span
          className={`text-sm ${displayValue ? "text-[#0B0B0B]" : "text-[#AAAAAA]"}`}
        >
          {displayValue || placeholder}
        </span>
        <Calendar size={16} className="text-[#757575] shrink-0" />
      </div>

      {open && (
        <div className="absolute z-50 top-full mt-1 right-0 bg-white border border-[#EDEDED] rounded-xl shadow-xl p-4 space-y-4 w-72.5">
          {/* Header */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevMonth}
              className="w-10 h-10 flex justify-center items-center"
            >
              <ChevronLeft size={25} className="text-[#757575]" />
            </button>
            <span className="text-sm font-semibold text-[#0B0B0B]">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              className="w-10 h-10 flex justify-center items-center"
            >
              <ChevronRight size={25} className="text-[#757575]" />
            </button>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7">
            {DAYS.map((d, i) => (
              <div
                key={i}
                className="text-center text-[12px] font-semibold text-[#AAAAAA]"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 space-y-2">
            {cells.map((day, i) => (
              <div key={i} className="flex justify-center">
                {day ? (
                  <button
                    onClick={() => handleSelect(day)}
                    className={`w-9 h-9.5 rounded-lg text-[16px] transition
                      ${
                        isSelected(day)
                          ? "bg-[#933DFF] text-white font-semibold"
                          : "text-[#0B0B0B] hover:bg-[#F8F8F8]"
                      }`}
                  >
                    {day}
                  </button>
                ) : (
                  <span />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-center gap-2 items-center">
            <button
              onClick={handleClear}
              className={`text-sm font-medium py-2 w-full transition
                ${hasPending ? "text-[#933DFF]" : "text-[#C5C5C5]"}`}
            >
              Clear all
            </button>

            <button
              onClick={hasPending ? handleApply : undefined}
              className={`text-sm font-medium w-full py-2 rounded-lg transition
                ${
                  hasPending
                    ? "bg-[#933DFF] text-white hover:bg-[#A964FF] active:bg-[#7731D0]"
                    : "bg-[#0000000D] text-[#C5C5C5] cursor-not-allowed"
                }`}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useRef, useState } from "react";
import { Paperclip, X } from "lucide-react";

const ALLOWED = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];

function ImageInput({
  label,
  required,
  hint,
  fileState,
  onFileChange,
  onFileRemove,
  showEmptyError,
}) {
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const hasFile = !!(fileState.file || fileState.url);
  const showRedBorder = !!error || (showEmptyError && !hasFile);

  function handleChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;
    if (!ALLOWED.includes(selected.type)) {
      setError("Wrong image format. Supported: png, jpeg, svg, webp");
      return;
    }
    setError("");
    onFileChange(selected);
  }

  function handleRemove() {
    setError("");
    onFileRemove();
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5 pb-4">
      <p className="text-sm text-[#0B0B0B]">
        {required && <span className="text-[#E73C50]">* </span>}
        {label}
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        className={`flex justify-between items-center py-2.5 px-3 border rounded-lg cursor-pointer transition
          ${
            showRedBorder
              ? "border-[#E73C50]"
              : focused
                ? "border-[#1D1D1E]"
                : "border-[#CCCCCC] hover:border-[#1D1D1E]"
          }`}
      >
        <span
          className={`text-sm truncate ${hasFile ? "text-[#0B0B0B]" : "text-[#AAAAAA]"}`}
        >
          {fileState.file
            ? fileState.file.name
            : fileState.url
              ? fileState.url.split("/").pop()
              : "Choose file"}
        </span>
        {hasFile ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            className="text-[#757575] hover:text-[#E73C50] shrink-0"
          >
            <X size={16} />
          </button>
        ) : (
          <Paperclip size={18} className="text-[#757575] shrink-0" />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        className="hidden"
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {error && <p className="text-xs text-[#E73C50]">{error}</p>}
      {!error && showEmptyError && !hasFile && (
        <p className="text-xs text-[#E73C50]">This field is required</p>
      )}
      <p className="text-xs text-[#757575]">{hint}</p>
    </div>
  );
}

export default function ImagesSection({
  thumbnail,
  background,
  onFileChange,
  onFileRemove,
  trySubmit,
}) {
  return (
    <div className="flex flex-col gap-4 border-b-2 border-[#EDEDED]">
      <h2 className="text-[#0B0B0B] text-[20px] font-semibold">Images</h2>
      <ImageInput
        label="Thumbnail"
        required
        hint="Upload a cover image to appear in your story list"
        fileState={thumbnail}
        onFileChange={(file) => onFileChange("thumbnail", file)}
        onFileRemove={() => onFileRemove("thumbnail")}
        showEmptyError={trySubmit}
      />
      <ImageInput
        label="Background image"
        required
        hint="The main image that will be shown inside the story"
        fileState={background}
        onFileChange={(file) => onFileChange("background", file)}
        onFileRemove={() => onFileRemove("background")}
        showEmptyError={trySubmit}
      />
    </div>
  );
}

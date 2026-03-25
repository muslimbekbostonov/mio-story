export default function TextSection({
  title,
  subtitle,
  onTitleChange,
  onSubtitleChange,
}) {
  return (
    <div className="flex flex-col gap-4 border-b-2 border-[#EDEDED] pb-4">
      <h2 className="text-[#0B0B0B] text-[20px] font-semibold">Text content</h2>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-[#0B0B0B]">Title</p>
        <div className="flex items-center py-2.5 px-3 border border-[#CCCCCC] rounded-lg focus-within:border-[#1D1D1E] hover:border-[#1D1D1E] transition">
          <input
            className="w-full outline-none text-sm"
            placeholder="Optional story title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <p className="text-sm text-[#757575]">Optional story title</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-[#0B0B0B]">Subtitle</p>
        <div className="flex items-center py-2.5 px-3 border border-[#CCCCCC] rounded-lg focus-within:border-[#1D1D1E] hover:border-[#1D1D1E] transition">
          <input
            className="w-full outline-none text-sm"
            placeholder="Additional text to clarify details"
            type="text"
            value={subtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
          />
        </div>
        <p className="text-sm text-[#757575]">
          Additional text to clarify details
        </p>
      </div>
    </div>
  );
}

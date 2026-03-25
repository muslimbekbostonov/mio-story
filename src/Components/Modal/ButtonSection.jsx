export default function ButtonSection({
  buttonTitle,
  onButtonTitleChange,
  buttonLink,
  onButtonLinkChange,
  trySubmit,
}) {
  const linkRequired = buttonTitle.trim().length > 0;
  const showLinkError = trySubmit && linkRequired && !buttonLink.trim();

  return (
    <div className="flex flex-col gap-4 pb-4">
      <h2 className="text-[#0B0B0B] text-[20px] font-semibold">Button</h2>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-[#0B0B0B]">Button title</p>
        <div className="flex items-center py-2.5 px-3 border border-[#CCCCCC] rounded-lg focus-within:border-[#1D1D1E] hover:border-[#1D1D1E] transition">
          <input
            className="w-full outline-none text-sm"
            placeholder="Optional"
            type="text"
            value={buttonTitle}
            onChange={(e) => onButtonTitleChange(e.target.value)}
          />
        </div>
        <p className="text-sm text-[#757575]">Action button text</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-[#0B0B0B]">
          {linkRequired && <span className="text-[#E73C50]">* </span>}
          Button link
        </p>
        <div
          className={`flex items-center py-2.5 px-3 border rounded-lg transition
            ${
              !linkRequired
                ? "border-[#CCCCCC] bg-[#F0F0F0] cursor-not-allowed"
                : showLinkError
                  ? "border-[#E73C50] bg-white focus-within:border-[#E73C50]"
                  : "border-[#CCCCCC] bg-white focus-within:border-[#1D1D1E] hover:border-[#1D1D1E]"
            }`}
        >
          <input
            className="w-full outline-none text-sm bg-transparent"
            placeholder="Enter URL"
            type="text"
            value={buttonLink}
            disabled={!linkRequired}
            onChange={(e) => onButtonLinkChange(e.target.value)}
          />
        </div>
        {showLinkError && (
          <p className="text-xs text-[#E73C50]">This field is required</p>
        )}
        <p className="text-sm text-[#757575]">
          The link the user will be redirected to when they click the button
        </p>
      </div>
    </div>
  );
}

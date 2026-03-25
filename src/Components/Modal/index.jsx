import { Plus, X, LoaderCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ActivitySection from "./ActivitySection";
import ImagesSection from "./ImagesSection";
import TextSection from "./TextSection";
import ButtonSection from "./ButtonSection";

function PreviewBox({
  url,
  loading,
  className,
  title,
  subtitle,
  buttonTitle,
  buttonLink,
}) {
  return (
    <div
      className={`relative flex justify-center items-center border-2 border-[#CCCCCC] rounded-xl overflow-hidden ${className}`}
    >
      {loading ? (
        <LoaderCircle size={24} className="text-[#C5C5C5] animate-spin" />
      ) : url ? (
        <>
          <img src={url} alt="preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-3 py-9">
            {title && (
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                  lineHeight: "1.3",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {title}
              </p>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "#FFFFFF",
                  lineHeight: "1.4",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {subtitle}
              </p>
            )}
            {buttonTitle && (
              <a
                href={buttonLink || "#"}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  color: "#0B0B0B",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginTop: "4px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {buttonTitle}
              </a>
            )}
          </div>
        </>
      ) : (
        <Plus className="text-[#C5C5C5]" />
      )}
    </div>
  );
}

function ThumbnailBox({ url, loading, className }) {
  return (
    <div
      className={`flex justify-center items-center border-2 border-[#CCCCCC] rounded-2xl overflow-hidden ${className}`}
    >
      {loading ? (
        <LoaderCircle size={24} className="text-[#C5C5C5] animate-spin" />
      ) : url ? (
        <img src={url} alt="thumbnail" className="w-full h-full object-cover" />
      ) : (
        <Plus className="text-[#C5C5C5]" />
      )}
    </div>
  );
}

// Fayl uchun Object URL ni bir marta yaratadi va tozalaydi (memory leak yo'q)
function useObjectUrl(file) {
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return objectUrl;
}

export default function Modal({
  isOpen,
  closeModal,
  onSave,
  onUpdate,
  editingStory,
}) {
  const [thumbnail, setThumbnail] = useState({
    file: null,
    url: null,
    loading: false,
  });
  const [background, setBackground] = useState({
    file: null,
    url: null,
    loading: false,
  });
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [activeUntil, setActiveUntil] = useState("");
  const [unlimited, setUnlimited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  const toastTimerRef = useRef(null);
  const [trySubmit, setTrySubmit] = useState(false);

  // Object URL — faqat fayl o'zgarganda bir marta yaratiladi, memory safe
  const thumbnailObjectUrl = useObjectUrl(thumbnail.file);
  const backgroundObjectUrl = useObjectUrl(background.file);

  // Preview uchun yakuniy URL
  const thumbnailPreviewUrl = thumbnailObjectUrl || thumbnail.url || null;
  const backgroundPreviewUrl = backgroundObjectUrl || background.url || null;

  const isEditMode = !!editingStory;

  const hasThumbnail = !!(thumbnail.file || thumbnail.url);
  const hasBackground = !!(background.file || background.url);
  const hasActiveUntil = !!activeUntil;
  const buttonLinkValid = !buttonTitle.trim() || !!buttonLink.trim();

  const canSave =
    hasThumbnail &&
    hasBackground &&
    hasActiveUntil &&
    buttonLinkValid &&
    !thumbnail.loading &&
    !background.loading;

  function resetAll() {
    setThumbnail({ file: null, url: null, loading: false });
    setBackground({ file: null, url: null, loading: false });
    setTitle("");
    setSubtitle("");
    setButtonTitle("");
    setButtonLink("");
    setActiveUntil("");
    setUnlimited(false);
    setTrySubmit(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    if (editingStory) {
      setThumbnail({
        file: null,
        url: editingStory.thumbnailUrl || null,
        loading: false,
      });
      setBackground({
        file: null,
        url: editingStory.backgroundUrl || null,
        loading: false,
      });
      setTitle(editingStory.title || "");
      setSubtitle(editingStory.subtitle || "");
      setButtonTitle(editingStory.buttonTitle || "");
      setButtonLink(editingStory.buttonLink || "");
      setActiveUntil(editingStory.activeUntil || "");
      setUnlimited(editingStory.unlimited || false);
    } else {
      resetAll();
    }
  }, [isOpen, editingStory]);

  function handleFileChange(type, file) {
    const setter = type === "thumbnail" ? setThumbnail : setBackground;
    setter({ file: null, url: null, loading: true });
    setTimeout(() => setter({ file, url: null, loading: false }), 1000);
  }

  function handleFileRemove(type) {
    const setter = type === "thumbnail" ? setThumbnail : setBackground;
    setter({ file: null, url: null, loading: false });
  }

  function showToast(msg) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMsg(msg);
    setVisible(true);
    toastTimerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setToastMsg(null), 300);
    }, 3000);
  }

  function handleSave() {
    if (saving) return;
    if (!canSave) {
      setTrySubmit(true);
      return;
    }
    setSaving(true);

    setTimeout(() => {
      const storyData = {
        thumbnailUrl: thumbnailPreviewUrl,
        backgroundUrl: backgroundPreviewUrl,
        title,
        subtitle,
        buttonTitle,
        buttonLink,
        activeUntil,
        unlimited,
      };

      if (isEditMode) {
        onUpdate({ ...editingStory, ...storyData });
      } else {
        onSave(storyData);
      }

      setSaving(false);
      closeModal();
      showToast(
        isEditMode ? "Story changed successfully" : "Story posted successfully",
      );
    }, 1500);
  }

  function handleCancel() {
    if (saving) return;
    const wasEditMode = isEditMode;
    closeModal();
    showToast(wasEditMode ? "Story not changed" : "Story not posted");
  }

  return (
    <>
      <div
        onClick={(e) => e.target === e.currentTarget && !saving && closeModal()}
        className={`fixed inset-0 z-50 flex p-6 justify-end transition-all duration-300
          ${isOpen ? "bg-black/40 pointer-events-auto" : "bg-black/0 pointer-events-none"}`}
      >
        <div
          className={`flex flex-col bg-white w-211.25 rounded-2xl max-h-full transition-all duration-300
            ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-[#EDEDED] shrink-0">
            <h2 className="text-[20px] font-semibold text-[#0B0B0B]">
              {isEditMode ? "Edit story" : "Add new story"}
            </h2>
            <button
              onClick={closeModal}
              disabled={saving}
              className="rounded-full bg-[#0000000D] p-2 hover:bg-[#00000019] transition-colors duration-200"
            >
              <X className="text-[#757575]" size={20} />
            </button>
          </div>

          {/* Kontent */}
          <div className="flex gap-6 px-4 flex-1 overflow-hidden">
            {/* Chap — preview */}
            <div className="w-[42%] flex flex-col">
              <div className="flex gap-2 pb-5 pt-4">
                <ThumbnailBox
                  url={thumbnailPreviewUrl}
                  loading={thumbnail.loading}
                  className="w-30 h-30 shrink-0"
                />
              </div>
              <div className="py-5 border-t-2 border-[#EDEDED] flex-1">
                <PreviewBox
                  url={backgroundPreviewUrl}
                  loading={background.loading}
                  className="w-full h-full"
                  title={title}
                  subtitle={subtitle}
                  buttonTitle={buttonTitle}
                  buttonLink={buttonLink}
                />
              </div>
            </div>

            {/* O'ng — form */}
            <div className="w-[58%] h-full flex flex-col gap-6 pb-4 pt-4 overflow-y-auto simple-scroll pr-3">
              <ActivitySection
                activeUntil={activeUntil}
                unlimited={unlimited}
                onActiveUntilChange={setActiveUntil}
                onUnlimitedChange={setUnlimited}
                trySubmit={trySubmit}
              />
              <ImagesSection
                thumbnail={thumbnail}
                background={background}
                onFileChange={handleFileChange}
                onFileRemove={handleFileRemove}
                trySubmit={trySubmit}
              />
              <TextSection
                title={title}
                subtitle={subtitle}
                onTitleChange={setTitle}
                onSubtitleChange={setSubtitle}
              />
              <ButtonSection
                buttonTitle={buttonTitle}
                onButtonTitleChange={setButtonTitle}
                buttonLink={buttonLink}
                onButtonLinkChange={setButtonLink}
                trySubmit={trySubmit}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 border-t border-[#EDEDED] shrink-0">
            <button
              onClick={handleCancel}
              disabled={saving}
              className={`px-6 py-2.5 rounded-xl text-[16px] font-medium transition-colors duration-200
                ${
                  saving
                    ? "bg-[#0000000D] text-[#C5C5C5] cursor-not-allowed"
                    : "bg-[#F4ECFF] text-[#933DFF] hover:bg-[#ecdeff] cursor-pointer"
                }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-6 py-2.5 rounded-xl text-[16px] font-medium transition-colors duration-200 min-w-22.5 flex items-center justify-center
                ${
                  canSave && !saving
                    ? "bg-[#A964FF] text-white hover:bg-[#7731D0] cursor-pointer"
                    : "bg-[#0000000D] text-[#C5C5C5] cursor-not-allowed"
                }`}
            >
              {saving ? (
                <LoaderCircle
                  size={20}
                  className="animate-spin text-[#C5C5C5]"
                />
              ) : isEditMode ? (
                "Save"
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div
          className={`fixed flex justify-between items-center gap-10 px-3 border-2 border-[#757575] bg-[#000000D9] rounded-xl py-2 bottom-6 left-1/2 -translate-x-1/2 z-[100]
            transition-all duration-300 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-2">
            <img
              src={
                toastMsg === "Story posted successfully" ||
                toastMsg === "Story changed successfully"
                  ? "/src/assets/img/ic_check_filled.svg"
                  : "/src/assets/img/ic_close_filled.svg"
              }
              alt=""
            />
            <p className="text-[#FFFFFF] text-[16px] font-medium whitespace-nowrap">
              {toastMsg}
            </p>
          </div>
          <button
            className="text-[#000000D9] bg-[#FFFFFF] px-3 py-2 rounded-lg text-sm font-medium"
            onClick={() => {
              setVisible(false);
              setTimeout(() => setToastMsg(null), 300);
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

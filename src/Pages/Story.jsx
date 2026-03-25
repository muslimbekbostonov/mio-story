import { Plus } from "lucide-react";
import { useState } from "react";
import StoryCard from "../Components/Card/StoryCard";
import AddCard from "../Components/Card/AddCard";

export default function Story({ openModal, stories, setStories, onEdit }) {
  const [toastMsg, setToastMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  function showToast(msg) {
    if (timeoutId) clearTimeout(timeoutId);

    setToastMsg(msg);
    setVisible(true);

    const id = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setToastMsg(null), 300);
    }, 3000);

    setTimeoutId(id);
  }

  async function handleDelete(id) {
    try {
      // await api.delete(...)
      setStories((prev) => prev.filter((s) => s.id !== id));
      showToast("Story has been deleted");
    } catch (err) {
      showToast("Story was not deleted");
    }
  }

  function handleCancelDelete() {}

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center py-9 px-5 border-b border-[#EDEDED]">
        <h2 className="text-[#0B0B0B] text-[32px] font-semibold">Story</h2>
        <button
          onClick={openModal}
          className="flex items-center bg-[#933DFF] text-white py-3.5 px-4 gap-1 rounded-[10px]"
        >
          <Plus size={18} /> Add new story
        </button>
      </div>

      {stories.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <img
            src="/src/assets/img/Illustration.svg"
            alt="empty"
            className="w-20 h-20"
          />
          <p className="text-[#0B0B0B] font-semibold text-[16px]">
            You have not created a story yet
          </p>
          <p className="text-[#757575] text-sm text-center max-w-72">
            Stories you've created will appear here. To add a new story, click
            the add story button.
          </p>
        </div>
      ) : (
        <div className="px-5">
          <h2 className="text-[#0B0B0B] font-semibold text-[20px] py-4">
            Your Stories
          </h2>
          <div className="flex flex-wrap gap-2">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onDelete={() => handleDelete(story.id)}
                onCancelDelete={handleCancelDelete}
                onEdit={() => onEdit(story)}
              />
            ))}
            <AddCard openModal={openModal} />
          </div>
        </div>
      )}

      {/* ✅ TOAST */}
      {toastMsg && (
        <div
          className={`fixed flex justify-between items-center gap-10 px-3 border-2 border-[#757575] bg-[#000000D9] rounded-xl py-2 bottom-6 left-1/2 -translate-x-1/2 z-[100]
          transition-all duration-300 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-2">
            <img
              src={
                toastMsg === "Story has been deleted"
                  ? "/src/assets/img/ic_check_filled.svg"
                  : "/src/assets/img/ic_close_filled.svg"
              }
              alt=""
            />
            <p className="text-white text-[16px] font-medium whitespace-nowrap">
              {toastMsg}
            </p>
          </div>

          <button
            className="text-[#000000D9] bg-white px-3 py-2 rounded-lg text-sm font-medium"
            onClick={() => {
              setVisible(false);
              setTimeout(() => setToastMsg(null), 300);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Story from "./Pages/Story";
import Modal from "./Components/Modal";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [stories, setStories] = useState([]);
  const [editingStory, setEditingStory] = useState(null);

  function addStory(story) {
    setStories((prev) => [{ id: Date.now(), ...story }, ...prev]);
  }

  function updateStory(updatedStory) {
    setStories((prev) =>
      prev.map((s) => (s.id === updatedStory.id ? updatedStory : s)),
    );
  }

  function openEditModal(story) {
    setEditingStory(story);
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
    setEditingStory(null);
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-62 h-full">
        <Sidebar />
      </div>
      <div className="flex-1 h-full overflow-hidden">
        <Story
          stories={stories}
          setStories={setStories}
          openModal={() => {
            setEditingStory(null);
            setIsOpen(true);
          }}
          onEdit={openEditModal}
        />
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={handleCloseModal}
        onSave={addStory}
        onUpdate={updateStory}
        editingStory={editingStory}
      />
    </div>
  );
}

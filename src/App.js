import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ModalWrapper from "./components/ModalWrapper";
import PreparePanel from "./components/PreparePanel";

function App() {
  const [modalState, setModalState] = useState(null); // For modal control. Pass in callback/args
  const [editPanelList, setEditPanelList] = useState(null);

  const handleSetModalState = (callback, args) => {
    // Handle passing callback function to allow action on modal
    // callback: The callback function to be fired when the action button on modal is clicked
    // args: The args for the callback function
    if (callback === null) {
      setModalState(null);
      return;
    }
    setModalState({ callback, args });
  };

  const handleSetEditPanelList = (gearList) => {
    // Handle setting Prepare Panel
    if (gearList === null) {
      setEditPanelList(null);
      return;
    }
    setEditPanelList(gearList);
  };

  return (
    <div className="App">
      <Header />
      <Content
        handleSetModalState={handleSetModalState}
        handleSetEditPanelList={handleSetEditPanelList}
      />

      {modalState != null && (
        <ModalWrapper
          modalState={modalState}
          handleSetModalState={handleSetModalState}
        />
      )}

      {editPanelList !== null && (
        <PreparePanel
          editingList={editPanelList}
          handleSetEditPanelList={handleSetEditPanelList}
        />
      )}
    </div>
  );
}

export default App;

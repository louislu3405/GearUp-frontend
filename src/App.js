import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ModalWrapper from "./components/ModalWrapper";

function App() {
  const [modalState, setModalState] = useState(null); // For modal control. Pass in callback/args

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

  return (
    <div className="App">
      <Header />
      <Content handleSetModalState={handleSetModalState} />

      {modalState != null && (
        <ModalWrapper
          modalState={modalState}
          handleSetModalState={handleSetModalState}
        />
      )}
    </div>
  );
}

export default App;

import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ModalWrapper from "./components/ModalWrapper";

function App() {

  const [modalState, setModalState] = useState(null); // For modal control. Pass in callback/args

  return (
    <div className="App">
      <Header/>
      <Content modalState={modalState} setModalState={setModalState}/>

      {modalState != null && <ModalWrapper modalState={modalState} setModalState={setModalState}/>}

    </div>
  );
}

export default App;

import HomePage from "./pages/HomePage";
import {Routes, Route} from "react-router-dom"
import Header from "./components/header/Header";
import Foot from "./components/footer/Foot";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
      <Foot/>
    </div>
  );
}

export default App;

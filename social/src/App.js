import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./Main";
import CardInfo from "./components/CardInfo/CardInfo";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cardInfo" element={<CardInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

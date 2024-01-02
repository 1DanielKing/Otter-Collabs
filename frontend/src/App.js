import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NewUser from "./pages/NewUser";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<NewUser />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

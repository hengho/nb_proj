import './App.css';
import Login from "./components/Login";
import Main from "./components/Main";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path='/' exact element={<Login />} />
                <Route path='main' element={<Main />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;

import './App.css';
import Login from "./components/Login";
import Main from "./components/Main";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path='/' exact element={<Login />} />
                <Route path='main' element={<Main />} />
                <Route path='signup' element={<Signup />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;

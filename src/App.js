import logo from "./logo.svg";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {/* 추가 👇🏻 */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {/* 추가 🖕🏻 */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

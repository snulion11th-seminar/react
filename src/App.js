import logo from "./logo.svg";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;

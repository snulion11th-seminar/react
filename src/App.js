import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import CreatePost from "./routes/CreatePost";
import SignUp from "./routes/SignUp";
import PostDetail from "./routes/PostDetail";
import SignIn from "./routes/SignIn";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* home */}
          <Route path="/" element={<Home />} />
          {/* craete post */}
          <Route path="/create" element={<CreatePost />} />
          {/* post detail */}
          <Route path="/:postId" element={<PostDetail />} />
          {/* sign up */}
          <Route path="/signup" element={<SignUp />} />
          {/* sign up */}
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;

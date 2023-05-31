import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import PostCreatePage from "./routes/PostCreatePage";
import PostEditPage from "./routes/PostEditPage";
import SignUpPage from "./routes/SignUpPage.jsx";
import PostDetailPage from "./routes/PostDetailPage";
import SignInPage from "./routes/SignInPage";
import MyPage from "./routes/MyPage";

function App() {
  return (
    <div className="App">
      {/* 수정 👇🏻 */}
      <BrowserRouter>
        <Header />
        <Routes>
          {/* home */}
          <Route path="/" element={<HomePage />} />
          {/* craete post */}
          <Route path="/create" element={<PostCreatePage />} />
          {/* edit post */}
          <Route path="/:postId/edit" element={<PostEditPage />} />
          {/* post detail */}
          <Route path="/:postId" element={<PostDetailPage />} />
          {/* sign up */}
          <Route path="/signup" element={<SignUpPage />} />
          {/* sign up */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* 수정 👆🏻 */}
    </div>
  );
}

export default App;

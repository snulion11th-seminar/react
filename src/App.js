import logo from './logo.svg';
import CreatePost from './CreatePost';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <div className="app">
//       <Header />
//       <CreatePost />
//       <Footer />
//     </div>
//   );
// }

function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Header />
          <Routes>
            {/* home */}
            {/* <Route  path="/" element={<Home />} /> */}
            {/* craete post */}
            <Route  path="/post/create" element={<CreatePost />} />
            {/* edit post */}
            {/* <Route  path="/:postId/edit" element={<EditPost />} /> */}
            {/* sign up */}
            {/* <Route  path="/signup" element={<Signup />} />/ */}
          </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;

import logo from './logo.svg';
import CreatePost from './CreatePost';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <CreatePost />
      <Footer />
    </div>
  );
}

export default App;

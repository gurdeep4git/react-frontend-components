import './App.css';
import { Routes, Route } from "react-router-dom"
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import InfiniteScroll from './components/InfiniteScroll/InfiniteScroll';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infinite-scroll" element={<InfiniteScroll />} />
      </Routes>
    </div>
  );
}

export default App;

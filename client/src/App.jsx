import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Favourites from "./components/Favourites";
import MovieSearch from "./components/Search";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={MovieSearch} />
        <Route path="/favourites" Component={Favourites} />
      </Routes>
    </>
  );
}

export default App;

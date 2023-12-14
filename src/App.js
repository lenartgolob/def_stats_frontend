import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Player from "./pages/Player";
import Season from "./pages/Season";
import About from "./pages/About";
import PredictionModel from "./pages/PredictionModel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="player/:playerId" element={<Player />} />
          <Route path="season/:year" element={<Season />} />
          <Route path="about" element={<About />} />
          <Route path="prediction-model" element={<PredictionModel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
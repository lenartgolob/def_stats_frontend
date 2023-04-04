import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Player from "./pages/Player";
import Visualization from "./pages/Visualization";
import Seasons from "./pages/Seasons";
import Season from "./pages/Season";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="visualization" element={<Visualization />} />
          <Route path="seasons" element={<Seasons />} />
          <Route path="player/:player" element={<Player />} />
          <Route path="season/:year" element={<Season />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
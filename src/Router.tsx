import { Routes, Route } from "react-router-dom";

import Legal from "./components/routes/Legal";
import Error from "./components/routes/Error";
import Help from "./components/routes/Help";
import Home from "./components/routes/Home";
import Multiradical from "./components/routes/Multiradical";
import MultradicalType from "./components/routes/MultiradicalType";
import KanjiInfo from "./components/routes/KanjiInfo";
import Settings from "./components/routes/Settings";
import Skip from "./components/routes/Skip";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/help" element={<Help />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/multiradical" element={<Multiradical />} />
      <Route path="/multiradicalType" element={<MultradicalType />} />
      <Route path="/kanji/:kanjiParam" element={<KanjiInfo />} />
      <Route path="/skip" element={<Skip />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default Router;

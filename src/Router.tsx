import { Routes, Route } from "react-router-dom";

import InfoLegal from "./components/routes/InfoLegal";
import Error from "./components/routes/Error";
import Help from "./components/routes/Help";
import Home from "./components/routes/Home";
import Multiradical from "./components/routes/Multiradical";
import MultradicalType from "./components/routes/MultiradicalType";
import KanjiInfo from "./components/routes/KanjiInfo";
import Settings from "./components/routes/Settings";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<InfoLegal />} />
      <Route path="/help" element={<Help />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/multiradical" element={<Multiradical />} />
      <Route path="/multiradicalType" element={<MultradicalType />} />
      <Route path="/kanji/:kanjiParam" element={<KanjiInfo />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default Router;

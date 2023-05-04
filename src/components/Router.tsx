import { Routes, Route } from "react-router-dom";

import Legal from "./routes/Legal";
import Error from "./routes/Error";
import Help from "./routes/Help";
import Home from "./routes/Home";
import Multiradical from "./routes/Multiradical";
import MultradicalType from "./routes/MultiradicalType";
import KanjiInfo from "./routes/KanjiInfo/KanjiInfo";
import Settings from "./routes/Settings";
import Skip from "./routes/Skip";

interface Props {
  setTheme: (theme: string) => void;
  theme: string;
}

const Router: React.FC<Props> = ({ setTheme, theme }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/help" element={<Help />} />
      <Route path="/settings" element={<Settings setTheme={setTheme} theme={theme} />} />
      <Route path="/multiradical" element={<Multiradical />} />
      <Route path="/multiradicalType" element={<MultradicalType />} />
      <Route path="/kanji/:kanjiParam" element={<KanjiInfo />} />
      <Route path="/skip" element={<Skip />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Router;

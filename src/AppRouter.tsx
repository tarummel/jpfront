import React from 'react';
import { Routes, Route } from "react-router-dom";
import { About, Error, Help, Home, Multiradical, Settings, KanjiInfo } from "./components/routes";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/multiradical" element={<Multiradical />} />
      <Route path="/kanji/:kanji" element={<KanjiInfo />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRouter;

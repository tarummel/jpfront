import React from 'react';
import { Routes, Route } from "react-router-dom";
import { About, Error, Help, Home, Settings} from "../routes";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AppRouter;

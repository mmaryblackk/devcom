import App from "@/App";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "../NotFound";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/my-cards" replace />} />
        <Route path="/my-cards" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

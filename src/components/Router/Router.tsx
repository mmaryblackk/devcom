import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CardPage } from "@/pages/CardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/my-cards" replace />} />
        <Route path="/my-cards" element={<CardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

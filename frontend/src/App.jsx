import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { ContentsContextProvider } from "./contexts/ContentsContext";
import { AuthProvider } from "./contexts/UserContext";

import './App.css'

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <ContentsContextProvider>
          <Router />
        </ContentsContextProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { ContentsContextProvider } from "./contexts/ContentsContext";
import { AuthProvider } from "./contexts/UserContext";

import './App.css'
import { PopUpsProvider } from "./contexts/PopUpsContext";

export default function App() {

  return (
    <AuthProvider>
      <PopUpsProvider>
        <BrowserRouter>
          <ContentsContextProvider>
            <Router />
          </ContentsContextProvider>
        </BrowserRouter>
      </PopUpsProvider>
    </AuthProvider>
  );
}

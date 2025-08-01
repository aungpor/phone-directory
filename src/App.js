import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import "./assets/styles/main.css";
import Layout from './pages/Layout'
import Main from './components/Auth/Main'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'


export default function App() {

  return (
    <Main>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="test" element={<TestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Main>
  );
}
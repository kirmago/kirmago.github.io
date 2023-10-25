import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet-async"
import favicon from "./source/favicon.ico";

import Homepage from "./pages/Homepage"

function App() {
  return (
    <>
    <Helmet>
      <title>kirmago website</title>
      <link rel='icon' type='image/png' href={favicon} sizes='16x16' />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@30,400,0,0" />
    </Helmet>
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
    </>
  );
}

export default App;
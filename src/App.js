import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tabs from './Tabs';
import AboutMe from './AboutMe';
import Jokes from './Jokes';
import Catchphrase from './Catchphrase';
import BackgroundMusic from './BackgroundMusic';

function App() {
  return (
    <Router basename="/puat_ah">
      <BackgroundMusic folderId="196Zc5K6AQTA_J-SPvSRzO_DFZ1aXUvJy" />
      <Tabs />
      <Routes>
        <Route path="/" element={<AboutMe />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/catchphrase" element={<Catchphrase />} />
      </Routes>
    </Router>
  );
}

export default App;


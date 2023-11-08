import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutMe from './AboutMe';
import Jokes from './Jokes';
import Catchphrase from './Catchphrase';

function Navigation() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/about">About Me</Link></li>
          <li><Link to="/jokes">Jokes</Link></li>
          <li><Link to="/catchphrase">Catchphrase</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/about" element={<AboutMe />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/catchphrase" element={<Catchphrase />} />
      </Routes>
    </Router>
  );
}

export default Navigation;

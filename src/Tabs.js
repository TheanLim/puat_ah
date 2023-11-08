import React from 'react';
import { Link } from 'react-router-dom';
import './Tabs.css'; // Import your CSS file for styling

function Tabs() {
  return (
    <div className="horizontal-tabs">
      <ul>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/jokes">Jokes</Link></li>
        <li><Link to="/catchphrase">Catchphrase</Link></li>
      </ul>
    </div>
  );
}

export default Tabs;

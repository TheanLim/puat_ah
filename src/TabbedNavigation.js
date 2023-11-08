import React, { useState } from 'react';
import AboutMe from './AboutMe';
import Jokes from './Jokes';
import Catchphrase from './Catchphrase';


function TabbedNavigation() {
  const [selectedTab, setSelectedTab] = useState('about');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => handleTabClick('about')} className={selectedTab === 'about' ? 'active' : ''}>About Me</li>
          <li onClick={() => handleTabClick('jokes')} className={selectedTab === 'jokes' ? 'active' : ''}>Jokes</li>
          <li onClick={() => handleTabClick('catchphrase')} className={selectedTab === 'catchphrase' ? 'active' : ''}>Catchphrase</li>
        </ul>
      </nav>

      <div>
        {selectedTab === 'about' && <AboutMe />}
        {selectedTab === 'jokes' && <Jokes />}
        {selectedTab === 'catchphrase' && <Catchphrase />}
      </div>
    </div>
  );
}

export default TabbedNavigation;

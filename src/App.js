// import React from 'react';
// import Navigation from './Navigation';

// function App() {
//   return (
//     <div>
//       <h1>Welcome to Puat-Ah</h1>
//       <Navigation />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tabs from './Tabs';
import AboutMe from './AboutMe';
import Jokes from './Jokes';
import Catchphrase from './Catchphrase';

function App() {
  return (
    <Router>
      <Tabs />
      <Routes>
        <Route path="/about" element={<AboutMe />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/catchphrase" element={<Catchphrase />} />
      </Routes>
    </Router>
  );
}

export default App;


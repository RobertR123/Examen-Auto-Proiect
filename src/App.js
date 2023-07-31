import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home.js';
import Instruct from './components/instruct/Instruct.js';
import Start from './components/instruct/Start.js';


function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/start/instructions" exact component={Instruct} />
      <Route path="/start/initialize" exact component={Start} />
    </Router>
  );
}

export default App;

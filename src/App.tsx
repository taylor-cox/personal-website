import React from 'react';

import Intro from './sections/intro/Intro';
import About from './sections/about/About';
import Projects from './sections/projects/Projects';
import Contact from './sections/contact-me/Contact';

import './App.css';

function App() {
  return (
    <div className="App">
      <Intro />
      <About />
      <Contact />
    </div>
  );
}

export default App;

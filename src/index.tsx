import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

document.addEventListener("scroll", () => {
  const title: HTMLElement = document.getElementById("name-title") as HTMLElement;
  const moon: HTMLElement = document.getElementById("moon") as HTMLElement;
  const clouds: HTMLImageElement = document.getElementById("cloud-cover-1") as HTMLImageElement;

  const titleRect = title.getBoundingClientRect();
  const moonRect = moon.getBoundingClientRect();
  const cloudsRect = clouds.getBoundingClientRect();

  const middleClouds = 260 + ((cloudsRect.top + cloudsRect.bottom) / 2);

  if(titleRect.bottom > middleClouds) {
    title.classList.add("hide");
  } else {
    title.classList.remove("hide");
  }

  if(moonRect.bottom > middleClouds && middleClouds > 0 && middleClouds < 865) {
    moon.setAttribute("style", `height: ${middleClouds}px;`);
  } else if (middleClouds > 0) {
    moon.setAttribute("style", `height: 865px;`);
  } else if (middleClouds < 0) {
    moon.setAttribute("style", `height: ${0}px;`);
  }
});
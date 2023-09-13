import React from "react";

import telescope from "./telescope.png";
import resume from "./resume.pdf";

import "./About.css";

class About extends React.Component {
  render() {
    return (
        <div id="about-container">
            <div id="about-text-container">
                <h1 id="about-title">About Me</h1>
                <p id="about-text">
                    Passionate junior full-stack developer experienced in Java, Javascript, PostgreSQL and Python. <br /> <br />
                    Always looking for new challenges and learning experiences. <br /> <br />
                    Currently seeking a junior full-stack developer or software engineering position.
                </p>

                <a href={resume} id="hire-me" target="_blank">My Resume</a>
            </div>
            <img src={telescope} alt="" id="telescope" />
        </div>
    );
  }
}

export default About;
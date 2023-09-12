import React from 'react';

import overhead_calculator from "./overhead-calculator.png";
import sgams from "./sgams.png";
import gameboy from "./gameboy.jpg";

import './Projects.css';

class Projects extends React.Component {
    
    onCatanAiClicked() {
        window.open('https://github.com/taylor-cox/catanai-java', '_blank');
    }

    onRustboyClicked() {
        window.open('https://github.com/taylor-cox/RustBoy', '_blank');
    }

    render() {
        return (
            <div id="projects-container">
                <h1>Projects</h1>
                <div id="project-cards">
                    <div id="project-card" onClick={() => this.onCatanAiClicked()}>
                        <p>Catan AI</p>
                        <img src={overhead_calculator} alt="" />
                        <p>Calculator for automatically determining profit and overhead 
                            values from Quickbooks data, using QBXML and Python.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Projects;
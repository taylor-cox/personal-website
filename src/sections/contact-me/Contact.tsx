import React from "react";

import "./Contact.css";

class Contact extends React.Component {
    async sendMessage() {
        if (document.cookie.includes("email-sent='true'")) {
            alert("You have already sent a message in the last hour. Please wait before sending another.");
            return;
        }
        let now = new Date();
        now.setHours(now.getHours() + 1);
        document.cookie = `email-sent='true'; expiry=${now.toUTCString()}`;
        const response = await fetch('localhost:3000/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: (document.querySelector('.form p:nth-child(1) input') as HTMLInputElement).value,
                email: (document.querySelector('.form p:nth-child(2) input') as HTMLInputElement).value,
                message: (document.querySelector('.form p:nth-child(3) input') as HTMLInputElement).value
            }),
            mode: "same-origin",
            credentials: "same-origin"
        });

        if (response.status === 202) {
            alert("Message sent successfully!");
        } else {
            alert("Message failed to send. Please reach out at taylor@coxintl.com");
        }
    }

    render() {
        return (
            <div id="contact-me-container">
                <h1>Contact Me</h1>
                <div id="contact-me-form">
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        <p>Name: <br /><input placeholder="John Doe"></input></p>
                        <p>Email: <br /><input placeholder="example@email.com"></input></p>
                        <p>Message: <br /><input placeholder="Your message"></input></p>
                        <button onClick={this.sendMessage}>Send Message</button>
                    </form>
                </div>
                <div id="links">
                    <a href="https://www.linkedin.com/in/taylor-g-cox/" target="_blank">LinkedIn</a>
                    <a href="mailto: taylor@coxintl.com">Email</a>
                    <a href="https://github.com/taylor-cox" target="_blank">GitHub</a>
                </div>
            </div>
        );
    }
}

export default Contact;
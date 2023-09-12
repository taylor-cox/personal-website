import React from "react";

import "./Intro.css";
import cloud_cover_1 from "./cloud-cover-2.webp";
import moon from "./moon.webp";

class Intro extends React.Component {
  canvas: HTMLCanvasElement = document.getElementById("stars") as HTMLCanvasElement;
  ctx: CanvasRenderingContext2D = null as unknown as CanvasRenderingContext2D;
  stars: Star[] = [];
  mouseStars: MouseStar[] = [];
  timeSinceLastMouseStar: number = Date.now();
  backgroundStarsDrawn: boolean = false;

  componentDidMount() {
    this.canvas = document.getElementById("stars") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    // Evemt Listeners
    document.addEventListener("resize", this.fitCanvas, false);
    this.canvas.addEventListener("mousemove", (e) => {
      if(Date.now() - this.timeSinceLastMouseStar < 50) return;
      this.timeSinceLastMouseStar = Date.now();
      const x = e.clientX;
      const y = e.clientY;
      const radius = Math.random() * 2 + 1;
      const star = new MouseStar(x, y, radius);
      this.mouseStars.push(star);
    }, false);
    this.fitCanvas();
    this.stars = this.makeStars(700);

    this.drawCanvas();
  }

  drawCanvas() {
    this.fitCanvas();
    this.drawStars(this.stars);
    requestAnimationFrame(this.drawCanvas.bind(this));
  }

  drawStars(stars: Star[]) {
    // Draws normal background stars
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i = 0; i < stars.length; i++) {
      this.ctx.beginPath();
      this.ctx.arc(stars[i].x, stars[i].y, stars[i].radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = stars[i].color;
      this.ctx.fill();
      this.ctx.closePath();
    };

    // Draws mouse stars
    for(let i = 0; i < this.mouseStars.length; i++) {
      this.mouseStars[i].update();
      this.ctx.beginPath();
      this.ctx.arc(this.mouseStars[i].x, this.mouseStars[i].y, this.mouseStars[i].radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.mouseStars[i].color;
      this.ctx.fill();
      this.ctx.closePath();
    }

    // Remove mouse stars that are no longer visible
    this.mouseStars = this.mouseStars.filter(star => !star.isAlive());
  }

  makeStars(n: number): Star[] {
    if(this.stars.length > 0) return this.stars;
    const ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    let stars: Star[] = [];
    for(let i = 0; i < n; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const radius = Math.random() * 2;
      const star = new Star(x, y, radius);
      stars.push(star);
    }
    return stars;
  }

  fitCanvas() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  scrollToAbout() {
    const about = document.getElementById("about-container") as HTMLElement;
    about.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
  }

  render() {
    return (
      <div id="intro">
        <div id="intro-contents">
          <canvas id="stars"></canvas>
          <div id="name-title">
            <h1 id="name">Taylor Cox</h1>
            <h2 id="title">Full-Stack Software Engineer</h2>
          </div>
          <img src={moon} alt="" id="moon" />
        </div>
        <div id="padding"></div>
        <img src={cloud_cover_1} id="cloud-cover-1" />
        <div id="down-icon" onClick={this.scrollToAbout}>
          <p>&#8595;</p>
        </div>
      </div>
    );
  }
}

class Star {
  x: number;
  y: number;
  radius: number;
  color: string = "rgba(255, 255, 255, 1)";

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

class MouseStar extends Star {
  aliveTime: number = Date.now();
  opacity: number = 1;
  yVelocity: number = (Math.random() - 0.5 > 0) ? Math.random()  + 1 : Math.random() * -1.5 - 1;
  xVelocity: number = (Math.random() - 0.5 > 0) ? Math.random()  + 1 : Math.random() * -1.5 - 1;

  constructor(x: number, y: number, radius: number) {
    super(x, y, radius);
  }

  update() {
    this.y += this.yVelocity;
    this.x += this.xVelocity;
    this.opacity -= 0.005;
    this.color = `rgba(255, 255, 255, ${this.opacity})`;
  }

  isAlive() {
    return this.opacity <= 0;
  }
}

export default Intro;

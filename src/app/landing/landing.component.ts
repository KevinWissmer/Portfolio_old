import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { DiscClass } from '../models/disc-class.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss',
  './landing.button.css']
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  
  canvas: ElementRef<HTMLCanvasElement>;
  cHeight: number = window.innerHeight;
  cWidth: number = window.innerWidth;
  spacewidth: number = 5;
  loopLimit: number = 4000;
  landingTextFull = ['Welcome!', 'I am Kevin'];
  landingText = [];
  infoBoxOpen = false;
  radius = 30;

  constructor(private router: Router) { }
  discs = this.generateDiscs();;

  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.cHeight = window.innerHeight;
    this.cWidth = window.innerWidth;
    this.resizeDiscRadius();
    this.renewCanvasBg();
    this.fillDiscs();
    this.loopstart();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cHeight = window.innerHeight;
    this.cWidth = window.innerWidth; 
    this.resizeDiscRadius();
  }

  resizeDiscRadius(){
    if(this.cHeight < 800 || this.cWidth < 1100){
      if(this.cHeight < 500 || this.cWidth < 800){
        this.radius = 15;
      } else{
        this.radius = 22;
      }
    } else{
      this.radius = 30
    }
  }

  stopAnimation(){
    this.loopstop = this.loopLimit;
  }

  async loopstart() {
    while (this.loopstop < this.loopLimit) {
      await this.myLoop();
      this.loopstop++;
      if (this.loopstop % 50 == 0  ) {
        this.getAllSpeeds();
      }
    }
  }

  openInfoBlock() {
    if (this.infoBoxOpen) {
      this.infoBoxOpen = false;
    } else {
      this.infoBoxOpen = true;
    }
  } 

  renewCanvasBg() {
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    this.ctx.fillStyle = "rgba(16,29,31,1)";
    this.ctx.fillRect(0, 0, this.cWidth, this.cHeight); 
  }

  drawText() { 
    let factor= 1;
    if(this.cHeight > this.cWidth){
      factor = 1.65; 
    }
    let lineheight = this.cWidth  *factor / 20;

    this.ctx.beginPath();
    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = "rgba(162,9,41,1)";
    this.ctx.rect((this.cWidth  * factor    / 4 - this.cHeight  / 10) - 70, (this.cHeight / 3 - this.cHeight  / 10) - 70, (this.cWidth * factor  / 4 + 3 * lineheight) , (this.cHeight   / 3) );
    this.ctx.stroke();

    this.ctx.fillStyle = "rgba(102,107,105,0.4)";
    this.ctx.fillRect(this.cWidth * factor   / 4 - this.cHeight / 10, this.cHeight / 3 - this.cHeight / 10, this.cWidth * factor  / 4 + 3 * lineheight, this.cHeight   / 3);

    this.ctx.fillStyle = "white";
    this.ctx.font = lineheight  + "px Arial";
    for (var i = 0; i < this.landingText.length; i++)
      this.ctx.fillText(this.landingText[i], this.cWidth   / 4, this.cHeight / 3 + (i * lineheight));
  }

  setTextForward() {
    if (this.loopstop % 7 == 0) {
      for (let i = 0; i < this.landingTextFull.length; i++) {
        if (this.landingText[i]) {
          //console.log(this.landingTextFull[i].slice(0, this.landingText[i].length))
          if (this.landingText[i].length < this.landingTextFull[i].length) {
            this.landingText[i] = this.landingTextFull[i].slice(0, this.landingText[i].length + 1);
            return;
          }
        } else {
          this.landingText[i] = this.landingTextFull[i][0];
          return;
        }

      }
    }
  }

  fillDiscs() {
    this.ctx.fillStyle = "rgba(102,9,31,1)";
    let boxwidth = (this.cWidth - (this.spacewidth * 16)) / 15;
    let boxheight = (this.cHeight - (this.spacewidth * 16)) / 15;
    this.discs.forEach((disc, i) => {
      this.drawCricle(disc, i)
    });
  }

  drawCricle(disc, num) {
    this.ctx.beginPath();
    this.ctx.arc(disc.x, disc.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = "#6f2232"; 
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "rgba(102,9,31,1)";
    this.ctx.stroke(); 
  }

  generateDiscs() {

    let discArray = [];
    let count = 16;
    let boxwidth = this.cWidth / (1 + Math.sqrt(count));
    let boxheight = this.cHeight / (1 + Math.sqrt(count));
    for (let i = 1; i < 1 + Math.sqrt(count); i++) {
      for (let j = 1; j < 1 + Math.sqrt(count); j++) {
        discArray.push(new DiscClass(i * boxwidth, j * boxheight, count, i + j - 2))
      }
    }
    return discArray;
  }

  async calculateCollisions(disc, dTime, index) {

    await this.calculateBorderCollisions(disc);


    for (let i = 0; i < this.discs.length; i++) {
      const element = this.discs[i];
      let lam = this.discLambda(element, disc);
      if (lam > 0) {
        let time = await this.calcDiscCollisionTime(element, disc, lam);
        if (time > 0.00001 && time < dTime) { 
          if (disc.lastHit != i + 4) { 
            disc.collisionTimes[i + 4] = time;
            disc.lastHit = i + 4; 
          } else { 
            disc.collisionTimes[i + 4] = 9999; 
          } 
        }
      }

    }
  }

  async calcDiscCollisionTime(disc1, disc2, lam) {
    let part1 = -(((disc1.x - disc2.x) * (disc1.speedX - disc2.speedX)) + ((disc1.y - disc2.y) * (disc1.speedY - disc2.speedY)));
    let part2 = ((disc1.speedY - disc2.speedY) * (disc1.speedY - disc2.speedY)) + ((disc1.speedX - disc2.speedX) * (disc1.speedX - disc2.speedX));
    let min = (part1 - Math.sqrt(lam)) / part2;
    let plus = (part1 + Math.sqrt(lam)) / part2;
    if (min < plus) {
      return min;
    } else {
      return plus;
    }
  }

  discLambda(disc1, disc2) {
    let lambda = 0;
    let lam1 = ((disc1.x - disc2.x) * (disc1.speedX - disc2.speedX)) + ((disc1.y - disc2.y) * (disc1.speedY - disc2.speedY));
    let lam2 = ((disc1.speedY - disc2.speedY) * (disc1.speedY - disc2.speedY)) + ((disc1.speedX - disc2.speedX) * (disc1.speedX - disc2.speedX));
    let lam3 = ((disc1.x - disc2.x) * (disc1.x - disc2.x)) + ((disc1.y - disc2.y) * (disc1.y - disc2.y));
    lambda = (lam1 * lam1) - (lam2 * (lam3 - ((this.radius + this.radius) * (this.radius + this.radius))));
    return lambda;
  }

  async calculateAllCollisions() {
    let time = 1;
    for (let i = 0; i < this.discs.length; i++) {
      let disc = this.discs[i];
      await this.calculateCollisions(disc, 1, i);
      let shortestTime = disc.getShortestTime();
      if (time > shortestTime && shortestTime > 0.00001) {
        time = shortestTime;
      }
    }
    return time;
  }


  speeds = [];
  speedCounts = [];
  getAllSpeeds() {
    this.speeds = [];
    this.discs.forEach(disc => {
      let speed = ((disc.speedX * disc.speedX) + (disc.speedY * disc.speedY));
      this.speeds.push(Math.round(speed));
    });
    console.log(this.speeds.sort(function (a, b) { return b - a }));
    this.speedCounts = [];
    let step = 4
    for (let i = 0; i < 7; i++) {
      const element = this.speeds[i];
      let count = this.speeds.filter(element => element > i * step && element <= (i + 1) * step);
      this.speedCounts.push(count);
    }
    console.log(this.speedCounts);
  }

  async setForward(time) {
    let discNumbers = [];
    for (let i = 0; i < this.discs.length; i++) {
      const disc = this.discs[i];
      let shortestTime = disc.getShortestTime();
      let index = disc.getIndexShortestTime()
      if (shortestTime <= time + 0.00000001 && shortestTime >= time - 0.00000001) {
        disc.setDiscStepForward(time);
      } else {
        disc.x = disc.x + (disc.speedX * time);
        disc.y = disc.y + (disc.speedY * time);
      }
      disc.resetTimes();
      this.drawCricle(disc, i);
      if (index > 3) {
        discNumbers.push(index - 4)
      }
    }

    if (discNumbers.length > 1) {
      if (this.discs[discNumbers[0]].lastHitSmallDistance != discNumbers[1]) {
        await this.setForwardDiscCollisions(discNumbers[0], discNumbers[1]);
      }
      if (discNumbers.length == 14) {
        await this.setForwardDiscCollisions(discNumbers[2], discNumbers[3]);
      }
    }
  }

  checkDistance(discIndex1, discIndex2) {
    let x = this.discs[discIndex1].x - this.discs[discIndex2].x;
    let y = this.discs[discIndex1].y - this.discs[discIndex2].y;
    let distance = Math.sqrt(Math.round((x * x) + (y * y)));
    return distance;
  }

  async setForwardDiscCollisions2(discIndex1, discIndex2) {
    this.discs[discIndex1].speedX = -this.discs[discIndex1].speedX;
    this.discs[discIndex1].speedY = -this.discs[discIndex1].speedY;
    this.discs[discIndex2].speedX = -this.discs[discIndex2].speedX;
    this.discs[discIndex2].speedY = -this.discs[discIndex2].speedY;
  }

  async setForwardDiscCollisions(discIndex1, discIndex2) {
    let x = this.discs[discIndex1].x - this.discs[discIndex2].x;
    let y = this.discs[discIndex1].y - this.discs[discIndex2].y;
    let distance = Math.sqrt(Math.round((x * x) + (y * y)));
    x = x / distance;
    y = y / distance;
    let factor1 = ((this.discs[discIndex1].speedX * x) + (this.discs[discIndex1].speedY * y));
    let factor2 = ((this.discs[discIndex2].speedX * x) + (this.discs[discIndex2].speedY * y));

    let speedX1 = this.discs[discIndex1].speedX - (x * factor1) + (x * factor2);
    let speedY1 = this.discs[discIndex1].speedY - (y * factor1) + (y * factor2);
    let speedX2 = this.discs[discIndex2].speedX - (x * factor2) + (x * factor1);
    let speedY2 = this.discs[discIndex2].speedY - (y * factor2) + (y * factor1);

    this.discs[discIndex1].speedX = speedX1;
    this.discs[discIndex1].speedY = speedY1;
    this.discs[discIndex2].speedX = speedX2;
    this.discs[discIndex2].speedY = speedY2;
  }

  loopstop = 0;

  async myLoop() {

    let time = await this.calculateAllCollisions();
    await this.checkAllDistances();
    await this.timeout(time * 30);
    this.renewCanvasBg();
    await this.setForward(time);
    this.setTextForward();
    this.drawText();

  }


  async checkAllDistances() {
    let forbidden = [];
    let radius = this.radius * 2;
    for (let i = 0; i < this.discs.length; i++) {
      for (let j = 0; j < this.discs.length; j++) {
        if (i != j) {
          let dist = this.checkDistance(i, j);
          if (dist < radius - 0.005 && !forbidden.includes(i)) {

            if (this.discs[i].lastHitSmallDistance != j) {
              await this.setForwardDiscCollisions(i, j)
              forbidden.push(j);
              this.discs[i].lastHitSmallDistance = j
            }

          }
        }

      }

    }

  }


  async calculateBorderCollisions(disc) { //disc.collisionTimes ->  0=top 1=right 2=bottom 3=left 4=discs
    if (disc.speedY < 0) {
      if (disc.speedX < 0) {
        disc.collisionTimes[0] = (disc.y - this.radius) / Math.abs(disc.speedY);
        disc.collisionTimes[1] = 999999;
        disc.collisionTimes[2] = 999999;
        disc.collisionTimes[3] = (disc.x - this.radius) / Math.abs(disc.speedX);
      } else {
        disc.collisionTimes[0] = (disc.y - this.radius) / Math.abs(disc.speedY);
        disc.collisionTimes[1] = (this.cWidth - disc.x - this.radius) / Math.abs(disc.speedX)
        disc.collisionTimes[2] = 999999;
        disc.collisionTimes[3] = 999999;
      }
    } else {
      if (disc.speedX < 0) {
        disc.collisionTimes[0] = 999999;
        disc.collisionTimes[1] = 999999;
        disc.collisionTimes[2] = (this.cHeight - disc.y - this.radius) / Math.abs(disc.speedY);
        disc.collisionTimes[3] = (disc.x - this.radius) / Math.abs(disc.speedX);
      } else {
        disc.collisionTimes[0] = 999999;
        disc.collisionTimes[1] = (this.cWidth - disc.x - this.radius) / Math.abs(disc.speedX)
        disc.collisionTimes[2] = (this.cHeight - disc.y - this.radius) / Math.abs(disc.speedY);
        disc.collisionTimes[3] = 999999;
      }
    }


  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  fire(e) {

  }




  checkBorder(disc) {

    if (disc.y + disc.speedY + this.radius < this.cHeight) {
      if (disc.y + disc.speedY + (this.radius * disc.dirY) > 0) {
        disc.y = disc.y + disc.speedY;
      } else {
        disc.dirY = -disc.dirY;
        disc.speedY = -disc.speedY;
        let dist = 0 - disc.y + disc.speedY + (this.radius * disc.dirY);
        disc.y = -dist;
      }
    } else {
      disc.speedY = -disc.speedY;
      disc.dirY = -disc.dirY;
      let dist = this.cHeight - disc.y + disc.speedY + this.radius;
      disc.y = this.cHeight - dist;
    }


    if (disc.x + disc.speedx + this.radius < this.cWidth) {
      if (disc.x + disc.speedx + (this.radius * disc.dirX) > 0) {
        disc.x = disc.x + disc.speedx;
      } else {
        disc.speedx = -disc.speedx;
        let dist = 0 - disc.x + disc.speedx + (this.radius * disc.dirX);
        disc.x = -dist;
        disc.dirX = -disc.dirX;
      }
    } else {
      disc.speedx = -disc.speedx;
      disc.dirX = -disc.dirX;
      let dist = this.cWidth - disc.x + disc.speedx + this.radius;
      disc.x = this.cWidth - dist;
    }
  }


}

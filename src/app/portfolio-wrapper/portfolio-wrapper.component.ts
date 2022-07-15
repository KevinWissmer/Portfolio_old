import { Component, ViewChild, OnInit, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-portfolio-wrapper',
  templateUrl: './portfolio-wrapper.component.html',
  styleUrls: ['./portfolio-wrapper.component.scss']
})
export class PortfolioWrapperComponent implements AfterViewInit, OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  cHeight = 0;
  cWidth = 0;
  lineLength = 1110;
  loopStop = 0;
  hexagonCountArr = [];
  hexagonColor = '#333333';

  activeSection = "home";

  private ctx: CanvasRenderingContext2D;
  constructor() { }

   ngOnInit(): void {
    this.hexagonInit();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.hexagonInit();
  }

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.cHeight = window.innerHeight;
    this.cWidth = window.innerWidth;
    this.lineLoop();
  }

  hexagonInit() {
    this.cHeight = window.innerHeight;
    this.cWidth = window.innerWidth;
    this.lineLength = Math.round(Math.sqrt(this.cWidth * this.cWidth + this.cHeight * this.cHeight));
    this.calculateHexagonCount();
  }

  changeSection(status){
    this.activeSection = status;
    console.log(this.activeSection);
  }




  calculateHexagonCount() {
    let count = (this.cHeight / 100 + 2) * (this.cWidth / 100 + 2);
    this.hexagonCountArr = new Array(Math.round(count));
  }

  async lineLoop() {
    while (this.loopStop < 40000) {
      //console.log(`sdfsdf`);
      await this.timeout(60);
      this.ctx.clearRect(-2000, -2000, this.cWidth + 1000, this.cHeight + 2000);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);

      let grad = this.ctx.createLinearGradient(-1500+this.loopStop,0, -500 + this.loopStop,1000 );  
      //this.ctx.rotate(45 * Math.PI / 180);
      grad.addColorStop(0.3, "black");
      grad.addColorStop(0.5, 'rgba(230, 9, 41,0.8)');
      grad.addColorStop(0.7, "black");
      
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(-200  , -200 , this.cWidth + 500  , this.cHeight + 500 );
      this.loopStop = this.loopStop + 10  ;
      if(this.loopStop > this.cWidth + 1800){
        this.loopStop = 0;
      }
    }

  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

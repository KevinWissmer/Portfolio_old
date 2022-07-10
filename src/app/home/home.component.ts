import { Component, OnInit, Input, AfterViewInit , ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit , OnInit {

  @Input() status = '';
  @ViewChild('info_section') info_section: ElementRef;
  activeHomeSection = 'home';
  activeHomeSectionNumber = 1;
  borderSize = 0;

  constructor() { 
    this.changeBorderTwoWrapperSize();
  }

  changeHomeSection(sectiontype, num) {
    if (this.activeHomeSection != sectiontype) {
      this.activeHomeSection = sectiontype;
      this.activeHomeSectionNumber = num;
    } else {
      this.activeHomeSection = 'nothing';
      this.activeHomeSectionNumber = 0;
    }
    this.changeBorderTwoWrapperSize();
  }


  ngOnInit(): void {  
  }

  ngAfterViewInit (): void {
  }



  changeBorderTwoWrapperSize() {
    let divWidth = 150;
    let btnWidth = 104;
    if (window.innerWidth > 450 && window.innerWidth < 700) {
      divWidth = 100;
      btnWidth = 64;
    }
    if (window.innerWidth <= 450) {
      divWidth = 60;
      btnWidth = 52;
    }
    this.borderSize = (((((window.innerWidth - 20) * 0.95 / 2)) - 2 * divWidth)) + (divWidth * (this.activeHomeSectionNumber - 1)) + ((divWidth - btnWidth) / 2) + 4;
  }

}

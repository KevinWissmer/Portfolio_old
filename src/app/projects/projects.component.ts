import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Input() status = '';

  cHeight: number = window.innerHeight;
  cWidth: number = window.innerWidth;
  toggleDocs = false;
  toggleProject = false;
  toggledProjectNr = [-1,-1,-1];
  projectWrapperHeight = 720;


  projectListList = [];
  classes = ['project_left', 'project_middle', 'project_right'];

  projects = [
    {
      'id': 0,
      'name': 'Sharkie',
      'description': 'A little "Jump n\' Run", where you have to navigate the little shark Sharkie through lots of jelly- and pufferfishes. And be aware of the Killerwhale!!',
      'imgSrc': '../../assets/img/sharkie.png',
      'githubURL': '',
      'homeURL': 'https://kevin-wissmer.developerakademie.com/Sharky/sharkinator/index.html',
      'DocsURL': '',
    },
    {
      'id': 1,
      'name': 'SimeView',
      'description': 'A Kanban board Project with a lots of features made with pure javascript. Including e.g. Base64 encoding for storing profilepictures and a small backend.',
      'imgSrc': '../../assets/img/simeview.png',
      'githubURL': '',
      'homeURL': 'https://gruppe-66.developerakademie.com/board.html',
      'DocsURL': '',
    },
    {
      'id': 2,
      'name': 'Ring of Fire',
      'description': 'A little card game made with Angular and Firebase. Get your friends together (digital or reallife) and play a round!',
      'imgSrc': '../../assets/img/ringoffire.png',
      'githubURL': '',
      'homeURL': 'https://ring-of-fire-b62e5.web.app/',
      'DocsURL': '',
    },
    {
      'id': 3,
      'name': 'Lieferando',
      'description': 'A small version of the famous food delivery website.',
      'imgSrc': '../../assets/img/lieferando.png',
      'githubURL': '',
      'homeURL': 'https://kevin-wissmer.developerakademie.com/Projekt_Lieferando/restaurants.html',
      'DocsURL': '',
    },
  ];


  constructor() { }

  ngOnInit(): void {
    this.generateProjectArrays();
    this.setProjectWrapperHeight();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cHeight = window.innerHeight;
    this.cWidth = window.innerWidth;
    this.generateProjectArrays();
    this.setProjectWrapperHeight();
  }

  setProjectWrapperHeight() {
    if(this.cWidth < 400 || this.cHeight < 800){
      this.projectWrapperHeight = 600;
      if ( this.cHeight < 650) {
        this.projectWrapperHeight = 400;
      }
    }  else {
      this.projectWrapperHeight = 720;
    }
  }

  generateProjectArrays() {
    this.projectListList = [];

    this.projectListList.push(this.projects);

    if (this.cWidth >= 900) {
      let list = []
      list.push(this.projects[this.projects.length - 1]);
      for (let i = 0; i < this.projects.length - 1; i++) {
        list.push(this.projects[i]);
      }
      this.projectListList.push(list);
    }



    if (this.cWidth >= 1200) {
      let list = []
      for (let i = 2; i < this.projects.length; i++) {
        list.push(this.projects[i]);
      }
      list.push(this.projects[0]);
      list.push(this.projects[1]);
      this.projectListList.push(list);
    }
  }




  current_project_index = 0;
  clickable = true;

  async nextProject() {
    if (this.clickable) {
      this.clickable = false;
      setTimeout(() => {
        this.clickable = true;
      }, 455);
      if (this.current_project_index == this.projects.length - 1) {
        this.current_project_index = 0;
      } else {
        this.current_project_index++;
      }
    }
  }

  prevProject() {
    if (this.clickable) {
      this.clickable = false;
      setTimeout(() => {
        this.clickable = true;
      }, 455);
      if (this.current_project_index == 0) {
        this.current_project_index = this.projects.length - 1;
      } else {
        this.current_project_index--;
      }
    }
  }

  clickfalse() {
    this.clickable = true;
  }


  goToLink(url: string) {
    window.open(url, "_blank");
  }

  toggleProjectval(index, project, url) {
    console.log(this.cHeight);
    if(this.cWidth > 400  && this.cHeight > 800){
      if (this.toggledProjectNr[index] == project.id) {
        this.toggledProjectNr[index] = -1;
      } else {
        this.toggledProjectNr[index] =  project.id;
      }
    } else {
      window.open(url, '_blank') ;
    }
    
  }


}

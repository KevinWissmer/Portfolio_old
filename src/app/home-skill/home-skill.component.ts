import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-skill',
  templateUrl: './home-skill.component.html',
  styleUrls: ['./home-skill.component.scss']
})
export class HomeSkillComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  skills = ['angular','css','html','python','django','database','rest-API','scrum','git']

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-imprint-dataprotection',
  templateUrl: './imprint-dataprotection.component.html',
  styleUrls: ['./imprint-dataprotection.component.scss']
})
export class ImprintDataprotectionComponent implements OnInit {

  constructor() { }

  @Input() status = '';

  ngOnInit(): void {
  }

}

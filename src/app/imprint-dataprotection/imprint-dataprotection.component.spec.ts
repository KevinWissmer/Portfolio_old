import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintDataprotectionComponent } from './imprint-dataprotection.component';

describe('ImprintDataprotectionComponent', () => {
  let component: ImprintDataprotectionComponent;
  let fixture: ComponentFixture<ImprintDataprotectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprintDataprotectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprintDataprotectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

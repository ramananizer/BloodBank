import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrequirementsComponent } from './myrequirements.component';

describe('MyrequirementsComponent', () => {
  let component: MyrequirementsComponent;
  let fixture: ComponentFixture<MyrequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

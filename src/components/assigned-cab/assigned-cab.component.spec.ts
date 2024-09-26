import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCabComponent } from './assigned-cab.component';

describe('AssignedCabComponent', () => {
  let component: AssignedCabComponent;
  let fixture: ComponentFixture<AssignedCabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedCabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

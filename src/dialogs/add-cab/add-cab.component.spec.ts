import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCabComponent } from './add-cab.component';

describe('AddCabComponent', () => {
  let component: AddCabComponent;
  let fixture: ComponentFixture<AddCabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

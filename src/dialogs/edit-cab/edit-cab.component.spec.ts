import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCabComponent } from './edit-cab.component';

describe('EditCabComponent', () => {
  let component: EditCabComponent;
  let fixture: ComponentFixture<EditCabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

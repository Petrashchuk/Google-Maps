import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesControlsComponent } from './places-controls.component';

describe('PlacesControlsComponent', () => {
  let component: PlacesControlsComponent;
  let fixture: ComponentFixture<PlacesControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploueFormationDetailComponent } from './emploue-formation-detail.component';

describe('EmploueFormationDetailComponent', () => {
  let component: EmploueFormationDetailComponent;
  let fixture: ComponentFixture<EmploueFormationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploueFormationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploueFormationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

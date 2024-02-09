import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilityTableComponent } from './mobility-table.component';

describe('MobilityTableComponent', () => {
  let component: MobilityTableComponent;
  let fixture: ComponentFixture<MobilityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilityTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

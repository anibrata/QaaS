import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QradarTableComponent } from './qradar-table.component';

describe('QradarTableComponent', () => {
  let component: QradarTableComponent;
  let fixture: ComponentFixture<QradarTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QradarTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QradarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

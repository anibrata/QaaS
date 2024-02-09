import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotTableComponent } from './iot-table.component';

describe('IotTableComponent', () => {
  let component: IotTableComponent;
  let fixture: ComponentFixture<IotTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IotTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

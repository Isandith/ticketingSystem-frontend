import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STARTSTOPComponent } from './start-stop.component';

describe('STARTSTOPComponent', () => {
  let component: STARTSTOPComponent;
  let fixture: ComponentFixture<STARTSTOPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [STARTSTOPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(STARTSTOPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

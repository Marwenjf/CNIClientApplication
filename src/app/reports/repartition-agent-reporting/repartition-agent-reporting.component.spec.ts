import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionAgentReportingComponent } from './repartition-agent-reporting.component';

describe('RepartitionAgentReportingComponent', () => {
  let component: RepartitionAgentReportingComponent;
  let fixture: ComponentFixture<RepartitionAgentReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepartitionAgentReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartitionAgentReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

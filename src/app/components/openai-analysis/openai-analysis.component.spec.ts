import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenaiAnalysisComponent } from './openai-analysis.component';

describe('OpenaiAnalysisComponent', () => {
  let component: OpenaiAnalysisComponent;
  let fixture: ComponentFixture<OpenaiAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenaiAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenaiAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstcompetitorTabComponent } from './firstcompetitor-tab.component';

describe('FirstcompetitorTabComponent', () => {
  let component: FirstcompetitorTabComponent;
  let fixture: ComponentFixture<FirstcompetitorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstcompetitorTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstcompetitorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

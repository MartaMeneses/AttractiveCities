import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdcompetitorTabComponent } from './thirdcompetitor-tab.component';

describe('ThirdcompetitorTabComponent', () => {
  let component: ThirdcompetitorTabComponent;
  let fixture: ComponentFixture<ThirdcompetitorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdcompetitorTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdcompetitorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

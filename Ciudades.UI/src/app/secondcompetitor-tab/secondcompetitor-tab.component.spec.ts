import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondcompetitorTabComponent } from './secondcompetitor-tab.component';

describe('SecondcompetitorTabComponent', () => {
  let component: SecondcompetitorTabComponent;
  let fixture: ComponentFixture<SecondcompetitorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondcompetitorTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondcompetitorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

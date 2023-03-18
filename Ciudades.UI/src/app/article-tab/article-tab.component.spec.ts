import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTabComponent } from './article-tab.component';

describe('ArticleTabComponent', () => {
  let component: ArticleTabComponent;
  let fixture: ComponentFixture<ArticleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

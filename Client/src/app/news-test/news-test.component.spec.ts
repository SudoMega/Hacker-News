import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTestComponent } from './news-test.component';

describe('NewsTestComponent', () => {
  let component: NewsTestComponent;
  let fixture: ComponentFixture<NewsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

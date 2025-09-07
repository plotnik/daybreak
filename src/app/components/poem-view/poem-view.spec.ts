import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemView } from './poem-view';

describe('PoemView', () => {
  let component: PoemView;
  let fixture: ComponentFixture<PoemView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoemView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoemView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

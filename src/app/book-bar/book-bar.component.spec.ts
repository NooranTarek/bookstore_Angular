import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBarComponent } from './book-bar.component';

describe('BookBarComponent', () => {
  let component: BookBarComponent;
  let fixture: ComponentFixture<BookBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

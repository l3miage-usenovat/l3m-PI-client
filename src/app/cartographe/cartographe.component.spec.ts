import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographeComponent } from './cartographe.component';

describe('CartographeComponent', () => {
  let component: CartographeComponent;
  let fixture: ComponentFixture<CartographeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartographeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartographeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

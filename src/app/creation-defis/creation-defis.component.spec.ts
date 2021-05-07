import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationDefisComponent } from './creation-defis.component';

describe('CreationDefisComponent', () => {
  let component: CreationDefisComponent;
  let fixture: ComponentFixture<CreationDefisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationDefisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationDefisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

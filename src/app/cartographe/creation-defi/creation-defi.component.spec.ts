import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationDefiComponent } from './creation-defi.component';

describe('CreationDefisComponent', () => {
  let component: CreationDefiComponent;
  let fixture: ComponentFixture<CreationDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

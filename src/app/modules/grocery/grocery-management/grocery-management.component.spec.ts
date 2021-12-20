import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryManagementComponent } from './grocery-management.component';

describe('GroceryManagementComponent', () => {
  let component: GroceryManagementComponent;
  let fixture: ComponentFixture<GroceryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

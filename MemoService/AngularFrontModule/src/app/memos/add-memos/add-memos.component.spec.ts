import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemosComponent } from './add-memos.component';

describe('AddMemosComponent', () => {
  let component: AddMemosComponent;
  let fixture: ComponentFixture<AddMemosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

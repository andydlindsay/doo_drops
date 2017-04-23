import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogformComponent } from './dogform.component';

describe('DogformComponent', () => {
  let component: DogformComponent;
  let fixture: ComponentFixture<DogformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

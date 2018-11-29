import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmudListComponent } from './gmud-list.component';

describe('GmudListComponent', () => {
  let component: GmudListComponent;
  let fixture: ComponentFixture<GmudListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmudListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

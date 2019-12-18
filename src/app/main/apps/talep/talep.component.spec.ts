import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TalepComponent} from './talep.component';


describe('TalepComponent', () => {
  let component: TalepComponent;
  let fixture: ComponentFixture<TalepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

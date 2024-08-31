import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPskComponent } from './forget-psk.component';

describe('ForgetPskComponent', () => {
  let component: ForgetPskComponent;
  let fixture: ComponentFixture<ForgetPskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetPskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

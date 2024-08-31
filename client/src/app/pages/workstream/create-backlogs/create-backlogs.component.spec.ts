import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBacklogsComponent } from './create-backlogs.component';

describe('CreateBacklogsComponent', () => {
  let component: CreateBacklogsComponent;
  let fixture: ComponentFixture<CreateBacklogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBacklogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBacklogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

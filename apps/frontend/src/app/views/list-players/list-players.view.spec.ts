import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlayersView } from './list-players.component';

describe('ListPlayersComponent', () => {
  let component: ListPlayersView;
  let fixture: ComponentFixture<ListPlayersView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlayersView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlayersView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

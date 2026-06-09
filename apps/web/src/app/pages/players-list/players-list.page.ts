import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';//todo
import { CommonModule } from '@angular/common';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
//todo: dos observables, combinarlos en uno solo?
@Component({
  selector: 'app-players-list',
  imports: [CommonModule],
  templateUrl: './players-list.page.html',
  styleUrl: './players-list.page.css',
})
export class PlayersListPage {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {}

  page$!: Observable<number>;
  players$!: Observable<any>;

  ngOnInit(): void {
    this.page$ = this.route.queryParams.pipe(
      map(params => Math.max(1, +params['page'] || 1))
    );

    this.players$ = this.page$.pipe(
      switchMap(page =>
        this.playerService.getPlayers({}, page)
      ),
      map(res => res.data)
    );
  }


  goToPage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  nextPage(page: number) {
    this.goToPage(page + 1);
  }

  prevPage(page: number) {
    this.goToPage(Math.max(1, page - 1));
  }
}

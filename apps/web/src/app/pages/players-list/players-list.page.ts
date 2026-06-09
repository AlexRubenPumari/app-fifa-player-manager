import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';//todo
import { CommonModule } from '@angular/common';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

  players$!: Observable<any>;

  ngOnInit(): void {
    page$ = this.route.queryParams.pipe(
      map(params => +params['page'] || 1)
    );

    this.players$ = this.route.queryParams.pipe(
      map(params => +params['page'] || 1),
      switchMap(page => this.playerService.getPlayers({}, page)),
      map(res => res.data)
    );
  }


  goToPage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  goToNextPage() {
    this.goToPage(this.currentPage + 1)
  }

  goToPreviousPage() {
    this.goToPage(this.currentPage + -)
  }
}

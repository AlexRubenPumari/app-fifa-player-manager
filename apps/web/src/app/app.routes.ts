import { Routes } from '@angular/router'; //todo: elint " '"
import { LoginPage, PlayerDetailPage, PlayerEditPage, PlayersListPage } from './pages';
import { authGuard } from './guards';

export const routes: Routes = [
    { path: "login", component: LoginPage },
    {
        path: "players",
        canActivateChild: [authGuard],
        children: [
            { path: "", component: PlayersListPage },
            { path: ":id/edit", component: PlayerEditPage },
            { path: ":id", component: PlayerDetailPage },
        ],
    },
    // { path: '', redirectTo: 'login', pathMatch: 'full' }, //todo: q hce?
    { path: '**', redirectTo: 'login', pathMatch: 'full' }, //todo: q hce?
];
 
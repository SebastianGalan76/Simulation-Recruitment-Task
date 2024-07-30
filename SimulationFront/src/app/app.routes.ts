import { Routes } from '@angular/router';
import { ManageSimulationComponent } from './view/manage-simulation/manage-simulation.component';
import { SimulationListComponent } from './view/simulation-list/simulation-list.component';
import { SimulationComponent } from './view/simulation/simulation.component';

export const routes: Routes = [
    { path: 'create', component: ManageSimulationComponent },
    { path: 'edit/:id', component: ManageSimulationComponent },
    { path: 'info/:id', component: SimulationComponent },
    { path: 'list', component: SimulationListComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: '**', redirectTo: '/list' }
];

import { Routes } from '@angular/router';
import { ManageSimulationComponent } from './view/manage-simulation/manage-simulation.component';

export const routes: Routes = [
    { path: 'create', component: ManageSimulationComponent },
    { path: 'edit/:id', component: ManageSimulationComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: '**', redirectTo: '/list' }
];

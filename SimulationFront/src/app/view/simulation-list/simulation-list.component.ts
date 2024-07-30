import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Simulation } from '../../model/Simulation';
import { SimulationService } from '../../service/simulation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulation-list.component.html',
  styleUrl: './simulation-list.component.scss'
})
export class SimulationListComponent {
  simulations?: Simulation[];

  constructor(public simulationService:SimulationService, private router: Router) {
  }

  ngOnInit(): void {
    this.simulationService.loadAllSimulations().subscribe(value => {
      this.simulations = value;
    });
  }
  
  showInfo(campaignId: number){
    this.router.navigate([`/info/${campaignId}`]);
  }
  deleteSimulation(campaignId: number){
    this.simulationService.deleteSimulation(campaignId);
    this.simulations = this.simulations?.filter(campaign => campaign.id !== campaignId);
  }
  editSimulation(campaignId: number){
    this.router.navigate([`/edit/${campaignId}`]);
  }
}

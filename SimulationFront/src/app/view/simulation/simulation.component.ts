import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../../service/simulation.service';
import { Simulation } from '../../model/Simulation';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent implements OnInit{
  simulation?: Simulation;
  simulationId = 0;

  constructor(public simulationService:SimulationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.simulationId = parseInt(id);

        this.simulationService.getSimulation(this.simulationId).subscribe(simulation => {
          if(simulation == null){
            this.router.navigate([`/list`]);
            return;
          }
          this.simulation = simulation;

          console.log(simulation.populationList);
        });
      }
    });
  }
  
  deleteSimulation(campaignId: number){
    this.simulationService.deleteSimulation(campaignId);
    this.router.navigate([`/list`]);
  }
  editSimulation(campaignId: number){
    this.router.navigate([`/edit/${campaignId}`]);
  }
}

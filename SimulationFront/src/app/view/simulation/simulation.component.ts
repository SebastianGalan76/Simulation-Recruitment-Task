import { Component } from '@angular/core';
import { SimulationService } from '../../service/simulation.service';
import { Simulation } from '../../model/Simulation';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartComponent } from "./chart/chart.component";
import { ChartInfo } from '../../model/ChartInfo';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent {
  simulation!: Simulation;
  simulationId = 0;
  sliderValue = 0;

  chartInfo: ChartInfo | undefined;

  constructor(public simulationService: SimulationService, public chartService: ChartService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.simulationId = parseInt(id);

        this.simulationService.getSimulation(this.simulationId).subscribe(simulation => {
          if (simulation == null) {
            this.router.navigate([`/list`]);
            return;
          }

          this.simulation = simulation;
          this.chartInfo = this.chartService.getPiPvPmPrDifferencesChartData(simulation, 0);
        });
      }
    });
  }

  deleteSimulation(simulationId: number) {
    this.simulationService.deleteSimulation(simulationId);
    this.router.navigate([`/create`]);
  }
  editSimulation(simulationId: number) {
    this.router.navigate([`/edit/${simulationId}`]);
  }

  onSliderChange(dayString: string){
    this.sliderValue = parseInt(dayString);
    this.chartInfo = this.chartService.getPiPvPmPrDifferencesChartData(this.simulation, this.sliderValue);
  }
}

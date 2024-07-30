import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../../service/simulation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Simulation } from '../../model/Simulation';
import { Response } from '../../model/Response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-simulation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-simulation.component.html',
  styleUrls: ['./manage-simulation.component.scss', '../../../assets/styles/formElement.scss']
})
export class ManageSimulationComponent implements OnInit{
  n: string = '';
  p: number | null = null;
  i: number | null = null;
  r: number | null = null;
  m: number | null = null;
  ti: number | null = null;
  tm: number | null = null;
  ts: number | null = null;

  errorMessage: string = '';
  
  editMode = false;
  simulationId = 0;

  constructor(private simulationService: SimulationService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.simulationId = parseInt(id);
        this.editMode = true;

        this.simulationService.getSimulation(this.simulationId).subscribe(simulation => {
          if(simulation == null){
            this.router.navigate([`/create`]);
            return;
          }
  
          this.n = simulation.n;
          this.p = simulation.p;
          this.i = simulation.i;
          this.r = simulation.r;
          this.m = simulation.m;
          this.ti = simulation.ti;
          this.tm = simulation.tm;
          this.ts = simulation.ts;
        });
        
      }
    });
  }

  submit(){
    if(!this.p || !this.i || !this.r || !this.m || !this.ti || !this.tm || !this.ts){
      this.errorMessage = "Inputs cannot be empty"
      return;
    }

    if (!this.verifyInputs()) {
      return;
    }
    this.errorMessage = '';

    let simulation = new Simulation(this.n, this.p, this.i, this.r, this.m, this.ti, this.tm, this.ts);
    if(this.editMode){
      this.editSimulation(simulation);
    }
    else{
      this.createSimulation(simulation);
    }
  }

  createSimulation(simulation: Simulation) {
    this.simulationService.createSimulation(simulation).subscribe({
      next: (response: Response) => {
        if (response) {
          this.errorMessage = response.message;
        }
      },
      error: (e) => {
        this.errorMessage = e.error;
      }
    });
  }

  editSimulation(simulation: Simulation) {
    this.simulationService.editSimulation(this.simulationId, simulation).subscribe({
      next: (response: Response) => {
        if (response) {
          this.errorMessage = response.message;
        }
      },
      error: (e) => {
        this.errorMessage = e.error;
      }
    });
  }

  verifyInputs(): boolean {
    if(!this.p || !this.i || !this.r || !this.m || !this.ti || !this.tm || !this.ts){
      return false;
    }

    if (this.n.length == 0) {
      this.errorMessage = 'You should provide some name';
      return false;
    }
    var incorrectValue = false;

    var lessThanZero = 'Values ​​cannot be less than 0! ';
    if (this.p < 0) {
      lessThanZero += '(P) '
      incorrectValue = true;
    }
    if (this.i < 0) {
      lessThanZero += '(I) '
      incorrectValue = true;
    }
    if (this.r < 0) {
      lessThanZero += '(R) '
      incorrectValue = true;
    }
    if (this.m < 0) {
      lessThanZero += '(M) '
      incorrectValue = true;
    }
    if (this.ti < 0) {
      lessThanZero += '(Ti) '
      incorrectValue = true;
    }
    if (this.tm < 0) {
      lessThanZero += '(Tm) '
      incorrectValue = true;
    }
    if (this.ts < 0) {
      lessThanZero += '(Ts) '
      incorrectValue = true;
    }

    if (incorrectValue) {
      this.errorMessage = lessThanZero;
      return false;
    }

    if (this.p == 0) {
      this.errorMessage = "The population (P) is too small";
      return false;
    }

    if (this.p < this.i) {
      this.errorMessage = "The population (P) should be greater than the infected (I)";
      return false;
    }

    return true;
  }
}

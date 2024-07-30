import { Component } from '@angular/core';
import { SimulationService } from '../../service/simulation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Simulation } from '../../model/Simulation';
import { Response } from '../../model/Response';

@Component({
  selector: 'app-manage-simulation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-simulation.component.html',
  styleUrls: ['./manage-simulation.component.scss', '../../../assets/styles/formElement.scss']
})
export class ManageSimulationComponent {
  n: string = '';
  p: number | null = null;
  i: number | null = null;
  r: number | null = null;
  m: number | null = null;
  ti: number | null = null;
  tm: number | null = null;
  ts: number | null = null;

  errorMessage: string = '';

  constructor(private simulationService: SimulationService) {

  }

  createSimulation() {
    if(!this.p || !this.i || !this.r || !this.m || !this.ti || !this.tm || !this.ts){
      this.errorMessage = "Inputs cannot be empty"
      return;
    }

    if (!this.verifyInputs()) {
      return;
    }
    this.errorMessage = '';

    let simulation = new Simulation(this.n, this.p, this.i, this.r, this.m, this.ti, this.tm, this.ts);

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

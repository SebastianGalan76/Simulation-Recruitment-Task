import { Component } from '@angular/core';
import { SimulationService } from '../../service/simulation.service';
import { Simulation } from '../../model/Simulation';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartComponent } from "./chart/chart.component";
import { ChartInfo } from '../../model/ChartInfo';
import { ChartData, ChartTypeRegistry } from 'chart.js';

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

  chartInfo: ChartInfo | undefined;

  constructor(public simulationService: SimulationService, private router: Router, private route: ActivatedRoute) {
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
          this.chartInfo = this.getPiPvPmPrDifferencesChartData(0);
        });
      }
    });
  }

  deleteSimulation(campaignId: number) {
    this.simulationService.deleteSimulation(campaignId);
    this.router.navigate([`/list`]);
  }
  editSimulation(campaignId: number) {
    this.router.navigate([`/edit/${campaignId}`]);
  }

  getPiPvPmPrChartInfo(): ChartInfo | undefined{
    if (!this.simulation || !this.simulation.populationList) {
      return;
    }

    const piValues = this.simulation.populationList.map(p => p.pi);
    const pvValues = this.simulation.populationList.map(p => p.pv);
    const pmValues = this.simulation.populationList.map(p => p.pm);
    const prValues = this.simulation.populationList.map(p => p.pr);

    return {
      title: 'Population',
      type: 'line',
      chartData: {
        labels: this.simulation.populationList.map((_, index) => `${index + 1}`),
        datasets: [
          { label: 'PI', data: piValues, backgroundColor: '#FFCA5F' },
          { label: 'PV', data: pvValues, backgroundColor: '#5F85FF' },
          { label: 'PM', data: pmValues, backgroundColor: '#FF5F5F' },
          { label: 'PR', data: prValues, backgroundColor: '#5FFF75' }
        ]
      },
      chartOptions: {
        responsive: true,
        animation: {
          duration: 0 
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Day',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          },
          y: {
            ticks: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Population',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              color: '#ffffff'
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    }
  }

  getPiPvPmPrDifferencesChartData(index: number): ChartInfo | undefined {
    const piValues = this.simulation.populationList.map(p => p.pi);
    const pvValues = this.simulation.populationList.map(p => p.pv);
    const pmValues = this.simulation.populationList.map(p => p.pm);
    const prValues = this.simulation.populationList.map(p => p.pr);

    const piValue = piValues[index];
    const pvValue = pvValues[index];
    const pmValue = pmValues[index];
    const prValue = prValues[index];

    const labels = [
      `PI (${piValue})`,
      `PV (${pvValue})`,
      `PM (${pmValue})`,
      `PR (${prValue})`
    ];

    return {
      title: 'Population per day',
      type: 'doughnut',
      chartData: {
        labels: labels,
        datasets: [
          {
            data: [piValue, pvValue, pmValue, prValue],
            backgroundColor: ['#FFCA5F', '#5F85FF', '#FF5F5F', '#5FFF75']
          }
        ]
      },
      chartOptions: {
        responsive: true,
        animation: {
          duration: 0 
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    };
  }

  getPiPvPmPrDifferenceChartInfo(): ChartInfo | undefined{
    if (!this.simulation || !this.simulation.populationList) {
      return;
    }

    const piValues = this.simulation.populationList.map(p => p.pi);
    const pvValues = this.simulation.populationList.map(p => p.pv);
    const pmValues = this.simulation.populationList.map(p => p.pm);
    const prValues = this.simulation.populationList.map(p => p.pr);

    const piDifference = this.calculateDifferences(piValues);
    const pvDifference = this.calculateDifferences(pvValues);
    const pnDifference = this.calculateDifferences(pmValues);
    const prDifference = this.calculateDifferences(prValues);

    return {
      title: 'Changes from previous day',
      type: 'line',
      chartData: {
        labels: this.simulation.populationList.map((_, index) => `${index + 1}`),
        datasets: [
          { label: 'PI', data: piDifference, backgroundColor: '#FFCA5F' },
          { label: 'PV', data: pvDifference, backgroundColor: '#5F85FF' },
          { label: 'PM', data: pnDifference, backgroundColor: '#FF5F5F' },
          { label: 'PR', data: prDifference, backgroundColor: '#5FFF75' }
        ]
      },
      chartOptions: {
        responsive: true,
        animation: {
          duration: 0 
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Day',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          },
          y: {
            ticks: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Population',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              color: '#ffffff'
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    }
  }

  getMortalityChartInfo(): ChartInfo | undefined{
    if (!this.simulation || !this.simulation.populationList) {
      return;
    }

    const pmValues = this.simulation.populationList.map(p => p.pm);

    return {
      title: 'Mortality',
      type: 'line',
      chartData: {
        labels: this.simulation.populationList.map((_, index) => `${index + 1}`),
        datasets: [
          { label: 'PM', data: pmValues, backgroundColor: '#FF5F5F' }
        ]
      },
      chartOptions: {
        responsive: true,
        animation: {
          duration: 0 
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Day',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          },
          y: {
            ticks: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Population',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              color: '#ffffff'
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    }
  }

  getInfectionsChartInfo(): ChartInfo | undefined{
    if (!this.simulation || !this.simulation.populationList) {
      return;
    }

    const piValues = this.simulation.populationList.map(p => p.pi);
    
    return {
      title: 'Infections',
      type: 'line',
      chartData: {
        labels: this.simulation.populationList.map((_, index) => `${index + 1}`),
        datasets: [
          { label: 'PI', data: piValues, backgroundColor: '#FFCA5F' },
        ]
      },
      chartOptions: {
        responsive: true,
        animation: {
          duration: 0 
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Day',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          },
          y: {
            ticks: {
              color: '#ffffff',
            },
            title: {
              display: true,
              text: 'Population',
              color: '#ffffff',
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              color: '#ffffff'
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    }
  }

  calculateDifferences(values: number[]): number[] {
    const differences: number[] = [];
    for (let i = 0; i < values.length - 1; i++) {
      differences.push(values[i + 1] - values[i]);
    }
    return differences;
  }

  onSliderChange(dayString: string){
    let index = parseInt(dayString);
    this.chartInfo = this.getPiPvPmPrDifferencesChartData(index);
  }
}

import { Injectable } from '@angular/core';
import { ChartData, ChartTypeRegistry } from 'chart.js';
import { Simulation } from '../model/Simulation';
import { ChartInfo } from '../model/ChartInfo';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  getPiPvPmPrChartInfo(simulation: Simulation): ChartInfo | undefined{
    if (!simulation || !simulation.populationList) {
      return;
    }

    const piValues = simulation.populationList.map(p => p.pi);
    const pvValues = simulation.populationList.map(p => p.pv);
    const pmValues = simulation.populationList.map(p => p.pm);
    const prValues = simulation.populationList.map(p => p.pr);

    return {
      width: 900,
      height: 500,
      title: 'Population',
      type: 'line',
      chartData: {
        labels: simulation.populationList.map((_, index) => `${index + 1}`),
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

  getPiPvPmPrDifferencesChartData(simulation: Simulation, index: number): ChartInfo | undefined {
    const piValues = simulation.populationList.map(p => p.pi);
    const pvValues = simulation.populationList.map(p => p.pv);
    const pmValues = simulation.populationList.map(p => p.pm);
    const prValues = simulation.populationList.map(p => p.pr);

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
      width: 500,
      height: 500,
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

  getPiPvPmPrDifferenceChartInfo(simulation: Simulation): ChartInfo | undefined{
    if (!simulation || !simulation.populationList) {
      return;
    }

    const piValues = simulation.populationList.map(p => p.pi);
    const pvValues = simulation.populationList.map(p => p.pv);
    const pmValues = simulation.populationList.map(p => p.pm);
    const prValues = simulation.populationList.map(p => p.pr);

    const piDifference = this.calculateDifferences(piValues);
    const pvDifference = this.calculateDifferences(pvValues);
    const pnDifference = this.calculateDifferences(pmValues);
    const prDifference = this.calculateDifferences(prValues);

    return {
      width: 900,
      height: 500,
      title: 'Changes from previous day',
      type: 'line',
      chartData: {
        labels: simulation.populationList.map((_, index) => `${index + 1}`),
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

  getMortalityChartInfo(simulation: Simulation): ChartInfo | undefined{
    if (!simulation || !simulation.populationList) {
      return;
    }

    const pmValues = simulation.populationList.map(p => p.pm);

    return {
      width: 900,
      height: 500,
      title: 'Mortality',
      type: 'line',
      chartData: {
        labels: simulation.populationList.map((_, index) => `${index + 1}`),
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

  getInfectionsChartInfo(simulation: Simulation): ChartInfo | undefined{
    if (!simulation || !simulation.populationList) {
      return;
    }

    const piValues = simulation.populationList.map(p => p.pi);
    
    return {
      width: 900,
      height: 500,
      title: 'Infections',
      type: 'line',
      chartData: {
        labels: simulation.populationList.map((_, index) => `${index + 1}`),
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
}

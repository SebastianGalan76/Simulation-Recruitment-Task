import { ChartData, ChartOptions, ChartType } from 'chart.js';

export interface ChartInfo{
    title: string;
    type: ChartType;
    chartData: ChartData;
    chartOptions: ChartOptions;
}
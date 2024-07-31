import { ChartData, ChartOptions, ChartType } from 'chart.js';

export interface ChartInfo{
    width: number;
    height: number;
    title: string;
    type: ChartType;
    chartData: ChartData;
    chartOptions: ChartOptions;
}
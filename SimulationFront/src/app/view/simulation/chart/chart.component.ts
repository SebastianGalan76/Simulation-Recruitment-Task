import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { ChartInfo } from '../../../model/ChartInfo';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent{
  @Input() public chartInfo!: ChartInfo | undefined;
}

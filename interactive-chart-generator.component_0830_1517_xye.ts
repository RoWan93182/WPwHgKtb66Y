// 代码生成时间: 2025-08-30 15:17:05
 * Interactive Chart Generator Component
 * This component allows users to generate interactive charts with custom settings.
 */
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-interactive-chart-generator',
  templateUrl: './interactive-chart-generator.component.html',
  styleUrls: ['./interactive-chart-generator.component.css']
})
export class InteractiveChartGeneratorComponent implements OnInit {

  // Chart configuration
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions: any;
  public lineChartType: ChartType;
  public lineChartLegend: boolean;
  public lineChartPlugins: any[];

  // Chart instance
  public chart: BaseChartDirective;

  constructor() { }

  ngOnInit(): void {
    // Initialize chart data
    this.lineChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
    ];
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value'
          }
        }
      }
    };
    this.lineChartType = 'line';
    this.lineChartLegend = true;
    this.lineChartPlugins = [];
  }

  // Update chart data
  updateChartData(newData: Array<any>): void {
    try {
      this.lineChartData = newData;
      this.chart.chart.update();
    } catch (error) {
      console.error('Error updating chart data:', error);
    }
  }

  // Add new data point
  addDataPoint(dataPoint: any): void {
    try {
      const newData = [...this.lineChartData[0].data, dataPoint];
      this.updateChartData([{ data: newData, label: 'Series A' }]);
    } catch (error) {
      console.error('Error adding data point:', error);
    }
  }

  // Remove data point
  removeDataPoint(index: number): void {
    try {
      const newData = [...this.lineChartData[0].data];
      newData.splice(index, 1);
      this.updateChartData([{ data: newData, label: 'Series A' }]);
    } catch (error) {
      console.error('Error removing data point:', error);
    }
  }
}
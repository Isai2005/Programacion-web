import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels
} from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // KPIs
  kpiTotalEntregas = 232;
  kpiPendientes = 20;
  kpiEnRuta = 30;

  // Gráfica
  public series: ApexAxisChartSeries = [
    {
      name: 'Entregas',
      data: [44, 55, 41, 67, 25]
    }
  ];

  public chartOptions: ApexChart = {
    type: 'bar',
    height: 350
  };

  public xaxis: ApexXAxis = {
    categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo']
  };

  public dataLabels: ApexDataLabels = {
    enabled: true
  };
}

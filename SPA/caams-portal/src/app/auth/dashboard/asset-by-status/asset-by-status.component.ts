import { Component, OnInit } from '@angular/core';
import { Color } from 'chart.js';
import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions, ApexTitleSubtitle } from 'ng-apexcharts';
import { DashboardService } from '../dashboard.service';
import { AssetService } from '@app/auth/asset/services/asset.service';


@Component({
  selector: 'app-asset-by-status',
  templateUrl: './asset-by-status.component.html',
  styleUrls: ['./asset-by-status.component.css']
})

export class AssetByStatusComponent implements OnInit {
  //----Asset by status
  assetStatusChartSeries: ApexNonAxisChartSeries;
  assetStatusChartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    },

  };

  ApexChartColors = ['#7F59B0', '#63C5EA', '#F7B439', '#E91E63'];
  assetStatusChartLabels;

  //-----Asset by catagory
  chartSeries: ApexNonAxisChartSeries;
  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true,
    },


  };



  pieChartColors = ['#108CC6', '#E91E63', '#6059CE', '#005B99', '#53A76D', '#5ECED1', '#C5C830', '#C13931',
    '#4A536B', '#CF7E68', '#357A78', '#FCAFC0', '#AC3750', '#F7B439', '#cea9bc', '#8464a0', '#2085ec',
    '#0a417a', '#F2949C', '#8DC73F', '#F7B7A3', '#66BA7A', '#E89EC7', '#F87C07', '#EA4801', '#C8A4D4'];
  chartLabels;
  chartRef: any;
  allAssets: any;
  defaultOffset: number = 0;
  defaultLimit: number = 200;
  defaultSearchText: string = "";


  constructor(
    private dashboardService: DashboardService,
    private assetService: AssetService,
  ) { }


  ngOnInit(): void {

    this.assetService.getAssetList(this.defaultOffset, this.defaultLimit, this.defaultSearchText).subscribe(
      res => {
        console.log(" for dashboard ::", res);

      }
    );


    this.dashboardService.getAssetStatus().subscribe((assetData) => {
      if (assetData) {
        this.assetStatusChartSeries = [];
        this.assetStatusChartLabels = [];
        console.log(" in dashboard assetData::", assetData);


        assetData.forEach(x => {
          console.log("for dashboard asset catagory ::", x.statusValue);
          this.assetStatusChartLabels = [...this.assetStatusChartLabels, x.statusName];
          this.assetStatusChartSeries = [...this.assetStatusChartSeries, x.statusValue];
        });

      }
    })


    this.dashboardService.getAssetCategory().subscribe((assetCategory) => {
      if (assetCategory) {
        this.chartSeries = [];
        this.chartLabels = [];
        assetCategory.forEach((y) => {
          this.chartLabels = [...this.chartLabels, y.name];
          this.chartSeries = [...this.chartSeries, y.size];
        });
      }
    })


  }

}

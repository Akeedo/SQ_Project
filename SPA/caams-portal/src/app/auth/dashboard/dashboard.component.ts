import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '@app/common/services/shared.service';
import {Table} from 'primeng/table';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexMarkers,
    ApexNonAxisChartSeries,
    ApexOptions,
    ApexPlotOptions,
    ApexResponsive,
    ApexStroke,
    ApexTitleSubtitle,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis,
    ChartComponent,
} from 'ng-apexcharts';

import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {DashboardService} from '@app/auth/dashboard/dashboard.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { OfficeService } from '../office/services/office.service';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
    legend: ApexLegend;
    options: ApexOptions;
};

export type ChartOptions1 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    legend: ApexLegend;
    fill: ApexFill;
    options: ApexOptions;
};

export type LineChart = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    tooltip: any; // ApexTooltip;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
    options: ApexOptions;
};

export type MultiBarChart = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    legend: ApexLegend;
    fill: ApexFill;
    options: ApexOptions;
    yaxis: ApexYAxis;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public chartOptions1: Partial<ChartOptions1>;
    public lineChart: Partial<LineChart>;
    public multiBarChart: Partial<MultiBarChart>;

    temp1: any = 12;
    temp2: any = 20;
    temp3: any = 22;
    ans: number;

    todaydate: any;
    public isLoading: boolean = false;
    barChartTitle: string = '';
    dashboardGroup: FormGroup;
    // public isLoading: boolean;
    public isProgressBarLoading: boolean;
    public sessionList: any[];
    public sessionList1: any[];
    public sessionList2: any[];
    public rowsPerPageOptions: any[] = [5, 10, 20];
    @ViewChild('sessionTableRef') sessionTableRef: Table;
    public trDisabled: boolean = false;
    public showAllList: boolean = true;

    public rows: number = 5;
    public defaultSearchText: string = '';
    @ViewChild('sessionSearchPopRef') sessionSearchPopRef: ElementRef;
    public totalRecords: number = 0;
    public role: string = '';
    public resetRequired: string = '';
    public currentOffice: string = '';
    private defaultOffset: number = 0;
    private defaultLimit: number = this.rows;
    
    public officeOid: string = '';
    minDate: Date;
    maxDate: Date;
    public endDate: Date = new Date();
    public startDate: Date = new Date();  
items: any;
      

    constructor(private fb: FormBuilder, private sharedService: SharedService, private dashboardService: DashboardService,
                private router: Router, private activateRoute: ActivatedRoute, private messageService: MessageService,
                private sharedServices: SharedService, private officeService: OfficeService) {
    }

    ngOnInit(): void {
        this.startDate.setDate(this.endDate.getDate()-6);
        // this.getOfficeList();
        this.getPieChartCountList();
        // this.getBarChartCountList();
        this.getMultiBarChartCountList();
        // this.getLineChartCountList();
        let chart1Label1: string = 'Active User: ';
        let chart1Label2: string = 'Inactive User: ';
        let chart1Label3: string = 'Request for creation: ';

        this.items = [
            {label: 'CAAMS', url: '/'},
            {label: 'Dashboard', url: '/dashboard'}
        ];

        this.chartOptions = {
            options: {
                colors: ['#5CD0EC', '#F39E37', '#806AFE']
            },
            legend: {
                show: true,
                fontSize: '12px',
                fontWeight: 'bolder'
            },
            series: [this.temp1, this.temp2, this.temp3],
            chart: {
                height: 320,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px'
                        },
                        value: {
                            fontSize: '16px'
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter(w) {
                                return "56";
                            }
                        },
                    }
                },
            },
            labels: [chart1Label1, chart1Label2, chart1Label3]
        };

        this.chartOptions1 = {
            series: [
                {
                    name: 'Active AW User',
                    data: [24, 20, 21, 19, 12, 29]
                },
                {
                    name: 'Deactive AW User',
                    data: [13, 23, 20, 8, 13, 27]
                },
                {
                    name: 'Pending AW User',
                    data: [11, 17, 15, 15, 21, 14]
                }
            ],
            chart: {
                type: 'bar',
                height: 300,
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false
                },
            },
            xaxis: {
                type: 'category',
                categories: [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu'
                ]
            },
            legend: {
                position: 'right',
                offsetY: 40,
                fontWeight: 'bolder'
            },
            fill: {
                opacity: 1,
                colors: ['#5CD0EC', '#F39E37', '#806AFE']
            }
        };

        this.lineChart = {
            options: {
                colors: ['#5CD0EC', '#F39E37', '#806AFE']
            },
            series: [
                {
                    name: 'AW User Creation',
                    data: [24, 20, 21, 19, 12, 29]
                },
                {
                    name: 'AW User Deactivation',
                    data: [13, 23, 20, 8, 13, 27]
                },
                {
                    name: 'AW User Transfer',
                    data: [11, 17, 15, 15, 21, 14]
                },
                {
                    name: 'AW User Reactivation',
                    data: [11, 17, 15, 15, 21, 14]
                }
            ],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 5,
                curve: 'straight',
                dashArray: [0, 0, 0]
            },
            title: {
                text: '',
                align: 'left'
            },
            legend: {
                tooltipHoverFormatter(val, opts) {
                    return (
                        val +
                        ' - <strong>' +
                        opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                        '</strong>'
                    );
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                labels: {
                    trim: false
                },
                categories: [
                    '23 Mar',
                    '24 Mar',
                    '25 Mar',
                    '26 Mar',
                    '27 Mar',
                    '28 Mar',
                    '29 Mar',
                ]
            },
            tooltip: {
                y: [
                    {
                        title: {
                            formatter(val) {
                                return val + ' (mins)';
                            }
                        }
                    },
                    {
                        title: {
                            formatter(val) {
                                return val + ' per session';
                            }
                        }
                    },
                    {
                        title: {
                            formatter(val) {
                                return val;
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#BDBDBD'
            }
        };  
        this.multiBarChart = {
            series: [
                {
                    name: 'AW User Creation',
                    data: [24, 20, 21, 19, 12, 29]
                },
                {
                    name: 'AW User Deactivation',
                    data: [13, 23, 20, 8, 13, 27]
                },
                {
                    name: 'AW User Transfer',
                    data: [11, 17, 15, 15, 21, 14]
                },
                {
                    name: 'AW User Reactivation',
                    data: [11, 17, 15, 15, 21, 14]
                }
            ],
            chart: {
                type: 'bar',
                height: 300
            },
            plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%"
                }
            },
            dataLabels: {
                enabled: false
              },
            stroke: {
                show: true,
                width: 3,
                colors: ['#fff']
            },
            
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            xaxis: {
                type: 'category',
                categories: [
                    '23 Mar',
                    '24 Mar',
                    '25 Mar',
                    '26 Mar',
                    '27 Mar',
                    '28 Mar',
                    '29 Mar'
                ],
                labels: {
                    style: {
                      fontSize: "11px",
                      cssClass: ".apexcharts-margin"
                    },
                    hideOverlappingLabels: false,
                    show: true,
                    rotate: 0,
                    rotateAlways: false,
                    minHeight: 100,
                    maxHeight: 2000
                }
            },
            yaxis: {
                title: {
                  text: "$ (Count)"
                }
            },
            legend: {
                position: 'right',
                offsetY: 40,
                fontWeight: 'bolder'
            },
            fill: {
                opacity: 1
                // colors: ['#5CD0EC', '#F39E37', '#806AFE',#f1af1f]
            },
            tooltip: {
                y: {
                  formatter: function (val) {
                    return "$ " + val + " thousands";
                  }
                }
            }
        };      
    }

    getChartData(){
        this.getMultiBarChartCountList();

    }
    selectOffice(){
        this.getPieChartCountList();
        this.getMultiBarChartCountList();
    }

    private getPieChartCountList(offset: number = this.defaultOffset, limit: number = this.defaultLimit) {
        if(this.officeOid =='' || this.officeOid==null){
            this.officeOid = this.currentOffice;
        }
        this.dashboardService.getPieChartCount(this.officeOid, offset, limit).subscribe(res => {
                if (res.status === 200) {
                    let chart1Label1: string = 'Active User: ';
                    let chart1Label2: string = 'Inactive User: ';
                    let chart1Label3: string = 'Request for creation: ';
                    this.temp1 = res.body.activeCount;
                    this.temp2 = res.body.deactivatedCount;
                    this.temp3 = res.body.pendingCount;
                    this.ans = (+this.temp1) + (+this.temp2) + (+this.temp3);
                    let totalCount = this.ans.toString();
                    chart1Label1 += this.temp1;
                    chart1Label2 += this.temp2;
                    chart1Label3 += this.temp3;
                    this.chartOptions = {
                        options: {
                            colors: ['#5CD0EC', '#F39E37', '#806AFE']
                        },
                        legend: {
                            show: true,
                            fontSize: '12px',
                            fontWeight: 'bolder'
                        },
                        series: [Math.round((this.temp1/this.ans)*100),
                            Math.round((this.temp2/this.ans)*100),
                            Math.round((this.temp3/this.ans)*100)],
                        chart: {
                            height: 320,
                            type: 'radialBar',
                        },
                        plotOptions: {
                            radialBar: {
                                dataLabels: {
                                    name: {
                                        fontSize: '22px'
                                    },
                                    value: {
                                        fontSize: '16px'
                                    },
                                    total: {
                                        show: true,
                                        label: 'Total',
                                        formatter(w) {
                                            return totalCount;
                                        }
                                    },
                                }
                            },
                        },
                        labels: [chart1Label1, chart1Label2, chart1Label3]
                    };
                }
            },
            err => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
                if (err.status === 404) {
                    this.totalRecords = 0;
                }

                if (err.error && err.error.message) {
                    this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
                }
            },
            () => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
            });
    }

    private getLineChartCountList(offset: number = this.defaultOffset, limit: number = this.defaultLimit) {
        this.dashboardService.getLineChartCount(this.currentOffice).subscribe(res => {
                if (res.status === 200) {
                    let chartName = 'Active AW User';
                    let creationRequestCount = res.body.creationCount;
                    let deactivationRequestCount = res.body.deactivationCount;
                    let transferRequestCount = res.body.transferCount;
                    let requestDates = res.body.dateList;

                    this.lineChart = {
                        options: {
                            colors: ['#5CD0EC', '#F39E37', '#806AFE']
                        },
                        series: [
                            {
                                name: 'AW User Creation',
                                data: [24, 20, 21, 19, 12, 29]
                            },
                            {
                                name: 'AW User Deactivation',
                                data: [13, 23, 20, 8, 13, 27]
                            },
                            {
                                name: 'AW User Transfer',
                                data: [11, 17, 15, 15, 21, 14]
                            },
                            {
                                name: 'AW User Reactivation',
                                data: [10, 12, 15, 17, 19, 14]
                            }
                        ],
                        chart: {
                            height: 350,
                            type: 'line',
                            toolbar: {
                                show: false
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            width: 5,
                            curve: 'straight',
                            dashArray: [0, 0, 0]
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        legend: {
                            tooltipHoverFormatter(val, opts) {
                                return (
                                    val +
                                    ' - <strong>' +
                                    opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                                    '</strong>'
                                );
                            }
                        },
                        markers: {
                            size: 0,
                            hover: {
                                sizeOffset: 6
                            }
                        },
                        xaxis: {
                            labels: {
                                trim: false
                            },
                            categories: requestDates
                        },
                        tooltip: {
                            y: [
                                {
                                    title: {
                                        formatter(val) {
                                            return val + ':';
                                        }
                                    }
                                },
                                {
                                    title: {
                                        formatter(val) {
                                            return val + ':';
                                        }
                                    }
                                },
                                {
                                    title: {
                                        formatter(val) {
                                            return val + ':';
                                        }
                                    }
                                }
                            ]
                        },
                        grid: {
                            borderColor: '#BDBDBD'
                        }
                    };
                }
            },
            err => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
                if (err.status === 404) {
                    this.totalRecords = 0;
                }

                if (err.error && err.error.message) {
                    this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
                }
            },
            () => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
            });
    }

    private getBarChartCountList(offset: number = this.defaultOffset, limit: number = this.defaultLimit) {
        this.dashboardService.getBarChartCount(this.currentOffice, this.startDate, this.endDate).subscribe(res => {
                if (res.status === 200) {
                    let chartName = 'Active AW User';
                    let chartCount = res.body.countList;
                    let requestDates = res.body.dateList;

                    this.chartOptions1 = {
                        series: [
                            {
                                name: chartName,
                                data: chartCount
                            }
                            // {
                            //     name: 'Deactive AW User',
                            //     data: [13, 23, 20, 8, 13, 27]
                            // },
                            // {
                            //     name: 'Pending AW User',
                            //     data: [11, 17, 15, 15, 21, 14]
                            // }
                        ],
                        chart: {
                            type: 'bar',
                            height: 300,
                            stacked: true,
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: true
                            }
                        },
                        responsive: [
                            {
                                breakpoint: 480,
                                options: {
                                    legend: {
                                        position: 'bottom',
                                        offsetX: -10,
                                        offsetY: 0
                                    }
                                }
                            }
                        ],
                        plotOptions: {
                            bar: {
                                horizontal: false
                            },
                        },
                        xaxis: {
                            type: 'category',
                            categories: requestDates
                        },
                        legend: {
                            position: 'right',
                            offsetY: 40,
                            fontWeight: 'bolder'
                        },
                        fill: {
                            opacity: 1,
                            colors: ['#5CD0EC', '#F39E37', '#806AFE']
                        }
                    };
                }
            },
            err => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
                if (err.status === 404) {
                    this.totalRecords = 0;
                }

                if (err.error && err.error.message) {
                    this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
                }
            },
            () => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
            });
    }

    private getMultiBarChartCountList(offset: number = this.defaultOffset, limit: number = this.defaultLimit) {
        if(this.officeOid =='' || this.officeOid==null){
            this.officeOid = this.currentOffice;
        }
        this.dashboardService.getBarChartCount(this.officeOid, this.startDate, this.endDate).subscribe(res => {
                if (res.status === 200) {
                    let requestDates = res.body.dateList;
                    let creationCountList = res.body.creationCountList;
                    let deactivationCountList = res.body.deactivationCountList;
                    let transferCountList = res.body.transferCountList;
                    let reactivationCountList = res.body.reactivationCountList;

                    this.multiBarChart = {
                        series: [
                            {
                                name: 'AW User Creation',
                                data: creationCountList
                            },
                            {
                                name: 'AW User Deactivation',
                                data: deactivationCountList
                            },
                            {
                                name: 'AW User Transfer',
                                data: transferCountList
                            },
                            {
                                name: 'AW User Reactivation',
                                data: reactivationCountList
                            }
                        ],
                        chart: {
                            type: 'bar',
                            height: 300
                        },
                        plotOptions: {
                            bar: {
                              horizontal: false,
                              columnWidth: "55%"
                            }
                        },
                        dataLabels: {
                            enabled: false
                          },
                        stroke: {
                            show: true,
                            width: 2,
                            colors: ['transparent']
                        },
                        
                        responsive: [
                            {
                                breakpoint: 480,
                                options: {
                                    legend: {
                                        position: 'bottom',
                                        offsetX: -10,
                                        offsetY: 0
                                    }
                                }
                            }
                        ],
                        xaxis: {
                            type: 'category',
                            categories: requestDates,
                            labels: {
                                style: {
                                  fontSize: "11px",
                                  cssClass: ".apexcharts-margin"
                                },
                                hideOverlappingLabels: false,
                                show: true,
                                rotate: 0,
                                rotateAlways: false,
                                minHeight: 100,
                                maxHeight: 2000
                            }
                        },
                        yaxis: {
                            title: {
                              text: "$ (Count)"
                            }
                        },
                        legend: {
                            position: 'right',
                            offsetY: 40,
                            fontWeight: 'bolder'
                        },
                        fill: {
                            opacity: 1
                            // colors: ['#5CD0EC', '#F39E37', '#806AFE',#f1af1f]
                        },
                        tooltip: {
                            y: {
                              formatter: function (val) {
                                return "$ " + val + " thousands";
                              }
                            }
                        }
                    };

                    this.lineChart = {
                        options: {
                            // colors: ['#5CD0EC', '#F39E37', '#806AFE']
                        },
                        series: [
                            {
                                name: 'AW User Creation',
                                data: creationCountList
                            },
                            {
                                name: 'AW User Deactivation',
                                data: deactivationCountList
                            },
                            {
                                name: 'AW User Transfer',
                                data: transferCountList
                            },
                            {
                                name: 'AW User Reactivation',
                                data: reactivationCountList
                            }
                        ],
                        chart: {
                            height: 350,
                            type: 'line',
                            toolbar: {
                                show: false
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            width: 5,
                            curve: 'straight',
                            dashArray: [0, 0, 0]
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        legend: {
                            tooltipHoverFormatter(val, opts) {
                                return (
                                    val +
                                    ' - <strong>' +
                                    opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
                                    '</strong>'
                                );
                            }
                        },
                        markers: {
                            size: 0,
                            hover: {
                                sizeOffset: 6
                            }
                        },
                        xaxis: {
                            labels: {
                                trim: false
                            },
                            categories: requestDates
                        },
                        tooltip: {
                            y: [
                                {
                                    title: {
                                        formatter(val) {
                                            return val + ':';
                                        }
                                    }
                                },
                                {
                                    title: {
                                        formatter(val) {
                                            return val + ':';
                                        }
                                    }
                                },
                                {
                                    title: {
                                        formatter(val) {
                                            return val + ':';
                                        }
                                    }
                                }
                            ]
                        },
                        grid: {
                            borderColor: '#BDBDBD'
                        }
                    };
                }
            },
            err => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
                if (err.status === 404) {
                    this.totalRecords = 0;
                }

                if (err.error && err.error.message) {
                    this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
                }
            },
            () => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
            });
    }

    private getActiveUserList(offset: number = this.defaultOffset, limit: number = this.defaultLimit) {
        this.dashboardService.getActiveUserList(this.currentOffice, offset, limit).subscribe(res => {
                if (res.status === 200) {
                    this.totalRecords = res.body.totalRecords
                    this.temp1 = this.totalRecords;
                }
            },
            err => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
                if (err.status === 404) {
                    this.totalRecords = 0;
                }

                if (err.error && err.error.message) {
                    this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
                }
            },
            () => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
            });
    }

    private getDeactiveUserList(offset: number = this.defaultOffset, limit: number = this.defaultLimit) {
        this.dashboardService.getDeactiveUserList(this.currentOffice, offset, limit).subscribe(res => {
                if (res.status === 200) {
                    this.totalRecords = res.body.totalRecords
                    this.temp2 = this.totalRecords
                }
            },
            err => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
                if (err.status === 404) {
                    this.totalRecords = 0;
                }

                if (err.error && err.error.message) {
                    this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
                }
            },
            () => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
            });
    }

    private getPendingUserList(offset: number = this.defaultOffset, limit: number = this.defaultLimit) {
        this.dashboardService.getPendingUserList(this.currentOffice, offset, limit).subscribe(res => {
                if (res.status === 200) {
                    this.totalRecords = res.body.totalRecords
                    this.temp3 = this.totalRecords
                }
            },
            err => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
                if (err.status === 404) {
                    this.totalRecords = 0;
                }

                if (err.error && err.error.message) {
                    this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
                }
            },
            () => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
            });
    }
    getOfficeList() {
        // this.officeService.getOffices(offset, limit, searchText.trim()).subscribe(res => {
        // if (res.status === 200) {
        // this.officeList = res.body
        // }
        // });
     }
}

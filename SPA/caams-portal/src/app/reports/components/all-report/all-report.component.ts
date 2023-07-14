import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import *  as  assetReportList from '../../../../assets/json/asset-repots.json';
import *  as  dateWiseReportList from '../../../../assets/json/date-wise-repots.json';

@Component({
  selector: 'app-all-report',
  templateUrl: './all-report.component.html',
  styleUrls: ['./all-report.component.css']
})
export class AllReportComponent implements OnInit {

  public isLoading: boolean = false;
  items: { label: string; url: string; }[];
  assetReportList: any = (assetReportList as any).default;
  dateWiseReportList: any = (dateWiseReportList as any).default;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  goToReportPage(param) {
    if (param === '001') {
      this.router.navigate(["by-category"], {
        relativeTo: this.activatedRoute,
      });
    } else if (param === '002') {
      this.router.navigate(["by-manufacturer"], {
        relativeTo: this.activatedRoute,
      });
    } else if (param === '003') {
      this.router.navigate(["by-site"], {
        relativeTo: this.activatedRoute,
      });
    } else if (param === '004') {
      this.router.navigate(["by-vendor"], {
        relativeTo: this.activatedRoute,
      });
    } else if (param === '005') {
      this.router.navigate(["by-product-serial"], {
        relativeTo: this.activatedRoute,
      });
    } else if (param === '006') {
      this.router.navigate(["by-part-number"], {
        relativeTo: this.activatedRoute,
      });
    } else if (param === '007') {
      this.router.navigate(["by-condition"], {
        relativeTo: this.activatedRoute,
      });
    } else if (param === '008') {
      this.router.navigate(["by-responsible"], {
        relativeTo: this.activatedRoute,
      });
    }
    else if (param === '009') {
      this.router.navigate(["by-asset-history"], {
        relativeTo: this.activatedRoute,
      });
    }
  };

  ngOnInit(): void {
    this.items = [
      
        {label: 'CAAMS', url: '/'},  
      { label: 'Report Module', url: '/' },
      { label: 'Report List', url: '/reports' }
    ];

  }

}

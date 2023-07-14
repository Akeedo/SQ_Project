import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { ByIssueComponent } from './components/by-issue/by-issue.component';
import { ByManufacturerComponent } from './components/by-manufacturer/by-manufacturer.component';
import { AllReportComponent } from './components/all-report/all-report.component';
import { ByVendorComponent } from './components/by-vendor/by-vendor.component';
import { ByProductSerialComponent } from './components/by-product-serial/by-product-serial.component';
import { ByPartNumberComponent } from './components/by-part-number/by-part-number.component';
import { ByConditionComponent } from './components/by-condition/by-condition.component';
import { ByResponsibleComponent } from './components/by-responsible/by-responsible.component';
import { BySiteComponent } from './components/by-site/by-site.component';
import { ByWarrantyEndDateComponent } from './components/by-warranty-end-date/by-warranty-end-date.component';
import { ByWarrantyStartDateComponent } from './components/by-warranty-start-date/by-warranty-start-date.component';
import { ByLicenseCategoryComponent } from './components/by-license-category/by-license-category.component';
import { ByPurchaseDateComponent } from './components/by-purchase-date/by-purchase-date.component';
import { ByAssetHistoryComponent } from './components/by-asset-history/by-asset-history.component';

const routes: Routes = [
  {
    path: "",
    children: [

      {
        path: "",
        component: AllReportComponent
      },
      {
        path: "by-category",
        component: ByCategoryComponent
      },
      {
        path: "by-issue",
        component: ByIssueComponent
      },
      {
        path: "by-manufacturer",
        component: ByManufacturerComponent
      },
      {
        path: "by-vendor",
        component: ByVendorComponent
      },
      {
        path: "by-product-serial",
        component: ByProductSerialComponent
      },
      {
        path: "by-part-number",
        component: ByPartNumberComponent
      },
      {
        path: "by-csi-con-number",
        component: ByVendorComponent
      },
      {
        path: "by-condition",
        component: ByConditionComponent
      },
      {
        path: "by-responsible",
        component: ByResponsibleComponent
      },
      {
        path: "by-site",
        component: BySiteComponent
      },
      {
        path: "by-warranty-end-date",
        component: ByWarrantyEndDateComponent
      },
      {
        path: "by-warranty-start-date",
        component: ByWarrantyStartDateComponent
      },
      {
        path: "by-license-category",
        component: ByLicenseCategoryComponent
      },
      {
        path: "by-purchase-date",
        component: ByPurchaseDateComponent
      },
      {
        path: "by-asset-history",
        component: ByAssetHistoryComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }

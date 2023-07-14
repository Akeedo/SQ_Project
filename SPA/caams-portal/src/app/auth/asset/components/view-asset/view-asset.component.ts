import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '@app/common/services/file.service';
import { PrintService } from '@app/common/services/print.service';
import { MessageService } from 'primeng/api';
import { AssetService } from '../../services/asset.service';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { AssetOwner } from '../../model/asset.model';

@Component({
  selector: 'asset-view',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.css']
})
export class ViewAssetComponent implements OnInit {

  isLoading: boolean = false;
  detail: any = null;
  items: { label: string; url: string; }[];
  assetId: any;
  imgUrls = [];
  assetOwnerName: [];
  printEnable: boolean = false;
  basicConfigFound: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
    private messageService: MessageService,
    private printService: PrintService,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.intitPageData();

  }

  intitPageData() {
    this.assetId = this.activatedRoute.snapshot.paramMap.get('assetOid');
    this.items = [
      { label: 'Operation', url: '/' },
      { label: 'Asset', url: '/asset' },
      { label: 'Asset Profile', url: '/asset/view-asset/' + this.assetId + '?mode=' + this.activatedRoute.snapshot.queryParamMap.get('mode') }
    ];
    this.assetService.findAssetSingleProjectionByID(this.assetId)
      .subscribe(
        (res) => {


          if (res.status === 200) {
            console.log('formData', res);
            this.detail = res.body ? res.body : null;

            if (this.detail.specJson && this.detail.specJson !== "[]") {
              this.basicConfigFound = true;
              this.detail.specJson = JSON.parse(this.detail.specJson);
            }

            if (this.detail.specialConfigJson && this.detail.specialConfigJson !== "[]") {
              this.basicConfigFound = true;
              this.detail.specialConfigJson = JSON.parse(this.detail.specialConfigJson);
            }

            if (this.detail.additionalServiceJson) {
              this.detail.additionalServiceJson = JSON.parse(this.detail.additionalServiceJson);
            }

            if (this.detail.assetJson && this.detail.assetJson !== "[]") {
              let tempAssetJ = JSON.parse(this.detail.assetJson);
              tempAssetJ.forEach((aj, i) => {
                tempAssetJ[i].docDate = new Date(aj.docDate);
              });
              this.detail.assetJson = tempAssetJ;
              this.downloadSelectedFile(this.detail.assetJson)
            }
            if (this.detail.assetImagesJson && this.detail.assetImagesJson !== "[]") {
              let tempAssetJ = JSON.parse(this.detail.assetImagesJson);
              tempAssetJ.forEach((aj, i) => {
                tempAssetJ[i].docDate = new Date(aj.docDate);
              });
              this.detail.assetImagesJson = tempAssetJ;
              this.downloadSelectedFilePicture(this.detail.assetImagesJson)
            }

          }
        },
        (err) => {
          this.isLoading = false;
          if (err.error && err.error.message) {
            this.messageService.add({
              severity: "error",
              summary: err.error.message,
              detail: "",
            });
          }
        },
        () => {
          this.isLoading = false;
        }
      );

  }
  goToTablePage() {
    this.router.navigate(["/asset"]);
  }

  printAsset(): void {
    this.printEnable = true;
    // this.printService.print();
    this.isLoading = true;
    setTimeout(() => {
      
      this.printService.print();
      this.isLoading = false;
    }, 2000);
  }

  downloadSelectedFile(fileNames: any) {
    if (fileNames == null || fileNames === '') {
      return;
    }
    // fileNames.forEach(document => {

    this.fileService.download(fileNames, 'AssetDocument').subscribe(res => {
      console.log(res);
      saveAs(res.body, fileNames);

      if (res.body.type !== "application/pdf") {
        const unsafeImageUrl = URL.createObjectURL(res.body);
        this.imgUrls.push(this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl));

      }
    },
      (err) => {
        console.log(err);

        this.messageService.add({
          severity: "error",
          summary: err,
          detail: "",
        });
      });
    //})
  }

  downloadSelectedFilePicture(fileNames: any) {
    if (fileNames == null || fileNames === '') {
      return;
    }
    fileNames.forEach(document => {

      this.fileService.download(document.fileNames[0], 'AssetDocumentPicture').subscribe(res => {
        console.log(res);
        if (res.body.type !== "application/pdf") {
          const unsafeImageUrl = URL.createObjectURL(res.body);
          this.imgUrls.push(this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl));
        }
      },
        (err) => {
          console.log(err);

          this.messageService.add({
            severity: "error",
            summary: err,
            detail: "",
          });
        });
    })
  }

}

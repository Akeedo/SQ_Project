import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { resourceServerUrl } from '@app/common/constants/server-settings';
import { FileService } from '@app/common/services/file.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AssetService } from '../../services/asset.service';
import AssetO from '../../model/asset.model';
import { saveAs } from 'file-saver';
import { DesignationService } from '@app/auth/designation/services/designation.service';
import { AssetCategoryService } from '@app/auth/asset-category/services/asset-category.service';


export const MAX_FILE_SIZE = 104857600;
@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {

  public isLoading: boolean = false;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  index: number = 0;
  siteList: any = [];
  designations: any = [];
  subSiteList: any = [];
  vendorList: any = [];
  reponsiblePersonList: any = [];
  manufacturerList: any = [];
  packageList: any = [];
  modelList: any = [];
  basicSpecs: any;
  specialConfigJson: any;
  additionalServiceJson: any;
  desktopLaptopExist: boolean = false;
  credentials: any;
  showPassword: boolean = false;
  documents: any[];
  documentsPicture: any[];

  images: any[];
  assetCategoryList: any = [];
  assetCondtions: any[] = [
    { label: 'Good', value: 'Good' },
    { label: 'Faulty', value: 'Faulty' }
  ];

  assetStatuses: any[] = [{ label: 'Initiated', value: 'Initiated' },
  { label: 'Assigned', value: 'Assigned' },
  { label: 'Reserved', value: 'Reserved' },
  { label: 'Maintenance', value: 'Maintenance' },
  { label: 'Damaged', value: 'Damaged' },

  ];

  assetUnits: any[] = [{ label: 'Custom House', value: 'Custom House' },
  { label: 'LC Station', value: 'LC Station' },
  { label: 'Others', value: 'Others' }];

  assetGeneralForm: FormGroup;
  assetDateForm: FormGroup;
  assetSpecificationForm: FormGroup;
  assetCredentialForm: FormGroup;
  assetDocumentsForm: FormGroup;
  assetImageForm: FormGroup;
  assetServiceForm: FormGroup;
  assetStatusForm: FormGroup;
  packageModalForm: FormGroup;
  

  // by sz

  assetPictureDocumentsForm: FormGroup;


  minDate: Date;
  maxDate: Date;
  minDateYear: number;
  maxDateYear: number;
  fileUploadProgress: any[] = [];
  mode: string = 'CREATE';
  files: any;
  today = new Date();
  items: { label: string; url: string; }[];
  extraServiceTab: boolean = false;
  BasicShow: boolean = false;

  assetCurrentData: AssetO;

  tempFiles: any[] = [];
  tempFilesPicture: any[] = [];

  imageUrl=''

  packageFromModal = '';
  designationFromModal = '';
  assetCategoryFromModal = '';
  


  constructor(private fb: FormBuilder,
    private router: Router,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
    private designationService: DesignationService,
    private assetCategoryService: AssetCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

    this.minDateYear = (this.today.getFullYear() - 50);
    this.maxDateYear = (this.today.getFullYear() + 50);
    this.minDate = new Date('January 01, ' + this.minDateYear);
    this.maxDate = new Date('December 31, ' + this.maxDateYear);
    this.items = [
      { label: 'CAAMS', url: '/' },
      { label: 'Operation', url: '/asset' },
      { label: 'Asset', url: '/asset' },
      { label: 'Create Asset', url: '/asset/create-asset' }
    ];
  }

  ngOnInit(): void {

    this.prepareAssetOpForm(null);
    this.initFeatures();
    this.getSiteList();
    this.getDesignations();
    // this.getSubSiteList(null);
    this.getVendorList();
    this.getManufacturerList();
    this.getPackageList();
    this.getAssetCategoryList();
    this.getModelList();
    this.getResponsiblePersonList();

  }


  initFeatures() {

    this.mode = this.activatedRoute.snapshot.queryParamMap.get("mode");

    if (this.mode) {
      switch (this.mode) {
        case "CREATE": {
          this.prepareAssetOpForm(new AssetO());
          break;
        }

        case "UPDATE": {
          this.findAssetOpById(this.activatedRoute.snapshot.paramMap.get('assetOid'));

          break;
        }
        case "COPY": {
          this.findAssetOpById(this.activatedRoute.snapshot.paramMap.get('assetOid'));
          break;
        }
      }
    }

  }

  findAssetOpById(assetOid: string) {

    this.assetService.findAssetOpByID(assetOid).subscribe(
      (res) => {
        if (res.status === 200) {
          this.assetCurrentData = res.body;
          this.prepareAssetOpForm(this.assetCurrentData);
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

  showDialog() {
    this.BasicShow = true;
  }


  
  saveDesignation(){
    this.BasicShow = false;
    let result = {
      oid: null,
      designationName: this.designationFromModal
    }
    if (result != null) {
      this.designationService
        .saveDesignation(result)
        .subscribe(
          (res) => {
            console.log("Asset type rerun", res);
            
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Asset type saved Successfully",
                detail: "",
              });
              this.assetServiceForm.get('assetOwnerDesignation').setValue(res.body.oid);
              this.assetServiceForm.updateValueAndValidity();
              this.designationFromModal = "";
              setTimeout(() => {
                this.getDesignations();
                
              }, 1000);
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
    } else {
      this.isLoading = false;
      this.messageService.add({
        severity: "error",
        summary: "Please fill up all the required fields",
        detail: "",
      });
    } 
  }

  onShowPasswordClick() {
    this.showPassword = !this.showPassword;
  }

  spanBasicSpec() {
    this.basicSpecs = this.basicSpecs != null && this.basicSpecs.length > 0 ? [...this.basicSpecs, { title: '', value: '' }] :
      [{ title: '', value: '' }];
  }

  removeBasicSpec(index: number) {
    this.basicSpecs.splice(index, 1);
  }

  spanCredentials() {
    this.credentials = this.credentials != null && this.credentials.length > 0 ? [...this.credentials, { credentialType: '', username: '', password: '' }] :
      [{ credentialType: '', username: '', password: '' }];
  }

  removeCredential(index: number) {
    this.credentials.splice(index, 1);
  }

  spanDocuments() {
    this.documents = this.documents != null && this.documents.length > 0 ?
      [...this.documents, { documentName: '', docRefNo: '', docDate: '', fileNames: [] }] : [{ documentName: '', docRefNo: '', docDate: '', fileNames: [] }];
  }

  spanDocumentsPicture() {
    this.documentsPicture = this.documentsPicture != null && this.documentsPicture.length > 0 ?
      [...this.documentsPicture, { documentName: '', docRefNo: '', docDate: '', fileNames: [] }] : [{ documentName: '', docRefNo: '', docDate: '', fileNames: [] }];
  }

  spanImages() {
    this.images = this.images != null && this.images.length > 0 ?
      [...this.images, { imageName: '', fileNames: [] }] : [{ imageName: '', docRefNo: '', docDate: '', fileNames: [] }];
  }
  removeDocuments(index: number) {
    this.documents.splice(index, 1);
  }
  removeDocumentsPicture(index: number) {
    this.documentsPicture.splice(index, 1);
  }

  removeImagess(index: number) {
    this.images.splice(index, 1);
  }
  prevTab() {
    this.index = (this.index === 0) ? this.index - 1 : this.index - 1;
  }

  nextTab() {
    this.index = (this.index === 2) ? this.index + 1 : this.index + 1;
  }

  getSiteList() {
    this.assetService.getSiteNameList().subscribe((res) => {
      if (res.status === 200) {
        this.siteList = res.body.data;
      }
    });
  }

  getDesignations() {
    this.assetService.getDesignations().subscribe((res) => {
      if (res.status === 200) {
        this.designations = res.body.data;
      }
    });

  }

  getSubSiteList(siteId: string) {
    this.assetService.getSubSiteList(siteId).subscribe((res) => {
      if (res.status === 200) {
        this.subSiteList = res.body.data;
      }
    });
  }




  getResponsiblePersonList() {

    this.assetService.getAssetOwnerList().subscribe((res) => {
      if (res.status === 200) {
        this.reponsiblePersonList = res.body.data;
      }
    });
  }

  getVendorList() {

    this.assetService.getVendorList().subscribe((res) => {
      if (res.status === 200) {
        this.vendorList = res.body.data;
      }
    });
  }

  getManufacturerList() {

    this.assetService.getManfacturerList().subscribe((res) => {
      if (res.status === 200) {
        this.manufacturerList = res.body.data;
      }
    });
  }

  savePackage(){
    this.BasicShow = false;
    let result = {
      oid: null,
      organizationOid: "",
      assetCategoryTypeName: this.packageFromModal
    }
    if (result != null) {
      this.assetService
        .saveAssetCategoryType(result)
        .subscribe(
          (res) => {
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Asset Type saved Successfully",
                detail: "",
              });
              this.assetGeneralForm.get('assetCategoryTypeOid').setValue(res.body.assetCategoryTypeOid);
              this.assetGeneralForm.updateValueAndValidity();
              this.packageFromModal = "";
              setTimeout(() => {
                this.getPackageList();
              }, 1000);
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
    } else {
      this.isLoading = false;
      this.messageService.add({
        severity: "error",
        summary: "Please fill up all the required fields",
        detail: "",
      });
    }
  }

  getPackageList() {

    this.assetService.getPackageList().subscribe((res) => {
      if (res.status === 200) {
        this.packageList = res.body.data;
      }
    });
  }

  saveAssetCategory(){
    this.BasicShow = false;
    let result = {
        assetCategoryOid: "",
        organizationOid: "",
        assetCategoryName: this.assetCategoryFromModal,
        assetCategorySpecificationJson: "",
        assetCategoryTypeOid: ""
    }
    if (result != null) {
      this.assetCategoryService
        .saveAssetCategory(result)
        .subscribe(
          (res) => {
            if (res.status === 201) {
              this.messageService.add({
                severity: "success",
                summary: "Asset Category saved Successfully",
                detail: "",
              });
              this.assetSpecificationForm.get('assetCategoryOid').setValue(res.body.assetCategoryOid);
              this.assetSpecificationForm.updateValueAndValidity();
              this.assetCategoryFromModal = "";
              setTimeout(() => {
                this.getAssetCategoryList();
              }, 1000);
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
    } else {
      this.isLoading = false;
      this.messageService.add({
        severity: "error",
        summary: "Please fill up all the required fields",
        detail: "",
      });
    }
  }

  getAssetCategoryList() {

    this.assetService.getAssetCategoryList().subscribe((res) => {
      if (res.status === 200) {
        this.assetCategoryList = res.body.data;
      }
    });
  }

  getModelList() {

    this.assetService.getModelList().subscribe((res) => {
      if (res.status === 200) {
        this.modelList = res.body.data;
      }
    });
  }



  onCancel() {

    this.confirmationService.confirm({
      target: null,
      header: 'Cancel Asset Form',
      message: 'Are you sure that you want to perform this action?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/asset'], { relativeTo: this.activatedRoute });
      },
      reject: () => {
        //reject action
      }
    });
  }

  validateAssetFormData(): boolean {
    let isValid = true;
    if (this.assetGeneralForm.invalid) {
      this.index = 0;
      this.messageService.add({
        severity: "error",
        summary: "Mandatory Field(s): \"General Tab\".",
        detail: "Please fill all the mandatory fields.",
      });
      this.isLoading = false;
      return false;
    }
    if (this.assetDateForm.invalid) {
      this.index = 1;
      this.messageService.add({
        severity: "error",
        summary: "Mandatory Field(s): \"Date Tab\".",
        detail: "Please fill all the mandatory fields.",
      });
      this.isLoading = false;
      return false;
    }


    if (this.assetSpecificationForm.invalid) {
      this.index = 2;
      this.messageService.add({
        severity: "error",
        summary: "Mandatory Field(s): \" Specifications Tab\".",
        detail: "Please fill all the mandatory fields.",
      });
      this.isLoading = false;
      return false;
    }

    if (this.assetStatusForm.invalid) {
      this.index = 4;
      this.messageService.add({
        severity: "error",
        summary: "Mandatory Field(s): \" Status Tab\".",
        detail: "Please fill all the mandatory fields.",
      });
      this.isLoading = false;
      return false;
    }

    if (this.desktopLaptopExist) {
      if (this.assetServiceForm.invalid) {
        this.index = 5;
        this.messageService.add({
          severity: "error",
          summary: "Mandatory Field(s): \" Service Tab\".",
          detail: "Please fill all the mandatory fields.",
        });
        this.isLoading = false;
        return false;
      }

      this.specialConfigJson.forEach(bs => {
        if (bs.title === "Operating System (OS)") {
          if (bs.value.length < 1) {
            this.index = 2;
            this.messageService.add({
              severity: "error",
              summary: "Mandatory Field(s): \" Specifications Tab\".",
              detail: "Please fill the \"Operating System (OS)\" field.",
            });
            this.isLoading = false;
            isValid = false;
            return isValid;
          }
        };
        if (bs.title === "RAM (GB)") {
          if (bs.value.length < 1) {
            this.index = 2;
            this.messageService.add({
              severity: "error",
              summary: "Mandatory Field(s): \" Specifications Tab\".",
              detail: "Please fill the \"RAM (GB)\" field.",
            });
            this.isLoading = false;
            isValid = false;
            return isValid;
          }
        };
        if (bs.title === "HDD (GB)") {
          if (bs.value.length < 1) {
            this.index = 2;
            this.messageService.add({
              severity: "error",
              summary: "Mandatory Field(s): \" Specifications Tab\".",
              detail: "Please fill the \"HDD (GB)\" field.",
            });
            this.isLoading = false;
            isValid = false;
            return isValid;
          }
        };
        if (bs.title === "Processor") {
          if (bs.value.length < 1) {
            this.index = 2;
            this.messageService.add({
              severity: "error",
              summary: "Mandatory Field(s): \" Specifications Tab\".",
              detail: "Please fill  the \"Processor\" field.",
            });
            this.isLoading = false;
            isValid = false;
            return isValid;
          }
        };
        if (bs.title === "Generation") {
          if (bs.value.length < 1) {
            this.index = 2;
            this.messageService.add({
              severity: "error",
              summary: "Mandatory Field(s): \" Specifications Tab\".",
              detail: "Please fill the \"Generation\" field.",
            });
            this.isLoading = false;
            isValid = false;
            return isValid;
          }
        };
        if (bs.title === "Mega Hertz") {
          if (bs.value.length < 1) {
            this.index = 2;
            this.messageService.add({
              severity: "error",
              summary: "Mandatory Field(s): \" Specifications Tab\".",
              detail: "Please fill the \"Mega Hertz\" field.",
            });
            this.isLoading = false;
            isValid = false;
            return isValid;
          }
        };
      })


      this.additionalServiceJson.forEach(asj => {

        if (asj.label === "IP Address" &&
          asj.boolValue === true &&
          asj.textValue1.length < 1) {

          this.index = 5;

          this.messageService.add({
            severity: "error",
            summary: "Mandatory Field(s): \" Service Tab\".",
            detail: "Please fill the \"IP Address\" field.",
          });
          this.isLoading = false;

          isValid = false;
          return isValid;

        }
      });


    }

    return isValid;

  }


  onSubmit() {


    if (!this.validateAssetFormData()) {
      return;
    };

    let domainToSave: AssetO = this.fetchAssetDataFromAssetForms();

    this.confirmationService.confirm({
      target: null,
      header: (this.mode === 'UPDATE') ? 'Update Asset' : 'Save Asset',
      message: 'Are you sure that you want to perform this action?',
      // icon: 'pi pi-exclamation-triangle',
      icon: 'pi pi-check',
      accept: () => {
        this.isLoading = true;
        if (this.mode === 'CREATE' || this.mode === 'COPY') {
          domainToSave.assetOid = null;
          this.saveAsset(domainToSave);
        } else {
          this.updateAsset(domainToSave);
        };
      },
      reject: () => {
        //reject action
      }
    });

  }

  saveAsset(domainToSave: AssetO) {
    this.assetService
      .saveAsset(domainToSave)
      .subscribe(
        (res) => {
          if (res.status === 201) {
            this.isLoading = false;
            this.messageService.add({
              severity: "success",
              summary: "Asset Saved Successfully.",
              detail: ""
            });
            setTimeout(() => {
              this.router.navigate(["/asset"]);
            }, 2000);
          }
        },
        (err) => {
          this.isLoading = false;
          if (err) {
            // if (err.error && err.error.message) {
            this.messageService.add({
              severity: "error",
              summary: err.error.message,
              detail: "",
            });
          }
        },
        () => {

        }
      );
  }

  updateAsset(domainToSave: AssetO) {
    this.assetService
      .updateAsset(domainToSave, domainToSave.assetOid)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.isLoading = false;
            this.messageService.add({
              severity: "success",
              summary: "Asset Updated Successfully.",
              detail: "",
            });
            setTimeout(() => {
              this.router.navigate(["/asset"]);
            }, 2000);
          }
        },
        (err) => {
          this.isLoading = false;
          if (err) {
            // if (err.error && err.error.message) {
            this.messageService.add({
              severity: "error",
              summary: err.error.message,
              detail: "",
            });
          }
        },
        () => {

        }
      );
  }

  fetchAssetCategoryById(categoryId: string) {

    this.assetService.fetchAssetCategoryById(categoryId).subscribe(res => {

      let data = res;
      if (res.status === 200) {
        let category = res.body.assetCategoryName.toString().toLowerCase();
        if (category === "desktop"
          || category === "laptop"
          || category === "server") {

          if (this.assetCurrentData) {
            this.desktopLaptopExist = true;
            if (this.assetCurrentData.assetSpecialConfigJson != null &&
              this.assetCurrentData.assetSpecialConfigJson != "{}" &&
              this.assetCurrentData.assetSpecialConfigJson != ""

            ) {
              this.specialConfigJson = JSON.parse(this.assetCurrentData.assetSpecialConfigJson);
            } else {
              this.specialConfigJson = [
                { title: 'Operating System (OS)', value: '' },
                { title: 'RAM (GB)', value: '' },
                { title: 'HDD (GB)', value: '' },
                { title: 'Processor', value: '' },
                { title: 'Generation', value: '' },
                { title: 'Mega Hertz', value: '' }
              ];
            }

            if (this.assetCurrentData.assetSpecificationJson != null &&
              this.assetCurrentData.assetSpecificationJson != "{}" &&
              this.assetCurrentData.assetSpecificationJson != ""
            ) {
              this.basicSpecs = JSON.parse(this.assetCurrentData.assetSpecificationJson);
            }

            if (this.assetCurrentData.additionalServiceJson != null &&
              this.assetCurrentData.additionalServiceJson != "{}" &&
              this.assetCurrentData.additionalServiceJson != ""
            ) {
              this.additionalServiceJson = JSON.parse(this.assetCurrentData.additionalServiceJson);
            } else {
              this.additionalServiceJson = [
                { label: 'AD', boolValue: false, textValue1: '', textValue2: '', required: false },
                { label: 'AW UserID', boolValue: false, textValue1: '', textValue2: '', required: false },
                { label: 'IP Address', boolValue: false, textValue1: '', textValue2: '', required: false },
                { label: 'Antivirus', boolValue: false, textValue1: '', textValue2: '', required: false },
              ];
            }

            this.assetServiceForm = this.fb.group({
              AssetOwnerName: [this.assetCurrentData ? this.assetCurrentData.assetOwnerName : ''],
              assetOwnerDesignation: [this.assetCurrentData ? this.assetCurrentData.assetOwnerDesignation : ''],
              assetOwnerUnit: [this.assetCurrentData ? this.assetCurrentData.assetOwnerUnit : '']
            });

          } else {

            this.assetServiceForm = this.fb.group({
              AssetOwnerName: [''],
              assetOwnerDesignation: [''],
              assetOwnerUnit: ['']
            });

            this.specialConfigJson = [
              { title: 'Operating System (OS)', value: '' },
              { title: 'RAM (GB)', value: '' },
              { title: 'HDD (GB)', value: '' },
              { title: 'Processor', value: '' },
              { title: 'Generation', value: '' },
              { title: 'Mega Hertz', value: '' }
            ];

            this.additionalServiceJson = [
              { label: 'AD', boolValue: false, textValue1: '', textValue2: '', required: false },
              { label: 'AW UserID', boolValue: false, textValue1: '', textValue2: '', required: false },
              { label: 'IP Address', boolValue: false, textValue1: '', textValue2: '', required: false },
              { label: 'Antivirus', boolValue: false, textValue1: '', textValue2: '', required: false },
            ];
          }

          this.desktopLaptopExist = true;
        } else {
          this.desktopLaptopExist = false;
          this.basicSpecs = [];
          this.specialConfigJson = [];
          this.additionalServiceJson = [];
          this.assetServiceForm = null;
          this.assetSpecificationForm;
        }
      }

    });

  }


  prepareAssetOpForm(asset: AssetO) {
    asset = asset ? asset : new AssetO();
    this.assetGeneralForm = this.fb.group({
      assetOid: [asset.assetOid],
      organizationOid: [asset.organizationOid],
      departmentOid: [asset.departmentOid],
      siteOid: [asset.siteOid, [Validators.required]],
      subSiteOid: [asset.subSiteOid], //, [Validators.required]],
      vendorOid: [asset.vendorOid, [Validators.required]],
      assetName: [asset.assetName, [Validators.required]],
      assetProductSerial: [asset.assetProductSerial, [Validators.required]],
      assetCategoryTypeOid: [asset.assetCategoryTypeOid, [Validators.required]],
      assetLocation: [asset.assetLocation],
      assetReferenceNumberOfTender: [asset.assetReferenceNumberOfTender],
      assetReceivedBy: [asset.assetReceivedBy],
      assetPartNo: [asset.assetPartNo],
      storeOid: [asset.storeOid],
      assetCsiNumber: [asset.assetCsiNumber],
      assetOwnerDesignation: [asset.assetOwnerDesignation]
    });

    this.assetDateForm = this.fb.group({
      assetReceiveDate: [asset.assetReceiveDate ? new Date(asset.assetReceiveDate) : '', [Validators.required]],
      assetWarrantyStartDate: [asset.assetWarrantyStartDate ? new Date(asset.assetWarrantyStartDate) : '', [Validators.required]],
      assetWarrantyEndDate: [asset.assetWarrantyEndDate ? new Date(asset.assetWarrantyEndDate) : '', [Validators.required]],
      assetLicenseStartDate: [asset.assetLicenseStartDate ? new Date(asset.assetLicenseStartDate) : ''],
      assetLicenseEndDate: [asset.assetLicenseEndDate ? new Date(asset.assetLicenseEndDate) : ''],

      assetEndOfLifeDate: [asset.assetEndOfLifeDate ? new Date(asset.assetEndOfLifeDate) : ''],
      assetEndOfSupportDate: [asset.assetEndOfSupportDate ? new Date(asset.assetEndOfSupportDate) : ''],
      assetPurchaseDate: [asset.assetPurchaseDate ? new Date(asset.assetPurchaseDate) : ''],
      assetShipmentDate: [asset.assetShipmentDate ? new Date(asset.assetShipmentDate) : ''],
      assetDeliveryDate: [asset.assetDeliveryDate ? new Date(asset.assetDeliveryDate) : '']

    });

    this.assetSpecificationForm = this.fb.group({
      manufacturerOid: [asset.manufacturerOid, [Validators.required]],
      assetCategoryOid: [asset.assetCategoryOid, [Validators.required]],
      assetModelOid: [asset.assetModelOid]
    });

    // this.assetCredentialForm = this.fb.group({
    // });

    this.assetDocumentsForm = this.fb.group({
      documentName: ['', [Validators.required]],
      docRefNo: ['', [Validators.required]],
      docDate: ['', [Validators.required]],
      fileNames: [[]]
    });
    // by sz
    this.assetPictureDocumentsForm = this.fb.group({
      documentName: ['',],
      docRefNo: ['',],
      docDate: ['',],
      fileNames: [[]]
    });

    this.assetImageForm = this.fb.group({
      documentName: ['', [Validators.required]],
      fileNames: [[]]
    });

    this.assetStatusForm = this.fb.group({
      assetRemarks: [asset.assetRemarks],
      assetStatus: [asset.assetStatus, [Validators.required]],
      assetCondition: [asset.assetCondition, [Validators.required]],
      assetChalanNo: [asset.assetChalanNo]
    });

    if (asset.assetSpecificationJson != null &&
      asset.assetSpecificationJson != "{}" &&
      asset.assetSpecificationJson.length > 2) {
      this.basicSpecs = JSON.parse(asset.assetSpecificationJson);
    }

    if (this.mode === "CREATE" || this.mode === "COPY") {
      this.assetGeneralForm.get("assetOid").setValue('');
      this.assetGeneralForm.updateValueAndValidity();
    } else if (this.mode === "UPDATE") {
      this.fetchAssetCategoryById(asset.assetCategoryOid);

    }


    if (asset.assetCredentialJson != null &&
      asset.assetCredentialJson != "{}" &&
      asset.assetCredentialJson.length > 2) {
      this.credentials = JSON.parse(asset.assetCredentialJson);
    }

    if (asset.assetJson != null && asset.assetJson != "{}" && asset.assetJson.length > 2) {
      let tempAssetJ = JSON.parse(asset.assetJson);
      tempAssetJ.forEach((aj, i) => {
        tempAssetJ[i].docDate = new Date(aj.docDate);
      });
      this.documents = tempAssetJ;
    }
    if (asset.assetImagesJson != null && asset.assetImagesJson != "{}" && asset.assetImagesJson.length > 2) {
      let tempAssetJ = JSON.parse(asset.assetImagesJson);
      tempAssetJ.forEach((aj, i) => {
        tempAssetJ[i].docDate = new Date(aj.docDate);
      });
      this.documentsPicture = tempAssetJ;
    }

    if (asset.siteOid) {
      this.getSubSiteList(asset.siteOid);
    }

  }


  fetchAssetDataFromAssetForms(): AssetO {
    let assetModel: AssetO = new AssetO();
    //assetGeneralForm
    assetModel.assetOid = this.assetGeneralForm.get("assetOid").value;
    assetModel.organizationOid = this.assetGeneralForm.get("organizationOid").value;
    assetModel.departmentOid = this.assetGeneralForm.get("departmentOid").value;
    assetModel.siteOid = this.assetGeneralForm.get("siteOid").value;
    assetModel.subSiteOid = this.assetGeneralForm.get("subSiteOid").value;
    assetModel.vendorOid = this.assetGeneralForm.get("vendorOid").value;
    assetModel.assetName = this.assetGeneralForm.get("assetName").value;
    assetModel.assetProductSerial = this.assetGeneralForm.get("assetProductSerial").value;
    assetModel.assetCategoryTypeOid = this.assetGeneralForm.get("assetCategoryTypeOid").value;
    assetModel.assetReferenceNumberOfTender = this.assetGeneralForm.get("assetReferenceNumberOfTender").value;
    assetModel.assetReceivedBy = this.assetGeneralForm.get("assetReceivedBy").value;
    assetModel.storeOid = this.assetGeneralForm.get("storeOid").value;
    assetModel.assetCsiNumber = this.assetGeneralForm.get("assetCsiNumber").value;
    assetModel.assetLocation = this.assetGeneralForm.get("assetLocation").value;
    assetModel.assetPartNo = this.assetGeneralForm.get("assetPartNo").value;



    //assetDateForm
    assetModel.assetReceiveDate = this.assetDateForm.get("assetReceiveDate").value;
    assetModel.assetWarrantyStartDate = this.assetDateForm.get("assetWarrantyStartDate").value;
    assetModel.assetWarrantyEndDate = this.assetDateForm.get("assetWarrantyEndDate").value;
    assetModel.assetLicenseStartDate = this.assetDateForm.get("assetLicenseStartDate").value;
    assetModel.assetLicenseEndDate = this.assetDateForm.get("assetLicenseEndDate").value;

    assetModel.assetEndOfLifeDate = this.assetDateForm.get("assetEndOfLifeDate").value;
    assetModel.assetEndOfSupportDate = this.assetDateForm.get("assetEndOfSupportDate").value;
    assetModel.assetPurchaseDate = this.assetDateForm.get("assetPurchaseDate").value;
    assetModel.assetShipmentDate = this.assetDateForm.get("assetShipmentDate").value;
    assetModel.assetDeliveryDate = this.assetDateForm.get("assetDeliveryDate").value;

    //assetSpecificationForm
    assetModel.manufacturerOid = this.assetSpecificationForm.get("manufacturerOid").value;
    assetModel.assetCategoryOid = this.assetSpecificationForm.get("assetCategoryOid").value;
    assetModel.assetModelOid = this.assetSpecificationForm.get("assetModelOid").value;

    //assetStatusForm
    assetModel.assetRemarks = this.assetStatusForm.get("assetRemarks").value;
    assetModel.assetStatus = this.assetStatusForm.get("assetStatus").value;
    assetModel.assetCondition = this.assetStatusForm.get("assetCondition").value;
    assetModel.assetChalanNo = this.assetStatusForm.get("assetChalanNo").value;

    //assetServiceForm
    if (this.desktopLaptopExist) {
      assetModel.assetOwnerName = this.assetServiceForm.get("AssetOwnerName").value;
      assetModel.assetOwnerDesignation = this.assetServiceForm.get("assetOwnerDesignation").value;
      assetModel.assetOwnerUnit = this.assetServiceForm.get("assetOwnerUnit").value;
      assetModel.additionalServiceJson = JSON.stringify(this.additionalServiceJson);
      assetModel.assetSpecialConfigJson = JSON.stringify(this.specialConfigJson);
    }

    assetModel.assetSpecificationJson = JSON.stringify(this.basicSpecs);
    assetModel.assetCredentialJson = JSON.stringify(this.credentials);
    assetModel.assetJson = JSON.stringify(this.documents);
    assetModel.assetImagesJson = JSON.stringify(this.documentsPicture);
    assetModel.assetConfigurationJson = "{}";

    return assetModel;
  }

  onFileSelected(target: any, docIndex?: number) {

    let files: any[] = [];
    files = target.files;
    const fileExtArr = files[0].name.split(".");
    let fileExt = fileExtArr[fileExtArr.length - 1];
    if (!["pdf", "PDF"].includes(fileExt)) {
      this.messageService.add({ severity: 'error', summary: 'Please select only pdf file.', detail: '' });
      return;
    }
    if (files[0].size > MAX_FILE_SIZE) {
      this.messageService.add({ severity: 'error', summary: 'File size should not be more than 100MB.', detail: '' });
      target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append('files', files[0]);
    this.fileService.upload(files, formData, 'AssetDocument').subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {

        this.fileUploadProgress[docIndex] = Math.round(100 * event.loaded / event.total);

      } else if (event instanceof HttpResponse) {

        if (event.status === 200) {
          const fileName = event.body.files[0];
          // this.documents[docIndex].fileName = fileName;
          this.tempFiles.push(fileName);
        }
      }
    })
  }

  onPictureFileSelected(target: any, docIndex?: number) {

    let files: any[] = [];
    files = target.files;
    const fileExtArr = files[0].name.split(".");
    let fileExt = fileExtArr[fileExtArr.length - 1];
    if (!["png", "PNG", "jpg", "JPG", "jpeg", "JPEG"].includes(fileExt)) {
      this.messageService.add({ severity: 'error', summary: 'Please select only image file.', detail: '' });
      return;
    }
    if (files[0].size > MAX_FILE_SIZE) {
      this.messageService.add({ severity: 'error', summary: 'File size should not be more than 100MB.', detail: '' });
      target.value = "";
      return;
    }

    if (this.documentsPicture != null && this.documentsPicture.length > 1) {
      this.messageService.add({ severity: 'error', summary: 'Only two files should be selected.', detail: '' });
      target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append('files', files[0]);
    this.fileService.upload(files, formData, 'AssetDocumentPicture').subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {

        this.fileUploadProgress[docIndex] = Math.round(100 * event.loaded / event.total);

      } else if (event instanceof HttpResponse) {

        if (event.status === 200) {
          const fileName = event.body.files[0];
          // this.documents[docIndex].fileName = fileName;
          this.tempFilesPicture.push(fileName);
        }
      }
    })
  }

  onImageSelected(target: any, docIndex?: number) {

    let files: any[] = [];
    files = target.files;
    const fileExtArr = files[0].name.split(".");
    let fileExt = fileExtArr[fileExtArr.length - 1];
    if (!["png", "PNG", "jpg", "JPG", "jpeg", "JPEG"].includes(fileExt)) {
      this.messageService.add({ severity: 'error', summary: 'Please select only  image file.', detail: '' });
      return;
    }
    if (files[0].size > MAX_FILE_SIZE) {
      this.messageService.add({ severity: 'error', summary: 'File size should not be more than 100MB.', detail: '' });
      target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append('files', files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    }
    reader.readAsDataURL(files[0])
    this.fileService.upload(files, formData, 'AssetDocument').subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {

        this.fileUploadProgress[docIndex] = Math.round(100 * event.loaded / event.total);

      } else if (event instanceof HttpResponse) {

        if (event.status === 200) {
          const fileName = event.body.files[0];
          // this.documents[docIndex].fileName = fileName;
          this.tempFiles.push(fileName);
        }
      }
    })
  }

  licenseDateValidation(event) {

    let startDate = this.assetDateForm.get("assetLicenseStartDate").value;
    let endDate = this.assetDateForm.get("assetLicenseEndDate").value;
    if (event != null && startDate != null && startDate !== "" && endDate != null && endDate !== "") {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      // if (startDate === endDate) {
      //   this.assetDateForm.get(event).setValue('');
      //   this.messageService.add({
      //     severity: "error",
      //     summary: " License Dates Error:",
      //     detail: " Both Start Date & End Date can't be equal.",
      //   });
      // }
      if (startDate > endDate) {
        this.assetDateForm.get(event).setValue('')
        this.messageService.add({
          severity: "error",
          summary: " License Dates Error:",
          detail: " Start Date can't be greater than End Date.",
        });
      }
      this.assetDateForm.get(event).updateValueAndValidity()
    }

  }

  warrantyDateValidation(event) {
    let startDate = this.assetDateForm.get("assetWarrantyStartDate").value;
    let endDate = this.assetDateForm.get("assetWarrantyEndDate").value;
    if (event != null && startDate != null && startDate !== "" && endDate != null && endDate !== "") {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      // if (startDate === endDate) {
      //   this.assetDateForm.get(event).setValue('');
      //   this.messageService.add({
      //     severity: "error",
      //     summary: " Warranty Dates Error:",
      //     detail: " Both Start Date & End Date can't be equal.",
      //   });
      // }
      if (startDate > endDate) {
        this.assetDateForm.get(event).setValue('')
        this.messageService.add({
          severity: "error",
          summary: " Warranty Dates Error:",
          detail: " Start Date can't be greater than End Date.",
        });
      }
      this.assetDateForm.get(event).updateValueAndValidity()
    }
  }


  downloadSelectedFile(fileName: string) {
    if (fileName == null || fileName === '') {
      return;
    }
    this.fileService.download(fileName, 'AssetDocument').subscribe(res => {
      saveAs(res.body, fileName);

    },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: err,
          detail: "",
        });
      });

  }

  downloadSelectedFilePicture(fileName: string) {
    if (fileName == null || fileName === '') {
      return;
    }
    this.fileService.download(fileName, 'AssetDocumentPicture').subscribe(res => {
      saveAs(res.body, fileName);

    },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: err,
          detail: "",
        });
      });

  }
  downloadSelectedImageFile(fileName: string) {
    if (fileName == null || fileName === '') {
      return;
    }
    this.fileService.download(fileName, 'AssetDocument').subscribe(res => {
      // saveAs(res.body, fileName);

    },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: err,
          detail: "",
        });
      });

  }

  uploadToDocuments() {
    this.index = 4;
    if (this.assetDocumentsForm.invalid) {
      this.messageService.add({
        severity: "error",
        summary: "Documents input field error.",
        detail: "Please fill mandatory fields.",
      });
      return;
    }

    if (this.tempFiles == null || this.tempFiles?.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Documents File Selection Error.",
        detail: "No File Selected. Please select at least one File.",
      });
      return;
    }

    let docs = this.assetDocumentsForm.value;

    docs.fileNames = this.tempFiles;
    docs.docDate = new Date(docs.docDate);

    this.documents = this.documents != null && this.documents.length > 0 ?
      [...this.documents, docs] : [docs];

    this.cleanAssetDocumentsForm();
    this.cleanAssetImageForm();

  }



  uploadToImages() {
    this.index = 3;
    if (this.assetDocumentsForm.invalid) {
      this.messageService.add({
        severity: "error",
        summary: "Documents input field error.",
        detail: "Please fill mandatory fields.",
      });
      return;
    }

    if (this.tempFiles == null || this.tempFiles?.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Documents File Selection Error.",
        detail: "No File Selected. Please select at least one File.",
      });
      return;
    }

    let docs = this.assetDocumentsForm.value;

    docs.fileNames = this.tempFiles;
    docs.docDate = new Date(docs.docDate);

    this.documents = this.documents != null && this.documents.length > 0 ?
      [...this.documents, docs] : [docs];

    this.cleanAssetDocumentsForm();
    this.cleanAssetImageForm();

  }

  cleanAssetDocumentsForm() {
    this.assetDocumentsForm.reset();
    this.assetDocumentsForm.updateValueAndValidity();
    this.tempFiles = [];
  }
  cleanAssetImageForm() {
    this.assetImageForm.reset();
    this.imageUrl = '';
    this.assetImageForm.updateValueAndValidity();
    this.tempFiles = [];
  }

  // by sz
  uploadToPictureDocuments() {
    this.index = 3;

    if (this.assetPictureDocumentsForm.invalid) {
      this.messageService.add({
        severity: "error",
        summary: "Documents input field error.",
        detail: "Please fill mandatory fields.",
      });
      return;
    }

    if (this.tempFilesPicture == null || this.tempFilesPicture?.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Documents File Selection Error.",
        detail: "No File Selected. Please select at least one File.",
      });
      return;
    }

    if (this.tempFilesPicture?.length > 1) {
      this.messageService.add({
        severity: "error",
        summary: "Documents File Selection Error.",
        detail: "No File Selected. Please select at least one File.",
      });
      return;
    }

    let docs = this.assetPictureDocumentsForm.value;

    docs.fileNames = this.tempFilesPicture;
    docs.docDate = new Date(docs.docDate);

    this.documentsPicture = this.documentsPicture != null && this.documentsPicture.length > 0 ?
      [...this.documentsPicture, docs] : [docs];


    this.cleanAssetPictureDocumentsForm();
    //    this.cleanAssetImageForm();

  }
  cleanAssetPictureDocumentsForm() {
    this.assetPictureDocumentsForm.reset();
    this.assetPictureDocumentsForm.updateValueAndValidity();
    this.tempFilesPicture = [];
  }

}

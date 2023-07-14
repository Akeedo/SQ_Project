

export default class AssetO { 

    assetOid: string;
    organizationOid: string;
    departmentOid: string;
    siteOid: string;
    subSiteOid: string;
    
    storeOid: string;
    manufacturerOid: string;
    vendorOid: string;
    assetCategoryOid: string;
    assetCategoryTypeOid: string;
    
    assetSubCategoryOid: string;
    assetModelOid: string;
    assetOwnerOid: string;
    assetOwnerDesignation: string;
    assetOwnerUnit: string;
    additionalServiceJson: string;
    assetReceivedBy: string;
    assetName: string;
    assetLocation: string;
    
    assetSpecificationJson: any;
    assetConfigurationJson: string;
    assetCredentialJson: any;
    assetMonitoringJson: string;
    assetProductSerial: string;

    assetCodedId: number;
    assetPartNo: number;
    assetChalanNo: number;
    assetPurchaseCost: number;
    assetPurchaseDate: Date;

    assetShipmentDate: Date;
    assetDeliveryDate:  Date;
    assetReceiveDate:  Date;
    assetWarrantyDurationInMonths: number;
    assetWarrantyStartDate:  Date;

    assetWarrantyEndDate:  Date;
    assetCondition: string;
    assetCsiNumber: string;
    assetEndOfLifeDate: Date;
    assetEndOfSupportDate: Date;

    assetLicenseStartDate: Date;
    assetLicenseEndDate: Date;
    assetReferenceNumberOfTender: string;
    assetRemarks: string;
    assetStatus: string;

    assetJson: string;
    assetSpecialConfigJson: string;
    assetImagesJson: string;
    assetOwnerName:String;
    responsiblePerson: string;

}


export class AssetOwner{
    assetOwnerOid :string;
    loginId: string;
    organizationOid: string;
    assetOwnerName: string;
}

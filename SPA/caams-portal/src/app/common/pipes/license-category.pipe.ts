import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'licenseCategory' })
export class LicenseCategory implements PipeTransform {

    transform(value: any): any {
        if (value === "cat-01") {
            return "Server"

        } else if (value === "cat-02") {
            return "Storage"
        }
        else if (value === "cat-03") {
            return "Switch"
        }
        else if (value === "cat-04") {
            return "Router"
        }
        else if (value === "cat-05") {
            return "Engineered System"
        }
        else if (value === "cat-06") {
            return "HCI"
        }
        else if (value === "OEM-01") {
            return "Switch"
        }
        else if (value === "OEM-02") {
            return "Router"
        }
        else if (value === "OEM-03") {
            return "Engineered System"
        }
        else if (value === "OEM-04") {
            return "HCI"

        } else {
            return null
        }


    }


}

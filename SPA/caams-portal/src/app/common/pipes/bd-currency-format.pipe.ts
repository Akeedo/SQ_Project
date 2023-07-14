import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bdCurrency' })
export class BDCurrency implements PipeTransform {
    transform(value: any, currencySymbol: string = '', space: string = ' '): any {

        if (value && !isNaN(value)) {
            const result = value.toString().split('.');
            let lastThree = result[0].substring(result[0].length - 3);
            const otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '') {
                lastThree = ',' + lastThree;
            }
            let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
            if (result[1] && result[1].length > 1) {
                output += '.' + result[1].slice(0, 2);
            }
            else if (result[1] && result[1].length === 1) {
                output += '.' + result[1] + '0';
            }
            else {
                output += '.00';
            }
            return `${currencySymbol}${space}${output}`;
        }
        return `${currencySymbol}${space}0.00`;
    }

    transformV2(value: any): any {

        if (value && !isNaN(value)) {
            const result = value.toString().split('.');
            let lastThree = result[0].substring(result[0].length - 3);
            const otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '') {
                lastThree = ',' + lastThree;
            }
            let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
            if (result[1] !== undefined) {
                output += '.' + result[1];
            }
            return output;
        }
    }

    formatCurrency(value: any): any {
        if (value && !isNaN(value)) {
            const result = value.toString().split('.');
            let lastThree = result[0].substring(result[0].length - 3);
            const otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '') {
                lastThree = ',' + lastThree;
            }
            let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
            if (result[1] && result[1].length > 1) {
                output += '.' + result[1].slice(0, 2);
            }
            else if (result[1] && result[1].length === 1) {
                output += '.' + result[1] + '0';
            }
            else {
                output += '.00';
            }
            return output;
        }
    }

    public getFormattedCurrency(amount: any, currencySymbol: string = 'BDT', space: string = '&nbsp;'): string {

        if (amount && !isNaN(amount)) {
            const formattedCurrency = this.formatCurrency(amount);
            const digits = formattedCurrency.toString().split('.');
            return `<span class='bdt'>${currencySymbol}${space}</span><span class='int-number'>${digits[0]}</span><span class='point'>.</span><span class='decimal-digit'>${digits[1]}</span>`;
        }
        else if (Number(amount) == 0) {
            return `<span class='bdt'>${currencySymbol}${space}</span><span class='int-number'>0</span><span class='point'>.</span><span class='decimal-digit'>00</span>`;
        }
        return;
    }
}

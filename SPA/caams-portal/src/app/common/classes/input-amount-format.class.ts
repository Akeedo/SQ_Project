import convertTakaIntoWords from 'taka-amount-to-word-js';

import { BDCurrency } from '../pipes/bd-currency-format.pipe';

export interface InputAmountModel {
    amount: string;
    amountInWords: string;
}

export class InputAmount {

    private bdCurrency = new BDCurrency();

    public getCommaExcludedNumber(value) {
        if (value) {
            return value.toString().replace(/,/g, '');
        }
        return;
    }

    public keyupFormat(key: string, input: any, amount: string): InputAmountModel {

        let amountInWords: string;
        if (amount) {
            let originalLength, caretPosition;
            if (key !== '.') {
                originalLength = amount.length;
                caretPosition = input.prop('selectionStart');
            }
            amount = this.getCommaExcludedNumber(amount);
            amount = amount.replace(/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '$2');
            while (amount.split('.')[0].length > 1 && amount.charAt(0) === '0') {
                amount = amount.substr(1);
            }
            if (amount && !isNaN(amount as any) && Number(amount) <= 9007199254740991) {
                amountInWords = convertTakaIntoWords(Number(amount), 'en', true);
                amount = this.bdCurrency.transformV2(amount as any);
                // put caret back in the right position
                if (key !== '.') {
                    const updatedLength = amount.length;
                    caretPosition = updatedLength - originalLength + caretPosition;
                    setTimeout(() => {
                        input[0].setSelectionRange(caretPosition, caretPosition);
                    });
                }
            }
            else if (Number(amount) > 9007199254740991) {
                amountInWords = null;
                amount = this.bdCurrency.transformV2(amount as any);
                // put caret back in the right position
                if (key !== '.') {
                    const updatedLength = amount.length;
                    caretPosition = updatedLength - originalLength + caretPosition;
                    setTimeout(() => {
                        input[0].setSelectionRange(caretPosition, caretPosition);
                    });
                }
            }
            else {
                amount = '';
                amountInWords = null;
            }
        }
        else {
            amount = '';
            amountInWords = null;
        }

        return {
            amount,
            amountInWords
        };
    }

    public blurFormat(amount: string): InputAmountModel {

        let amountInWords: string;
        if (amount) {
            amount = this.getCommaExcludedNumber(amount);
            if (!isNaN(amount as any) && Number(amount) > 0 && Number(amount) <= 9007199254740991) {
                amountInWords = convertTakaIntoWords(Number(amount), 'en', true);
                amount = this.bdCurrency.formatCurrency(amount as any);
            }
            else if (Number(amount) > 9007199254740991) {
                amountInWords = null;
                amount = this.bdCurrency.formatCurrency(amount as any);
            }
            else {
                amount = '';
                amountInWords = null;
            }
        }
        else {
            amount = '';
            amountInWords = null;
        }

        return {
            amount,
            amountInWords
        };
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat' })
export class DateFormat implements PipeTransform {

    transform(value: any): any {
        if (value) {
            return this.getDateString(value);
        }
    }

    getDateString(date: any) {
        const dateString = new Date(date).toDateString().split(' ').slice(1);
        return [dateString[1], dateString[0] + ',', dateString[2]].join(' ');
    }
}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Site } from '../../model/site';
import { OfficeService } from '../../services/office.service';

@Component({
    selector: 'app-office-list',
    templateUrl: './office-list.component.html',
    styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit, AfterViewInit {

    public isLoading: boolean = false;
    sites: Site[];
    public isProgressBarLoading: boolean;
    public sessionList: any[];
    public rowsPerPageOptions: any[] = [20, 50, 100];
    @ViewChild('sessionTableRef') sessionTableRef: Table;
    public trDisabled: boolean = false;
    public showAllList: boolean = true;

    public rows: number = 20;
    public defaultSearchText: string = '';
    @ViewChild('sessionSearchPopRef') sessionSearchPopRef: ElementRef;
    public totalRecords: number = 0;
    public role: string = '';
    public resetRequired: string = '';
    private defaultOffset: number = 0;
    private defaultLimit: number = this.rows;
    private searchText: string = this.defaultSearchText;
    items: { label: string; url: string; }[];

    constructor(private officeService: OfficeService,
        private router: Router, private activateRoute: ActivatedRoute, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.getOffices();
        this.items = [
            {label: 'CAAMS', url: '/'},
            { label: 'Master', url: '/sites'},
            { label: 'Site', url: '/sites' }
        ];
    }

    createSite() {
        this.router.navigate(['create-site'], { relativeTo: this.activateRoute })
    }

    updateOffice(id: string) {
        this.router.navigate(['update-site', id], { relativeTo: this.activateRoute })
    }

    onSessionLazyLoad($event) {
        if (!this.isLoading && !this.isProgressBarLoading) {
            const offset = $event.first === 0 ? 0 : ($event.first / $event.rows);
            const limit = $event.rows ? $event.rows : this.rows;
            this.getOffices(offset, limit);
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.sessionSearchPopRef.nativeElement.focus();
        }, 100);

        fromEvent(this.sessionSearchPopRef.nativeElement, 'keyup')
            .pipe(debounceTime(500),
                distinctUntilChanged())
            .subscribe(($event: any) => {
                this.onSessionSearch($event.target.value.trim());
            });
    }

    onSessionSearch(value: string) {
        this.searchText = value;
        this.sessionTableRef.reset();
        this.getOffices(this.defaultOffset, this.defaultLimit, this.searchText);
    }



    private getOffices(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {
        this.officeService.getOffices(offset, pageSize, searchText.trim()).subscribe(res => {
            if (res.status === 200) {
                this.sessionList = res.body.data
                this.totalRecords = res.body.totalRecords
            }
        },
            err => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
                if (err.status === 404) {
                    this.sessionList = [];
                    this.totalRecords = 0;
                }

                if (err.error && err.error.message) {
                    this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
                }
            },
            () => {
                this.isProgressBarLoading = false;
                this.isLoading = false;
            });
    }

}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from '@app/auth/office/model/site';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SubSite } from '../../model/subsite';
import { SubSiteService } from '../../services/subsite.service';

@Component({
    selector: 'app-subsite-list',
    templateUrl: './subsite-list.component.html',
    styleUrls: ['./subsite-list.component.css']
})
export class SubSiteListComponent implements OnInit, AfterViewInit {

    public isLoading: boolean = false;
    sub_sites: SubSite[];
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
    subsite: any;
    items: any;

    constructor(private officeService: SubSiteService,
        private router: Router, private activateRoute: ActivatedRoute, private messageService: MessageService, private subSiteService: SubSiteService) {
    }

    ngOnInit(): void {
        this.getSubSitelist();

        this.items = [
            {label: 'CAAMS', url: '/'},
            { label: 'Master', url: '/subsite' },
            { label: 'SubSite', url: '/subsite' }
        ];
    }


    createsubsite() {
        this.router.navigate(['create-subsite'], { relativeTo: this.activateRoute })
    }

    updatesubsite(id: string) {
        this.router.navigate(['update-subsite', id], { relativeTo: this.activateRoute })
    }
    deletesubsite(id: string) {
        this.router.navigate(['delete-subsite', id], { relativeTo: this.activateRoute })
    }

    onSessionLazyLoad($event) {
        if (!this.isLoading && !this.isProgressBarLoading) {
            const offset = $event.first === 0 ? 0 : ($event.first / $event.rows);
            const limit = $event.rows ? $event.rows : this.rows;
            this.getSubSitelist(offset, limit);
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
        this.getSubSitelist(this.defaultOffset, this.defaultLimit, this.searchText);
    }

    private getSubSitelist(offset: number = this.defaultOffset, pageSize: number = this.defaultLimit, searchText: string = this.defaultSearchText) {
        this.subSiteService.getSubsite(offset, pageSize, searchText.trim()).subscribe(res => {
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

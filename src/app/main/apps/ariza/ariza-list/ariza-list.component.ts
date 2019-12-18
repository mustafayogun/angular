import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { takeUntil } from 'rxjs/internal/operators';
import {ArizaListService} from './ariza-list.service';
import {YeniKayitComponent} from '../dialogs/yeni-kayit/yeni-kayit.component';

@Component({
    selector     : 'ariza-ariza-liste',
    templateUrl  : './ariza-list.component.html',
    styleUrls    : ['./ariza-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ArizaListComponent implements OnInit, OnDestroy
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'konu', 'assignee',  'birim', 'sorumluPersonel', 'envanter', 'islem', 'tarih', 'durum' ];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild('filter')
    filter: ElementRef;

    @ViewChild(MatSort)
    sort: MatSort;
    dialogRef: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceOrdersService} _ecommerceOrdersService
     */
    constructor(
        private _arizaListService: ArizaListService,
        private _matDialog: MatDialog,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
      
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    composeDialog(): void
    { this.dialogRef = this._matDialog.open(YeniKayitComponent, {
            panelClass: 'mail-ngrx-yeni-kayit-dialog'
        });

    }

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.dataSource = new FilesDataSource(this._arizaListService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

export class FilesDataSource extends DataSource<any>
{
    // Private
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {EcommerceOrdersService} _arizaListService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _arizaListService: ArizaListService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._arizaListService.arizaList;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._arizaListService.onArizaListChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(map(() => {

                let data = this._arizaListService.arizaList.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );

    }

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'konu':
                    [propertyA, propertyB] = [a.konu, b.konu];
                    break;
                case 'assignee':
                    [propertyA, propertyB] = [a.assignee.adiSoyadi, b.assignee.adiSoyadi];
                    break;
                case 'islemDurumu':
                    [propertyA, propertyB] = [a.islem.name, b.islem.name];
                    break;
                case 'status':
                    [propertyA, propertyB] = [a.status, b.status];
                    break;
                case 'birim':
                    [propertyA, propertyB] = [a.birim.birimAdi, b.birim.birimAdi];
                    break;
                    case 'sorumluPersonel':
                    [propertyA, propertyB] = [a.arizaSorumluUser.adiSoyadi, b.a.arizaSorumluUser.adiSoyadi];
                    break;
                case 'envanter':
                    [propertyA, propertyB] = [a.envanter.envAdi, b.envanter.envAdi];
                    break;
                case 'tarih':
                    [propertyA, propertyB] = [a.tarih, b.tarih];
                    break;

            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
